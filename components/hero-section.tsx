"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const trailerRef = useRef<HTMLDivElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [showTrailer, setShowTrailer] = useState(false)
  const lastScrollY = useRef(0)
  const playerRef = useRef<any>(null)

  useEffect(() => {
    // Register ScrollTrigger plugin
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const ctx = gsap.context(() => {
      // Hero title animation
      gsap.fromTo(
        headingRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
        },
      )

      // Parallax effect on scroll
      gsap.to(imageRef.current, {
        y: 200,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })

      // Content reveal on scroll
      gsap.fromTo(
        contentRef.current,
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1,
          },
        },
      )

      // Overlay gradient animation
      gsap.fromTo(
        ".overlay-gradient",
        {
          opacity: 0.7,
          backgroundPosition: "0% 0%",
        },
        {
          opacity: 1,
          backgroundPosition: "100% 100%",
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        },
      )
    }, sectionRef)

    // Add scroll event listener to pause video when scrolling up
    const handleScroll = () => {
      if (!showTrailer) return;
      
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY.current && iframeRef.current) {
        // User is scrolling up, pause the video
        const iframeSrc = iframeRef.current.src;
        iframeRef.current.src = iframeSrc.replace('autoplay=1', 'autoplay=0');
        setTimeout(() => {
          // This timeout gives the video a moment to pause before enabling controls
          if (iframeRef.current) {
            iframeRef.current.src = iframeSrc;
          }
        }, 300);
      }
      lastScrollY.current = currentScrollY;
    };

    // Setup YouTube API event listener
    const handleYouTubeMessage = (event: MessageEvent) => {
      if (!showTrailer) return;
      
      try {
        const data = JSON.parse(event.data);
        
        // If video ended (state = 0), close the trailer
        if (data.event === 'onStateChange' && data.info === 0) {
          toggleTrailer();
        }
      } catch (e) {
        // Ignore parsing errors from other messages
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('message', handleYouTubeMessage);
    
    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('message', handleYouTubeMessage);
    }
  }, [showTrailer])

  // Initialize YouTube player once iframe is loaded
  useEffect(() => {
    if (!showTrailer || !iframeRef.current) return;
    
    // Send a message to initialize the iframe API
    iframeRef.current.addEventListener('load', () => {
      iframeRef.current?.contentWindow?.postMessage(
        JSON.stringify({
          event: 'listening',
          id: 'bgmi-trailer'
        }), 
        '*'
      );
    });
  }, [showTrailer]);

  const toggleTrailer = () => {
    if (!showTrailer) {
      // Store current scroll position
      lastScrollY.current = window.scrollY;
      
      // Show trailer animations
      gsap.to([headingRef.current, contentRef.current], {
        opacity: 0,
        y: -50,
        duration: 0.5,
        ease: "power2.out",
        stagger: 0.1,
        onComplete: () => setShowTrailer(true)
      });
    } else {
      // Hide trailer animations
      setShowTrailer(false);
      gsap.to([headingRef.current, contentRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.inOut",
        stagger: 0.1,
        delay: 0.3
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] w-full flex items-center pt-16 md:pt-20 overflow-hidden bg-gradient-to-b from-black via-[#1a1a1a] to-[#2a1500]"
    >
      {/* Background image with parallax effect */}
      <div 
        ref={imageRef} 
        className={`absolute inset-0 z-0 w-full h-full transition-opacity duration-700 ${showTrailer ? 'opacity-0' : ''}`}
      >
        <Image
          src="/bgmi-indian-landmarks.png"
          alt="BGMI India"
          fill
          priority
          className="object-cover object-center w-full h-full opacity-40"
          sizes="(max-width: 768px) 100vw, 100vw"
          quality={90}
        />
      </div>

      {/* Overlay gradient */}
      <div className={`absolute inset-0 w-screen h-full bg-gradient-to-t from-black via-black/70 to-transparent z-10 overlay-gradient ${showTrailer ? 'opacity-80' : ''}`}></div>

      {/* YouTube Trailer */}
      {showTrailer && (
        <div 
          ref={trailerRef} 
          className="absolute inset-0 z-30 w-full h-full"
        >
          <iframe 
            ref={iframeRef}
            id="bgmi-trailer"
            src="https://www.youtube.com/embed/SFafi7eln9w?autoplay=1&controls=0&showinfo=0&modestbranding=1&rel=0&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1&origin=http://localhost:3000&si=tdI5JrwZC7QyjqLB" 
            className="absolute inset-0 w-full h-full"
            title="BGMI Trailer"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
            frameBorder="0"
          ></iframe>
          <Button 
            onClick={toggleTrailer} 
            className="absolute top-8 right-8 bg-black/50 hover:bg-black text-white rounded-full p-2 z-40"
            size="icon"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </Button>
        </div>
      )}

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            ref={headingRef}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            style={{ textShadow: "0 0 20px rgba(255, 245, 18, 0.5)" }}
          >
            BATTLEGROUNDS <span className="text-yellow-500">MOBILE INDIA</span>
          </h1>

          <div ref={contentRef} className="space-y-6">
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Experience the ultimate battle royale game, specially crafted for Indian gamers. Join millions of players
              and compete for glory on the battleground.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Link href="https://play.google.com/store/apps/details?id=com.pubg.imobile&hl=en_IN">
                <Button size="lg" className="bg-yellow-500 text-brown-900 hover:bg-yellow-400 text-lg px-8">
                  Download Now
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 text-lg px-8"
                onClick={toggleTrailer}
              >
                Watch Trailer
              </Button>
            </div>

            <div className="pt-12 flex justify-center">
              <div className="animate-bounce">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-yellow-500"
                >
                  <path d="M12 5v14"></path>
                  <path d="m19 12-7 7-7-7"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

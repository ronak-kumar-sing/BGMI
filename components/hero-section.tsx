"use client"

import { useEffect, useRef } from "react"
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

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] w-full flex items-center pt-16 md:pt-20 overflow-hidden bg-gradient-to-b from-black via-[#1a1a1a] to-[#2a1500]"
    >
      {/* Background image with parallax effect */}
      <div ref={imageRef} className="absolute inset-0 z-0 w-full h-full">
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
      <div className="absolute inset-0 w-screen h-full bg-gradient-to-t from-black via-black/70 to-transparent z-10 overlay-gradient"></div>

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

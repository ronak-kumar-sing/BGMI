"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Input } from "@/components/ui/input"

export function CommunitySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current,
        {
          x: -100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Form animation
      gsap.fromTo(
        formRef.current,
        {
          x: 100,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Holi festival particle effect
      const particles = gsap.utils.toArray(".holi-particle")
      particles.forEach((particle) => {
        gsap.fromTo(
          particle,
          {
            x: gsap.utils.random(-100, 100),
            y: gsap.utils.random(-100, 100),
            opacity: 0,
            scale: 0,
          },
          {
            x: gsap.utils.random(-300, 300),
            y: gsap.utils.random(-300, 300),
            opacity: gsap.utils.random(0.3, 0.8),
            scale: gsap.utils.random(0.5, 1.5),
            duration: gsap.utils.random(10, 20),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          },
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Generate Holi festival particles
  const holiParticles = Array.from({ length: 20 }).map((_, index) => {
    const colors = ["#FF5722", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4"]
    const size = Math.floor(Math.random() * 20) + 10

    return (
      <div
        key={index}
        className="holi-particle absolute rounded-full"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: colors[Math.floor(Math.random() * colors.length)],
          top: "50%",
          left: "50%",
        }}
      ></div>
    )
  })

  return (
    <section
      id="community"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-[#1a1a1a] to-black relative overflow-hidden"
    >
      {/* Holi festival particles */}
      {holiParticles}

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={contentRef}>
            <div className="inline-block bg-yellow-500/10 px-4 py-1.5 rounded-full mb-4">
              <span className="text-yellow-500 font-medium">Community</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Join the <span className="text-yellow-500">BGMI Family</span>
            </h2>
            <p className="text-gray-300 mb-8">
              Connect with millions of Indian gamers, share your gameplay, participate in community events, and stay
              updated with the latest BGMI news and updates.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">50M+</div>
                <div className="text-gray-400">Downloads</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">10M+</div>
                <div className="text-gray-400">Daily Players</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">500K+</div>
                <div className="text-gray-400">Clans</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">₹5Cr+</div>
                <div className="text-gray-400">Prize Money</div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="bg-yellow-500 text-brown-900 hover:bg-yellow-400">Join Discord</Button>
              <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10">
                Follow on Instagram
              </Button>
            </div>
          </div>

          <form ref={formRef} className="bg-black/60 backdrop-blur-md border border-yellow-500/20 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">BGMI Diaries</h3>
            <p className="text-gray-400 mb-6">
              Share your BGMI story with the community and get featured on our social media channels.
            </p>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="Your in-game name"
                  className="bg-black/40 border-yellow-500/30 focus:border-yellow-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Your email address"
                  className="bg-black/40 border-yellow-500/30 focus:border-yellow-500"
                />
              </div>

              <div>
                <label htmlFor="story" className="block text-gray-300 mb-2">
                  Your BGMI Story
                </label>
                <textarea
                  id="story"
                  rows={4}
                  placeholder="Share your best BGMI moment or achievement..."
                  className="w-full rounded-md bg-black/40 border border-yellow-500/30 focus:border-yellow-500 p-2 text-white"
                ></textarea>
              </div>

              <Button className="w-full bg-yellow-500 text-brown-900 hover:bg-yellow-400">Submit Story</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}

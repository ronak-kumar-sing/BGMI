"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Settings, Zap, Target } from "lucide-react"

export function SettingsPromotion() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current,
        {
          x: -50,
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

      // Image animation
      gsap.fromTo(
        imageRef.current,
        {
          x: 50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-[#2a1500] to-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div ref={contentRef}>
            <div className="inline-block bg-yellow-500/10 px-4 py-1.5 rounded-full mb-4">
              <span className="text-yellow-500 font-medium">Pro Settings</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Optimize Your <span className="text-yellow-500">Gameplay</span>
            </h2>
            <p className="text-gray-300 mb-8">
              Get personalized sensitivity settings based on pro-player configurations. Our Settings Advisor analyzes
              your device, playstyle, and skill level to provide the perfect setup for dominating the battleground.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-4 text-center">
                <div className="flex justify-center mb-3">
                  <Settings className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="text-white font-medium">Pro Configurations</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-4 text-center">
                <div className="flex justify-center mb-3">
                  <Zap className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="text-white font-medium">Device Optimized</div>
              </div>
              <div className="bg-black/40 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-4 text-center">
                <div className="flex justify-center mb-3">
                  <Target className="h-6 w-6 text-yellow-500" />
                </div>
                <div className="text-white font-medium">Playstyle Matched</div>
              </div>
            </div>

            <Link href="/settings-advisor">
              <Button size="lg" className="bg-yellow-500 text-brown-900 hover:bg-yellow-400">
                Try Settings Advisor
              </Button>
            </Link>
          </div>

          <div ref={imageRef} className="relative">
            <div className="relative h-[400px] rounded-xl overflow-hidden border border-yellow-500/20">
              <Image src="/settings-advisor-preview.png" alt="BGMI Settings Advisor" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="bg-yellow-500/90 text-black px-3 py-1 rounded-full text-sm font-bold">
                  Jonathan & Scout Settings Available
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

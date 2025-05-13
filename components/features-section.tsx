"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { MapPin, Users, Trophy, Zap } from "lucide-react"

export function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Features staggered animation
      gsap.fromTo(
        ".feature-card",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 70%",
            end: "bottom 40%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-yellow-500" />,
      title: "Icon Location",
      description:
        "Discover in-game locations inspired by iconic landmarks, enhancing the immersive experience.",
    },
    {
      icon: <Users className="h-8 w-8 text-yellow-500" />,
      title: "Local Clans",
      description: "Create or join regional clans and compete with players from your state or city.",
    },
    {
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      title: "Indian Tournaments",
      description: "Participate in India-exclusive tournaments with massive prize pools and recognition.",
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: "Cultural Events",
      description: "Celebrate Indian festivals with special in-game events, skins, and challenges.",
    },
  ]

  return (
    <section id="features" ref={sectionRef} className="py-20 bg-gradient-to-b from-[#2a1500] to-[#1a1a1a]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-yellow-500/10 px-4 py-1.5 rounded-full mb-4">
            <span className="text-yellow-500 font-medium">Game Features</span>
          </div>
          <h2 ref={titleRef} className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Made for <span className="text-yellow-500">Indian Gamers</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            BGMI brings exclusive features designed specifically for the Indian gaming community, with localized content
            and experiences.
          </p>
        </div>

        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-black/40 backdrop-blur-sm border border-yellow-500/20 rounded-xl p-6 transition-all hover:border-yellow-500/50 hover:bg-black/60"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10"></div>
          <Image
            src="/bgmi-holi-india.png"
            alt="BGMI Gameplay"
            width={1200}
            height={600}
            className="w-full h-[300px] md:h-[400px] object-cover rounded-xl"
          />
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Calendar, MapPin } from "lucide-react"

export function TournamentSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const tournamentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const ctx = gsap.context(() => {
      // Tournament cards staggered animation
      gsap.fromTo(
        ".tournament-card",
        {
          y: 100,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: tournamentRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const tournaments = [
    {
      title: "BGMI Pro League",
      prize: "₹50,00,000",
      date: "June 15-30, 2025",
      location: "Mumbai",
      image: "/bgmi-esports-indian-flag.png",
    },
    {
      title: "Battle of States",
      prize: "₹25,00,000",
      date: "July 10-20, 2025",
      location: "Delhi",
      image: "/placeholder.svg?key=kfw9w",
    },
    {
      title: "Campus Champions",
      prize: "₹15,00,000",
      date: "August 5-15, 2025",
      location: "Bangalore",
      image: "/placeholder.svg?key=k75o1",
    },
  ]

  return (
    <section id="tournaments" ref={sectionRef} className="py-20 bg-gradient-to-b from-[#2a1500] to-[#1a1a1a] w-full">
      <div className="w-full max-w-none px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block bg-yellow-500/10 px-4 py-1.5 rounded-full mb-4">
            <span className="text-yellow-500 font-medium">Esports</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Upcoming <span className="text-yellow-500">Tournaments</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Compete in India's biggest BGMI tournaments and win massive prizes. From professional leagues to college
            competitions, there's something for everyone.
          </p>
        </div>

        <div ref={tournamentRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tournaments.map((tournament, index) => (
            <div
              key={index}
              className="tournament-card bg-black/40 backdrop-blur-sm border border-yellow-500/20 rounded-xl overflow-hidden transition-all hover:border-yellow-500/50 hover:bg-black/60"
            >
              <div className="relative h-48">
                <Image
                  src={tournament.image || "/placeholder.svg"}
                  alt={tournament.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-yellow-500 text-brown-900 px-3 py-1 rounded-full text-sm font-bold inline-block">
                    Prize Pool: {tournament.prize}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">{tournament.title}</h3>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-yellow-500" />
                    <span className="text-gray-300">{tournament.date}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-yellow-500" />
                    <span className="text-gray-300">{tournament.location}</span>
                  </div>
                </div>

                <Button className="w-full mt-6 bg-yellow-500 text-brown-900 hover:bg-yellow-400">Register Now</Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10">
            View All Tournaments
          </Button>
        </div>
      </div>
    </section>
  )
}

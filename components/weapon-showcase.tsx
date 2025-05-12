"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function WeaponShowcase() {
  const sectionRef = useRef<HTMLElement>(null)
  const weaponRef = useRef<HTMLDivElement>(null)
  const [activeWeapon, setActiveWeapon] = useState("akm")

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger)
    }

    const ctx = gsap.context(() => {
      // Weapon rotation animation
      gsap.fromTo(
        ".weapon-image",
        {
          rotationY: -20,
          x: -100,
          opacity: 0,
        },
        {
          rotationY: 0,
          x: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: weaponRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Stats animation
      gsap.fromTo(
        ".weapon-stat-bar",
        { width: 0 },
        {
          width: "100%",
          duration: 1,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".weapon-stats",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [activeWeapon])

  const weapons = {
    akm: {
      name: "AKM",
      image: "/akm-3d-render.png",
      damage: 90,
      range: 70,
      stability: 60,
      rate: 80,
      description: "A powerful assault rifle with high damage but moderate recoil. Effective at medium range combat.",
    },
    m416: {
      name: "M416",
      image: "/m416-render.png",
      damage: 75,
      range: 80,
      stability: 85,
      rate: 90,
      description:
        "A versatile assault rifle with excellent stability and rate of fire. Good for all-around combat situations.",
    },
    awm: {
      name: "AWM",
      image: "/awm-render.png",
      damage: 100,
      range: 100,
      stability: 70,
      rate: 30,
      description: "The most powerful sniper rifle in the game. One-shot kill potential with headshots at any range.",
    },
  }

  const currentWeapon = weapons[activeWeapon as keyof typeof weapons]

  return (
    <section id="weapons" ref={sectionRef} className="py-20 bg-gradient-to-b from-[#1a1a1a] to-[#2a1500]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block bg-yellow-500/10 px-4 py-1.5 rounded-full mb-4">
            <span className="text-yellow-500 font-medium">Arsenal</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Master Your <span className="text-yellow-500">Weapons</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Choose from an extensive arsenal of weapons, each with unique characteristics and customization options.
          </p>
        </div>

        <Tabs defaultValue="akm" onValueChange={setActiveWeapon} className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList className="bg-black/40 border border-yellow-500/20">
              <TabsTrigger value="akm" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                AKM
              </TabsTrigger>
              <TabsTrigger value="m416" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                M416
              </TabsTrigger>
              <TabsTrigger value="awm" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                AWM
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div ref={weaponRef} className="flex justify-center">
              <div className="weapon-image relative">
                <Image
                  src={currentWeapon.image || "/placeholder.svg"}
                  alt={currentWeapon.name}
                  width={800}
                  height={400}
                  className="object-contain max-h-[300px]"
                />

                {/* Weapon hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/0 via-yellow-500/10 to-yellow-500/0 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div className="weapon-stats space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">{currentWeapon.name}</h3>
                <p className="text-gray-400 mb-6">{currentWeapon.description}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Damage</span>
                    <span className="text-yellow-500">{currentWeapon.damage}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="weapon-stat-bar h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"
                      style={{ width: `${currentWeapon.damage}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Range</span>
                    <span className="text-yellow-500">{currentWeapon.range}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="weapon-stat-bar h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"
                      style={{ width: `${currentWeapon.range}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Stability</span>
                    <span className="text-yellow-500">{currentWeapon.stability}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="weapon-stat-bar h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"
                      style={{ width: `${currentWeapon.stability}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-300">Fire Rate</span>
                    <span className="text-yellow-500">{currentWeapon.rate}%</span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="weapon-stat-bar h-full bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full"
                      style={{ width: `${currentWeapon.rate}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <Link href="/gun-combo">
                <Button className="bg-yellow-500 text-brown-900 hover:bg-yellow-400 mt-4">See Gun Combo</Button>
              </Link>
            </div>
          </div>
        </Tabs>
      </div>
    </section>
  )
}

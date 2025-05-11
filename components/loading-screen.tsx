"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import gsap from "gsap"
import { Shield, Crosshair, Zap } from "lucide-react"

interface LoadingScreenProps {
  duration?: number // Duration in seconds
}

export function LoadingScreen({ duration = 5 }: LoadingScreenProps) {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingText, setLoadingText] = useState("Initializing...")
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  // Simulate loading progress
  useEffect(() => {
    const loadingTexts = [
      "Initializing...",
      "Loading weapons...",
      "Preparing battleground...",
      "Checking for updates...",
      "Loading map data...",
      "Connecting to server...",
      "Almost ready...",
    ]

    let interval: NodeJS.Timeout
    let textInterval: NodeJS.Timeout

    // Calculate interval based on duration
    const totalSteps = 20 // Divide the loading into 20 steps
    const stepInterval = (duration * 1000) / totalSteps
    const progressIncrement = 100 / totalSteps

    // Simulate progress updates
    interval = setInterval(() => {
      setLoadingProgress((prev) => {
        const newProgress = prev + progressIncrement
        return newProgress >= 100 ? 100 : newProgress
      })
    }, stepInterval)

    // Change loading text periodically
    textInterval = setInterval(
      () => {
        setLoadingText(loadingTexts[Math.floor(Math.random() * loadingTexts.length)])
      },
      (duration * 1000) / 3,
    ) // Show approximately 3 different texts during loading

    // Clean up intervals
    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [duration])

  // Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Logo pulsing animation
      gsap.to(logoRef.current, {
        scale: 1.1,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // Supply drop animation
      gsap.fromTo(
        ".supply-drop",
        {
          y: -50,
          opacity: 0,
          rotation: -5,
        },
        {
          y: 0,
          opacity: 1,
          rotation: 5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        },
      )

      // Icons floating animation
      gsap.to(".floating-icon", {
        y: -15,
        stagger: 0.2,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // Text fade animation
      gsap.fromTo(
        textRef.current,
        {
          opacity: 0.7,
        },
        {
          opacity: 1,
          duration: 1,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  // Hide loading screen when progress reaches 100%
  useEffect(() => {
    if (loadingProgress >= 100) {
      const timer = setTimeout(() => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              if (containerRef.current) {
                containerRef.current.style.display = "none"
              }
            },
          })
        }
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [loadingProgress])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-black via-[#1a1a1a] to-[#2a1500]"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 opacity-20">
          <Shield className="floating-icon text-yellow-500 h-16 w-16" />
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-20">
          <Crosshair className="floating-icon text-yellow-500 h-12 w-12" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 opacity-20">
          <Zap className="floating-icon text-yellow-500 h-14 w-14" />
        </div>
      </div>

      {/* Logo */}
      <div ref={logoRef} className="mb-8 relative">
        <div className="relative h-24 w-24 mb-2">
          <Image src="/bgmi-logo.png" alt="BGMI Logo" fill className="object-contain" />
        </div>
        <div className="absolute -inset-4 rounded-full bg-yellow-500/20 blur-xl -z-10"></div>
      </div>

      {/* Supply drop animation */}
      <div className="supply-drop relative mb-8">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 bg-yellow-500/10 rounded-md"></div>
          <div className="absolute inset-1 border border-yellow-500/30 rounded-md flex items-center justify-center">
            <span className="text-yellow-500 text-xs">SUPPLY</span>
          </div>
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-px h-6 bg-yellow-500/50"></div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-yellow-500/20 rounded-full blur-sm"></div>
        </div>
      </div>

      {/* Loading text */}
      <div ref={textRef} className="text-yellow-500 font-medium mb-4">
        {loadingText}
      </div>

      {/* Progress bar */}
      <div className="w-64 sm:w-80 bg-black/50 h-3 rounded-full overflow-hidden border border-yellow-500/30">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${loadingProgress}%` }}
        ></div>
      </div>

      {/* Progress percentage */}
      <div className="text-gray-400 text-sm mt-2">{Math.floor(loadingProgress)}%</div>

      {/* Tips */}
      <div className="absolute bottom-8 left-0 right-0 text-center">
        <div className="bg-black/30 backdrop-blur-sm border border-yellow-500/10 rounded-md px-4 py-2 max-w-md mx-auto">
          <p className="text-gray-400 text-sm">
            <span className="text-yellow-500 font-medium">TIP:</span>{" "}
            {
              [
                "Use gyroscope for better recoil control in close combat.",
                "The 6x scope can be adjusted down to 3x for better control.",
                "Always carry smoke grenades for safe revives.",
                "Vehicles make noise, but are faster than the blue zone.",
                "Customize your sensitivity settings for better aim.",
              ][Math.floor(Math.random() * 5)]
            }
          </p>
        </div>
      </div>
    </div>
  )
}

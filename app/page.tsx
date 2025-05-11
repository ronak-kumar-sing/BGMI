import Link from "next/link"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { WeaponShowcase } from "@/components/weapon-showcase"
import { TournamentSection } from "@/components/tournament-section"
import { CommunitySection } from "@/components/community-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Sparkles, Smartphone, Gamepad2, Zap } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <HeroSection />

      <div className="w-full bg-black/60 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block bg-yellow-500/10 rounded-full px-4 py-1.5 mb-4">
              <span className="text-yellow-500 text-sm font-medium flex items-center justify-center">
                <Sparkles className="h-4 w-4 mr-2" />
                AI-Powered Tools
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Optimize Your <span className="text-yellow-500">Gameplay</span>
            </h2>
            <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
              Advanced AI tools designed specifically for BGMI players to enhance performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Settings Advisor Card */}
            <div className="bg-gradient-to-br from-black/80 to-black/40 border border-yellow-500/20 rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-500/5 hover:border-yellow-500/30 transition-all duration-300">
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Settings Advisor</h3>
                <p className="text-gray-300 mb-4">
                  Get personalized device settings recommendations based on your device specifications and gameplay
                  preferences.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center mr-3">
                      <Smartphone className="h-4 w-4 text-yellow-500" />
                    </div>
                    <span className="text-gray-300">Device-specific optimizations</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center mr-3">
                      <Zap className="h-4 w-4 text-yellow-500" />
                    </div>
                    <span className="text-gray-300">Graphics & performance balance</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center mr-3">
                      <Gamepad2 className="h-4 w-4 text-yellow-500" />
                    </div>
                    <span className="text-gray-300">Pro player recommended settings</span>
                  </div>
                </div>
                <Link href="/settings-advisor">
                  <Button className="w-full bg-yellow-500 text-black hover:bg-yellow-600">Open Settings Advisor</Button>
                </Link>
              </div>
            </div>

            {/* AI Sensitivity Generator Card */}
            <div className="bg-gradient-to-br from-black/80 to-black/40 border border-yellow-500/20 rounded-xl overflow-hidden shadow-lg hover:shadow-yellow-500/5 hover:border-yellow-500/30 transition-all duration-300 relative">
              <div className="absolute top-0 right-0 bg-yellow-500 text-black text-xs font-bold px-3 py-1 rounded-bl-lg">
                UPDATED
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-yellow-500" />
                  AI Sensitivity Generator
                </h3>
                <p className="text-gray-300 mb-4">
                  Get AI-optimized sensitivity settings tailored to your device, playstyle, and preferences using Gemini
                  2.0 Flash.
                </p>
                <div className="space-y-2 mb-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center mr-3">
                      <Smartphone className="h-4 w-4 text-yellow-500" />
                    </div>
                    <span className="text-gray-300">Personalized sensitivity values</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center mr-3">
                      <Gamepad2 className="h-4 w-4 text-yellow-500" />
                    </div>
                    <span className="text-gray-300">Optimized for your playstyle</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center mr-3">
                      <Sparkles className="h-4 w-4 text-yellow-500" />
                    </div>
                    <span className="text-gray-300">Interactive UI with presets</span>
                  </div>
                </div>
                <Link href="/ai-sensitivity">
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:from-yellow-600 hover:to-amber-700">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate AI Sensitivity
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FeaturesSection />
      <WeaponShowcase />
      <TournamentSection />
      <CommunitySection />
      <Footer />
    </main>
  )
}

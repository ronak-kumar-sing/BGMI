"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SettingsDisplay } from "@/components/settings-display"
import { SettingsComparison } from "@/components/settings-comparison"
import { SettingsInstructions } from "@/components/settings-instructions"
import { proPlayerSettings } from "@/data/pro-player-settings"
import { deviceOptimizations } from "@/data/device-optimizations"
import { generateSettingsCode } from "@/lib/settings-generator"
import { cn } from "@/lib/utils"
import { Upload, Mic, Info, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function SettingsAdvisor() {
  const [device, setDevice] = useState("")
  const [playstyle, setPlaystyle] = useState("")
  const [skillLevel, setSkillLevel] = useState("")
  const [proPlayer, setProPlayer] = useState("")
  const [showResults, setShowResults] = useState(false)
  const [optimizedSettings, setOptimizedSettings] = useState<any>(null)

  const handleGenerateSettings = () => {
    // Get base settings from selected pro player
    const baseSettings = { ...proPlayerSettings[proPlayer as keyof typeof proPlayerSettings] }

    // Apply device-specific optimizations
    const deviceType = getDeviceType(device)
    const optimizations = deviceOptimizations[deviceType]

    // Apply playstyle adjustments
    const adjustedSettings = applyPlaystyleAdjustments(baseSettings, playstyle, skillLevel)

    // Generate final settings with optimizations
    const finalSettings = {
      ...adjustedSettings,
      optimizationTips: optimizations,
      sensitivityCode: generateSettingsCode(adjustedSettings, device),
    }

    setOptimizedSettings(finalSettings)
    setShowResults(true)
  }

  const getDeviceType = (deviceName: string) => {
    if (deviceName.includes("iPhone") || deviceName.includes("iPad"))
      return deviceName.includes("iPad") ? "iPad" : "iPhone"

    // Check for specific device models first
    for (const key in deviceOptimizations) {
      if (deviceName === key) return key
    }

    // Then check for device brands
    if (deviceName.includes("Samsung")) return "Samsung"
    if (deviceName.includes("OnePlus")) return "OnePlus"
    if (deviceName.includes("Xiaomi")) return "Xiaomi"
    if (deviceName.includes("Poco")) return "Poco"
    if (deviceName.includes("Realme")) return "Realme"
    if (deviceName.includes("iQOO")) return "iQOO"
    if (deviceName.includes("Vivo")) return "Vivo"
    if (deviceName.includes("Oppo")) return "Oppo"
    if (deviceName.includes("Google")) return "Google"
    if (deviceName.includes("Asus")) return "Asus"
    if (deviceName.includes("Nothing")) return "Nothing"

    return "Android"
  }

  const applyPlaystyleAdjustments = (settings: any, playstyle: string, skillLevel: string) => {
    const adjusted = { ...settings }

    // Apply playstyle adjustments
    if (playstyle === "gyro-aggressive") {
      adjusted.gyroScope = "Always On"
      adjusted.gyro_4x = Number.parseInt(adjusted.gyro_4x) + 20 + "%"
      adjusted.gyro_red_dot = Number.parseInt(adjusted.gyro_red_dot) + 30 + "%"
    } else if (playstyle === "gyro-sniper") {
      adjusted.gyroScope = "Scope On"
      adjusted.gyro_6x = Number.parseInt(adjusted.gyro_6x) + 10 + "%"
      adjusted.gyro_8x = Number.parseInt(adjusted.gyro_8x) + 15 + "%"
    } else if (playstyle === "non-gyro-aggressive") {
      adjusted.gyroScope = "Off"
      adjusted.camera_sensitivity = Number.parseInt(adjusted.camera_sensitivity) + 15 + "%"
      adjusted.ADS_red_dot = Number.parseInt(adjusted.ADS_red_dot) + 20 + "%"
    } else if (playstyle === "non-gyro-sniper") {
      adjusted.gyroScope = "Off"
      adjusted.ADS_6x = Number.parseInt(adjusted.ADS_6x) - 5 + "%"
      adjusted.ADS_8x = Number.parseInt(adjusted.ADS_8x) - 10 + "%"
    }

    // Apply skill level adjustments
    if (skillLevel === "beginner") {
      // Reduce sensitivity for beginners for better control
      Object.keys(adjusted).forEach((key) => {
        if (key.includes("ADS_") || key.includes("gyro_")) {
          const value = Number.parseInt(adjusted[key])
          if (!isNaN(value)) {
            adjusted[key] = Math.max(value - 10, 1) + "%"
          }
        }
      })
    } else if (skillLevel === "intermediate") {
      // Slight adjustments for intermediate players
      // No major changes needed
    } else if (skillLevel === "advanced") {
      // Increase sensitivity for advanced players for faster reactions
      Object.keys(adjusted).forEach((key) => {
        if (key.includes("ADS_") || key.includes("gyro_")) {
          const value = Number.parseInt(adjusted[key])
          if (!isNaN(value)) {
            adjusted[key] = Math.min(value + 5, 300) + "%"
          }
        }
      })
    }

    return adjusted
  }

  const resetForm = () => {
    setDevice("")
    setPlaystyle("")
    setSkillLevel("")
    setProPlayer("")
    setShowResults(false)
    setOptimizedSettings(null)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="relative w-16 h-16 mb-4">
          <Image src="/bgmi-logo.png" alt="BGMI Logo" width={64} height={64} className="object-contain" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-white text-center">
          BGMI Settings <span className="text-yellow-500">Advisor</span>
        </h1>
        <p className="text-gray-400 mt-2 text-center max-w-2xl">
          Get personalized sensitivity settings based on pro-player configurations, optimized for your device and
          playstyle.
        </p>
      </div>

      {!showResults ? (
        <Card className="max-w-3xl mx-auto bg-black/60 border-yellow-500/20">
          <CardHeader>
            <CardTitle className="text-white">Customize Your Settings</CardTitle>
            <CardDescription>Fill in the details below to get personalized BGMI sensitivity settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="form" className="w-full">
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="form">Form Input</TabsTrigger>
                <TabsTrigger value="screenshot" disabled>
                  <Upload className="mr-2 h-4 w-4" />
                  Screenshot
                </TabsTrigger>
                <TabsTrigger value="voice" disabled>
                  <Mic className="mr-2 h-4 w-4" />
                  Voice
                </TabsTrigger>
              </TabsList>

              <TabsContent value="form" className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="device">Device Model</Label>
                    <Select value={device} onValueChange={setDevice}>
                      <SelectTrigger id="device" className="bg-black/40 border-yellow-500/20">
                        <SelectValue placeholder="Select your device" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-yellow-500/20 max-h-[300px]">
                        <SelectItem value="select-header" disabled className="font-bold text-yellow-500">
                          Apple
                        </SelectItem>
                        <SelectItem value="iPhone 15 Pro Max">iPhone 15 Pro Max</SelectItem>
                        <SelectItem value="iPhone 15 Pro">iPhone 15 Pro</SelectItem>
                        <SelectItem value="iPhone 15">iPhone 15</SelectItem>
                        <SelectItem value="iPhone 14 Pro Max">iPhone 14 Pro Max</SelectItem>
                        <SelectItem value="iPhone 14 Pro">iPhone 14 Pro</SelectItem>
                        <SelectItem value="iPhone 14">iPhone 14</SelectItem>
                        <SelectItem value="iPhone 13 Pro Max">iPhone 13 Pro Max</SelectItem>
                        <SelectItem value="iPhone 13 Pro">iPhone 13 Pro</SelectItem>
                        <SelectItem value="iPhone 13">iPhone 13</SelectItem>
                        <SelectItem value="iPad Pro M2">iPad Pro M2</SelectItem>
                        <SelectItem value="iPad Air">iPad Air</SelectItem>

                        <SelectItem value="samsung-header" disabled className="font-bold text-yellow-500">
                          Samsung
                        </SelectItem>
                        <SelectItem value="Samsung Galaxy S24 Ultra">Galaxy S24 Ultra</SelectItem>
                        <SelectItem value="Samsung Galaxy S24+">Galaxy S24+</SelectItem>
                        <SelectItem value="Samsung Galaxy S24">Galaxy S24</SelectItem>
                        <SelectItem value="Samsung Galaxy S23 Ultra">Galaxy S23 Ultra</SelectItem>
                        <SelectItem value="Samsung Galaxy S23+">Galaxy S23+</SelectItem>
                        <SelectItem value="Samsung Galaxy S23">Galaxy S23</SelectItem>
                        <SelectItem value="Samsung Galaxy S22 Ultra">Galaxy S22 Ultra</SelectItem>
                        <SelectItem value="Samsung Galaxy S22+">Galaxy S22+</SelectItem>
                        <SelectItem value="Samsung Galaxy S22">Galaxy S22</SelectItem>
                        <SelectItem value="Samsung Galaxy A54">Galaxy A54</SelectItem>
                        <SelectItem value="Samsung Galaxy A34">Galaxy A34</SelectItem>

                        <SelectItem value="oneplus-header" disabled className="font-bold text-yellow-500">
                          OnePlus
                        </SelectItem>
                        <SelectItem value="OnePlus 12">OnePlus 12</SelectItem>
                        <SelectItem value="OnePlus 11">OnePlus 11</SelectItem>
                        <SelectItem value="OnePlus 10 Pro">OnePlus 10 Pro</SelectItem>
                        <SelectItem value="OnePlus 10T">OnePlus 10T</SelectItem>
                        <SelectItem value="OnePlus Nord 3">OnePlus Nord 3</SelectItem>
                        <SelectItem value="OnePlus Nord CE 3">OnePlus Nord CE 3</SelectItem>

                        <SelectItem value="xiaomi-header" disabled className="font-bold text-yellow-500">
                          Xiaomi
                        </SelectItem>
                        <SelectItem value="Xiaomi 14 Ultra">Xiaomi 14 Ultra</SelectItem>
                        <SelectItem value="Xiaomi 14">Xiaomi 14</SelectItem>
                        <SelectItem value="Xiaomi 13 Pro">Xiaomi 13 Pro</SelectItem>
                        <SelectItem value="Xiaomi 13">Xiaomi 13</SelectItem>
                        <SelectItem value="Xiaomi 12 Pro">Xiaomi 12 Pro</SelectItem>
                        <SelectItem value="Xiaomi 12">Xiaomi 12</SelectItem>
                        <SelectItem value="Xiaomi Redmi Note 13 Pro+">Redmi Note 13 Pro+</SelectItem>
                        <SelectItem value="Xiaomi Redmi Note 13 Pro">Redmi Note 13 Pro</SelectItem>

                        <SelectItem value="poco-header" disabled className="font-bold text-yellow-500">
                          Poco
                        </SelectItem>
                        <SelectItem value="Poco F5 Pro">Poco F5 Pro</SelectItem>
                        <SelectItem value="Poco F5">Poco F5</SelectItem>
                        <SelectItem value="Poco F4 GT">Poco F4 GT</SelectItem>
                        <SelectItem value="Poco F4">Poco F4</SelectItem>
                        <SelectItem value="Poco X6 Pro">Poco X6 Pro</SelectItem>
                        <SelectItem value="Poco X6">Poco X6</SelectItem>
                        <SelectItem value="Poco X5 Pro">Poco X5 Pro</SelectItem>
                        <SelectItem value="Poco X5">Poco X5</SelectItem>

                        <SelectItem value="realme-header" disabled className="font-bold text-yellow-500">
                          Realme
                        </SelectItem>
                        <SelectItem value="Realme GT 5 Pro">Realme GT 5 Pro</SelectItem>
                        <SelectItem value="Realme GT 5">Realme GT 5</SelectItem>
                        <SelectItem value="Realme GT 3">Realme GT 3</SelectItem>
                        <SelectItem value="Realme GT Neo 5">Realme GT Neo 5</SelectItem>
                        <SelectItem value="Realme 11 Pro+">Realme 11 Pro+</SelectItem>
                        <SelectItem value="Realme 11 Pro">Realme 11 Pro</SelectItem>

                        <SelectItem value="iqoo-header" disabled className="font-bold text-yellow-500">
                          iQOO
                        </SelectItem>
                        <SelectItem value="iQOO 12">iQOO 12</SelectItem>
                        <SelectItem value="iQOO 11">iQOO 11</SelectItem>
                        <SelectItem value="iQOO Neo 9 Pro">iQOO Neo 9 Pro</SelectItem>
                        <SelectItem value="iQOO Neo 7">iQOO Neo 7</SelectItem>
                        <SelectItem value="iQOO Z7">iQOO Z7</SelectItem>

                        <SelectItem value="vivo-header" disabled className="font-bold text-yellow-500">
                          Vivo
                        </SelectItem>
                        <SelectItem value="Vivo X100 Pro">Vivo X100 Pro</SelectItem>
                        <SelectItem value="Vivo X100">Vivo X100</SelectItem>
                        <SelectItem value="Vivo X90 Pro">Vivo X90 Pro</SelectItem>
                        <SelectItem value="Vivo X90">Vivo X90</SelectItem>
                        <SelectItem value="Vivo V30 Pro">Vivo V30 Pro</SelectItem>
                        <SelectItem value="Vivo V30">Vivo V30</SelectItem>

                        <SelectItem value="oppo-header" disabled className="font-bold text-yellow-500">
                          Oppo
                        </SelectItem>
                        <SelectItem value="Oppo Find X7 Ultra">Oppo Find X7 Ultra</SelectItem>
                        <SelectItem value="Oppo Find X7">Oppo Find X7</SelectItem>
                        <SelectItem value="Oppo Find X6 Pro">Oppo Find X6 Pro</SelectItem>
                        <SelectItem value="Oppo Find X6">Oppo Find X6</SelectItem>
                        <SelectItem value="Oppo Reno 11 Pro">Oppo Reno 11 Pro</SelectItem>
                        <SelectItem value="Oppo Reno 11">Oppo Reno 11</SelectItem>

                        <SelectItem value="google-header" disabled className="font-bold text-yellow-500">
                          Google
                        </SelectItem>
                        <SelectItem value="Google Pixel 8 Pro">Google Pixel 8 Pro</SelectItem>
                        <SelectItem value="Google Pixel 8">Google Pixel 8</SelectItem>
                        <SelectItem value="Google Pixel 7 Pro">Google Pixel 7 Pro</SelectItem>
                        <SelectItem value="Google Pixel 7">Google Pixel 7</SelectItem>
                        <SelectItem value="Google Pixel 7a">Google Pixel 7a</SelectItem>

                        <SelectItem value="asus-header" disabled className="font-bold text-yellow-500">
                          Asus
                        </SelectItem>
                        <SelectItem value="Asus ROG Phone 8 Pro">ROG Phone 8 Pro</SelectItem>
                        <SelectItem value="Asus ROG Phone 8">ROG Phone 8</SelectItem>
                        <SelectItem value="Asus ROG Phone 7 Ultimate">ROG Phone 7 Ultimate</SelectItem>
                        <SelectItem value="Asus ROG Phone 7">ROG Phone 7</SelectItem>
                        <SelectItem value="Asus Zenfone 10">Zenfone 10</SelectItem>

                        <SelectItem value="nothing-header" disabled className="font-bold text-yellow-500">
                          Nothing
                        </SelectItem>
                        <SelectItem value="Nothing Phone 2">Nothing Phone 2</SelectItem>
                        <SelectItem value="Nothing Phone 1">Nothing Phone 1</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="playstyle">Playstyle</Label>
                    <Select value={playstyle} onValueChange={setPlaystyle}>
                      <SelectTrigger id="playstyle" className="bg-black/40 border-yellow-500/20">
                        <SelectValue placeholder="Select your playstyle" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-yellow-500/20">
                        <SelectItem value="gyro-aggressive">Gyro - Aggressive</SelectItem>
                        <SelectItem value="gyro-sniper">Gyro - Sniper</SelectItem>
                        <SelectItem value="non-gyro-aggressive">Non-Gyro - Aggressive</SelectItem>
                        <SelectItem value="non-gyro-sniper">Non-Gyro - Sniper</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="skill">Skill Level</Label>
                    <RadioGroup value={skillLevel} onValueChange={setSkillLevel} className="flex space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="beginner" id="beginner" className="border-yellow-500 text-yellow-500" />
                        <Label htmlFor="beginner" className="text-gray-300">
                          Beginner
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="intermediate"
                          id="intermediate"
                          className="border-yellow-500 text-yellow-500"
                        />
                        <Label htmlFor="intermediate" className="text-gray-300">
                          Intermediate
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="advanced" id="advanced" className="border-yellow-500 text-yellow-500" />
                        <Label htmlFor="advanced" className="text-gray-300">
                          Advanced
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label>Pro Player Configuration</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer transition-all",
                          proPlayer === "Jonathan"
                            ? "border-yellow-500 bg-yellow-500/10"
                            : "border-gray-700 hover:border-yellow-500/50",
                        )}
                        onClick={() => setProPlayer("Jonathan")}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image src="/jonathan.png" alt="Jonathan" fill className="object-cover" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">Jonathan</h3>
                            <p className="text-xs text-gray-400">4-finger claw specialist</p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer transition-all",
                          proPlayer === "Scout"
                            ? "border-yellow-500 bg-yellow-500/10"
                            : "border-gray-700 hover:border-yellow-500/50",
                        )}
                        onClick={() => setProPlayer("Scout")}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image src="/scout.png" alt="Scout" fill className="object-cover" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">Scout</h3>
                            <p className="text-xs text-gray-400">Gyro & sniper expert</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className="flex items-center text-xs text-gray-500">
              <Info className="h-3 w-3 mr-1" />
              <span>All settings are based on pro player configurations</span>
            </div>
            <Button
              onClick={handleGenerateSettings}
              disabled={!device || !playstyle || !skillLevel || !proPlayer}
              className="bg-yellow-500 text-black hover:bg-yellow-600"
            >
              Generate Settings
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="settings" className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="settings">Recommended Settings</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
              <TabsTrigger value="instructions">How to Apply</TabsTrigger>
            </TabsList>

            <TabsContent value="settings">
              <SettingsDisplay
                settings={optimizedSettings}
                device={device}
                proPlayer={proPlayer}
                playstyle={playstyle}
              />
            </TabsContent>

            <TabsContent value="comparison">
              <SettingsComparison
                optimizedSettings={optimizedSettings}
                originalSettings={proPlayerSettings[proPlayer as keyof typeof proPlayerSettings]}
                proPlayer={proPlayer}
              />
            </TabsContent>

            <TabsContent value="instructions">
              <SettingsInstructions settings={optimizedSettings} device={device} />
            </TabsContent>
          </Tabs>

          <div className="mt-8 flex justify-center gap-4">
            <Button
              onClick={resetForm}
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10"
            >
              Create New Settings
            </Button>
            <Link href="/">
              <Button variant="outline" className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className="mt-12 text-center text-xs text-gray-500">
        <p>Take 15-minute breaks every hour of gameplay. BGMI recommended for ages 16+.</p>
        <p className="mt-1">© 2025 BGMI Settings Advisor. Not affiliated with KRAFTON, Inc.</p>
      </div>
    </div>
  )
}

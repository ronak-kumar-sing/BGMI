"use client"

import { useState, useMemo } from "react"
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

  // Generate device options from device optimizations data
  const deviceOptions = useMemo(() => {
    const groupedDevices: Record<string, string[]> = {};

    const manufacturers = [
      "iPhone", "iPad", "Samsung", "OnePlus", "Xiaomi", "Redmi", "Poco",
      "Realme", "iQOO", "Vivo", "Oppo", "Google", "Asus", "ROG", "Motorola",
      "Lava", "Micromax", "Tecno", "Infinix", "Nothing"
    ];

    Object.keys(deviceOptimizations).forEach(device => {
      if (device === "Android") return;

      const isManufacturer = manufacturers.some(m => device === m);

      if (isManufacturer) {
        if (!groupedDevices[device]) {
          groupedDevices[device] = [];
        }
      } else {
        let manufacturer = "Other";
        for (const m of manufacturers) {
          if (device.includes(m)) {
            manufacturer = m;
            break;
          }
        }

        if (!groupedDevices[manufacturer]) {
          groupedDevices[manufacturer] = [];
        }

        groupedDevices[manufacturer].push(device);
      }
    });

    return groupedDevices;
  }, []);

  const handleGenerateSettings = () => {
    const baseSettings = { ...proPlayerSettings[proPlayer as keyof typeof proPlayerSettings] }

    const deviceType = getDeviceType(device)
    const optimizations = deviceOptimizations[deviceType as keyof typeof deviceOptimizations] ||
      deviceOptimizations["Android"]

    const adjustedSettings = applyPlaystyleAdjustments(baseSettings, playstyle, skillLevel)

    const finalSettings = {
      ...adjustedSettings,
      optimizationTips: optimizations,
      deviceModel: device,
      deviceType: deviceType,
      sensitivityCode: generateSettingsCode(adjustedSettings, device),
    }

    setOptimizedSettings(finalSettings)
    setShowResults(true)
  }

  const getDeviceType = (deviceName: string) => {
    if (deviceName in deviceOptimizations) {
      return deviceName;
    }

    if (deviceName.includes("iPhone")) return "iPhone";
    if (deviceName.includes("iPad")) return "iPad";

    if (deviceName.includes("Samsung")) return "Samsung";
    if (deviceName.includes("OnePlus")) return "OnePlus";
    if (deviceName.includes("Xiaomi")) return "Xiaomi";
    if (deviceName.includes("Redmi")) return "Redmi" in deviceOptimizations ? "Redmi" : "Xiaomi";
    if (deviceName.includes("Poco")) return "Poco";
    if (deviceName.includes("Realme")) return "Realme";
    if (deviceName.includes("iQOO")) return "iQOO";
    if (deviceName.includes("Vivo")) return "Vivo";
    if (deviceName.includes("Oppo")) return "Oppo";
    if (deviceName.includes("Google") || deviceName.includes("Pixel")) return "Google";
    if (deviceName.includes("Asus") || deviceName.includes("ROG")) return "Asus";
    if (deviceName.includes("Motorola")) return "Motorola";
    if (deviceName.includes("Lava")) return "Lava";
    if (deviceName.includes("Micromax")) return "Micromax";
    if (deviceName.includes("Tecno")) return "Tecno";
    if (deviceName.includes("Infinix")) return "Infinix";
    if (deviceName.includes("Nothing")) return "Nothing";

    return "Android";
  }

  const applyPlaystyleAdjustments = (settings: any, playstyle: string, skillLevel: string) => {
    const adjusted = { ...settings }

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

    if (skillLevel === "beginner") {
      Object.keys(adjusted).forEach((key) => {
        if (key.includes("ADS_") || key.includes("gyro_")) {
          const value = Number.parseInt(adjusted[key])
          if (!isNaN(value)) {
            adjusted[key] = Math.max(value - 10, 1) + "%"
          }
        }
      })
    } else if (skillLevel === "advanced") {
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
    <div className="container mx-auto px-4 py-6 md:py-12">
      <div className="flex flex-col items-center justify-center mb-6 md:mb-8">
        <div className="relative w-12 h-12 md:w-16 md:h-16 mb-3 md:mb-4">
          <Image src="/bgmi-logo.png" alt="BGMI Logo" width={64} height={64} className="object-contain" />
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">
          BGMI Settings <span className="text-yellow-500">Sani</span>
        </h1>
        <p className="text-sm md:text-base text-gray-400 mt-2 text-center max-w-2xl px-4">
          Get personalized sensitivity settings based on pro-player configurations, optimized for your device and
          playstyle.
        </p>
      </div>

      {!showResults ? (
        <Card className="max-w-3xl mx-auto bg-black/60 border-yellow-500/20">
          <CardHeader className="px-4 py-4 md:px-6 md:py-6">
            <CardTitle className="text-lg md:text-xl text-white">Customise Sensitivity, According To Players</CardTitle>
            <CardDescription className="text-sm">Fill in the details below to get personalized BGMI sensitivity settings</CardDescription>
          </CardHeader>
          <CardContent className="px-4 pb-2 md:px-6">
            <Tabs defaultValue="form" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4 md:mb-6">
                <TabsTrigger value="form">Form Input</TabsTrigger>
                <TabsTrigger value="screenshot" disabled>
                  <Upload className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
                  <span className="hidden xs:inline">Screenshot</span>
                </TabsTrigger>
                <TabsTrigger value="voice" disabled>
                  <Mic className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
                  <span className="hidden xs:inline">Voice</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="form" className="space-y-4 md:space-y-6">
                <div className="space-y-3 md:space-y-4">
                  <div>
                    <Label htmlFor="device" className="text-sm md:text-base mb-1">Device Model</Label>
                    <Select value={device} onValueChange={setDevice}>
                      <SelectTrigger id="device" className="bg-black/40 border-yellow-500/20 h-9 md:h-10 text-sm md:text-base">
                        <SelectValue placeholder="Select your device" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-yellow-500/20 max-h-[50vh] md:max-h-[300px]">
                        {Object.entries(deviceOptions).map(([manufacturer, devices]) => (
                          <div key={manufacturer}>
                            <SelectItem value={`${manufacturer}-header`} disabled className="font-bold text-yellow-500 text-xs md:text-sm">
                              {manufacturer}
                            </SelectItem>

                            {manufacturer === "iPhone" && (
                              <>
                                <SelectItem value="iPhone 15 Pro Max">iPhone 15 Pro Max</SelectItem>
                                <SelectItem value="iPhone 15 Pro">iPhone 15 Pro</SelectItem>
                                <SelectItem value="iPhone 15">iPhone 15</SelectItem>
                                <SelectItem value="iPhone 14 Pro Max">iPhone 14 Pro Max</SelectItem>
                                <SelectItem value="iPhone 14 Pro">iPhone 14 Pro</SelectItem>
                                <SelectItem value="iPhone 14">iPhone 14</SelectItem>
                                <SelectItem value="iPhone 13 Pro Max">iPhone 13 Pro Max</SelectItem>
                                <SelectItem value="iPhone 13 Pro">iPhone 13 Pro</SelectItem>
                                <SelectItem value="iPhone 13">iPhone 13</SelectItem>
                              </>
                            )}

                            {manufacturer === "iPad" && (
                              <>
                                <SelectItem value="iPad Pro M2">iPad Pro M2</SelectItem>
                                <SelectItem value="iPad Air">iPad Air</SelectItem>
                              </>
                            )}

                            {manufacturer !== "iPhone" && manufacturer !== "iPad" &&
                              devices.map(device => {
                                const displayName = device.replace(manufacturer, '').trim();
                                return (
                                  <SelectItem key={device} value={device} className="text-xs md:text-sm">
                                    {displayName.length > 0 ? displayName : device}
                                  </SelectItem>
                                );
                              })
                            }
                          </div>
                        ))}

                        <SelectItem value="Android" className="mt-2 border-t border-gray-800 pt-2 text-xs md:text-sm">
                          Android (Generic)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="playstyle" className="text-sm md:text-base mb-1">Playstyle</Label>
                    <Select value={playstyle} onValueChange={setPlaystyle}>
                      <SelectTrigger id="playstyle" className="bg-black/40 border-yellow-500/20 h-9 md:h-10 text-sm md:text-base">
                        <SelectValue placeholder="Select your playstyle" />
                      </SelectTrigger>
                      <SelectContent className="bg-black border-yellow-500/20">
                        <SelectItem value="gyro-aggressive" className="text-xs md:text-sm">Gyro - Aggressive</SelectItem>
                        <SelectItem value="gyro-sniper" className="text-xs md:text-sm">Gyro - Sniper</SelectItem>
                        <SelectItem value="non-gyro-aggressive" className="text-xs md:text-sm">Non-Gyro - Aggressive</SelectItem>
                        <SelectItem value="non-gyro-sniper" className="text-xs md:text-sm">Non-Gyro - Sniper</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="skill" className="text-sm md:text-base mb-1">Skill Level</Label>
                    <RadioGroup value={skillLevel} onValueChange={setSkillLevel} className="flex flex-wrap gap-3 sm:gap-4 mt-1 md:mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="beginner" id="beginner" className="border-yellow-500 text-yellow-500" />
                        <Label htmlFor="beginner" className="text-xs md:text-sm text-gray-300">
                          Beginner
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="intermediate"
                          id="intermediate"
                          className="border-yellow-500 text-yellow-500"
                        />
                        <Label htmlFor="intermediate" className="text-xs md:text-sm text-gray-300">
                          Intermediate
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="advanced" id="advanced" className="border-yellow-500 text-yellow-500" />
                        <Label htmlFor="advanced" className="text-xs md:text-sm text-gray-300">
                          Advanced
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-sm md:text-base mb-1">Pro Player Configuration</Label>
                    <div className="relative mt-2 md:mt-4">
                      <div className="flex flex-row flex-nowrap gap-1 md:gap-2 overflow-x-auto scrollbar-thin scrollbar-thumb-yellow-500/60 scrollbar-track-black/30 py-2 px-1 bg-black/40 rounded-lg">
                        {Object.entries(proPlayerSettings).map(([name, player]) => (
                          <button
                            type="button"
                            key={name}
                            className={cn(
                              "whitespace-nowrap px-2 py-1 md:px-4 md:py-2 rounded-full border-2 font-semibold text-xs md:text-sm transition-all focus:outline-none",
                              proPlayer === name
                                ? "border-yellow-500 bg-yellow-500/20 text-yellow-300 shadow scale-105 ring-2 ring-yellow-400"
                                : "border-gray-700 text-white hover:border-yellow-500/50 hover:text-yellow-400 hover:bg-yellow-900/10"
                            )}
                            onClick={() => setProPlayer(name)}
                            tabIndex={0}
                            aria-label={`Select pro player ${name}`}
                          >
                            {name}
                          </button>
                        ))}
                      </div>
                      <div className="text-xs text-gray-400 mt-1 md:mt-2 text-center">Scroll to see more pro players</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-3 px-4 py-4 md:px-6 md:py-6">
            <div className="flex items-center text-xs text-gray-500 text-center sm:text-left">
              <Info className="h-3 w-3 mr-1 hidden sm:inline" />
              <span>All settings are based on pro player configurations</span>
            </div>
            <Button
              onClick={handleGenerateSettings}
              disabled={!device || !playstyle || !skillLevel || !proPlayer}
              className="bg-yellow-500 text-black hover:bg-yellow-600 w-full sm:w-auto text-sm"
            >
              Generate Settings
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="settings" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4 md:mb-6">
              <TabsTrigger value="settings" className="text-xs md:text-sm">Recommended</TabsTrigger>
              <TabsTrigger value="comparison" className="text-xs md:text-sm">Comparison</TabsTrigger>
              <TabsTrigger value="instructions" className="text-xs md:text-sm">How to Apply</TabsTrigger>
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

          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4">
            <Button
              onClick={resetForm}
              variant="outline"
              className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 w-full sm:w-auto text-sm"
            >
              Create New Settings
            </Button>
            <Link href="/" className="w-full sm:w-auto">
              <Button
                variant="outline"
                className="border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 w-full text-sm"
              >
                <ArrowLeft className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      )}

      <div className="mt-8 md:mt-12 text-center text-xs text-gray-500 px-4">
        <p>Take 15-minute breaks every hour of gameplay. BGMI recommended for ages 16+.</p>
        <p className="mt-1">© 2025 BGMI Settings Advisor. Not affiliated with KRAFTON, Inc.</p>
      </div>
    </div>
  )
}

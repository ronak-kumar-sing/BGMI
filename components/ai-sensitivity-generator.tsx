"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"
import {
  Loader2,
  Copy,
  ArrowLeft,
  Sparkles,
  Download,
  Share2,
  Info,
  Smartphone,
  Gamepad2,
  Compass,
  Zap,
  Cpu,
  Wifi,
  Target,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Define the structure for sensitivity settings
interface SensitivitySettings {
  camera: {
    freeLook: number
    noScope: number
    redDot: number
    twoX: number
    threeX: number
    fourX: number
    sixX: number
    eightX: number
  }
  ads: {
    noScope: number
    redDot: number
    twoX: number
    threeX: number
    fourX: number
    sixX: number
    eightX: number
  }
  gyro?: {
    freeLook: number
    noScope: number
    redDot: number
    twoX: number
    threeX: number
    fourX: number
    sixX: number
    eightX: number
  }
  gyroAds?: {
    noScope: number
    redDot: number
    twoX: number
    threeX: number
    fourX: number
    sixX: number
    eightX: number
  }
  sensitivityCode?: string
}

// Sample presets for quick selection
const PRESETS = {
  "iPhone Pro Max - Aggressive": {
    device: "iPhone 15 Pro Max, 8GB RAM, 120Hz",
    playStyle: "aggressive",
    controlSetup: "4-finger",
    gyroscopeUsage: "always-on",
  },
  "Samsung S23 - Sniper": {
    device: "Samsung Galaxy S23 Ultra, 12GB RAM, 120Hz",
    playStyle: "sniper",
    controlSetup: "6-finger",
    gyroscopeUsage: "scope-on",
  },
  "Mid-range Android - Balanced": {
    device: "Redmi Note 12 Pro, 8GB RAM, 90Hz",
    playStyle: "balanced",
    controlSetup: "3-finger",
    gyroscopeUsage: "off",
  },
}

export function AISensitivityGenerator() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [settings, setSettings] = useState<SensitivitySettings | null>(null)
  const [promptType, setPromptType] = useState<"simple" | "technical">("simple")
  const [activeStep, setActiveStep] = useState(1)
  const [copySuccess, setCopySuccess] = useState<string | null>(null)
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false)
  const [presetApplied, setPresetApplied] = useState(false)

  // Form state
  const [device, setDevice] = useState("")
  const [playStyle, setPlayStyle] = useState("")
  const [controlSetup, setControlSetup] = useState("")
  const [gyroscopeUsage, setGyroscopeUsage] = useState("")
  const [currentSettings, setCurrentSettings] = useState("")
  const [gameplayIssues, setGameplayIssues] = useState("")
  const [fpsAndPing, setFpsAndPing] = useState("")
  const [preferredScopesWeapons, setPreferredScopesWeapons] = useState("")

  // Progress tracking
  const totalSteps = 3
  const progress = activeStep === 1 ? 33 : activeStep === 2 ? 66 : 100

  // Apply preset configuration
  const applyPreset = (presetName: keyof typeof PRESETS) => {
    const preset = PRESETS[presetName]
    setDevice(preset.device)
    setPlayStyle(preset.playStyle)
    setControlSetup(preset.controlSetup)
    setGyroscopeUsage(preset.gyroscopeUsage)
    setPresetApplied(true)

    toast({
      title: "Preset Applied",
      description: `Applied the ${presetName} preset configuration.`,
      duration: 3000,
    })
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResult(null)
    setSettings(null)

    try {
      const userInfo = {
        device,
        playStyle,
        controlSetup,
        gyroscopeUsage,
        currentSettings,
        gameplayIssues,
        fpsAndPing,
        preferredScopesWeapons,
      }

      const response = await fetch("/api/gemini/sensitivity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInfo,
          promptType,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate sensitivity settings")
      }

      const data = await response.json()
      setResult(data.result)
      setSettings(data.settings)
      setActiveStep(3)

      // Show success toast
      toast({
        title: "Settings Generated",
        description: "Your AI-optimized sensitivity settings are ready!",
        duration: 5000,
      })
    } catch (error) {
      console.error("Error generating sensitivity settings:", error)
      setResult("Error generating sensitivity settings. Please try again.")

      // Show error toast
      toast({
        title: "Generation Failed",
        description: "There was an error generating your settings. Please try again.",
        variant: "destructive",
        duration: 5000,
      })
    } finally {
      setLoading(false)
    }
  }

  // Copy to clipboard with visual feedback
  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopySuccess(type)

    // Show toast notification
    toast({
      title: "Copied to Clipboard",
      description: `${type} has been copied to your clipboard.`,
      duration: 3000,
    })

    setTimeout(() => setCopySuccess(null), 2000)
  }

  // Generate and download settings image
  const generateSensitivityImage = () => {
    // In a real implementation, this would generate an image of the settings
    // For now, we'll just copy the settings as text and show a toast
    if (settings) {
      const settingsText = JSON.stringify(settings, null, 2)
      copyToClipboard(settingsText, "Settings")

      toast({
        title: "Image Download",
        description: "This feature would download an image of your settings in a real implementation.",
        duration: 3000,
      })
    }
  }

  // Share settings
  const shareSettings = () => {
    if (settings?.sensitivityCode) {
      // In a real implementation, this would open a share dialog
      copyToClipboard(settings.sensitivityCode, "Sensitivity Code")

      toast({
        title: "Share Settings",
        description: "This feature would open a share dialog in a real implementation.",
        duration: 3000,
      })
    }
  }

  // Reset form and start over
  const resetForm = () => {
    setActiveStep(1)
    setSettings(null)
    setResult(null)
    if (presetApplied) {
      setDevice("")
      setPlayStyle("")
      setControlSetup("")
      setGyroscopeUsage("")
      setPresetApplied(false)
    }
    setCurrentSettings("")
    setGameplayIssues("")
    setFpsAndPing("")
    setPreferredScopesWeapons("")
  }

  // Render sensitivity bar with value
  const renderSensitivityBar = (value: number, max = 100) => {
    const percentage = (value / max) * 100
    return (
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-12">
      {/* Header */}
      <div className="flex flex-col items-center justify-center mb-6 md:mb-8">
        <div className="relative w-14 h-14 md:w-16 md:h-16 mb-3 md:mb-4">
          <Image src="/bgmi-logo.png" alt="BGMI Logo" width={64} height={64} className="object-contain" />
        </div>
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center">
          AI Sensitivity <span className="text-yellow-500">Generator</span>
        </h1>
        <p className="text-gray-400 mt-2 text-center text-sm md:text-base max-w-2xl px-2">
          Get AI-optimized sensitivity settings tailored to your device, playstyle, and preferences using Gemini 2.0
          Flash.
        </p>

        {/* Progress bar (only show during form steps) */}
        {activeStep < 3 && (
          <div className="w-full max-w-md mt-6 md:mt-8 px-2">
            <div className="flex justify-between mb-2">
              <span className="text-xs md:text-sm text-gray-400">
                Step {activeStep} of {totalSteps}
              </span>
              <span className="text-xs md:text-sm text-gray-400">{progress}% Complete</span>
            </div>
            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Step 1: Basic Information Form */}
      {activeStep === 1 && !settings && (
        <Card className="max-w-3xl mx-auto bg-black/60 border-yellow-500/20">
          <CardHeader className="px-4 md:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle className="text-white flex items-center text-lg md:text-xl">
                  <Smartphone className="mr-2 h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                  Device & Playstyle Information
                </CardTitle>
                <CardDescription className="text-xs md:text-sm">Tell us about your device and how you play BGMI</CardDescription>
              </div>
              <div className="flex flex-wrap gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 text-xs md:text-sm h-8"
                        onClick={() => applyPreset("iPhone Pro Max - Aggressive")}
                      >
                        iPhone
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Apply iPhone Pro Max preset (Aggressive)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 text-xs md:text-sm h-8"
                        onClick={() => applyPreset("Samsung S23 - Sniper")}
                      >
                        Samsung
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Apply Samsung S23 Ultra preset (Sniper)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 text-xs md:text-sm h-8"
                        onClick={() => applyPreset("Mid-range Android - Balanced")}
                      >
                        Android
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-xs">Apply mid-range Android preset (Balanced)</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 md:px-6">
            <form className="space-y-4 md:space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="device" className="flex items-center">
                    <Smartphone className="h-4 w-4 mr-2 text-yellow-500" />
                    Device Model
                  </Label>
                  <Input
                    id="device"
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                    placeholder="e.g., Samsung Galaxy S23 Ultra, 12GB RAM, 120Hz"
                    className="bg-black/40 border-yellow-500/20 mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="playStyle" className="flex items-center">
                    <Gamepad2 className="h-4 w-4 mr-2 text-yellow-500" />
                    Playing Style
                  </Label>
                  <Select value={playStyle} onValueChange={setPlayStyle}>
                    <SelectTrigger id="playStyle" className="bg-black/40 border-yellow-500/20 mt-1">
                      <SelectValue placeholder="Select your playing style" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-yellow-500/20">
                      <SelectItem value="aggressive">
                        <div className="flex items-center">
                          <span className="bg-red-500/20 text-red-500 p-1 rounded-full mr-2">
                            <Zap className="h-3 w-3" />
                          </span>
                          Aggressive Rusher
                        </div>
                      </SelectItem>
                      <SelectItem value="sniper">
                        <div className="flex items-center">
                          <span className="bg-blue-500/20 text-blue-500 p-1 rounded-full mr-2">
                            <Target className="h-3 w-3" />
                          </span>
                          Sniper/Long-range
                        </div>
                      </SelectItem>
                      <SelectItem value="balanced">
                        <div className="flex items-center">
                          <span className="bg-green-500/20 text-green-500 p-1 rounded-full mr-2">
                            <Compass className="h-3 w-3" />
                          </span>
                          Balanced
                        </div>
                      </SelectItem>
                      <SelectItem value="close-range">
                        <div className="flex items-center">
                          <span className="bg-orange-500/20 text-orange-500 p-1 rounded-full mr-2">
                            <Zap className="h-3 w-3" />
                          </span>
                          Close-range Combat
                        </div>
                      </SelectItem>
                      <SelectItem value="support">
                        <div className="flex items-center">
                          <span className="bg-purple-500/20 text-purple-500 p-1 rounded-full mr-2">
                            <Compass className="h-3 w-3" />
                          </span>
                          Support/Tactical
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="controlSetup" className="flex items-center">
                    <Gamepad2 className="h-4 w-4 mr-2 text-yellow-500" />
                    Control Setup
                  </Label>
                  <Select value={controlSetup} onValueChange={setControlSetup}>
                    <SelectTrigger id="controlSetup" className="bg-black/40 border-yellow-500/20 mt-1">
                      <SelectValue placeholder="Select your control setup" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-yellow-500/20">
                      <SelectItem value="2-finger">2-Finger (Thumbs)</SelectItem>
                      <SelectItem value="3-finger">3-Finger</SelectItem>
                      <SelectItem value="4-finger">4-Finger Claw</SelectItem>
                      <SelectItem value="5-finger">5-Finger</SelectItem>
                      <SelectItem value="6-finger">6-Finger</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="gyroscopeUsage" className="flex items-center">
                    <Smartphone className="h-4 w-4 mr-2 text-yellow-500" />
                    Gyroscope Usage
                  </Label>
                  <Select value={gyroscopeUsage} onValueChange={setGyroscopeUsage}>
                    <SelectTrigger id="gyroscopeUsage" className="bg-black/40 border-yellow-500/20 mt-1">
                      <SelectValue placeholder="Select your gyroscope usage" />
                    </SelectTrigger>
                    <SelectContent className="bg-black border-yellow-500/20">
                      <SelectItem value="always-on">Always On</SelectItem>
                      <SelectItem value="scope-on">Scope On</SelectItem>
                      <SelectItem value="off">Off</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-2">
                <Button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  disabled={!device || !playStyle || !controlSetup || !gyroscopeUsage}
                  className="w-full bg-yellow-500 text-black hover:bg-yellow-600 text-sm md:text-base"
                >
                  Continue
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Advanced Options */}
      {activeStep === 2 && !settings && (
        <Card className="max-w-3xl mx-auto bg-black/60 border-yellow-500/20">
          <CardHeader className="px-4 md:px-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <CardTitle className="text-white flex items-center text-lg md:text-xl">
                  <Cpu className="mr-2 h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                  Advanced Options
                </CardTitle>
                <CardDescription className="text-xs md:text-sm">Provide additional details for more accurate settings (optional)</CardDescription>
              </div>
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                  className="text-yellow-500 text-xs md:text-sm h-8"
                >
                  {showAdvancedOptions ? (
                    <>
                      <ChevronUp className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                      Hide Advanced
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                      Show Advanced
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="px-4 md:px-6">
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="promptType" className="flex items-center">
                    <Info className="h-4 w-4 mr-2 text-yellow-500" />
                    AI Analysis Depth
                  </Label>
                  <RadioGroup
                    value={promptType}
                    onValueChange={(value) => setPromptType(value as "simple" | "technical")}
                    className="flex space-x-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="simple" id="simple" className="border-yellow-500 text-yellow-500" />
                      <Label htmlFor="simple" className="text-gray-300">
                        Simple
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="technical" id="technical" className="border-yellow-500 text-yellow-500" />
                      <Label htmlFor="technical" className="text-gray-300">
                        Technical (Detailed)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label htmlFor="currentSettings" className="flex items-center">
                    <Gamepad2 className="h-4 w-4 mr-2 text-yellow-500" />
                    Current Sensitivity Settings (Optional)
                  </Label>
                  <Textarea
                    id="currentSettings"
                    value={currentSettings}
                    onChange={(e) => setCurrentSettings(e.target.value)}
                    placeholder="Enter your current sensitivity values or sensitivity code (e.g., 1-7416-1924-8623-4658-451)"
                    className="bg-black/40 border-yellow-500/20 min-h-[80px] mt-1"
                  />
                </div>

                {showAdvancedOptions && (
                  <>
                    <div className="pt-2">
                      <Label htmlFor="gameplayIssues" className="flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-yellow-500" />
                        Gameplay Issues (Optional)
                      </Label>
                      <Textarea
                        id="gameplayIssues"
                        value={gameplayIssues}
                        onChange={(e) => setGameplayIssues(e.target.value)}
                        placeholder="e.g., aim drift, unstable recoil, difficulty with 3x/6x scopes, lag in close combat"
                        className="bg-black/40 border-yellow-500/20 min-h-[80px] mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="fpsAndPing" className="flex items-center">
                        <Wifi className="h-4 w-4 mr-2 text-yellow-500" />
                        FPS and Ping (Optional)
                      </Label>
                      <Input
                        id="fpsAndPing"
                        value={fpsAndPing}
                        onChange={(e) => setFpsAndPing(e.target.value)}
                        placeholder="e.g., 45 FPS, 178 ping"
                        className="bg-black/40 border-yellow-500/20 mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="preferredScopesWeapons" className="flex items-center">
                        <Target className="h-4 w-4 mr-2 text-yellow-500" />
                        Preferred Scopes/Weapons (Optional)
                      </Label>
                      <Textarea
                        id="preferredScopesWeapons"
                        value={preferredScopesWeapons}
                        onChange={(e) => setPreferredScopesWeapons(e.target.value)}
                        placeholder="e.g., prefer Red Dot, 3x, 6x, SMGs, ARs, snipers"
                        className="bg-black/40 border-yellow-500/20 min-h-[80px] mt-1"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveStep(1)}
                  className="w-full sm:flex-1 border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 text-sm md:text-base"
                >
                  <ArrowLeft className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:flex-1 bg-yellow-500 text-black hover:bg-yellow-600 text-sm md:text-base"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-3 w-3 md:h-4 md:w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                      Generate Settings
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Results */}
      {settings && (
        <div className="max-w-4xl mx-auto">
          <Card className="bg-black/60 border-yellow-500/20">
            <CardHeader className="px-4 md:px-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle className="text-white flex items-center text-lg md:text-xl">
                    <Sparkles className="mr-2 h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
                    AI-Generated Sensitivity Settings
                  </CardTitle>
                  <CardDescription className="text-xs md:text-sm">
                    Optimized for {device} with {playStyle} playstyle
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(JSON.stringify(settings, null, 2), "All Values")}
                          className={cn(
                            "border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 h-8",
                            copySuccess === "All Values" && "bg-green-500/20 border-green-500 text-green-500",
                          )}
                        >
                          {copySuccess === "All Values" ? (
                            <CheckCircle className="h-3 w-3 md:h-4 md:w-4" />
                          ) : (
                            <Copy className="h-3 w-3 md:h-4 md:w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Copy all values</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {settings.sensitivityCode && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(settings.sensitivityCode || "", "Sensitivity Code")}
                            className={cn(
                              "border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 h-8",
                              copySuccess === "Sensitivity Code" && "bg-green-500/20 border-green-500 text-green-500",
                            )}
                          >
                            {copySuccess === "Sensitivity Code" ? (
                              <CheckCircle className="h-3 w-3 md:h-4 md:w-4" />
                            ) : (
                              <Copy className="h-3 w-3 md:h-4 md:w-4" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">Copy sensitivity code</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={generateSensitivityImage}
                          className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 h-8"
                        >
                          <Download className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Save as image</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={shareSettings}
                          className="border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 h-8"
                        >
                          <Share2 className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">Share settings</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-2 md:px-6">
              <Tabs defaultValue="visual" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4">
                  <TabsTrigger value="visual" className="text-xs md:text-sm">Visual Settings</TabsTrigger>
                  <TabsTrigger value="explanation" className="text-xs md:text-sm">Explanation</TabsTrigger>
                </TabsList>
                <TabsContent value="visual" className="space-y-4">
                  {/* Sensitivity Code (if available) */}
                  {settings.sensitivityCode && (
                    <Card className="bg-gradient-to-r from-yellow-500/10 to-amber-500/5 border-yellow-500/30">
                      <CardHeader className="pb-2 px-3 md:px-6">
                        <CardTitle className="text-base md:text-lg text-yellow-500 flex items-center">
                          <Sparkles className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                          Sensitivity Code
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="px-3 md:px-6">
                        <div className="flex items-center justify-between bg-black/60 p-2 md:p-3 rounded-md overflow-x-auto">
                          <code className="text-white font-mono text-xs md:text-sm whitespace-nowrap pr-2">{settings.sensitivityCode}</code>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => copyToClipboard(settings.sensitivityCode || "", "Sensitivity Code")}
                            className={cn(
                              "border-yellow-500/50 text-yellow-500 hover:bg-yellow-500/10 flex-shrink-0 ml-2",
                              copySuccess === "Sensitivity Code" && "bg-green-500/20 border-green-500 text-green-500",
                            )}
                          >
                            {copySuccess === "Sensitivity Code" ? (
                              <CheckCircle className="h-3 w-3 md:h-4 md:w-4" />
                            ) : (
                              <Copy className="h-3 w-3 md:h-4 md:w-4" />
                            )}
                          </Button>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">
                          Copy this code and import it in BGMI: Settings &gt; Sensitivity &gt; Import Code
                        </p>
                      </CardContent>
                    </Card>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Camera Sensitivity */}
                    <Card className="bg-black/40 border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
                      <CardHeader className="pb-2 px-3 md:px-6">
                        <CardTitle className="text-base md:text-lg text-yellow-500">Camera Sensitivity</CardTitle>
                      </CardHeader>
                      <CardContent className="px-3 md:px-6">
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">Free Look</span>
                              <span className="font-bold text-white">{settings.camera.freeLook}%</span>
                            </div>
                            {renderSensitivityBar(settings.camera.freeLook)}
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">No Scope</span>
                              <span className="font-bold text-white">{settings.camera.noScope}%</span>
                            </div>
                            {renderSensitivityBar(settings.camera.noScope)}
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">Red Dot</span>
                              <span className="font-bold text-white">{settings.camera.redDot}%</span>
                            </div>
                            {renderSensitivityBar(settings.camera.redDot)}
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">2x Scope</span>
                              <span className="font-bold text-white">{settings.camera.twoX}%</span>
                            </div>
                            {renderSensitivityBar(settings.camera.twoX)}
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">3x Scope</span>
                              <span className="font-bold text-white">{settings.camera.threeX}%</span>
                            </div>
                            {renderSensitivityBar(settings.camera.threeX)}
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">4x Scope</span>
                              <span className="font-bold text-white">{settings.camera.fourX}%</span>
                            </div>
                            {renderSensitivityBar(settings.camera.fourX)}
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">6x Scope</span>
                              <span className="font-bold text-white">{settings.camera.sixX}%</span>
                            </div>
                            {renderSensitivityBar(settings.camera.sixX)}
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">8x Scope</span>
                              <span className="font-bold text-white">{settings.camera.eightX}%</span>
                            </div>
                            {renderSensitivityBar(settings.camera.eightX)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* ADS Sensitivity */}
                    <Card className="bg-black/40 border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
                      <CardHeader className="pb-2 px-3 md:px-6">
                        <CardTitle className="text-base md:text-lg text-yellow-500">ADS Sensitivity</CardTitle>
                      </CardHeader>
                      <CardContent className="px-3 md:px-6">
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">No Scope</span>
                              <span className="font-bold text-white">{settings.ads.noScope}%</span>
                            </div>
                            {renderSensitivityBar(settings.ads.noScope)}
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">Red Dot</span>
                              <span className="font-bold text-white">{settings.ads.redDot}%</span>
                            </div>
                            {renderSensitivityBar(settings.ads.redDot)}
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">2x Scope</span>
                              <span className="font-bold text-white">{settings.ads.twoX}%</span>
                            </div>
                            {renderSensitivityBar(settings.ads.twoX)}
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">3x Scope</span>
                              <span className="font-bold text-white">{settings.ads.threeX}%</span>
                            </div>
                            {renderSensitivityBar(settings.ads.threeX)}
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">4x Scope</span>
                              <span className="font-bold text-white">{settings.ads.fourX}%</span>
                            </div>
                            {renderSensitivityBar(settings.ads.fourX)}
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">6x Scope</span>
                              <span className="font-bold text-white">{settings.ads.sixX}%</span>
                            </div>
                            {renderSensitivityBar(settings.ads.sixX)}
                          </div>
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-gray-300">8x Scope</span>
                              <span className="font-bold text-white">{settings.ads.eightX}%</span>
                            </div>
                            {renderSensitivityBar(settings.ads.eightX)}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Gyroscope Sensitivity (if applicable) */}
                    {settings.gyro && (
                      <Card className="bg-black/40 border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
                        <CardHeader className="pb-2 px-3 md:px-6">
                          <CardTitle className="text-base md:text-lg text-yellow-500">Gyroscope Sensitivity</CardTitle>
                        </CardHeader>
                        <CardContent className="px-3 md:px-6">
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-300">Free Look</span>
                                <span className="font-bold text-white">{settings.gyro.freeLook}%</span>
                              </div>
                              {renderSensitivityBar(settings.gyro.freeLook, 400)}
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-300">No Scope</span>
                                <span className="font-bold text-white">{settings.gyro.noScope}%</span>
                              </div>
                              {renderSensitivityBar(settings.gyro.noScope, 400)}
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-300">Red Dot</span>
                                <span className="font-bold text-white">{settings.gyro.redDot}%</span>
                              </div>
                              {renderSensitivityBar(settings.gyro.redDot, 400)}
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-300">2x Scope</span>
                                <span className="font-bold text-white">{settings.gyro.twoX}%</span>
                              </div>
                              {renderSensitivityBar(settings.gyro.twoX, 400)}
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-300">3x Scope</span>
                                <span className="font-bold text-white">{settings.gyro.threeX}%</span>
                              </div>
                              {renderSensitivityBar(settings.gyro.threeX, 400)}
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-300">4x Scope</span>
                                <span className="font-bold text-white">{settings.gyro.fourX}%</span>
                              </div>
                              {renderSensitivityBar(settings.gyro.fourX, 400)}
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-300">6x Scope</span>
                                <span className="font-bold text-white">{settings.gyro.sixX}%</span>
                              </div>
                              {renderSensitivityBar(settings.gyro.sixX, 400)}
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-300">8x Scope</span>
                                <span className="font-bold text-white">{settings.gyro.eightX}%</span>
                              </div>
                              {renderSensitivityBar(settings.gyro.eightX, 400)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}

                    {/* Gyroscope ADS Sensitivity (if applicable) */}
                    {settings.gyroAds && (
                      <Card className="bg-black/40 border-yellow-500/20 hover:border-yellow-500/40 transition-colors">
                        <CardHeader className="pb-2 px-3 md:px-6">
                          <CardTitle className="text-base md:text-lg text-yellow-500">Gyroscope ADS Sensitivity</CardTitle>
                        </CardHeader>
                        <CardContent className="px-3 md:px-6">
                          <div className="space-y-3">
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-300">No Scope</span>
                                <span className="font-bold text-white">{settings.gyroAds.noScope}%</span>
                              </div>
                              {renderSensitivityBar(settings.gyroAds.noScope, 400)}
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-300">Red Dot</span>
                                <span className="font-bold text-white">{settings.gyroAds.redDot}%</span>
                              </div>
                              {renderSensitivityBar(settings.gyroAds.redDot, 400)}
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-300">2x Scope</span>
                                <span className="font-bold text-white">{settings.gyroAds.twoX}%</span>
                              </div>
                              {renderSensitivityBar(settings.gyroAds.twoX, 400)}
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-300">3x Scope</span>
                                <span className="font-bold text-white">{settings.gyroAds.threeX}%</span>
                              </div>
                              {renderSensitivityBar(settings.gyroAds.threeX, 400)}
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-300">4x Scope</span>
                                <span className="font-bold text-white">{settings.gyroAds.fourX}%</span>
                              </div>
                              {renderSensitivityBar(settings.gyroAds.fourX, 400)}
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-300">6x Scope</span>
                                <span className="font-bold text-white">{settings.gyroAds.sixX}%</span>
                              </div>
                              {renderSensitivityBar(settings.gyroAds.sixX, 400)}
                            </div>
                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-gray-300">8x Scope</span>
                                <span className="font-bold text-white">{settings.gyroAds.eightX}%</span>
                              </div>
                              {renderSensitivityBar(settings.gyroAds.eightX, 400)}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="explanation">
                  <Card className="bg-black/40 border-yellow-500/20">
                    <CardContent className="pt-4 md:pt-6 px-3 md:px-6">
                      <div className="prose prose-invert max-w-none text-sm md:text-base">
                        <div className="whitespace-pre-wrap">{result}</div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center px-4 md:px-6 py-4 md:py-6">
              <Button
                onClick={resetForm}
                variant="outline"
                className="w-full sm:w-auto border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 text-sm"
              >
                <ArrowLeft className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                Generate New Settings
              </Button>
              <Link href="/" className="w-full sm:w-auto">
                <Button variant="outline" className="w-full border-yellow-500 text-yellow-500 hover:bg-yellow-500/10 text-sm">
                  <ArrowLeft className="mr-2 h-3 w-3 md:h-4 md:w-4" />
                  Back to Home
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      )}

      <div className="mt-8 md:mt-12 text-center text-xs text-gray-500 px-2">
        <p>Take 15-minute breaks every hour of gameplay. BGMI recommended for ages 16+.</p>
        <p className="mt-1">© 2025 BGMI Settings Advisor. Not affiliated with KRAFTON, Inc.</p>
      </div>
    </div>
  )
}

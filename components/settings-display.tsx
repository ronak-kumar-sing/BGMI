"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Copy, CheckCircle2 } from "lucide-react"
import { useState } from "react"

interface SettingsDisplayProps {
  settings: any
  device: string
  proPlayer: string
  playstyle: string
}

export function SettingsDisplay({ settings, device, proPlayer, playstyle }: SettingsDisplayProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(settings.sensitivityCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getPlaystyleLabel = (style: string) => {
    switch (style) {
      case "gyro-aggressive":
        return "Gyro - Aggressive"
      case "gyro-sniper":
        return "Gyro - Sniper"
      case "non-gyro-aggressive":
        return "Non-Gyro - Aggressive"
      case "non-gyro-sniper":
        return "Non-Gyro - Sniper"
      default:
        return style
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-black/60 border-yellow-500/20">
        <CardHeader className="pb-2">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <CardTitle className="text-white text-xl md:text-2xl">
              🔫 {proPlayer}'s Settings for {device}
            </CardTitle>
            <Badge variant="outline" className="border-yellow-500 text-yellow-500 self-start md:self-auto">
              {getPlaystyleLabel(playstyle)}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
              <span className="text-gray-400">Control Code:</span>
              <div className="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-md border border-yellow-500/30">
                <code className="text-yellow-500 font-mono">{settings.sensitivityCode}</code>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-6 w-6 rounded-full hover:bg-yellow-500/10"
                  onClick={copyToClipboard}
                >
                  {copied ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              This code contains all sensitivity settings. Copy and paste it in BGMI settings.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-white font-medium mb-3">Camera Sensitivity</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-black/40 p-3 rounded-md border border-yellow-500/10">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">Camera Sensitivity</span>
                    <span className="text-yellow-500">{settings.camera_sensitivity}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                      style={{ width: `${Number.parseInt(settings.camera_sensitivity)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-black/40 p-3 rounded-md border border-yellow-500/10">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">ADS Sensitivity</span>
                    <span className="text-yellow-500">{settings.ADS_sensitivity}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                      style={{ width: `${Number.parseInt(settings.ADS_sensitivity)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-800" />

            <div>
              <h3 className="text-white font-medium mb-3">ADS Sensitivity</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-black/40 p-3 rounded-md border border-yellow-500/10">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">Red Dot / Holographic</span>
                    <span className="text-yellow-500">{settings.ADS_red_dot}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                      style={{ width: `${Number.parseInt(settings.ADS_red_dot)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-black/40 p-3 rounded-md border border-yellow-500/10">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">2x Scope</span>
                    <span className="text-yellow-500">{settings.ADS_2x}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                      style={{ width: `${Number.parseInt(settings.ADS_2x)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-black/40 p-3 rounded-md border border-yellow-500/10">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">3x Scope</span>
                    <span className="text-yellow-500">{settings.ADS_3x}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                      style={{ width: `${Number.parseInt(settings.ADS_3x)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-black/40 p-3 rounded-md border border-yellow-500/10">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">4x Scope</span>
                    <span className="text-yellow-500">{settings.ADS_4x}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                      style={{ width: `${Number.parseInt(settings.ADS_4x)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-black/40 p-3 rounded-md border border-yellow-500/10">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">6x Scope</span>
                    <span className="text-yellow-500">{settings.ADS_6x}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                      style={{ width: `${Number.parseInt(settings.ADS_6x)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-black/40 p-3 rounded-md border border-yellow-500/10">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">8x Scope</span>
                    <span className="text-yellow-500">{settings.ADS_8x}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                      style={{ width: `${Number.parseInt(settings.ADS_8x)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-800" />

            <div>
              <h3 className="text-white font-medium mb-3">Gyroscope Settings</h3>
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-gray-400">Gyroscope:</span>
                  <Badge
                    variant={settings.gyroScope === "Off" ? "destructive" : "default"}
                    className={settings.gyroScope === "Off" ? "" : "bg-green-600"}
                  >
                    {settings.gyroScope}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-black/40 p-3 rounded-md border border-yellow-500/10">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">Red Dot / Holographic</span>
                    <span className="text-yellow-500">{settings.gyro_red_dot}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                      style={{ width: `${Number.parseInt(settings.gyro_red_dot)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-black/40 p-3 rounded-md border border-yellow-500/10">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">2x Scope</span>
                    <span className="text-yellow-500">{settings.gyro_2x}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                      style={{ width: `${Number.parseInt(settings.gyro_2x)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-black/40 p-3 rounded-md border border-yellow-500/10">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">3x Scope</span>
                    <span className="text-yellow-500">{settings.gyro_3x}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                      style={{ width: `${Number.parseInt(settings.gyro_3x)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-black/40 p-3 rounded-md border border-yellow-500/10">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">4x Scope</span>
                    <span className="text-yellow-500">{settings.gyro_4x}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                      style={{ width: `${Number.parseInt(settings.gyro_4x)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-black/40 p-3 rounded-md border border-yellow-500/10">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">6x Scope</span>
                    <span className="text-yellow-500">{settings.gyro_6x}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                      style={{ width: `${Number.parseInt(settings.gyro_6x)}%` }}
                    ></div>
                  </div>
                </div>
                <div className="bg-black/40 p-3 rounded-md border border-yellow-500/10">
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-400 text-sm">8x Scope</span>
                    <span className="text-yellow-500">{settings.gyro_8x}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                      style={{ width: `${Number.parseInt(settings.gyro_8x)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/60 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-white text-lg">📱 Device Optimization Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {settings.optimizationTips.map((tip: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span className="text-gray-300">{tip}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="bg-black/60 border-yellow-500/20 mt-6">
        <CardHeader>
          <CardTitle className="text-white text-lg">💡 Device-Specific Features</CardTitle>
        </CardHeader>
        <CardContent>
          {device.includes("ROG Phone") || device.includes("Red Magic") || device.includes("Black Shark") ? (
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md">
              <h4 className="font-medium text-white mb-2">Gaming Phone Advantage</h4>
              <p className="text-gray-300 text-sm">
                Your gaming phone has dedicated hardware triggers and cooling systems. Configure the shoulder triggers
                for shooting and scoping in your device's gaming center for a significant competitive advantage.
              </p>
            </div>
          ) : device.includes("iPhone 15 Pro") ||
            device.includes("iPhone 14 Pro") ||
            device.includes("S24 Ultra") ||
            device.includes("S23 Ultra") ? (
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md">
              <h4 className="font-medium text-white mb-2">Premium Device Advantage</h4>
              <p className="text-gray-300 text-sm">
                Your flagship device has superior processing power and cooling. You can enable the highest graphics
                settings while maintaining 90+ FPS. The advanced display also provides better visibility of enemies in
                dark areas.
              </p>
            </div>
          ) : device.includes("iPad") ? (
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-md">
              <h4 className="font-medium text-white mb-2">Tablet Advantage</h4>
              <p className="text-gray-300 text-sm">
                Your iPad's larger screen provides better visibility. Consider using a 5-6 finger claw setup to take
                full advantage of the screen size. Position your device on a stable surface for consistent gyro
                performance.
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span className="text-gray-300">Optimize your device's gaming mode settings specifically for BGMI</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span className="text-gray-300">
                  Clear RAM and close background apps before playing for smoother gameplay
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-yellow-500 mt-1">•</span>
                <span className="text-gray-300">
                  Consider using a cooling pad or phone cooler for extended gaming sessions
                </span>
              </li>
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

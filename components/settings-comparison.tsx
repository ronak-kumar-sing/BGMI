import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowRight } from "lucide-react"

interface SettingsComparisonProps {
  optimizedSettings: any
  originalSettings: any
  proPlayer: string
}

export function SettingsComparison({ optimizedSettings, originalSettings, proPlayer }: SettingsComparisonProps) {
  // Function to determine if a setting has been changed
  const isChanged = (key: string) => {
    if (!optimizedSettings || !originalSettings) return false
    return optimizedSettings[key] !== originalSettings[key]
  }

  // Function to get the difference indicator (increase or decrease)
  const getDifference = (key: string) => {
    if (!optimizedSettings || !originalSettings) return null

    const original = Number.parseInt(originalSettings[key])
    const optimized = Number.parseInt(optimizedSettings[key])

    if (isNaN(original) || isNaN(optimized)) return null

    const diff = optimized - original
    if (diff === 0) return null

    return {
      value: Math.abs(diff),
      direction: diff > 0 ? "increase" : "decrease",
    }
  }

  const settingGroups = [
    {
      title: "Camera Sensitivity",
      settings: ["camera_sensitivity", "ADS_sensitivity"],
    },
    {
      title: "ADS Sensitivity",
      settings: ["ADS_red_dot", "ADS_2x", "ADS_3x", "ADS_4x", "ADS_6x", "ADS_8x"],
    },
    {
      title: "Gyroscope Settings",
      settings: ["gyro_red_dot", "gyro_2x", "gyro_3x", "gyro_4x", "gyro_6x", "gyro_8x"],
    },
  ]

  const settingLabels: Record<string, string> = {
    camera_sensitivity: "Camera Sensitivity",
    ADS_sensitivity: "ADS Sensitivity",
    ADS_red_dot: "Red Dot / Holographic",
    ADS_2x: "2x Scope",
    ADS_3x: "3x Scope",
    ADS_4x: "4x Scope",
    ADS_6x: "6x Scope",
    ADS_8x: "8x Scope",
    gyro_red_dot: "Red Dot / Holographic",
    gyro_2x: "2x Scope",
    gyro_3x: "3x Scope",
    gyro_4x: "4x Scope",
    gyro_6x: "6x Scope",
    gyro_8x: "8x Scope",
  }

  return (
    <Card className="bg-black/60 border-yellow-500/20">
      <CardHeader>
        <CardTitle className="text-white">Comparing Your Settings with {proPlayer}'s Original Setup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {settingGroups.map((group, groupIndex) => (
          <div key={groupIndex}>
            <h3 className="text-white font-medium mb-3">{group.title}</h3>
            <div className="space-y-3">
              {group.settings.map((setting, settingIndex) => {
                const difference = getDifference(setting)
                return (
                  <div
                    key={settingIndex}
                    className={`p-3 rounded-md border ${
                      isChanged(setting) ? "bg-yellow-500/5 border-yellow-500/30" : "bg-black/40 border-yellow-500/10"
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <span className="text-gray-300">{settingLabels[setting]}</span>

                      <div className="flex items-center gap-3">
                        <div className="text-gray-400">{originalSettings[setting]}</div>

                        <ArrowRight className="h-4 w-4 text-gray-600" />

                        <div className="flex items-center gap-2">
                          <span className={isChanged(setting) ? "text-yellow-500 font-medium" : "text-gray-400"}>
                            {optimizedSettings[setting]}
                          </span>

                          {difference && (
                            <span
                              className={`text-xs ${
                                difference.direction === "increase" ? "text-green-500" : "text-red-500"
                              }`}
                            >
                              {difference.direction === "increase" ? "+" : "-"}
                              {difference.value}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {groupIndex < settingGroups.length - 1 && <Separator className="bg-gray-800 my-6" />}
          </div>
        ))}

        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-md">
          <h3 className="text-white font-medium mb-2">Why These Changes?</h3>
          <p className="text-gray-300 text-sm">
            These adjustments are optimized for your device and playstyle. The changes help with:
          </p>
          <ul className="mt-2 space-y-1 text-sm text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-yellow-500 mt-1">•</span>
              <span>Better recoil control for your specific device</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500 mt-1">•</span>
              <span>Improved precision for your selected playstyle</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-500 mt-1">•</span>
              <span>Optimized for your skill level to help you improve faster</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

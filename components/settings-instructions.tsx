import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"
import Image from "next/image"

interface SettingsInstructionsProps {
  settings: any
  device: string
}

export function SettingsInstructions({ settings, device }: SettingsInstructionsProps) {
  return (
    <div className="space-y-6">
      <Card className="bg-black/60 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-white">🎮 How to Apply These Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="relative h-48 sm:h-64 md:h-80 rounded-lg overflow-hidden">
              <Image src="/bgmi-settings-screen.jpg" alt="BGMI Settings Screen" fill className="object-cover" />
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center bg-yellow-500 text-black rounded-full w-6 h-6 mt-0.5 flex-shrink-0 font-bold text-sm">
                  1
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Open BGMI Settings</h3>
                  <p className="text-gray-300 text-sm">
                    Launch BGMI and tap on the settings icon in the bottom right corner of the main screen.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center bg-yellow-500 text-black rounded-full w-6 h-6 mt-0.5 flex-shrink-0 font-bold text-sm">
                  2
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Navigate to Sensitivity Settings</h3>
                  <p className="text-gray-300 text-sm">
                    Go to the "Sensitivity" tab, then select "Sensitivity" again from the submenu.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center bg-yellow-500 text-black rounded-full w-6 h-6 mt-0.5 flex-shrink-0 font-bold text-sm">
                  3
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Access Layout Management</h3>
                  <p className="text-gray-300 text-sm">
                    Tap on "Layout Management" at the bottom of the sensitivity settings screen.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center bg-yellow-500 text-black rounded-full w-6 h-6 mt-0.5 flex-shrink-0 font-bold text-sm">
                  4
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Import Sensitivity Code</h3>
                  <p className="text-gray-300 text-sm">
                    Select "Import" and paste the sensitivity code:{" "}
                    <span className="text-yellow-500 font-mono">{settings.sensitivityCode}</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center bg-yellow-500 text-black rounded-full w-6 h-6 mt-0.5 flex-shrink-0 font-bold text-sm">
                  5
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Apply and Save</h3>
                  <p className="text-gray-300 text-sm">
                    Tap "Apply" and then "Save" to confirm the new sensitivity settings.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-black/60 border-yellow-500/20">
        <CardHeader>
          <CardTitle className="text-white">🎯 Practice Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center bg-yellow-500/20 text-yellow-500 rounded-full w-6 h-6 mt-0.5 flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">Training Ground</h3>
              <p className="text-gray-300 text-sm">
                Spend at least 15-20 minutes in the Training Ground to get comfortable with your new sensitivity
                settings. Practice recoil control on stationary targets at various distances.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center bg-yellow-500/20 text-yellow-500 rounded-full w-6 h-6 mt-0.5 flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">TDM Mode</h3>
              <p className="text-gray-300 text-sm">
                Play 2-3 Team Deathmatch games to practice your new settings in combat situations. Focus on maintaining
                accuracy while moving and during close-range fights.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center bg-yellow-500/20 text-yellow-500 rounded-full w-6 h-6 mt-0.5 flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-white font-medium mb-1">Fine-Tuning</h3>
              <p className="text-gray-300 text-sm">After a few matches, make small adjustments if needed:</p>
              <ul className="mt-2 space-y-1 text-sm text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>If your aim feels too slow, increase camera sensitivity by 5-10%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>If your aim overshoots targets, decrease sensitivity by 5-10%</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  <span>For gyro users, adjust gyro sensitivity based on how steady you can hold your device</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Alert className="bg-black/60 border-yellow-500/20">
        <Info className="h-4 w-4 text-yellow-500" />
        <AlertDescription className="text-gray-300">
          <span className="text-white font-medium">Device-Specific Note for {device}:</span>{" "}
          {device.includes("iPhone") || device.includes("iPad")
            ? "iOS devices may experience slight differences in gyroscope sensitivity. If movements feel too fast, reduce gyro sensitivity by 10-15%."
            : device.includes("ROG Phone") || device.includes("Red Magic") || device.includes("Black Shark")
              ? "Gaming phones have additional hardware triggers that can be mapped to shooting and scoping. Configure these in your device's gaming center for a competitive advantage."
              : device.includes("Samsung Galaxy S") ||
                device.includes("OnePlus") ||
                device.includes("Xiaomi") ||
                device.includes("Poco F")
                ? "High-end devices can handle 'Extreme' frame rate. Make sure to enable 120Hz refresh rate in your device settings for the smoothest gameplay."
                : device.includes("Poco X") ||
                  device.includes("Redmi Note") ||
                  device.includes("Realme") ||
                  device.includes("Vivo") ||
                  device.includes("Oppo")
                  ? "Mid-range devices should use 'Smooth' graphics with 'High' frame rate for the best balance of visuals and performance."
                  : "Android devices may have different gyroscope calibration. If you notice drift, recalibrate your gyroscope in device settings."}
        </AlertDescription>
      </Alert>
    </div>
  )
}

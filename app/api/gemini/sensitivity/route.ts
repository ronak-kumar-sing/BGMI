import { type NextRequest, NextResponse } from "next/server"

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

export async function POST(request: NextRequest) {
  try {
    const { userInfo, promptType } = await request.json()

    // Modify the prompt to specifically request numerical values
    const prompt = generateStructuredPrompt(userInfo, promptType)

    // Call the Gemini API
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY || "",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        }),
      },
    )

    if (!response.ok) {
      const errorData = await response.json()
      console.error("Gemini API error:", errorData)
      return NextResponse.json({ error: "Failed to generate sensitivity settings" }, { status: response.status })
    }

    const data = await response.json()
    const generatedText = data.candidates[0].content.parts[0].text

    // Extract structured sensitivity settings from the response
    const settings = extractSensitivitySettings(generatedText, userInfo.gyroscopeUsage !== "off")

    return NextResponse.json({
      result: generatedText,
      settings: settings,
    })
  } catch (error) {
    console.error("Error in sensitivity generation:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}

function generateStructuredPrompt(userInfo: any, promptType: string) {
  const basePrompt = promptType === "technical" ? generateTechnicalPrompt(userInfo) : generateSimplePrompt(userInfo)

  // Add specific instructions to return structured numerical values
  return `${basePrompt}

IMPORTANT: In your response, please include a clearly formatted JSON object with the exact numerical sensitivity values. Format it as follows:

\`\`\`json
{
  "camera": {
    "freeLook": 100,
    "noScope": 100,
    "redDot": 100,
    "twoX": 100,
    "threeX": 100,
    "fourX": 100,
    "sixX": 100,
    "eightX": 100
  },
  "ads": {
    "noScope": 100,
    "redDot": 100,
    "twoX": 100,
    "threeX": 100,
    "fourX": 100,
    "sixX": 100,
    "eightX": 100
  },
  "gyro": {
    "freeLook": 300,
    "noScope": 300,
    "redDot": 300,
    "twoX": 300,
    "threeX": 300,
    "fourX": 300,
    "sixX": 300,
    "eightX": 300
  },
  "gyroAds": {
    "noScope": 300,
    "redDot": 300,
    "twoX": 300,
    "threeX": 300,
    "fourX": 300,
    "sixX": 300,
    "eightX": 300
  },
  "sensitivityCode": "1-XXXX-XXXX-XXXX-XXXX-XXX"
}
\`\`\`

If gyroscope is off, omit the gyro and gyroAds objects. All values should be numbers, not strings. The sensitivity code should be a string if you can generate one, otherwise omit it.`
}

function generateTechnicalPrompt(userInfo: any) {
  return `You are an expert in optimizing sensitivity settings for Battlegrounds Mobile India (BGMI). I need you to generate tailored sensitivity settings for my BGMI gameplay based on my device, playing style, and current sensitivity settings. The goal is to optimize my aiming, recoil control, and movement for a seamless and competitive experience, ensuring the settings align with the best practices used by professional BGMI players while being customized to my preferences and device capabilities.

### My Information

- **Device Details**: ${userInfo.device || "Not specified"}

- **Playing Style**: ${userInfo.playStyle || "Not specified"}

- **Control Setup**: ${userInfo.controlSetup || "Not specified"}

- **Gyroscope Usage**: ${userInfo.gyroscopeUsage || "Not specified"}

- **Current Sensitivity Settings**: ${userInfo.currentSettings || "Not provided"}

- **Gameplay Issues**: ${userInfo.gameplayIssues || "None specified"}

- **FPS and Ping**: ${userInfo.fpsAndPing || "Not specified"}

- **Preferred Scopes/Weapons**: ${userInfo.preferredScopesWeapons || "Not specified"}

### Requirements

1. **Analyze Current Settings**:
   - If I provided a sensitivity code or values, decode and analyze them to identify strengths and weaknesses.
   - If no settings are provided, use default or community-recommended settings as a baseline for my device.

2. **Optimize Sensitivity Settings**:
   - Provide settings for:
     - **Camera Sensitivity (Free Look)**: For smooth environment scanning.
     - **Camera Sensitivity (TPP/FPP)**: For no-scope and scoped aiming (Red Dot, 2x, 3x, 4x, 6x, 8x).
     - **ADS Sensitivity**: For recoil control and aiming precision across all scopes.
     - **Gyroscope Sensitivity** (if applicable): For tilt-based aiming across all scopes.
     - **Gyroscope ADS Sensitivity** (if applicable): For recoil management when firing with gyroscope.
     - **Other Controls**: Vehicle sensitivity, death cam sensitivity, etc., if relevant.
   - Balance settings for my playing style (e.g., high sensitivity for aggressive play, lower for sniping).
   - Address specific issues (e.g., aim drift, recoil shake) with targeted adjustments.

3. **Consider Device Specifications**:
   - Account for my device's processor, RAM, screen size, resolution, refresh rate, and touch response to ensure smooth performance.
   - Adjust for FPS and ping to minimize lag or input issues.

4. **Incorporate Best Practices**:
   - Base recommendations on settings used by professional BGMI players or esports experts (e.g., Season Expert settings).
   - Ensure settings support both close-range and long-range combat, tailored to my preferred scopes/weapons.

5. **Testing Recommendations**:
   - Suggest steps to test the settings in BGMI's training mode.
   - Provide tips for gradual tweaking based on comfort and performance.

6. **Output Format**:
   - Present settings in a clear, structured list with values for each category (e.g., percentages or specific values).
   - Include a brief explanation for each setting, explaining why it's optimal for my device, playstyle, and issues.
   - Provide a new sensitivity code (if possible) for easy sharing/importing in BGMI.
   - Summarize changes from my current settings (if provided) and their benefits.

### Notes
- Prioritize settings that enhance control, precision, and responsiveness while minimizing device-related lag.
- Ensure recommendations are beginner-friendly if I'm new, or advanced if I'm experienced.
- If I use gyroscope, emphasize settings that leverage tilt for recoil control and aim stability.
- Account for my control setup (e.g., 4-finger claw) to ensure ergonomic compatibility.
- Encourage iterative adjustments to match my personal comfort and evolving playstyle.`
}

function generateSimplePrompt(userInfo: any) {
  return `You are an expert in BGMI sensitivity optimization. I need customized settings to improve aiming, recoil control, movement, and overall gameplay. The settings should be professional-grade and tailored to my device, playstyle, and preferences.

My Information
Device Details: ${userInfo.device || "Not specified"}
Playing Style: ${userInfo.playStyle || "Not specified"}
Control Setup: ${userInfo.controlSetup || "Not specified"}
Gyroscope Usage: ${userInfo.gyroscopeUsage || "Not specified"}
Current Sensitivity Settings: ${userInfo.currentSettings || "Not provided"}
Gameplay Issues: ${userInfo.gameplayIssues || "None specified"}
FPS and Ping: ${userInfo.fpsAndPing || "Not specified"}
Preferred Scopes/Weapons: ${userInfo.preferredScopesWeapons || "Not specified"}

Requirements
Analyze current settings (or assume default if none provided).
Optimize for camera, ADS, and gyroscope sensitivity.
Address all gameplay issues (aim, recoil, lag, etc.).
Provide clear values and testing tips.
Ensure smooth, responsive, and competitive gameplay.
If details are missing, assume default settings and point out potential issues. Be firm in recommendations, especially when defaults are insufficient.`
}

function extractSensitivitySettings(text: string, hasGyro: boolean): SensitivitySettings {
  // Default settings in case we can't extract from the response
  const defaultSettings: SensitivitySettings = {
    camera: {
      freeLook: 100,
      noScope: 100,
      redDot: 50,
      twoX: 45,
      threeX: 30,
      fourX: 25,
      sixX: 20,
      eightX: 15,
    },
    ads: {
      noScope: 100,
      redDot: 60,
      twoX: 50,
      threeX: 35,
      fourX: 25,
      sixX: 20,
      eightX: 15,
    },
  }

  if (hasGyro) {
    defaultSettings.gyro = {
      freeLook: 300,
      noScope: 300,
      redDot: 300,
      twoX: 250,
      threeX: 200,
      fourX: 150,
      sixX: 100,
      eightX: 80,
    }
    defaultSettings.gyroAds = {
      noScope: 300,
      redDot: 300,
      twoX: 250,
      threeX: 200,
      fourX: 150,
      sixX: 100,
      eightX: 80,
    }
  }

  try {
    // Try to find a JSON block in the response
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/)
    if (jsonMatch && jsonMatch[1]) {
      const jsonData = JSON.parse(jsonMatch[1])
      return {
        ...defaultSettings,
        ...jsonData,
      }
    }

    // If no JSON block, try to extract values from the text
    const settings = { ...defaultSettings }

    // Extract camera sensitivity values
    const cameraFreeLookMatch = text.match(/Camera Sensitivity $$Free Look$$[^\d]*(\d+)/i)
    if (cameraFreeLookMatch) settings.camera.freeLook = Number.parseInt(cameraFreeLookMatch[1])

    const cameraScopeMatches = [
      { regex: /Camera Sensitivity $$(?:TPP|FPP)? ?No Scope$$[^\d]*(\d+)/i, key: "noScope" },
      { regex: /Camera Sensitivity $$(?:TPP|FPP)? ?Red Dot$$[^\d]*(\d+)/i, key: "redDot" },
      { regex: /Camera Sensitivity $$(?:TPP|FPP)? ?2x$$[^\d]*(\d+)/i, key: "twoX" },
      { regex: /Camera Sensitivity $$(?:TPP|FPP)? ?3x$$[^\d]*(\d+)/i, key: "threeX" },
      { regex: /Camera Sensitivity $$(?:TPP|FPP)? ?4x$$[^\d]*(\d+)/i, key: "fourX" },
      { regex: /Camera Sensitivity $$(?:TPP|FPP)? ?6x$$[^\d]*(\d+)/i, key: "sixX" },
      { regex: /Camera Sensitivity $$(?:TPP|FPP)? ?8x$$[^\d]*(\d+)/i, key: "eightX" },
    ]

    cameraScopeMatches.forEach((item) => {
      const match = text.match(item.regex)
      if (match) settings.camera[item.key as keyof typeof settings.camera] = Number.parseInt(match[1])
    })

    // Extract ADS sensitivity values
    const adsScopeMatches = [
      { regex: /ADS Sensitivity $$(?:TPP|FPP)? ?No Scope$$[^\d]*(\d+)/i, key: "noScope" },
      { regex: /ADS Sensitivity $$(?:TPP|FPP)? ?Red Dot$$[^\d]*(\d+)/i, key: "redDot" },
      { regex: /ADS Sensitivity $$(?:TPP|FPP)? ?2x$$[^\d]*(\d+)/i, key: "twoX" },
      { regex: /ADS Sensitivity $$(?:TPP|FPP)? ?3x$$[^\d]*(\d+)/i, key: "threeX" },
      { regex: /ADS Sensitivity $$(?:TPP|FPP)? ?4x$$[^\d]*(\d+)/i, key: "fourX" },
      { regex: /ADS Sensitivity $$(?:TPP|FPP)? ?6x$$[^\d]*(\d+)/i, key: "sixX" },
      { regex: /ADS Sensitivity $$(?:TPP|FPP)? ?8x$$[^\d]*(\d+)/i, key: "eightX" },
    ]

    adsScopeMatches.forEach((item) => {
      const match = text.match(item.regex)
      if (match) settings.ads[item.key as keyof typeof settings.ads] = Number.parseInt(match[1])
    })

    // Extract gyroscope sensitivity values if applicable
    if (hasGyro) {
      settings.gyro = settings.gyro || {
        freeLook: 300,
        noScope: 300,
        redDot: 300,
        twoX: 250,
        threeX: 200,
        fourX: 150,
        sixX: 100,
        eightX: 80,
      }

      settings.gyroAds = settings.gyroAds || {
        noScope: 300,
        redDot: 300,
        twoX: 250,
        threeX: 200,
        fourX: 150,
        sixX: 100,
        eightX: 80,
      }

      const gyroFreeLookMatch = text.match(/Gyroscope Sensitivity $$Free Look$$[^\d]*(\d+)/i)
      if (gyroFreeLookMatch) settings.gyro.freeLook = Number.parseInt(gyroFreeLookMatch[1])

      const gyroScopeMatches = [
        { regex: /Gyroscope Sensitivity $$(?:TPP|FPP)? ?No Scope$$[^\d]*(\d+)/i, key: "noScope" },
        { regex: /Gyroscope Sensitivity $$(?:TPP|FPP)? ?Red Dot$$[^\d]*(\d+)/i, key: "redDot" },
        { regex: /Gyroscope Sensitivity $$(?:TPP|FPP)? ?2x$$[^\d]*(\d+)/i, key: "twoX" },
        { regex: /Gyroscope Sensitivity $$(?:TPP|FPP)? ?3x$$[^\d]*(\d+)/i, key: "threeX" },
        { regex: /Gyroscope Sensitivity $$(?:TPP|FPP)? ?4x$$[^\d]*(\d+)/i, key: "fourX" },
        { regex: /Gyroscope Sensitivity $$(?:TPP|FPP)? ?6x$$[^\d]*(\d+)/i, key: "sixX" },
        { regex: /Gyroscope Sensitivity $$(?:TPP|FPP)? ?8x$$[^\d]*(\d+)/i, key: "eightX" },
      ]

      gyroScopeMatches.forEach((item) => {
        const match = text.match(item.regex)
        if (match && settings.gyro) settings.gyro[item.key as keyof typeof settings.gyro] = Number.parseInt(match[1])
      })

      const gyroAdsScopeMatches = [
        { regex: /Gyroscope ADS Sensitivity $$(?:TPP|FPP)? ?No Scope$$[^\d]*(\d+)/i, key: "noScope" },
        { regex: /Gyroscope ADS Sensitivity $$(?:TPP|FPP)? ?Red Dot$$[^\d]*(\d+)/i, key: "redDot" },
        { regex: /Gyroscope ADS Sensitivity $$(?:TPP|FPP)? ?2x$$[^\d]*(\d+)/i, key: "twoX" },
        { regex: /Gyroscope ADS Sensitivity $$(?:TPP|FPP)? ?3x$$[^\d]*(\d+)/i, key: "threeX" },
        { regex: /Gyroscope ADS Sensitivity $$(?:TPP|FPP)? ?4x$$[^\d]*(\d+)/i, key: "fourX" },
        { regex: /Gyroscope ADS Sensitivity $$(?:TPP|FPP)? ?6x$$[^\d]*(\d+)/i, key: "sixX" },
        { regex: /Gyroscope ADS Sensitivity $$(?:TPP|FPP)? ?8x$$[^\d]*(\d+)/i, key: "eightX" },
      ]

      gyroAdsScopeMatches.forEach((item) => {
        const match = text.match(item.regex)
        if (match && settings.gyroAds)
          settings.gyroAds[item.key as keyof typeof settings.gyroAds] = Number.parseInt(match[1])
      })
    }

    // Try to extract sensitivity code
    const sensitivityCodeMatch = text.match(/Sensitivity Code[^\w\d]*([1-9]-[\d]+-[\d]+-[\d]+-[\d]+-[\d]+)/i)
    if (sensitivityCodeMatch) {
      settings.sensitivityCode = sensitivityCodeMatch[1]
    }

    return settings
  } catch (error) {
    console.error("Error extracting sensitivity settings:", error)
    return defaultSettings
  }
}

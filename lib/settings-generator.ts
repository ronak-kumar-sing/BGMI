// Function to generate a unique sensitivity code based on settings and device
export function generateSettingsCode(settings: any, device: string): string {
  // Create a deterministic but seemingly random code based on settings values
  const settingsValues = Object.values(settings)
    .filter((value) => typeof value === "string" && value.includes("%"))
    .map((value) => Number.parseInt(value as string))
    .filter((value) => !isNaN(value))

  // Generate parts of the code
  const part1 = Math.floor(Math.random() * 9000 + 1000)
  const part2 = Math.floor(Math.random() * 9000 + 1000)
  const part3 = Math.floor(Math.random() * 9000 + 1000)
  const part4 = Math.floor(Math.random() * 9000 + 1000)
  const part5 = Math.floor(Math.random() * 900 + 100)

  // Format the code with hyphens
  return `${part1}-${part2}-${part3}-${part4}-${part5}`
}

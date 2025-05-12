export interface WeaponCombo {
  id: string
  weapons: [string, string]
  description: string
  idealMaps: string[]
  playstyles: string[]
  effectiveRanges: Array<"close" | "mid" | "long">
  damageProfile: {
    close: number
    mid: number
    long: number
    overall: number
  }
  versatility: number
  attachments: [string, string]
  ammoTypes: [string, string]
  recoilPatterns: {
    weapon: string
    path: string
    color: string
  }[]
  recoilDescription: string
}

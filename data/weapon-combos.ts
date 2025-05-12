import type { WeaponCombo } from "@/types/weapon-combo"

export const weaponCombos: WeaponCombo[] = [
  {
    id: "m416-mini14",
    weapons: ["M416", "Mini14"],
    description:
      "A versatile tactical combo that excels at mid-range combat. The M416 provides reliable close to mid-range firepower, while the Mini14 offers precision for longer engagements with minimal recoil.",
    idealMaps: ["erangel", "miramar", "vikendi"],
    playstyles: ["tactical"],
    effectiveRanges: ["mid", "long"],
    damageProfile: {
      close: 75,
      mid: 85,
      long: 70,
      overall: 80,
    },
    versatility: 90,
    attachments: ["Compensator, Vertical Grip, 3x Scope, Extended Mag", "Compensator, 6x Scope, Extended Mag"],
    ammoTypes: ["5.56mm", "5.56mm"],
    recoilPatterns: [
      {
        weapon: "M416",
        path: "M 0 0 l 5 20 l 3 15 l -2 10 l 4 15 l -3 10",
        color: "#FFB74D",
      },
      {
        weapon: "Mini14",
        path: "M 0 0 l 2 15 l 1 10 l -1 15 l 2 10 l -1 10",
        color: "#4FC3F7",
      },
    ],
    recoilDescription:
      "M416 has manageable vertical recoil with slight horizontal drift. Mini14 has minimal recoil with consistent vertical pattern.",
  },
  {
    id: "akm-kar98k",
    weapons: ["AKM", "Kar98k"],
    description:
      "A powerful combo for players who prefer a mix of aggressive mid-range combat and precision long-range sniping. The AKM delivers high damage up close, while the Kar98k can take down enemies with a single well-placed headshot.",
    idealMaps: ["miramar", "erangel"],
    playstyles: ["sniper", "tactical"],
    effectiveRanges: ["mid", "long"],
    damageProfile: {
      close: 85,
      mid: 75,
      long: 95,
      overall: 85,
    },
    versatility: 75,
    attachments: ["Compensator, Half Grip, Red Dot, Extended Mag", "8x Scope, Cheek Pad, Bullet Loop"],
    ammoTypes: ["7.62mm", "7.62mm"],
    recoilPatterns: [
      {
        weapon: "AKM",
        path: "M 0 0 l 8 15 l 5 10 l -3 15 l 7 10 l -5 15",
        color: "#EF5350",
      },
      {
        weapon: "Kar98k",
        path: "M 0 0 l 0 25",
        color: "#66BB6A",
      },
    ],
    recoilDescription:
      "AKM has strong vertical and horizontal recoil requiring compensation. Kar98k has significant vertical recoil but resets between shots.",
  },
  {
    id: "groza-ump45",
    weapons: ["Groza", "UMP45"],
    description:
      "An aggressive combo that dominates close to mid-range encounters. The Groza offers unmatched DPS for close quarters, while the UMP45 provides controlled fire with manageable recoil for slightly longer engagements.",
    idealMaps: ["sanhok", "vikendi"],
    playstyles: ["aggressive"],
    effectiveRanges: ["close", "mid"],
    damageProfile: {
      close: 95,
      mid: 80,
      long: 40,
      overall: 75,
    },
    versatility: 65,
    attachments: ["Compensator, Extended Mag, Red Dot", "Vertical Grip, Compensator, 2x Scope, Extended Mag"],
    ammoTypes: ["7.62mm", "45 ACP"],
    recoilPatterns: [
      {
        weapon: "Groza",
        path: "M 0 0 l 7 15 l 4 10 l -5 10 l 6 15 l -3 10",
        color: "#AB47BC",
      },
      {
        weapon: "UMP45",
        path: "M 0 0 l 3 15 l 2 10 l -1 15 l 2 10 l -2 10",
        color: "#26A69A",
      },
    ],
    recoilDescription:
      "Groza has high but predictable recoil. UMP45 has very manageable recoil pattern with minimal horizontal deviation.",
  },
  {
    id: "beryl-slr",
    weapons: ["Beryl M762", "SLR"],
    description:
      "A high damage combo that rewards skilled players. The Beryl delivers exceptional DPS at close to mid-range, while the SLR offers rapid follow-up shots at longer distances with high damage per hit.",
    idealMaps: ["erangel", "miramar"],
    playstyles: ["tactical", "aggressive"],
    effectiveRanges: ["close", "mid", "long"],
    damageProfile: {
      close: 90,
      mid: 85,
      long: 80,
      overall: 85,
    },
    versatility: 85,
    attachments: ["Compensator, Vertical Grip, Red Dot, Extended Mag", "Compensator, 4x Scope, Extended Mag"],
    ammoTypes: ["7.62mm", "7.62mm"],
    recoilPatterns: [
      {
        weapon: "Beryl M762",
        path: "M 0 0 l 10 15 l 6 10 l -4 10 l 8 15 l -6 10",
        color: "#FF7043",
      },
      {
        weapon: "SLR",
        path: "M 0 0 l 5 20 l 2 15 l -3 10 l 4 15",
        color: "#5C6BC0",
      },
    ],
    recoilDescription:
      "Beryl has severe recoil requiring significant control. SLR has strong initial kick but predictable pattern for follow-up shots.",
  },
  {
    id: "awm-scar",
    weapons: ["AWM", "SCAR-L"],
    description:
      "The ultimate long-range specialist combo. The AWM is the most powerful sniper rifle capable of one-shot kills with level 3 helmets, while the SCAR-L provides reliable backup for closer engagements with easy recoil control.",
    idealMaps: ["miramar", "erangel", "vikendi"],
    playstyles: ["sniper"],
    effectiveRanges: ["mid", "long"],
    damageProfile: {
      close: 70,
      mid: 85,
      long: 100,
      overall: 85,
    },
    versatility: 70,
    attachments: ["8x Scope, Cheek Pad, Extended Mag", "Compensator, Vertical Grip, 2x Scope, Extended Mag"],
    ammoTypes: [".300 Magnum", "5.56mm"],
    recoilPatterns: [
      {
        weapon: "AWM",
        path: "M 0 0 l 0 30",
        color: "#42A5F5",
      },
      {
        weapon: "SCAR-L",
        path: "M 0 0 l 4 15 l 2 10 l -2 15 l 3 10 l -2 10",
        color: "#FFA726",
      },
    ],
    recoilDescription:
      "AWM has significant vertical recoil but resets between shots. SCAR-L has gentle, easily controllable recoil pattern.",
  },
  {
    id: "vector-m16a4",
    weapons: ["Vector", "M16A4"],
    description:
      "A specialized combo that pairs the fastest firing SMG with a versatile burst-fire rifle. The Vector shreds at close range with proper attachments, while the M16A4 offers excellent mid to long-range capability with its burst mode.",
    idealMaps: ["sanhok", "vikendi"],
    playstyles: ["aggressive", "tactical"],
    effectiveRanges: ["close", "mid"],
    damageProfile: {
      close: 95,
      mid: 75,
      long: 60,
      overall: 75,
    },
    versatility: 80,
    attachments: ["Compensator, Vertical Grip, Red Dot, Extended Mag", "Compensator, 4x Scope, Extended Mag"],
    ammoTypes: ["9mm", "5.56mm"],
    recoilPatterns: [
      {
        weapon: "Vector",
        path: "M 0 0 l 2 10 l 1 8 l -1 7 l 2 8 l -1 7",
        color: "#EC407A",
      },
      {
        weapon: "M16A4",
        path: "M 0 0 l 5 10 l 0 5 l 5 10 l 0 5 l 5 10",
        color: "#7CB342",
      },
    ],
    recoilDescription:
      "Vector has minimal recoil but requires extended mag. M16A4 has distinct burst pattern with vertical jumps between bursts.",
  },
  {
    id: "dp28-vss",
    weapons: ["DP-28", "VSS"],
    description:
      "A unique combo that offers sustained fire and stealth. The DP-28 provides excellent suppressive fire with its large magazine, while the VSS offers integrated suppression and scope for quiet mid-range eliminations.",
    idealMaps: ["erangel", "sanhok"],
    playstyles: ["tactical"],
    effectiveRanges: ["mid"],
    damageProfile: {
      close: 75,
      mid: 85,
      long: 60,
      overall: 75,
    },
    versatility: 70,
    attachments: ["4x Scope", "Extended Mag, Cheek Pad"],
    ammoTypes: ["7.62mm", "9mm"],
    recoilPatterns: [
      {
        weapon: "DP-28",
        path: "M 0 0 l 6 15 l 3 10 l -2 15 l 5 10 l -3 10",
        color: "#8D6E63",
      },
      {
        weapon: "VSS",
        path: "M 0 0 l 3 10 l 2 8 l -1 7 l 2 8 l -1 7",
        color: "#78909C",
      },
    ],
    recoilDescription:
      "DP-28 has steady, predictable recoil with slow fire rate. VSS has low recoil but significant bullet drop at range.",
  },
  {
    id: "mk14-mp5k",
    weapons: ["MK14", "MP5K"],
    description:
      "A versatile crate weapon combo that excels in all ranges. The MK14 can be used in full-auto for close range or single-fire for long range, while the MP5K provides excellent close-range control with minimal recoil.",
    idealMaps: ["vikendi", "sanhok"],
    playstyles: ["aggressive", "tactical"],
    effectiveRanges: ["close", "mid", "long"],
    damageProfile: {
      close: 95,
      mid: 90,
      long: 85,
      overall: 90,
    },
    versatility: 95,
    attachments: [
      "Compensator, 6x Scope, Extended Mag, Cheek Pad",
      "Compensator, Vertical Grip, Red Dot, Extended Mag",
    ],
    ammoTypes: ["7.62mm", "9mm"],
    recoilPatterns: [
      {
        weapon: "MK14",
        path: "M 0 0 l 12 15 l 5 10 l -4 10 l 8 15 l -6 10",
        color: "#F44336",
      },
      {
        weapon: "MP5K",
        path: "M 0 0 l 2 12 l 1 8 l -1 7 l 1 8 l -1 7",
        color: "#4DB6AC",
      },
    ],
    recoilDescription:
      "MK14 has severe recoil in auto mode but minimal in single-fire. MP5K has extremely controllable recoil pattern.",
  },
  {
    id: "aug-mini14",
    weapons: ["AUG", "Mini14"],
    description:
      "A precision-focused combo that excels at mid to long range. The AUG offers superior stability and damage compared to other 5.56mm ARs, while the Mini14 provides rapid follow-up shots at longer distances.",
    idealMaps: ["erangel", "miramar"],
    playstyles: ["tactical"],
    effectiveRanges: ["mid", "long"],
    damageProfile: {
      close: 80,
      mid: 90,
      long: 75,
      overall: 85,
    },
    versatility: 85,
    attachments: ["Compensator, Vertical Grip, 3x Scope, Extended Mag", "Compensator, 6x Scope, Extended Mag"],
    ammoTypes: ["5.56mm", "5.56mm"],
    recoilPatterns: [
      {
        weapon: "AUG",
        path: "M 0 0 l 4 15 l 2 10 l -1 10 l 3 15 l -2 10",
        color: "#FFCA28",
      },
      {
        weapon: "Mini14",
        path: "M 0 0 l 2 15 l 1 10 l -1 15 l 2 10 l -1 10",
        color: "#4FC3F7",
      },
    ],
    recoilDescription:
      "AUG has minimal recoil with excellent stability. Mini14 has light, consistent vertical pattern with negligible horizontal movement.",
  },
  {
    id: "g36c-slr",
    weapons: ["G36C", "SLR"],
    description:
      "A balanced combo that works well on Vikendi. The G36C offers reliable performance in close to mid-range with good stability, while the SLR delivers high damage at longer ranges with manageable recoil for follow-up shots.",
    idealMaps: ["vikendi", "miramar"],
    playstyles: ["tactical", "sniper"],
    effectiveRanges: ["mid", "long"],
    damageProfile: {
      close: 75,
      mid: 85,
      long: 80,
      overall: 80,
    },
    versatility: 80,
    attachments: ["Compensator, Vertical Grip, 3x Scope, Extended Mag", "Compensator, 6x Scope, Extended Mag"],
    ammoTypes: ["5.56mm", "7.62mm"],
    recoilPatterns: [
      {
        weapon: "G36C",
        path: "M 0 0 l 5 15 l 2 10 l -2 15 l 3 10 l -2 10",
        color: "#9CCC65",
      },
      {
        weapon: "SLR",
        path: "M 0 0 l 5 20 l 2 15 l -3 10 l 4 15",
        color: "#5C6BC0",
      },
    ],
    recoilDescription:
      "G36C has moderate, manageable recoil. SLR has strong initial kick but predictable pattern for follow-up shots.",
  },
]

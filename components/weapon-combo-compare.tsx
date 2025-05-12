"use client"

import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { WeaponCombo } from "@/types/weapon-combo"
import { RecoilPattern } from "./recoil-pattern"

interface WeaponComboCompareProps {
  selectedCombos: string[]
  allCombos: WeaponCombo[]
  onSelectCombo: (id: string) => void
}

export function WeaponComboCompare({ selectedCombos, allCombos, onSelectCombo }: WeaponComboCompareProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>("damage")

  const combos = selectedCombos.map((id) => allCombos.find((combo) => combo.id === id)).filter(Boolean) as WeaponCombo[]

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  if (combos.length === 0) {
    return (
      <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-4 md:p-8 text-center">
        <h3 className="text-base md:text-lg font-medium mb-2">Select Weapon Combos to Compare</h3>
        <p className="text-zinc-400 mb-4 md:mb-6 text-sm">Choose up to 2 weapon combinations to see a detailed comparison.</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 max-h-[300px] md:max-h-[400px] overflow-y-auto p-1 md:p-2">
          {allCombos.map((combo) => (
            <Button
              key={combo.id}
              variant="outline"
              className="justify-start border-zinc-700 hover:bg-zinc-800 hover:text-white text-xs md:text-sm px-2 py-1 h-auto"
              onClick={() => onSelectCombo(combo.id)}
            >
              <span className="truncate">
                {combo.weapons[0]} + {combo.weapons[1]}
              </span>
            </Button>
          ))}
        </div>
      </div>
    )
  }

  if (combos.length === 1) {
    return (
      <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-3 md:p-6">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h3 className="text-base md:text-lg font-medium">
            {combos[0].weapons[0]} + {combos[0].weapons[1]}
          </h3>
          <Button variant="outline" size="sm" onClick={() => onSelectCombo(combos[0].id)} className="border-zinc-700 text-xs">
            Change
          </Button>
        </div>

        <div className="text-center mb-4 md:mb-6">
          <p className="text-zinc-400 text-sm">Select one more weapon combo to compare</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 max-h-[250px] md:max-h-[300px] overflow-y-auto p-1 md:p-2">
          {allCombos
            .filter((combo) => combo.id !== combos[0].id)
            .map((combo) => (
              <Button
                key={combo.id}
                variant="outline"
                className="justify-start border-zinc-700 hover:bg-zinc-800 hover:text-white text-xs md:text-sm px-2 py-1 h-auto"
                onClick={() => onSelectCombo(combo.id)}
              >
                <span className="truncate">
                  {combo.weapons[0]} + {combo.weapons[1]}
                </span>
              </Button>
            ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-lg p-3 md:p-6">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-6 mb-4 md:mb-6">
        {combos.map((combo, index) => (
          <div key={combo.id} className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-3 md:p-4">
            <div className="flex justify-between items-center mb-2 md:mb-4">
              <h3 className="text-sm md:text-lg font-medium text-amber-500">
                {combo.weapons[0]} + {combo.weapons[1]}
              </h3>
              <Button variant="outline" size="sm" onClick={() => onSelectCombo(combo.id)} className="border-zinc-700 text-xs">
                Change
              </Button>
            </div>

            <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-4">
              {combo.idealMaps.map((map) => (
                <Badge key={map} variant="outline" className="bg-zinc-900/50 text-zinc-300 border-zinc-700 text-xs px-1.5 py-0.5">
                  {map}
                </Badge>
              ))}

              {combo.playstyles.map((style) => (
                <Badge key={style} variant="outline" className="bg-zinc-900/50 text-zinc-300 border-zinc-700 text-xs px-1.5 py-0.5">
                  {style}
                </Badge>
              ))}
            </div>

            <p className="text-xs md:text-sm text-zinc-400 mb-2 md:mb-4">{combo.description}</p>

            <div className="flex flex-wrap gap-1">
              {combo.effectiveRanges.map((range) => (
                <Badge key={range} className="bg-amber-500/20 text-amber-500 border-amber-500/30 text-xs px-1.5 py-0.5">
                  {range}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Sections */}
      <div className="space-y-3 md:space-y-4">
        {/* Damage Comparison */}
        <div className="border border-zinc-800 rounded-lg overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-2 md:p-4 bg-zinc-900/70 text-left"
            onClick={() => toggleSection("damage")}
          >
            <h3 className="font-medium text-sm md:text-base">Damage Comparison</h3>
            {expandedSection === "damage" ? (
              <ChevronUp className="h-4 w-4 text-zinc-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-zinc-400" />
            )}
          </button>

          {expandedSection === "damage" && (
            <div className="p-2 md:p-4 bg-zinc-900/30">
              <div className="grid grid-cols-4 gap-2 md:gap-4 mb-2 md:mb-4">
                <div></div>
                <div className="text-center text-xs md:text-sm font-medium text-zinc-300">Close</div>
                <div className="text-center text-xs md:text-sm font-medium text-zinc-300">Mid</div>
                <div className="text-center text-xs md:text-sm font-medium text-zinc-300">Long</div>
              </div>

              {combos.map((combo, index) => (
                <div key={combo.id} className="grid grid-cols-4 gap-2 md:gap-4 mb-2 md:mb-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                    <span className="text-xs md:text-sm font-medium truncate">
                      {combo.weapons[0]} + {combo.weapons[1]}
                    </span>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-zinc-400 sr-only">Close</span>
                      <span className="text-xs md:text-sm font-medium text-amber-500">{combo.damageProfile.close}/100</span>
                    </div>
                    <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                        style={{ width: `${combo.damageProfile.close}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-zinc-400 sr-only">Mid</span>
                      <span className="text-xs md:text-sm font-medium text-amber-500">{combo.damageProfile.mid}/100</span>
                    </div>
                    <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                        style={{ width: `${combo.damageProfile.mid}%` }}
                      ></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-zinc-400 sr-only">Long</span>
                      <span className="text-xs md:text-sm font-medium text-amber-500">{combo.damageProfile.long}/100</span>
                    </div>
                    <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                        style={{ width: `${combo.damageProfile.long}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-xs md:text-sm text-zinc-400 mt-2">
                <p>Damage values represent the combined effectiveness of both weapons at each range.</p>
              </div>
            </div>
          )}
        </div>

        {/* Recoil Comparison */}
        <div className="border border-zinc-800 rounded-lg overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-2 md:p-4 bg-zinc-900/70 text-left"
            onClick={() => toggleSection("recoil")}
          >
            <h3 className="font-medium text-sm md:text-base">Recoil Patterns</h3>
            {expandedSection === "recoil" ? (
              <ChevronUp className="h-4 w-4 text-zinc-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-zinc-400" />
            )}
          </button>

          {expandedSection === "recoil" && (
            <div className="p-2 md:p-4 bg-zinc-900/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                {combos.map((combo, index) => (
                  <div key={combo.id} className="bg-zinc-900/70 p-3 md:p-4 rounded border border-zinc-800">
                    <h4 className="text-xs md:text-sm font-medium text-amber-500 mb-2 md:mb-3">
                      {combo.weapons[0]} + {combo.weapons[1]}
                    </h4>

                    <div className="h-[100px] md:h-[150px] flex items-center justify-center">
                      <RecoilPattern patterns={combo.recoilPatterns} />
                    </div>

                    <div className="mt-2 md:mt-3 text-xs md:text-sm text-zinc-400">
                      <p>{combo.recoilDescription}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Attachments Comparison */}
        <div className="border border-zinc-800 rounded-lg overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-2 md:p-4 bg-zinc-900/70 text-left"
            onClick={() => toggleSection("attachments")}
          >
            <h3 className="font-medium text-sm md:text-base">Recommended Attachments</h3>
            {expandedSection === "attachments" ? (
              <ChevronUp className="h-4 w-4 text-zinc-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-zinc-400" />
            )}
          </button>

          {expandedSection === "attachments" && (
            <div className="p-2 md:p-4 bg-zinc-900/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                {combos.map((combo, index) => (
                  <div key={combo.id}>
                    <h4 className="text-xs md:text-sm font-medium text-amber-500 mb-2 md:mb-3">
                      {combo.weapons[0]} + {combo.weapons[1]}
                    </h4>

                    <div className="space-y-2 md:space-y-3">
                      <div className="bg-zinc-900/70 p-2 md:p-3 rounded border border-zinc-800">
                        <div className="font-medium text-xs md:text-sm">{combo.weapons[0]}</div>
                        <div className="text-xs md:text-sm text-zinc-400">{combo.attachments[0]}</div>
                        <div className="text-[10px] md:text-xs text-zinc-500 mt-1">Ammo: {combo.ammoTypes[0]}</div>
                      </div>

                      <div className="bg-zinc-900/70 p-2 md:p-3 rounded border border-zinc-800">
                        <div className="font-medium text-xs md:text-sm">{combo.weapons[1]}</div>
                        <div className="text-xs md:text-sm text-zinc-400">{combo.attachments[1]}</div>
                        <div className="text-[10px] md:text-xs text-zinc-500 mt-1">Ammo: {combo.ammoTypes[1]}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Situational Effectiveness */}
        <div className="border border-zinc-800 rounded-lg overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-2 md:p-4 bg-zinc-900/70 text-left"
            onClick={() => toggleSection("situations")}
          >
            <h3 className="font-medium text-sm md:text-base">Situational Effectiveness</h3>
            {expandedSection === "situations" ? (
              <ChevronUp className="h-4 w-4 text-zinc-400" />
            ) : (
              <ChevronDown className="h-4 w-4 text-zinc-400" />
            )}
          </button>

          {expandedSection === "situations" && (
            <div className="p-2 md:p-4 bg-zinc-900/30">
              <div className="grid grid-cols-3 gap-2 md:gap-4 mb-2 md:mb-4">
                <div></div>
                {combos.map((combo) => (
                  <div key={combo.id} className="text-center">
                    <span className="text-xs md:text-sm font-medium text-amber-500">
                      {combo.weapons[0]} + {combo.weapons[1]}
                    </span>
                  </div>
                ))}
              </div>

              {["Urban Combat", "Open Fields", "Building Clearing", "Vehicle Combat", "Final Circle"].map(
                (situation) => (
                  <div key={situation} className="grid grid-cols-3 gap-2 md:gap-4 mb-2 md:mb-4">
                    <div className="text-xs md:text-sm font-medium">{situation}</div>

                    {combos.map((combo) => {
                      // This would normally come from the data, using random values for demonstration
                      const rating = Math.floor(Math.random() * 5) + 1

                      return (
                        <div key={`${combo.id}-${situation}`} className="flex justify-center">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full mx-0.5 ${i < rating ? "bg-amber-500" : "bg-zinc-700"}`}
                              ></div>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ),
              )}

              <div className="text-xs md:text-sm text-zinc-400 mt-2">
                <p>Ratings are based on community feedback and professional player recommendations.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

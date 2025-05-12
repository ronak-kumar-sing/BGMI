"use client"

import { Check, ChevronDown, ChevronUp, Info } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { WeaponCombo } from "@/types/weapon-combo"
import { RecoilPattern } from "./recoil-pattern"

interface WeaponComboCardProps {
  combo: WeaponCombo
  isSelected: boolean
  onSelect: () => void
  compareMode: boolean
  selectionDisabled: boolean
}

export function WeaponComboCard({ combo, isSelected, onSelect, compareMode, selectionDisabled }: WeaponComboCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      className={`rounded-lg border transition-all ${isSelected
          ? "bg-amber-500/10 border-amber-500/50"
          : "bg-zinc-900/30 border-zinc-800/50 hover:border-zinc-700/70"
        } ${expanded ? "shadow-lg" : ""}`}
    >
      <div className="p-3 md:p-4">
        <div className="flex justify-between items-start mb-2 md:mb-3">
          <h3 className="font-semibold text-base md:text-lg">
            {combo.weapons[0]} + {combo.weapons[1]}
          </h3>

          {compareMode && (
            <Button
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={onSelect}
              disabled={selectionDisabled}
              className={`text-xs ${isSelected ? "bg-amber-500 text-zinc-900 hover:bg-amber-600" : "border-zinc-700"}`}
            >
              {isSelected ? (
                <span className="flex items-center gap-1">
                  <Check className="h-3 w-3 md:h-4 md:w-4" /> Selected
                </span>
              ) : (
                "Select"
              )}
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-3">
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

        <div className="grid grid-cols-2 gap-2 md:gap-3 mb-3 md:mb-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs md:text-sm text-zinc-400">Damage</span>
              <span className="text-xs font-medium text-amber-500">{combo.damageProfile.overall}/100</span>
            </div>
            <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                style={{ width: `${combo.damageProfile.overall}%` }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs md:text-sm text-zinc-400">Versatility</span>
              <span className="text-xs font-medium text-amber-500">{combo.versatility}/100</span>
            </div>
            <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                style={{ width: `${combo.versatility}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex gap-1 flex-wrap">
            {combo.effectiveRanges.map((range) => (
              <Badge key={range} className="bg-amber-500/20 text-amber-500 border-amber-500/30 hover:bg-amber-500/30 text-xs px-1.5 py-0.5">
                {range}
              </Badge>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-zinc-400 hover:text-white p-1"
          >
            {expanded ? <ChevronUp className="h-3 w-3 md:h-4 md:w-4" /> : <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />}
            <span className="sr-only">{expanded ? "Show less" : "Show more"}</span>
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="px-3 md:px-4 pb-3 md:pb-4 pt-1 border-t border-zinc-800 mt-1 md:mt-2">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
            <div>
              <h4 className="text-xs md:text-sm font-medium text-zinc-300 mb-1 md:mb-2 flex items-center gap-1">
                Weapon Details
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="h-3 w-3 md:h-3.5 md:w-3.5 text-zinc-500 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent className="bg-zinc-900 border-zinc-700 text-xs">
                      <p>Recommended attachments and ammo type</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </h4>

              <div className="space-y-2 text-xs md:text-sm">
                <div className="bg-zinc-900/70 p-2 rounded border border-zinc-800">
                  <div className="font-medium text-amber-500">{combo.weapons[0]}</div>
                  <div className="text-zinc-400 text-xs">{combo.attachments[0]}</div>
                  <div className="text-zinc-500 text-xs mt-1">Ammo: {combo.ammoTypes[0]}</div>
                </div>

                <div className="bg-zinc-900/70 p-2 rounded border border-zinc-800">
                  <div className="font-medium text-amber-500">{combo.weapons[1]}</div>
                  <div className="text-zinc-400 text-xs">{combo.attachments[1]}</div>
                  <div className="text-zinc-500 text-xs mt-1">Ammo: {combo.ammoTypes[1]}</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs md:text-sm font-medium text-zinc-300 mb-1 md:mb-2">Recoil Patterns</h4>
              <div className="bg-zinc-900/70 p-2 rounded border border-zinc-800 h-[100px] md:h-[120px] flex items-center justify-center">
                <RecoilPattern patterns={combo.recoilPatterns} />
              </div>
            </div>
          </div>

          <div className="mt-3 md:mt-4">
            <h4 className="text-xs md:text-sm font-medium text-zinc-300 mb-1 md:mb-2">Range Performance</h4>
            <div className="grid grid-cols-3 gap-1 md:gap-2">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-zinc-400">Close</span>
                  <span className="text-xs font-medium text-amber-500">{combo.damageProfile.close}/100</span>
                </div>
                <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                    style={{ width: `${combo.damageProfile.close}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-zinc-400">Mid</span>
                  <span className="text-xs font-medium text-amber-500">{combo.damageProfile.mid}/100</span>
                </div>
                <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                    style={{ width: `${combo.damageProfile.mid}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-zinc-400">Long</span>
                  <span className="text-xs font-medium text-amber-500">{combo.damageProfile.long}/100</span>
                </div>
                <div className="h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                    style={{ width: `${combo.damageProfile.long}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-3 md:mt-4">
            <p className="text-xs md:text-sm text-zinc-400">{combo.description}</p>
          </div>
        </div>
      )}
    </div>
  )
}

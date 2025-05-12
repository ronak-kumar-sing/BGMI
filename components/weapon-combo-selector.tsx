"use client"

import { useState, useMemo } from "react"
import { Check, Filter, Info } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { WeaponComboCard } from "./weapon-combo-card"
import { WeaponComboCompare } from "./weapon-combo-compare"
import { weaponCombos } from "@/data/weapon-combos"

export function WeaponComboSelector() {
  const [selectedMap, setSelectedMap] = useState<string>("all")
  const [selectedPlaystyle, setSelectedPlaystyle] = useState<string>("all")
  const [selectedRange, setSelectedRange] = useState<number[]>([50])
  const [compareMode, setCompareMode] = useState<boolean>(false)
  const [selectedCombos, setSelectedCombos] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<string>("grid")

  // Get range category based on slider value
  const getRangeCategory = (value: number) => {
    if (value < 50) return "close"
    if (value < 150) return "mid"
    return "long"
  }

  const currentRangeCategory = getRangeCategory(selectedRange[0])

  // Filter combos based on selected criteria
  const filteredCombos = useMemo(() => {
    return weaponCombos.filter((combo) => {
      const mapMatch = selectedMap === "all" || combo.idealMaps.includes(selectedMap)
      const playstyleMatch = selectedPlaystyle === "all" || combo.playstyles.includes(selectedPlaystyle)
      const rangeMatch = combo.effectiveRanges.includes(currentRangeCategory)

      return mapMatch && playstyleMatch && rangeMatch
    })
  }, [selectedMap, selectedPlaystyle, currentRangeCategory])

  // Handle combo selection for comparison
  const toggleComboSelection = (comboId: string) => {
    if (selectedCombos.includes(comboId)) {
      setSelectedCombos(selectedCombos.filter((id) => id !== comboId))
    } else {
      if (selectedCombos.length < 2) {
        setSelectedCombos([...selectedCombos, comboId])
      } else {
        // Replace the first selected combo if already have 2
        setSelectedCombos([selectedCombos[1], comboId])
      }
    }
  }

  // Reset all filters
  const resetFilters = () => {
    setSelectedMap("all")
    setSelectedPlaystyle("all")
    setSelectedRange([50])
    setSelectedCombos([])
  }

  return (
    <div className="bg-zinc-800/50 border border-zinc-700/50 rounded-xl p-3 md:p-6 backdrop-blur-sm">
      {/* Filter Controls */}
      <div className="mb-6 md:mb-8 space-y-4 md:space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-lg md:text-xl font-semibold flex items-center gap-2">
            <Filter className="h-4 w-4 md:h-5 md:w-5 text-amber-500" />
            Filter Weapon Combos
          </h2>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="text-zinc-400 border-zinc-700 hover:bg-zinc-700/50 text-xs md:text-sm"
            >
              Reset Filters
            </Button>

            <Button
              variant={compareMode ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setCompareMode(!compareMode)
                if (!compareMode) {
                  setActiveTab("grid")
                }
                if (compareMode) {
                  setSelectedCombos([])
                }
              }}
              className={
                compareMode
                  ? "bg-amber-500 text-zinc-900 hover:bg-amber-600 text-xs md:text-sm"
                  : "text-zinc-400 border-zinc-700 hover:bg-zinc-700/50 text-xs md:text-sm"
              }
            >
              {compareMode ? "Exit Compare" : "Compare"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="map-select" className="text-xs md:text-sm text-zinc-400 mb-1 md:mb-2 block">
              Battle Map
            </Label>
            <Select value={selectedMap} onValueChange={setSelectedMap}>
              <SelectTrigger id="map-select" className="w-full bg-zinc-900/50 border-zinc-700 text-sm">
                <SelectValue placeholder="Select a map" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                <SelectItem value="all">All Maps</SelectItem>
                <SelectItem value="erangel">Erangel</SelectItem>
                <SelectItem value="miramar">Miramar</SelectItem>
                <SelectItem value="vikendi">Vikendi</SelectItem>
                <SelectItem value="sanhok">Sanhok</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-xs md:text-sm text-zinc-400 mb-1 md:mb-2 block">Playstyle</Label>
            <RadioGroup value={selectedPlaystyle} onValueChange={setSelectedPlaystyle} className="flex flex-wrap gap-2 md:gap-4">
              <div className="flex items-center space-x-1 md:space-x-2">
                <RadioGroupItem value="all" id="all" className="border-amber-500 text-amber-500 h-3 w-3 md:h-4 md:w-4" />
                <Label htmlFor="all" className="cursor-pointer text-sm">
                  All
                </Label>
              </div>
              <div className="flex items-center space-x-1 md:space-x-2">
                <RadioGroupItem value="aggressive" id="aggressive" className="border-amber-500 text-amber-500 h-3 w-3 md:h-4 md:w-4" />
                <Label htmlFor="aggressive" className="cursor-pointer text-sm">
                  Aggressive
                </Label>
              </div>
              <div className="flex items-center space-x-1 md:space-x-2">
                <RadioGroupItem value="tactical" id="tactical" className="border-amber-500 text-amber-500 h-3 w-3 md:h-4 md:w-4" />
                <Label htmlFor="tactical" className="cursor-pointer text-sm">
                  Tactical
                </Label>
              </div>
              <div className="flex items-center space-x-1 md:space-x-2">
                <RadioGroupItem value="sniper" id="sniper" className="border-amber-500 text-amber-500 h-3 w-3 md:h-4 md:w-4" />
                <Label htmlFor="sniper" className="cursor-pointer text-sm">
                  Sniper
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1 md:mb-2">
              <Label htmlFor="range-slider" className="text-xs md:text-sm text-zinc-400">
                Engagement Range
              </Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-5 w-5 md:h-6 md:w-6 text-zinc-400 hover:text-white p-0">
                      <Info className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="sr-only">Range info</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-zinc-900 border-zinc-700 text-xs md:text-sm">
                    <p>Close: &lt;50m | Mid: 50-150m | Long: &gt;150m</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="flex flex-col gap-2">
              <Slider
                id="range-slider"
                defaultValue={[50]}
                max={300}
                step={1}
                value={selectedRange}
                onValueChange={setSelectedRange}
                className="[&>span:first-child]:bg-zinc-700 [&>span:nth-child(2)]:bg-amber-500"
              />
              <div className="flex justify-between text-xs text-zinc-500">
                <span>Close</span>
                <span>Mid</span>
                <span>Long</span>
              </div>
              <div className="flex justify-center">
                <Badge variant="outline" className="bg-zinc-900/50 text-amber-500 border-amber-500/30 text-xs">
                  {selectedRange[0]}m ({currentRangeCategory})
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg md:text-xl font-semibold">
            Results <span className="text-xs md:text-sm text-zinc-400 ml-1 md:ml-2">({filteredCombos.length} combos)</span>
          </h2>
        </div>

        {compareMode ? (
          <WeaponComboCompare
            selectedCombos={selectedCombos}
            allCombos={weaponCombos}
            onSelectCombo={toggleComboSelection}
          />
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="flex justify-end mb-2 md:mb-4">
              <TabsList className="bg-zinc-900/50 border border-zinc-700/50">
                <TabsTrigger
                  value="grid"
                  className="data-[state=active]:bg-amber-500 data-[state=active]:text-zinc-900 text-xs md:text-sm py-1 px-2 md:py-2 md:px-3"
                >
                  Grid
                </TabsTrigger>
                <TabsTrigger
                  value="list"
                  className="data-[state=active]:bg-amber-500 data-[state=active]:text-zinc-900 text-xs md:text-sm py-1 px-2 md:py-2 md:px-3"
                >
                  List
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid" className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {filteredCombos.map((combo) => (
                  <WeaponComboCard
                    key={combo.id}
                    combo={combo}
                    isSelected={selectedCombos.includes(combo.id)}
                    onSelect={() => toggleComboSelection(combo.id)}
                    compareMode={compareMode}
                    selectionDisabled={selectedCombos.length >= 2 && !selectedCombos.includes(combo.id)}
                  />
                ))}
              </div>

              {filteredCombos.length === 0 && (
                <div className="text-center py-8 md:py-12 text-zinc-500">
                  <p>No weapon combinations match your criteria.</p>
                  <Button variant="link" onClick={resetFilters} className="text-amber-500 hover:text-amber-400 mt-2">
                    Reset filters
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              <div className="space-y-2 md:space-y-3">
                {filteredCombos.map((combo) => (
                  <div
                    key={combo.id}
                    className={`flex items-center gap-4 p-3 rounded-lg border ${selectedCombos.includes(combo.id)
                        ? "bg-amber-500/10 border-amber-500/50"
                        : "bg-zinc-900/30 border-zinc-800/50"
                      } transition-colors`}
                  >
                    <div className="flex-1">
                      <div className="font-medium">
                        {combo.weapons[0]} + {combo.weapons[1]}
                      </div>
                      <div className="text-sm text-zinc-400">{combo.description.substring(0, 60)}...</div>
                    </div>

                    <div className="flex items-center gap-2">
                      {combo.effectiveRanges.map((range) => (
                        <Badge key={range} variant="outline" className="bg-zinc-900/50 text-zinc-300 border-zinc-700">
                          {range}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className={`min-w-24 ${selectedCombos.includes(combo.id)
                          ? "bg-amber-500 text-zinc-900 hover:bg-amber-600 border-amber-500"
                          : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border-zinc-700"
                        }`}
                      onClick={() => toggleComboSelection(combo.id)}
                      disabled={selectedCombos.length >= 2 && !selectedCombos.includes(combo.id)}
                    >
                      {selectedCombos.includes(combo.id) ? (
                        <span className="flex items-center gap-1">
                          <Check className="h-4 w-4" /> Selected
                        </span>
                      ) : (
                        "Select"
                      )}
                    </Button>
                  </div>
                ))}

                {filteredCombos.length === 0 && (
                  <div className="text-center py-8 md:py-12 text-zinc-500">
                    <p>No weapon combinations match your criteria.</p>
                    <Button variant="link" onClick={resetFilters} className="text-amber-500 hover:text-amber-400 mt-2">
                      Reset filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}

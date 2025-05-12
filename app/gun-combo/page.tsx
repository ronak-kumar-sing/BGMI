import { WeaponComboSelector } from "@/components/weapon-combo-selector"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 text-white">
      <div className="container mx-auto px-3 md:px-4 py-6 md:py-12">
        <div className="text-center mb-6 md:mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4">
            BGMI <span className="text-amber-500">Weapon Combo</span> Selector
          </h1>
          <p className="text-zinc-400 text-sm md:text-base max-w-2xl mx-auto px-2">
            Find the perfect weapon combination based on your map, playstyle, and preferred engagement range.
          </p>
        </div>

        <WeaponComboSelector />
      </div>
    </main>
  )
}

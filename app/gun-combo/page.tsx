import { WeaponComboSelector } from "@/components/weapon-combo-selector"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-zinc-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            BGMI <span className="text-amber-500">Weapon Combo</span> Selector
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            Find the perfect weapon combination based on your map, playstyle, and preferred engagement range.
          </p>
        </div>

        <WeaponComboSelector />
      </div>
    </main>
  )
}

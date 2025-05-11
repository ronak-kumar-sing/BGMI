import { SettingsAdvisor } from "@/components/settings-advisor"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function SettingsAdvisorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A]">
      <Header />
      <div className="pt-20">
        <SettingsAdvisor />
      </div>
      <Footer />
    </main>
  )
}

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AISensitivityGenerator } from "@/components/ai-sensitivity-generator"
import { ToastProvider } from "@/components/ui/use-toast"

export const metadata = {
  title: "AI Sensitivity Generator | BGMI Settings Advisor",
  description: "Get AI-optimized sensitivity settings tailored to your device, playstyle, and preferences.",
}

export default function AISensitivityPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A]">
      <ToastProvider>
        <Header />
        <div className="pt-24">
          <AISensitivityGenerator />
        </div>
        <Footer />
      </ToastProvider>
    </main>
  )
}

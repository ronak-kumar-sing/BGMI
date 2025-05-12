"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, Globe, Sparkles, Sliders } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [language, setLanguage] = useState("English")

  const languages = ["English", "हिंदी", "தமிழ்", "తెలుగు"]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-yellow-500/20">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/bgmi-logo.png" height={40} width={150} alt="BGMI Logo" />
          {/* <span className="font-bold text-yellow-500 text-xl tracking-wider">BGMI INDIA</span> */}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#features" className="text-white hover:text-yellow-500 transition-colors font-medium">
            Features
          </Link>
          <Link href="/#weapons" className="text-white hover:text-yellow-500 transition-colors font-medium">
            Weapons
          </Link>
          <Link href="/#tournaments" className="text-white hover:text-yellow-500 transition-colors font-medium">
            Tournaments
          </Link>
          <Link href="/#community" className="text-white hover:text-yellow-500 transition-colors font-medium">
            Community
          </Link>
          <Link
            href="/settings-advisor"
            className="text-white hover:text-yellow-500 transition-colors font-medium flex items-center gap-1"
          >
            <Sliders className="h-4 w-4" />
            Settings Advisor
          </Link>
          <Link
            href="/ai-sensitivity"
            className="text-yellow-500 hover:text-yellow-400 transition-colors font-medium flex items-center gap-1"
          >
            <Sparkles className="h-4 w-4" />
            AI Generator
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 text-white">
                <Globe className="h-4 w-4" />
                {language}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang} onClick={() => setLanguage(lang)} className="cursor-pointer">
                  {lang}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="https://play.google.com/store/apps/details?id=com.pubg.imobile&hl=en_IN">
            <Button className="bg-yellow-500 text-brown-900 hover:bg-yellow-400">Download Now</Button>
          </Link>
        </nav>

        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/95 border-b border-yellow-500/20 py-4">
          <nav className="container mx-auto px-4 flex flex-col gap-4">
            <Link
              href="/#features"
              className="text-white hover:text-yellow-500 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#weapons"
              className="text-white hover:text-yellow-500 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Weapons
            </Link>
            <Link
              href="/#tournaments"
              className="text-white hover:text-yellow-500 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Tournaments
            </Link>
            <Link
              href="/#community"
              className="text-white hover:text-yellow-500 transition-colors font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Community
            </Link>
            <Link
              href="/settings-advisor"
              className="text-white hover:text-yellow-500 transition-colors font-medium py-2 flex items-center gap-1"
              onClick={() => setIsMenuOpen(false)}
            >
              <Sliders className="h-4 w-4" />
              Settings Advisor
            </Link>
            <Link
              href="/ai-sensitivity"
              className="text-yellow-500 hover:text-yellow-400 transition-colors font-medium py-2 flex items-center gap-1"
              onClick={() => setIsMenuOpen(false)}
            >
              <Sparkles className="h-4 w-4" />
              AI Generator
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-2 text-white justify-start">
                  <Globe className="h-4 w-4" />
                  {language}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang} onClick={() => setLanguage(lang)} className="cursor-pointer">
                    {lang}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="https://play.google.com/store/apps/details?id=com.pubg.imobile&hl=en_IN">
              <Button className="bg-yellow-500 text-brown-900 hover:bg-yellow-400 mt-2">Download Now</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

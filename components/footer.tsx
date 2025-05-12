import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Youtube, Twitch } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-black border-t border-yellow-500/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image src="/bgmi-logo.png" height={40} width={150} alt="BGMI Logo" />
              {/* <span className="font-bold text-yellow-500 text-xl tracking-wider">BGMI INDIA</span> */}
            </Link>
            <p className="text-gray-400 mb-6">
              The official website for Battlegrounds Mobile India. Experience the ultimate battle royale game designed
              exclusively for Indian gamers.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.facebook.com/BattlegroundsMobileIN/" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://www.instagram.com/_ronak.kumar" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://x.com/bgmi_official?lang=bn" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="https://www.youtube.com/@BattlegroundsMobile_IN" className="text-gray-400 hover:text-yellow-500 transition-colors">
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Download Game
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Patch Notes
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Tournaments
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Esports
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-lg mb-6">Community</h3>
            <ul className="space-y-3">
              <li>
                <Link href="https://discord.com/invite/battlegroundsmobilein" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Discord Server
                </Link>
              </li>
              <li>
                <Link href="https://www.instagram.com/_ronak.kumar" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Forums
                </Link>
              </li>
              <li>
                <Link href="https://x.com/bgmi_official?lang=bn" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Content Creators
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Fan Art
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Merchandise
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  BGMI Diaries
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white text-lg mb-6">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Fair Play Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Content Guidelines
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-yellow-500 transition-colors">
                  Playtime Limit Notice
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-yellow-500/20 mt-12 pt-8 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} KRAFTON, Inc. All rights reserved. BATTLEGROUNDS MOBILE INDIA and BGMI are
            registered trademarks of KRAFTON, Inc.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            This website is designed for users in India. Game contains age restrictions and requires internet
            connection.
          </p>
        </div>
      </div>
    </footer>
  )
}

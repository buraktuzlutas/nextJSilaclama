import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Phone, Mail, Facebook, Twitter, Linkedin, MapPin, MessageCircle } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-950 border-b">
      {/* Üst Bar - İletişim ve Sosyal Medya */}
      <div className="bg-[#2E7D32] text-white py-2">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link
              href="tel:+905309456325"
              className="flex items-center space-x-2 hover:text-white/80 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">+90 530 945 63 25</span>
            </Link>
            <Link
              href="https://wa.me/905309456325"
              target="_blank"
              className="flex items-center space-x-2 hover:text-white/80 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">WhatsApp İletişim</span>
            </Link>
            <div className="hidden lg:flex items-center space-x-2">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm">İstasyon Mahallesi, Nergiz Sokak No:8/B, 06934 Sincan/Ankara</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="#" className="hover:text-white/80 transition-colors">
              <Facebook className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-white/80 transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-white/80 transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Ana Header - Logo ve Menü */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-32 flex items-center justify-between">
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/logo.jpg"
            alt="Peston İlaçlama Logo"
            width={350}
            height={110}
            className="object-contain h-[110px]"
            priority
          />
        </Link>

        <div className="flex items-center space-x-12">
          <nav className="flex items-center space-x-8 text-lg font-medium text-gray-700">
            <Link
              href="/"
              className="hover:text-[#2E7D32] transition-colors"
            >
              Ana Sayfa
            </Link>
            <Link
              href="/ilaclama-dezenfeksiyon"
              className="hover:text-[#2E7D32] transition-colors"
            >
              İlaçlama ve Dezenfeksiyon
            </Link>
            <Link
              href="/peyzaj-hizmetleri"
              className="hover:text-[#2E7D32] transition-colors"
            >
              Peyzaj Hizmetleri
            </Link>
            <Link
              href="/hakkimizda"
              className="hover:text-[#2E7D32] transition-colors"
            >
              Hakkımızda
            </Link>
            <Link
              href="/iletisim"
              className="hover:text-[#2E7D32] transition-colors"
            >
              İletişim
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Button
              asChild
              className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-8 py-6 text-lg"
            >
              <Link href="/teklif-al">Teklif Al</Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  )
} 
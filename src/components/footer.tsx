"use client";

import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowUpCircle, Mail, MapPin, Phone } from "lucide-react"
import { useEffect, useState } from "react"

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1a472a] text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo ve Hakkında */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-4">
              <div className="relative w-24 h-24">
                <Image 
                  src="/logo.jpg" 
                  alt="PestON Logo" 
                  fill
                  className="object-contain"
                  priority 
                />
              </div>
            </Link>
            <p className="text-gray-300 mb-4">
              Profesyonel ilaçlama ve peyzaj hizmetleri ile yaşam alanlarınızı daha sağlıklı ve güzel hale getiriyoruz.
            </p>
          </div>

          {/* Hizmetlerimiz */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Hizmetlerimiz</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/ilaclama-dezenfeksiyon" className="text-gray-300 hover:text-white transition">
                  İlaçlama ve Dezenfeksiyon
                </Link>
              </li>
              <li>
                <Link href="/peyzaj-hizmetleri" className="text-gray-300 hover:text-white transition">
                  Peyzaj Hizmetleri
                </Link>
              </li>
            </ul>
          </div>

          {/* Kurumsal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Kurumsal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/hakkimizda" className="text-gray-300 hover:text-white transition">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/iletisim" className="text-gray-300 hover:text-white transition">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/teklif-al" className="text-gray-300 hover:text-white transition">
                  Teklif Al
                </Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h3 className="text-lg font-semibold mb-4">İletişim Bilgileri</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <Phone size={18} className="text-gray-300" />
                <a href="tel:05309456325" className="text-gray-300 hover:text-white transition">
                  0530 945 63 25
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={18} className="text-gray-300" />
                <a href="mailto:info@peston.com.tr" className="text-gray-300 hover:text-white transition">
                  info@peston.com.tr
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={18} className="text-gray-300 mt-1" />
                <address className="text-gray-300 not-italic">
                  İstasyon Mahallesi, Nergiz Sokak No:8/B, 06934 Sincan/Ankara
                </address>
              </li>
            </ul>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>© {new Date().getFullYear()} PestON. Tüm hakları saklıdır.</p>
        </div>
      </div>

      {/* Yukarı Çık Butonu */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 bg-[#1a472a] p-2 rounded-full shadow-lg transition-opacity duration-300 hover:bg-[#2c6e43] ${
          showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Yukarı çık"
      >
        <ArrowUpCircle size={32} className="text-white" />
      </button>
    </footer>
  )
} 
import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { CheckCircle, Shield, Award, Medal } from "lucide-react"
import { HeroSlider } from "@/components/hero-slider"
import { Testimonials } from "@/components/testimonials"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Ankara İlaçlama ve Dezenfeksiyon Hizmetleri | PestON İlaçlama",
  description: "Ankara'da profesyonel ilaçlama ve dezenfeksiyon hizmetleri. Böcek, fare, haşere ilaçlama ve dezenfeksiyon işlemleri için hemen teklif alın. TSE belgeli, %100 garantili hizmet.",
  keywords: [
    "Ankara ilaçlama firması",
    "Sincan böcek ilaçlama",
    "garantili ilaçlama Ankara",
    "ev ilaçlama Ankara",
    "işyeri ilaçlama Ankara",
    "fare ilaçlama Ankara",
    "hamam böceği ilaçlama",
    "dezenfeksiyon hizmeti",
    "profesyonel ilaçlama",
    "TSE belgeli ilaçlama Ankara"
  ],
  openGraph: {
    title: "PestON Çevre Sağlığı | Ankara İlaçlama ve Dezenfeksiyon Hizmetleri",
    description: "Ankara'da profesyonel ilaçlama, dezenfeksiyon ve peyzaj hizmetleri. 7 yıllık tecrübe, Sağlık Bakanlığı ruhsatlı ve TSE belgeli hizmet.",
  }
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Slider Section */}
      <div className="w-full">
        <HeroSlider />
      </div>

      {/* Neden Biz Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Neden Peston İlaçlama?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[#2E7D32]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Bakanlık Onaylı</h3>
              <p className="text-gray-600">Sağlık Bakanlığı ruhsatlı ilaçlama hizmeti</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-[#2E7D32]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">7 Yıllık Tecrübe</h3>
              <p className="text-gray-600">Uzman kadro ve profesyonel ekipman</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-4">
                <Medal className="w-8 h-8 text-[#2E7D32]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">TSE Belgeli</h3>
              <p className="text-gray-600">Kalite standartlarına uygun hizmet</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-[#2E7D32]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">%100 Garanti</h3>
              <p className="text-gray-600">6 ay garantili ilaçlama hizmeti</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hizmetlerimiz Section */}
      <section className="py-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Hizmetlerimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group relative h-[400px] overflow-hidden rounded-xl">
              <Image
                src="/acik-alan-ilaclama.png"
                alt="Açık Alan İlaçlama"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Açık Alan İlaçlama</h3>
                <p className="text-white/90 mb-4">
                  Bahçe, site ve açık alanlar için profesyonel ilaçlama hizmeti
                </p>
                <Button 
                  asChild
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  <Link href="/hizmetler/acik-alan">Detaylı Bilgi</Link>
                </Button>
              </div>
            </div>
            <div className="group relative h-[400px] overflow-hidden rounded-xl">
              <Image
                src="/kapali-alan-ilaclama.png"
                alt="Kapalı Alan İlaçlama"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Kapalı Alan İlaçlama</h3>
                <p className="text-white/90 mb-4">
                  Ev, ofis ve işyerleri için garantili ilaçlama çözümleri
                </p>
                <Button 
                  asChild
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  <Link href="/hizmetler/kapali-alan">Detaylı Bilgi</Link>
                </Button>
              </div>
            </div>
            <div className="group relative h-[400px] overflow-hidden rounded-xl">
              <Image
                src="/profesiyonel-acik-alan-ilaclama.png"
                alt="Dezenfeksiyon"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <h3 className="text-2xl font-bold text-white mb-2">Dezenfeksiyon</h3>
                <p className="text-white/90 mb-4">
                  Sağlıklı ve hijyenik ortamlar için dezenfeksiyon hizmeti
                </p>
                <Button 
                  asChild
                  className="bg-white/20 hover:bg-white/30 text-white"
                >
                  <Link href="/hizmetler/dezenfeksiyon">Detaylı Bilgi</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#2E7D32] text-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Profesyonel İlaçlama Hizmeti İçin Bize Ulaşın
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Size özel çözümler için hemen teklif alın
          </p>
          <Button 
            asChild
            className="bg-white text-[#2E7D32] hover:bg-white/90 px-8 py-6 text-lg"
          >
            <Link href="/teklif-al">Ücretsiz Keşif ve Fiyat Teklifi</Link>
          </Button>
        </div>
      </section>

      <div className="w-full">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <Testimonials />
        </div>
      </div>
    </main>
  )
} 
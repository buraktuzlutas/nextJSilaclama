import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Leaf, Flower2, TreePine, Shovel, Sprout, PlaneTakeoff } from "lucide-react"
import type { Metadata } from "next"

const services = [
  {
    icon: <TreePine className="w-8 h-8 text-[#2E7D32]" />,
    title: "Ağaçlandırma ve Bitkilendirme",
    description: "Profesyonel ekibimizle mekanınıza uygun ağaç ve bitki seçimi, dikimi ve bakımı",
    features: [
      "Ağaç dikimi ve transplantasyon",
      "Mevsimlik çiçek uygulamaları",
      "Çim alan tesisi",
      "Otomatik sulama sistemleri"
    ]
  },
  {
    icon: <Flower2 className="w-8 h-8 text-[#2E7D32]" />,
    title: "Bahçe Düzenleme",
    description: "Modern ve estetik bahçe tasarımları ile yaşam alanlarınızı güzelleştiriyoruz",
    features: [
      "Peyzaj projelendirme",
      "Bahçe aydınlatma",
      "Dekoratif taş uygulamaları",
      "Süs havuzu yapımı"
    ]
  },
  {
    icon: <Sprout className="w-8 h-8 text-[#2E7D32]" />,
    title: "Bakım Hizmetleri",
    description: "Düzenli bakım hizmetleri ile bahçenizin her zaman canlı ve bakımlı kalmasını sağlıyoruz",
    features: [
      "Çim biçme ve bakımı",
      "Budama işlemleri",
      "Gübreleme ve ilaçlama",
      "Mevsimsel bakım"
    ]
  }
]

const projects = [
  {
    title: "Villa Bahçesi Düzenlemesi",
    image: "/villa-bahce.png",
    description: "Modern villa bahçesi tasarımı ve uygulaması"
  },
  {
    title: "Site Peyzaj Projesi",
    image: "/site-peyzaj.png",
    description: "Geniş ölçekli site peyzaj düzenlemesi"
  },
  {
    title: "Teras Bahçe",
    image: "/teras-bahce.png",
    description: "Şehir içi teras bahçe uygulaması"
  }
]

export const metadata: Metadata = {
  title: "Ankara Peyzaj ve Bahçe Düzenleme Hizmetleri | Profesyonel Peyzaj",
  description: "Ankara'da profesyonel peyzaj ve bahçe düzenleme hizmetleri. Site, villa ve işyeri bahçe düzenlemesi, çim ekimi, sulama sistemleri. Sincan ve tüm Ankara'da uzman ekip.",
  keywords: [
    "Ankara peyzaj",
    "Sincan bahçe düzenleme",
    "profesyonel peyzaj hizmeti",
    "bahçe tasarımı Ankara",
    "çim ekimi",
    "otomatik sulama sistemleri",
    "site peyzaj düzenleme",
    "villa bahçe düzenleme",
    "peyzaj bakım hizmetleri",
    "peyzaj projelendirme"
  ],
  openGraph: {
    title: "Ankara Peyzaj ve Bahçe Düzenleme | PestON",
    description: "Ankara'da profesyonel peyzaj ve bahçe düzenleme. Site, villa ve işyeri bahçe düzenlemesi, çim ekimi, sulama sistemleri kurulumu.",
    type: "website",
    url: "https://peston.com.tr/peyzaj-hizmetleri",
  }
}

export default function PeyzajHizmetleriPage() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative -mt-[92px] h-screen w-full flex items-center justify-center">
        <Image
          src="/peyzaj-hero.png"
          alt="Peyzaj Hizmetleri"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
        <div className="relative z-10 text-center text-white max-w-[1440px] mx-auto px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">Peyzaj Hizmetleri</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Profesyonel ekibimizle hayalinizdeki bahçeyi tasarlıyor, 
            yaşam alanlarınızı yeşille buluşturuyoruz
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Services Section */}
        <section className="py-24 bg-[#F8FFF9]">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Hizmetlerimiz</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Uzman kadromuz ve modern ekipmanlarımızla tüm peyzaj ihtiyaçlarınız için yanınızdayız
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-[#E8F5E9] rounded-full flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-3">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-[#2E7D32]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Projelerimiz</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Tamamladığımız bazı projelerimiz
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="group relative h-[400px] overflow-hidden rounded-xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    quality={100}
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/90">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#2E7D32] text-white">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">
              Hayalinizdeki Bahçe İçin Bize Ulaşın
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Ücretsiz keşif ve fiyat teklifi için hemen iletişime geçin
            </p>
            <Button 
              className="bg-white text-[#2E7D32] hover:bg-white/90 px-8 py-6 text-lg"
            >
              İletişime Geçin
            </Button>
          </div>
        </section>
      </div>
    </main>
  )
} 
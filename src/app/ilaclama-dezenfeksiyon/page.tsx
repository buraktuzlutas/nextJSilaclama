import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import type { Metadata } from "next"

const services = [
  {
    title: "Açık Alan İlaçlama",
    image: "/acik-alan-ilaclama.png",
    description: "Site, bahçe ve parklar için TSE onaylı ilaçlama çözümleri",
    features: [
      "Site bahçeleri ilaçlama",
      "Park ve bahçe ilaçlama",
      "Yeşil alan ilaçlama",
      "Haşere kontrolü"
    ]
  },
  {
    title: "Kapalı Alan İlaçlama",
    image: "/kapali-alan-ilaclama.png",
    description: "Ev, ofis ve işyerleriniz için garantili ilaçlama hizmetleri",
    features: [
      "Depo ilaçlama",
      "Kapalı alan dezenfeksiyonu",
      "Haşere kontrolü",
      "Periyodik ilaçlama"
    ]
  },
  {
    title: "Dezenfeksiyon",
    image: "/profesiyonel-acik-alan-ilaclama.png",
    description: "İşyeri ve yaşam alanlarınız için profesyonel dezenfeksiyon hizmetleri",
    features: [
      "Genel mekan dezenfeksiyonu",
      "Virüs ve bakterilere karşı koruma",
      "ULV ile dezenfeksiyon",
      "Sertifikalı ürünler"
    ]
  },
  {
    title: "Ev İlaçlama",
    image: "/slider1.png",
    description: "Evler için özel ilaçlama ve koruma hizmetleri",
    features: [
      "Ev içi haşere kontrolü",
      "Güvenli ilaçlama",
      "Garantili çözümler",
      "Periyodik kontrol"
    ]
  },
  {
    title: "İşyeri İlaçlama",
    image: "/fabrika-alan-ilaclama.png",
    description: "Fabrika, depo ve endüstriyel tesisler için özel ilaçlama hizmetleri",
    features: [
      "Fabrika ilaçlama",
      "Ofis dezenfeksiyonu",
      "Endüstriyel ilaçlama",
      "Düzenli bakım"
    ]
  }
]

export const metadata: Metadata = {
  title: "Ankara Böcek ve Haşere İlaçlama Hizmetleri | Garantili İlaçlama",
  description: "Ankara'da profesyonel böcek ve haşere ilaçlama hizmetleri. Hamam böceği, fare, karınca, pire ilaçlama. Sincan ve tüm Ankara'da aynı gün müdahale, 6 ay garanti.",
  keywords: [
    "Ankara böcek ilaçlama",
    "Sincan haşere ilaçlama",
    "hamam böceği ilaçlama Ankara",
    "fare ilaçlama Sincan",
    "garantili böcek ilaçlama",
    "acil ilaçlama hizmeti",
    "aynı gün ilaçlama",
    "kokusuz ilaçlama",
    "apartman ilaçlama",
    "ev ilaçlama fiyatları"
  ],
  openGraph: {
    title: "Ankara Böcek ve Haşere İlaçlama | PestON",
    description: "Ankara'da profesyonel böcek ve haşere ilaçlama. Hamam böceği, fare, karınca, pire ilaçlama hizmetleri. 6 ay garanti.",
    type: "website",
    url: "https://peston.com.tr/ilaclama-dezenfeksiyon",
  }
}

export default function IlaclamaDezenfeksiyonPage() {
  return (
    <main className="w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold">İlaçlama ve Dezenfeksiyon Hizmetleri</h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Profesyonel ekibimiz ve modern ekipmanlarımızla ilaçlama ve dezenfeksiyon hizmetleri sunuyoruz.
          </p>
        </div>

        <div className="mt-16 grid gap-8">
          {services.map((service, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg border bg-white">
              <div className="grid md:grid-cols-2">
                <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col justify-center p-8">
                  <h2 className="text-2xl font-bold text-[#2E7D32] mb-4">{service.title}</h2>
                  <p className="text-lg text-gray-600 mb-6">{service.description}</p>
                  <ul className="grid gap-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild size="lg" className="w-fit bg-[#4CAF50] hover:bg-[#2E7D32] text-white">
                    <Link href="/teklif-al">Teklif Al</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 text-center mt-16">
          <h2 className="text-3xl font-bold">Hemen Teklif Alın</h2>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Size özel fiyat teklifimizi almak için formu doldurun
          </p>
          <Button asChild size="lg" className="mt-4 bg-[#2E7D32] hover:bg-[#1B5E20]">
            <Link href="/teklif-al">Teklif Al</Link>
          </Button>
        </div>
      </div>
    </main>
  )
} 
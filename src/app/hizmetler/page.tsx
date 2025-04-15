import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const services = [
  {
    title: "Açık Alan İlaçlama",
    image: "/acik-alan-ilaclama.png",
    description: "Bahçe, park ve açık alanlar için profesyonel ilaçlama hizmetleri",
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
    description: "İç mekanlar için güvenli ve etkili ilaçlama çözümleri",
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
    description: "Profesyonel dezenfeksiyon ve sterilizasyon hizmetleri",
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
    description: "İşletmeler için profesyonel ilaçlama hizmetleri",
    features: [
      "Fabrika ilaçlama",
      "Ofis dezenfeksiyonu",
      "Endüstriyel ilaçlama",
      "Düzenli bakım"
    ]
  }
]

export default function ServicesPage() {
  return (
    <main className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold">Hizmetlerimiz</h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Size en uygun hizmeti seçin. Tüm hizmetlerimiz garantili ve
            sigortalıdır.
          </p>
        </div>

        {/* İlaçlama ve Dezenfeksiyon Bölümü */}
        <div className="mt-24">
          <div className="flex flex-col items-center gap-4 text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2E7D32]">{services[0].title}</h2>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg">
              {services[0].description}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-lg border bg-white">
            <div className="relative h-[400px] overflow-hidden">
              <Image
                src={services[0].image}
                alt={services[0].title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <p className="text-lg mb-6 max-w-2xl">
                  {services[0].description}
                </p>
                <ul className="grid grid-cols-2 gap-4 mb-8">
                  {services[0].features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className="w-fit bg-[#4CAF50] hover:bg-[#2E7D32] text-white">
                  <Link href="/ilaclama-dezenfeksiyon">Detaylı Bilgi</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Peyzaj Hizmetleri Bölümü */}
        <div className="mt-24">
          <div className="flex flex-col items-center gap-4 text-center mb-12">
            <h2 className="text-3xl font-bold text-[#2E7D32]">{services[1].title}</h2>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-lg">
              {services[1].description}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-lg border bg-white">
            <div className="relative h-[400px] overflow-hidden">
              <Image
                src={services[1].image}
                alt={services[1].title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                <p className="text-lg mb-6 max-w-2xl">
                  {services[1].description}
                </p>
                <ul className="grid grid-cols-2 gap-4 mb-8">
                  {services[1].features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4CAF50] mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className="w-fit bg-[#4CAF50] hover:bg-[#2E7D32] text-white">
                  <Link href="/peyzaj-hizmetleri">Detaylı Bilgi</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4 text-center mt-24">
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
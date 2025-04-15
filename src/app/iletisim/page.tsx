import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import type { Metadata } from "next"

const contactInfo = [
  {
    title: "Adres",
    description: "İstasyon Mahallesi, Nergiz Sokak No:8/B, 06934 Sincan/Ankara",
    icon: MapPin,
    showMap: true,
  },
  {
    title: "Telefon",
    description: "+90 530 945 63 25",
    icon: Phone,
  },
  {
    title: "E-posta",
    description: "info@peston.com.tr",
    icon: Mail,
  },
  {
    title: "Çalışma Saatleri",
    description: "Pazartesi - Cumartesi: 09:00 - 18:00",
    icon: Clock,
  },
]

export const metadata: Metadata = {
  title: "İletişim | Ankara İlaçlama ve Peyzaj Hizmetleri İçin Bize Ulaşın",
  description: "Ankara ve Sincan'da ilaçlama, dezenfeksiyon ve peyzaj hizmetleri için 7/24 bize ulaşın. Ücretsiz keşif ve fiyat teklifi için hemen arayın: 0530 945 63 25",
  keywords: [
    "PestON iletişim",
    "Ankara ilaçlama telefon",
    "Sincan ilaçlama iletişim",
    "ilaçlama fiyat teklifi",
    "ücretsiz keşif",
    "7/24 ilaçlama hizmeti",
    "acil ilaçlama Ankara",
    "ilaçlama şirketi telefon",
    "peyzaj hizmeti iletişim",
    "Ankara böcek ilaçlama iletişim"
  ],
  openGraph: {
    title: "İletişim | PestON İlaçlama ve Peyzaj",
    description: "Ankara ve Sincan'da ilaçlama, dezenfeksiyon ve peyzaj hizmetleri için 7/24 bize ulaşın. Ücretsiz keşif ve fiyat teklifi.",
    type: "website",
    url: "https://peston.com.tr/iletisim",
  }
}

export default function IletisimPage() {
  return (
    <main className="w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-3xl font-bold">İletişim</h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Bizimle iletişime geçin, size en kısa sürede dönüş yapalım.
          </p>
        </div>

        <div className="grid gap-8 mt-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold mb-8">İletişim Bilgileri</h2>
            <div className="grid gap-6">
              {contactInfo.map((info) => (
                <div
                  key={info.title}
                  className={`group relative overflow-hidden rounded-lg border p-6 hover:border-foreground/20 transition-colors ${
                    info.showMap ? "col-span-full" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <info.icon className="h-6 w-6 text-green-600" />
                    <div className="space-y-2">
                      <h3 className="font-bold">{info.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {info.description}
                      </p>
                    </div>
                  </div>
                  {info.showMap && (
                    <div className="mt-4">
                      <div className="aspect-video w-full rounded-lg overflow-hidden border">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3061.5895543080584!2d32.58323707604741!3d39.96955494827727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d33a7f78be2aa5%3A0xbb84169bb238e004!2zxLBzdGFzeW9uLCBOZXJnaXogU2suIE5vOjggRDpiLCAwNjkzNCBTaW5jYW4vQW5rYXJh!5e0!3m2!1str!2str!4v1710700669044!5m2!1str!2str"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-8">Teklif Alın</h2>
            <p className="text-muted-foreground mb-6">
              Size özel fiyat teklifimizi almak için formu doldurun, ekibimiz en
              kısa sürede sizinle iletişime geçsin.
            </p>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/teklif-al">Teklif Al</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
} 
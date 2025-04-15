import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

const features = [
  "Profesyonel dezenfeksiyon ekipmanları",
  "Sağlık Bakanlığı onaylı dezenfektanlar",
  "Hızlı ve etkili uygulama",
  "Detaylı alan analizi",
  "Sertifikalı hizmet",
  "7/24 teknik destek",
]

export default function DisinfectionPage() {
  return (
    <main className="py-24">
      <div className="container">
        {/* Hero Section */}
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-6">Dezenfeksiyon Hizmetleri</h1>
            <p className="text-xl text-muted-foreground mb-8">
              İşyeri ve yaşam alanlarınız için profesyonel dezenfeksiyon hizmeti. 
              En son teknoloji ve sertifikalı ürünlerle virüs ve bakterilere karşı tam koruma sağlıyoruz.
            </p>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/teklif-al">Ücretsiz Keşif</Link>
            </Button>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image
              src="/profesiyonel-acik-alan-ilaclama.png"
              alt="Dezenfeksiyon Hizmetleri"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Neden Peston Dezenfeksiyon?
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-start gap-4 p-6 rounded-lg border bg-card"
              >
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                <p className="text-lg">{feature}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Services Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Dezenfeksiyon Hizmetlerimiz
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-bold mb-4">İşyeri Dezenfeksiyonu</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Ofis dezenfeksiyonu</li>
                <li>• Restoran dezenfeksiyonu</li>
                <li>• Otel dezenfeksiyonu</li>
                <li>• Market dezenfeksiyonu</li>
                <li>• Fabrika dezenfeksiyonu</li>
              </ul>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-bold mb-4">Konut Dezenfeksiyonu</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Ev dezenfeksiyonu</li>
                <li>• Apartman dezenfeksiyonu</li>
                <li>• Site dezenfeksiyonu</li>
                <li>• Villa dezenfeksiyonu</li>
                <li>• Ortak alan dezenfeksiyonu</li>
              </ul>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-bold mb-4">Özel Alan Dezenfeksiyonu</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Okul dezenfeksiyonu</li>
                <li>• Hastane dezenfeksiyonu</li>
                <li>• Spor salonu dezenfeksiyonu</li>
                <li>• AVM dezenfeksiyonu</li>
                <li>• Araç dezenfeksiyonu</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Dezenfeksiyon Sürecimiz
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 rounded-lg border bg-card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-green-600">1</span>
              </div>
              <h3 className="font-bold mb-2">Alan Analizi</h3>
              <p className="text-muted-foreground">
                Uzman ekibimiz dezenfekte edilecek alanı detaylı inceler
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-bold mb-2">Plan Hazırlama</h3>
              <p className="text-muted-foreground">
                Alan özelliklerine göre dezenfeksiyon planı hazırlanır
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-green-600">3</span>
              </div>
              <h3 className="font-bold mb-2">Uygulama</h3>
              <p className="text-muted-foreground">
                Profesyonel ekipmanlarla dezenfeksiyon yapılır
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-green-600">4</span>
              </div>
              <h3 className="font-bold mb-2">Sertifikasyon</h3>
              <p className="text-muted-foreground">
                Dezenfeksiyon sertifikası düzenlenir
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Hemen Profesyonel Destek Alın
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Yaşam ve çalışma alanlarınız için en etkili dezenfeksiyon hizmeti. 
            Ücretsiz keşif ve fiyat teklifi için hemen bize ulaşın.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/teklif-al">Teklif Al</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/iletisim">Bize Ulaşın</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
} 
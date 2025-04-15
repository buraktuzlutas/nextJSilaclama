import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

const features = [
  "Ev, ofis ve işyerleri için özel ilaçlama",
  "İnsan ve evcil hayvan sağlığına uygun ilaçlar",
  "Kokusuz ve lekesiz uygulama",
  "6 ay garanti",
  "Ücretsiz keşif",
  "Aynı gün hizmet",
]

export default function IndoorAreaPage() {
  return (
    <main className="py-24">
      <div className="container">
        {/* Hero Section */}
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-6">Kapalı Alan İlaçlama</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Ev, ofis ve işyerleriniz için güvenli ve etkili ilaçlama hizmeti. 
              Sağlık Bakanlığı onaylı ilaçlar ve deneyimli ekibimizle kalıcı çözümler sunuyoruz.
            </p>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/teklif-al">Ücretsiz Keşif</Link>
            </Button>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image
              src="/kapali-alan-ilaclama.png"
              alt="Kapalı Alan İlaçlama"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Neden Peston Kapalı Alan İlaçlama?
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
            Kapalı Alan İlaçlama Hizmetlerimiz
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-bold mb-4">Ev İlaçlama</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Hamam böceği ilaçlama</li>
                <li>• Fare ilaçlama</li>
                <li>• Karınca ilaçlama</li>
                <li>• Tahtakurusu ilaçlama</li>
                <li>• Pire ilaçlama</li>
              </ul>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-bold mb-4">İşyeri İlaçlama</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Restoran ilaçlama</li>
                <li>• Otel ilaçlama</li>
                <li>• Fabrika ilaçlama</li>
                <li>• Market ilaçlama</li>
                <li>• Depo ilaçlama</li>
              </ul>
            </div>
            <div className="p-6 rounded-lg border bg-card">
              <h3 className="text-xl font-bold mb-4">Apartman İlaçlama</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Bodrum kat ilaçlama</li>
                <li>• Çöp odası ilaçlama</li>
                <li>• Kalorifer dairesi ilaçlama</li>
                <li>• Ortak alan ilaçlama</li>
                <li>• Garaj ilaçlama</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Hemen Profesyonel Destek Alın
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Kapalı alanlarınız için en etkili ve güvenli ilaçlama hizmeti. 
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
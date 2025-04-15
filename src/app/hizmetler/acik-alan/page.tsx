import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

const features = [
  "Site, bahçe ve yeşil alanlar için özel ilaçlama",
  "TSE onaylı ve çevre dostu ilaçlar",
  "Uzman ekip ve profesyonel ekipman",
  "6 ay garanti",
  "Ücretsiz keşif",
  "7/24 teknik destek",
]

export default function OpenAreaPage() {
  return (
    <main className="py-24">
      <div className="container">
        {/* Hero Section */}
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-6">Açık Alan İlaçlama</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Site, bahçe ve açık alanlarınız için profesyonel ve garantili ilaçlama hizmeti. 
              Sağlık Bakanlığı onaylı ilaçlar ve uzman ekibimizle hizmetinizdeyiz.
            </p>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
              <Link href="/teklif-al">Ücretsiz Keşif</Link>
            </Button>
          </div>
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <Image
              src="/acik-alan-ilaclama.png"
              alt="Açık Alan İlaçlama"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Neden Peston Açık Alan İlaçlama?
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

        {/* Process Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            İlaçlama Sürecimiz
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 rounded-lg border bg-card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-green-600">1</span>
              </div>
              <h3 className="font-bold mb-2">Keşif</h3>
              <p className="text-muted-foreground">
                Uzman ekibimiz ücretsiz keşif yaparak alanı inceler
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-green-600">2</span>
              </div>
              <h3 className="font-bold mb-2">Planlama</h3>
              <p className="text-muted-foreground">
                İlaçlama yöntemi ve kullanılacak ilaçlar belirlenir
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-green-600">3</span>
              </div>
              <h3 className="font-bold mb-2">Uygulama</h3>
              <p className="text-muted-foreground">
                Profesyonel ekipmanlarla ilaçlama yapılır
              </p>
            </div>
            <div className="p-6 rounded-lg border bg-card text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-green-600">4</span>
              </div>
              <h3 className="font-bold mb-2">Kontrol</h3>
              <p className="text-muted-foreground">
                İlaçlama sonrası kontrol ve takip yapılır
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
            Açık alanlarınız için en etkili ve güvenli ilaçlama hizmeti. 
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
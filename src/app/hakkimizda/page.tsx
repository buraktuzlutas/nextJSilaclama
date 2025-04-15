import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Metadata } from "next"

const features = [
  {
    title: "Deneyimli Ekip",
    description:
      "7 yıldır sektörde hizmet veren uzman kadromuzla yanınızdayız.",
  },
  {
    title: "Profesyonel Ekipman",
    description:
      "En son teknoloji ilaçlama ekipmanları ve güvenli ilaçlar kullanıyoruz.",
  },
  {
    title: "Garantili Hizmet",
    description:
      "Tüm ilaçlama hizmetlerimiz garantili ve sigortalıdır.",
  },
  {
    title: "7/24 Hizmet",
    description:
      "Acil durumlar için 7/24 hizmet veriyoruz.",
  },
  {
    title: "Uygun Fiyat",
    description:
      "Rekabetçi fiyatlarla kaliteli hizmet sunuyoruz.",
  },
  {
    title: "Hızlı Çözüm",
    description:
      "Aynı gün içinde hizmet garantisi veriyoruz.",
  },
]

export default function HakkimizdaPage() {
  return (
    <main className="w-full">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-4xl font-bold tracking-tight">Hakkımızda</h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Profesyonel ilaçlama ve peyzaj hizmetlerinde güvenilir çözüm ortağınız
          </p>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div className="h-[600px] overflow-hidden rounded-xl">
            <Image
              src="/hakkimizda.jpeg"
              alt="Peston İlaçlama Ekibi"
              width={1920}
              height={1080}
              className="h-full w-full object-cover"
              priority
            />
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-6 text-lg leading-8 text-muted-foreground">
              <p>
                Yılların getirdiği deneyim ve uzmanlıkla içerisinde bulunduğumuz
                sektör tecrübemizin ardından 2025 yılında kurulan firmamız, alanında
                uzman ve tecrübeli personel kadrosu ile müşteri odaklı hizmet
                profilimizle faaliyet göstermekteyiz.
              </p>
              <p>
                Genç ve dinamik ekibimizin gelişmekte olan teknoloji ve sektörel
                yenilikleri yakından takip ederek, yaşam alanlarınızı hem hijyenik
                hem de sağlıklı hale getirerek kaliteli ve güvenilir çözümler
                sunmayı amaçlıyoruz.
              </p>
              <p>
                Sürekli iyileştirme ve yenilikçi yaklaşımıyla, müşterilerine en
                yüksek standartlarda hizmet sunmayı taahhüt eden bir Pest Kontrol
                hizmet firmasıdır.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <h2 className="mb-12 text-center text-3xl font-bold">Neden PestON Çevre Sağlığı?</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border bg-card p-8">
              <h3 className="mb-4 text-2xl font-bold text-green-600">VİZYONUMUZ</h3>
              <p className="text-muted-foreground">
                Sağlıklı ve güvenli yaşam alanları yaratmak için yenilikçi, çevre dostu ve 
                etkili çözümler sunarak, sektörümüzde lider olmayı ve müşteri memnuniyetini 
                her zaman ön planda tutmayı hedefliyoruz. İnsan sağlığını ve çevreyi koruyarak, 
                ileri teknoloji ve uzmanlıkla hizmet verdiğimiz her alanda güvenilir bir iş 
                ortağı olmayı amaçlıyoruz.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-8">
              <h3 className="mb-4 text-2xl font-bold text-green-600">MİSYONUMUZ</h3>
              <p className="text-muted-foreground">
                Sağlık ve güvenliği ön planda tutarak, kaliteli ve etkili ilaçlama hizmetleri 
                sunuyoruz. Müşterilerimizin yaşam alanlarını, işyerlerini ve çevrelerini 
                hijyenik, sağlıklı ve zararlılardan arındırılmış hale getirmek için bilimsel 
                yöntemler ve çevre dostu ürünlerle en iyi çözümleri sunmayı taahhüt ediyoruz. 
                Sürekli gelişen teknoloji ve uzman kadromuz ile güvenilir ve profesyonel hizmet 
                anlayışını benimseyerek, sektördeki liderliğimizi pekiştirmeyi hedefliyoruz.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 font-semibold">Deneyimli Ekip</h3>
            <p className="text-sm text-muted-foreground">
              Alanında uzman ve tecrübeli personel kadromuzla profesyonel hizmet
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 font-semibold">Müşteri Odaklı</h3>
            <p className="text-sm text-muted-foreground">
              Müşteri memnuniyeti odaklı çalışma prensibi
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 font-semibold">Modern Teknoloji</h3>
            <p className="text-sm text-muted-foreground">
              En son teknoloji ve yöntemlerle etkili çözümler
            </p>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 font-semibold">Güvenilir Hizmet</h3>
            <p className="text-sm text-muted-foreground">
              Lisanslı ve garantili ilaçlama hizmetleri
            </p>
          </div>
        </div>

        <div className="mt-24 flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold">Hemen Teklif Alın</h2>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Size özel fiyat teklifimizi almak için formu doldurun
          </p>
          <Button asChild size="lg" className="mt-4 bg-green-600 hover:bg-green-700">
            <Link href="/teklif-al">Teklif Al</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}

export const metadata: Metadata = {
  title: "Hakkımızda | Ankara'nın Güvenilir İlaçlama ve Peyzaj Firması",
  description: "7 yıllık tecrübe, TSE belgeli ve Sağlık Bakanlığı ruhsatlı profesyonel ilaçlama firması. Ankara ve Sincan'da güvenilir ilaçlama ve peyzaj hizmetleri.",
  keywords: [
    "PestON hakkında",
    "Ankara ilaçlama firması",
    "TSE belgeli ilaçlama",
    "ruhsatlı ilaçlama firması",
    "güvenilir ilaçlama şirketi",
    "Sincan ilaçlama firması",
    "profesyonel ilaçlama ekibi",
    "Ankara peyzaj firması",
    "7 yıllık tecrübe",
    "garantili hizmet"
  ],
  openGraph: {
    title: "Hakkımızda | PestON İlaçlama ve Peyzaj",
    description: "7 yıllık tecrübe, TSE belgeli ve Sağlık Bakanlığı ruhsatlı profesyonel ilaçlama firması. Ankara'nın güvenilir ilaçlama şirketi.",
    type: "website",
    url: "https://peston.com.tr/hakkimizda",
  }
} 
'use client'

import React from 'react'
import { Card } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import useEmblaCarousel from 'embla-carousel-react'

const testimonials = [
  {
    name: "Murat Aydın",
    image: "/testimonial13.jpg",
    date: "2024-03-20",
    rating: 5,
    comment: "Fabrikamızın haşere ilaçlaması için Peston ile çalıştık. Endüstriyel tesislere özel çözümleri ve profesyonel yaklaşımları ile tam istediğimiz sonucu aldık. Düzenli olarak hizmet almaya devam ediyoruz.",
  },
  {
    name: "Elif Yıldız",
    image: "/testimonial14.jpg",
    date: "2024-03-15",
    rating: 5,
    comment: "Sitemizin bahçe ilaçlaması için tercih ettik. Özellikle sivrisinek ve haşerelere karşı kullandıkları ilaçlar çok etkili oldu. Çevre dostu ürünler kullanmaları da bizim için önemliydi.",
  },
  {
    name: "Can Demir",
    image: "/testimonial15.jpg",
    date: "2024-03-08",
    rating: 5,
    comment: "Otelimizin periyodik ilaçlama hizmetini Peston'dan alıyoruz. Turizm sektörüne özel çözümleri ve hızlı müdahaleleri ile işimizi çok kolaylaştırıyorlar. Kesinlikle tavsiye ederim.",
  },
  {
    name: "Oğuz Can",
    image: "/testimonial17.jpg",
    date: "2024-03-01",
    rating: 5,
    comment: "Restoranımız için düzenli ilaçlama hizmeti alıyoruz. Gıda işletmelerine özel kullandıkları ürünler ve profesyonel ekipleri ile çok memnunuz. Her zaman temiz ve hijyenik bir ortam sağlıyorlar.",
  }
]

export function Testimonials() {
  const [emblaRef] = useEmblaCarousel({ 
    loop: true,
    dragFree: true,
    align: "start",
    containScroll: "trimSnaps",
  })

  return (
    <section className="py-24 bg-[#F8FFF9]">
      <div className="container">
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <h2 className="text-4xl font-bold">Müşteri Yorumları</h2>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Müşterilerimizin memnuniyeti bizim için en önemli referanstır
          </p>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#FFD700] text-[#FFD700]" />
              ))}
            </div>
            <span className="text-lg font-medium">5.0/5</span>
            <span className="text-muted-foreground">(124 Google Yorumu)</span>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="flex-[0_0_100%] md:flex-[0_0_45%] lg:flex-[0_0_30%] p-6 bg-white">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{testimonial.name}</h3>
                    <div className="flex items-center gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
                      ))}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <span className="text-sm text-muted-foreground">
                      {new Date(testimonial.date).toLocaleDateString('tr-TR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 line-clamp-4">{testimonial.comment}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-12">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#4285F4]">G</span>
            <span className="font-bold text-[#EA4335]">o</span>
            <span className="font-bold text-[#FBBC05]">o</span>
            <span className="font-bold text-[#4285F4]">g</span>
            <span className="font-bold text-[#34A853]">l</span>
            <span className="font-bold text-[#EA4335]">e</span>
            <span className="text-sm font-medium ml-1">Reviews</span>
          </div>
          <span className="text-sm text-muted-foreground">Tüm yorumlarımızı Google üzerinden görebilirsiniz</span>
        </div>
      </div>
    </section>
  )
} 
'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Phone, ArrowRight, Shield, Clock } from 'lucide-react'
import { useEffect } from 'react'

const slides = [
  {
    image: "/acik-alan-ilaclama.png",
    title: "Açık Alan İlaçlama",
    description: "Site, bahçe ve parklar için TSE onaylı ilaçlama çözümleri"
  },
  {
    image: "/kapali-alan-ilaclama.png",
    title: "Kapalı Alan İlaçlama",
    description: "Ev, ofis ve işyerleriniz için garantili ilaçlama hizmetleri"
  },
  {
    image: "/profesiyonel-acik-alan-ilaclama.png",
    title: "Dezenfeksiyon Hizmetleri",
    description: "İşyeri ve yaşam alanlarınız için profesyonel dezenfeksiyon hizmetleri"
  },
  {
    image: "/slider1.png",
    title: "Ev İlaçlama",
    description: "Evler için özel ilaçlama ve koruma hizmetleri"
  },
  {
    image: "/fabrika-alan-ilaclama.png",
    title: "İşyeri İlaçlama",
    description: "Fabrika, depo ve endüstriyel tesisler için özel ilaçlama hizmetleri"
  }
]

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: true,
  })

  useEffect(() => {
    if (emblaApi) {
      const interval = setInterval(() => {
        emblaApi.scrollNext()
      }, 6000) // Her 6 saniyede bir geçiş yap

      return () => clearInterval(interval)
    }
  }, [emblaApi])

  return (
    <div className="relative overflow-hidden" ref={emblaRef}>
      <div className="flex h-[700px] touch-pan-y"> {/* Yüksekliği artırdık */}
        {slides.map((slide, index) => (
          <div key={index} className="relative flex-[0_0_100%] min-w-0">
            <div className="relative h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover transform scale-105 transition-transform duration-[2s]"
                priority={index === 0}
                sizes="100vw"
                quality={95}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
              <div className="absolute inset-0">
                <div className="container mx-auto flex flex-col justify-center h-full">
                  <div className="flex items-center gap-2 mb-4 animate-slideRight">
                    <Shield className="w-6 h-6 text-[#4CAF50]" />
                    <span className="text-[#4CAF50] font-semibold tracking-wider">
                      {slide.title}
                    </span>
                  </div>
                  <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 max-w-3xl animate-slideUp leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl text-white/90 mb-8 max-w-2xl animate-fadeIn leading-relaxed">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 animate-slideUp animation-delay-300">
                    <Button 
                      asChild
                      className="bg-[#4CAF50] hover:bg-[#2E7D32] text-white px-8 py-7 text-lg group transition-all duration-300 transform hover:translate-x-2"
                    >
                      <Link href="/teklif-al" className="flex items-center">
                        Hemen Teklif Al
                        <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <Button 
                      asChild
                      variant="outline"
                      className="bg-white/10 hover:bg-white/20 text-white border-white/30 hover:border-white px-8 py-7 text-lg transition-all duration-300"
                    >
                      <Link href="/iletisim" className="flex items-center">
                        <Phone className="mr-2" />
                        Bize Ulaşın
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Slider Dots - Yeni Tasarım */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              emblaApi?.selectedScrollSnap() === index
                ? 'bg-[#4CAF50] w-8'
                : 'bg-white/40 w-2 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
} 
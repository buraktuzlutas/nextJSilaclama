"use client"

import { useEffect, useState } from "react"
import { Bug, Leaf, Droplet, CheckCircle } from "lucide-react"
import Image from "next/image"

export function LoadingAnimation() {
  const [progress, setProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    // Pulse animasyonu için interval
    const pulseInterval = setInterval(() => {
      setPulse(prev => !prev)
    }, 1000)

    // Progress animasyonu için interval
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer)
          setShowSuccess(true)
          setTimeout(() => {
            setShowContent(true)
          }, 1500)
          return 100
        }
        return prevProgress + 1.5
      })
    }, 50)

    return () => {
      clearInterval(timer)
      clearInterval(pulseInterval)
    }
  }, [])

  if (showContent) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-white to-green-50">
      <div className="relative flex flex-col items-center">
        {/* Logo ve animasyonlu arka plan */}
        <div className="mb-8 flex items-center justify-center">
          <div className="relative h-32 w-32">
            {/* Dış dairesel animasyon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`h-24 w-24 rounded-full border-4 border-t-[#2E7D32] border-r-[#2E7D32] border-b-gray-200 border-l-gray-200 animate-spin ${pulse ? 'scale-110' : 'scale-100'} transition-transform duration-1000`}></div>
            </div>
            
            {/* İç dairesel animasyon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`h-16 w-16 rounded-full border-4 border-t-[#4CAF50] border-r-[#4CAF50] border-b-gray-200 border-l-gray-200 animate-spin-reverse ${pulse ? 'scale-90' : 'scale-100'} transition-transform duration-1000`}></div>
            </div>
            
            {/* Logo */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg ${pulse ? 'scale-110' : 'scale-100'} transition-transform duration-1000`}>
                {showSuccess ? (
                  <CheckCircle className="h-6 w-6 text-[#2E7D32] animate-bounce" />
                ) : (
                  <Droplet className="h-6 w-6 text-[#2E7D32] animate-pulse" />
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Logo ve isim */}
        <div className={`mb-4 flex items-center space-x-2 ${pulse ? 'scale-105' : 'scale-100'} transition-transform duration-1000`}>
          <Bug className="h-5 w-5 text-[#2E7D32] animate-bounce" style={{ animationDelay: '0.2s' }} />
          <span className="text-2xl font-bold text-gray-800 bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] bg-clip-text text-transparent">PestON</span>
          <Leaf className="h-5 w-5 text-[#2E7D32] animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
        
        {/* Alt başlık */}
        <div className="mb-2 text-sm font-medium text-gray-600">Çevre Sağlığı Hizmetleri</div>
        
        {/* Progress bar */}
        <div className="h-3 w-72 overflow-hidden rounded-full bg-gray-200 shadow-inner">
          <div 
            className="h-full rounded-full bg-gradient-to-r from-[#2E7D32] via-[#4CAF50] to-[#2E7D32] animate-gradient-x" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        {/* Durum mesajı */}
        <div className="mt-3 text-sm font-medium text-gray-500">
          {progress < 30 && "Haşere kontrolü yapılıyor..."}
          {progress >= 30 && progress < 60 && "Peyzaj düzenlemesi hazırlanıyor..."}
          {progress >= 60 && progress < 90 && "Dezenfeksiyon işlemi uygulanıyor..."}
          {progress >= 90 && !showSuccess && "Siteniz hazırlanıyor..."}
          {showSuccess && "Siteniz başarıyla yüklendi!"}
        </div>
        
        {/* Yüzde göstergesi */}
        <div className="mt-2 text-xs font-bold text-[#2E7D32]">
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  )
} 
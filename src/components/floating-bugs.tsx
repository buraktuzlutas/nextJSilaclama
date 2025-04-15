"use client"

import { useEffect, useState } from 'react'
import { Bug } from 'lucide-react'

interface BugPosition {
  id: number
  x: number
  y: number
  rotation: number
  type: 'ant' | 'ladybug'
  direction: 'left' | 'right' | 'top' | 'bottom'
  isEscaping: boolean
  isVisible: boolean
}

export function FloatingBugs() {
  const [bugs, setBugs] = useState<BugPosition[]>([
    {
      id: 1,
      x: -50,
      y: Math.random() * window.innerHeight,
      rotation: 0,
      type: 'ant',
      direction: 'right',
      isEscaping: false,
      isVisible: false
    },
    {
      id: 2,
      x: window.innerWidth + 50,
      y: Math.random() * window.innerHeight,
      rotation: 180,
      type: 'ladybug',
      direction: 'left',
      isEscaping: false,
      isVisible: false
    }
  ])

  useEffect(() => {
    // Rastgele aralıklarla böcekleri göster
    const showInterval = setInterval(() => {
      const shouldShow = Math.random() < 0.3 // %30 ihtimalle
      if (shouldShow) {
        setBugs(prevBugs => {
          return prevBugs.map(bug => {
            if (!bug.isVisible) {
              // Rastgele bir yön seç
              const directions: ('left' | 'right' | 'top' | 'bottom')[] = ['left', 'right', 'top', 'bottom']
              const newDirection = directions[Math.floor(Math.random() * directions.length)]
              
              // Yöne göre başlangıç pozisyonu belirle
              let newX = bug.x
              let newY = bug.y
              let newRotation = 0
              
              switch(newDirection) {
                case 'right':
                  newX = -50
                  newY = Math.random() * (window.innerHeight - 100) + 50
                  newRotation = 0
                  break
                case 'left':
                  newX = window.innerWidth + 50
                  newY = Math.random() * (window.innerHeight - 100) + 50
                  newRotation = 180
                  break
                case 'bottom':
                  newX = Math.random() * (window.innerWidth - 100) + 50
                  newY = -50
                  newRotation = 90
                  break
                case 'top':
                  newX = Math.random() * (window.innerWidth - 100) + 50
                  newY = window.innerHeight + 50
                  newRotation = 270
                  break
              }
              
              return {
                ...bug,
                x: newX,
                y: newY,
                rotation: newRotation,
                direction: newDirection,
                isVisible: true
              }
            }
            return bug
          })
        })
      }
    }, 5000) // Her 5 saniyede bir kontrol et

    // Böcekleri hareket ettir
    const moveInterval = setInterval(() => {
      setBugs(prevBugs => 
        prevBugs.map(bug => {
          if (!bug.isVisible) return bug

          const speed = bug.type === 'ant' ? 4 : 3
          let newX = bug.x
          let newY = bug.y

          switch(bug.direction) {
            case 'right':
              newX += speed
              break
            case 'left':
              newX -= speed
              break
            case 'bottom':
              newY += speed
              break
            case 'top':
              newY -= speed
              break
          }

          // Ekrandan çıktı mı kontrol et
          if (newX < -100 || newX > window.innerWidth + 100 || 
              newY < -100 || newY > window.innerHeight + 100) {
            return {
              ...bug,
              isVisible: false
            }
          }

          return {
            ...bug,
            x: newX,
            y: newY
          }
        })
      )
    }, 50)

    return () => {
      clearInterval(showInterval)
      clearInterval(moveInterval)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {bugs.map(bug => (
        <div
          key={bug.id}
          className={`absolute transition-all duration-500 ${bug.isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transform: `translate(${bug.x}px, ${bug.y}px) rotate(${bug.rotation}deg)`,
            willChange: 'transform'
          }}
        >
          <Bug 
            className={`w-5 h-5 ${bug.type === 'ant' ? 'text-gray-800' : 'text-red-500'}`}
            style={{ 
              filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.1))',
              transform: `scale(${bug.type === 'ladybug' ? 1.2 : 1})`
            }}
          />
        </div>
      ))}
    </div>
  )
} 
"use client"

import { useState } from "react"

export function WhatsAppButton() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {isHovered && (
        <div className="animate-in fade-in slide-in-from-right-2 duration-200 rounded-lg bg-white p-3 shadow-lg">
          <p className="text-sm font-medium text-gray-700">
            Size nasıl yardımcı olabiliriz?
          </p>
        </div>
      )}
      <a
        href="https://wa.me/905309456325"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:bg-[#128C7E] sm:h-16 sm:w-16"
        aria-label="WhatsApp ile iletişime geçin"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-8 w-8 sm:h-9 sm:w-9"
        >
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.964 9.964 0 0 0 1.333 4.993L2 22l5.233-1.237a9.994 9.994 0 0 0 4.773 1.216h.004c5.505 0 9.988-4.477 9.989-9.984 0-2.669-1.037-5.176-2.922-7.062A9.935 9.935 0 0 0 12.012 2zm-.004 2c2.227 0 4.32.869 5.893 2.442a8.306 8.306 0 0 1 2.442 5.892c-.001 4.59-3.737 8.324-8.327 8.324a8.32 8.32 0 0 1-4.012-1.024l-.717-.384-.745.175-2.065.487.506-1.87.188-.693-.403-.77a8.295 8.295 0 0 1-1.113-4.157c0-4.59 3.737-8.322 8.327-8.322zm-3.28 4.56c-.17 0-.343.015-.502.043-.263.046-.545.27-.717.537-.172.268-.575.893-.575 2.176 0 1.283.933 2.524 1.062 2.697.13.172 1.804 2.895 4.451 3.934 2.197.865 2.647.693 3.123.65.477-.043 1.54-.63 1.756-1.24.216-.607.216-1.13.151-1.239-.064-.108-.238-.172-.502-.302-.261-.13-1.54-.76-1.779-.847-.238-.086-.413-.13-.587.13-.173.261-.674.847-.827 1.02-.152.172-.304.194-.566.064-.26-.13-1.106-.407-2.107-1.297-.778-.693-1.303-1.553-1.456-1.814-.152-.262-.016-.403.115-.534.118-.117.26-.303.391-.455.13-.151.174-.26.26-.433.087-.172.044-.324-.02-.455-.065-.13-.584-1.41-.802-1.932-.195-.472-.39-.385-.564-.392-.152-.007-.325-.007-.498-.007z" />
        </svg>
      </a>
    </div>
  )
} 
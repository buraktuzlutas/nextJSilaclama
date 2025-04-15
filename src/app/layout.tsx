import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Header } from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "react-hot-toast"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { FloatingBugs } from "@/components/floating-bugs"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "PestON İlaçlama | Ankara İlaçlama ve Dezenfeksiyon Hizmetleri",
    template: "%s | PestON İlaçlama Ankara"
  },
  description: "Ankara'nın güvenilir ilaçlama firması. Böcek ilaçlama, fare ilaçlama, haşere ilaçlama, dezenfeksiyon ve peyzaj hizmetleri. TSE belgeli, garantili ilaçlama hizmeti.",
  keywords: [
    "Ankara ilaçlama",
    "Sincan ilaçlama",
    "böcek ilaçlama Ankara",
    "fare ilaçlama",
    "haşere ilaçlama",
    "dezenfeksiyon Ankara",
    "garantili ilaçlama",
    "TSE belgeli ilaçlama",
    "ev ilaçlama",
    "işyeri ilaçlama",
    "peyzaj hizmetleri",
    "PestON"
  ],
  authors: [{ name: "PestON İlaçlama" }],
  creator: "PestON İlaçlama",
  publisher: "PestON İlaçlama",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: "https://peston.com.tr",
    siteName: "PestON İlaçlama",
    title: "PestON İlaçlama | Ankara İlaçlama ve Dezenfeksiyon Hizmetleri",
    description: "Ankara'nın güvenilir ilaçlama firması. Profesyonel böcek, fare ve haşere ilaçlama hizmetleri. TSE belgeli, %100 garantili.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PestON İlaçlama Ankara",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PestON İlaçlama | Ankara İlaçlama ve Dezenfeksiyon Hizmetleri",
    description: "Ankara'nın güvenilir ilaçlama firması. Profesyonel böcek, fare ve haşere ilaçlama hizmetleri. TSE belgeli, %100 garantili.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "Google doğrulama kodu buraya gelecek",
  },
  alternates: {
    canonical: "https://peston.com.tr",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <Header />
          <div className="pt-[156px]">
            {children}
          </div>
          <Footer />
          <WhatsAppButton />
          <FloatingBugs />
        </ThemeProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  )
} 
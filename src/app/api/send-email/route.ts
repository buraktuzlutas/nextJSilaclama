import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

export async function POST(req: Request) {
  try {
    const data = await req.json()

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const formatDate = (date: string) => {
      return format(new Date(date), "d MMMM yyyy", { locale: tr })
    }

    const mailBody = `
      <h2>Yeni İlaçlama Teklifi</h2>
      
      <h3>Mekan Bilgileri</h3>
      <p><strong>Mekan Tipi:</strong> ${data.placeType}</p>
      <p><strong>Alan:</strong> ${data.area} m²</p>
      
      <h3>Haşere Türleri</h3>
      <p>${data.pestTypes.join(", ")}</p>
      
      <h3>Konum Bilgileri</h3>
      <p><strong>Şehir:</strong> ${data.city}</p>
      <p><strong>İlçe:</strong> ${data.district}</p>
      
      <h3>Kişisel Bilgiler</h3>
      <p><strong>Ad Soyad:</strong> ${data.name}</p>
      <p><strong>Telefon:</strong> ${data.phone}</p>
      <p><strong>E-posta:</strong> ${data.email}</p>
      
      <h3>Randevu Bilgileri</h3>
      <p><strong>Tarih:</strong> ${data.appointmentDate ? formatDate(data.appointmentDate) : "-"}</p>
      <p><strong>Saat:</strong> ${data.appointmentTime || "-"}</p>
      
      ${data.message ? `
        <h3>Ek Bilgiler</h3>
        <p>${data.message}</p>
      ` : ""}
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.SMTP_TO,
      subject: `Yeni İlaçlama Teklifi - ${data.name}`,
      html: mailBody,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email gönderme hatası:', error)
    return NextResponse.json(
      { error: 'Email gönderilemedi' },
      { status: 500 }
    )
  }
} 
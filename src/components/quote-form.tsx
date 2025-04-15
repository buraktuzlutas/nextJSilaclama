"use client"

import React, { useState, Dispatch, SetStateAction } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { tr } from "date-fns/locale"
import { 
  Calendar as CalendarIcon, 
  Check, 
  Phone, 
  MessageSquare, 
  Building2, 
  Home, 
  Building, 
  MapPin,
  Store,
  Warehouse,
  TreePine,
  Coffee,
  Bug,
  Clock,
  User,
  Mail,
  ArrowRight,
  CheckCircle2,
  MapPinned,
  ClipboardList,
  BugOff,
  Rat,
  Bird,
  Beef,
  Skull,
  Waves,
  Footprints,
  Shell,
  Microscope,
  CircleDot,
  Square,
  Send
} from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { toast } from "react-hot-toast"
import Image from "next/image"

const formSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  phone: z.string().min(10, "Telefon numarası en az 10 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  placeType: z.enum(["Konut", "Ofis", "Apartman", "Site", "Bahçe - Arazi", "Depo - Sığınak - Otopark", "Kafe ve Restoran"]),
  area: z.string().min(1, "Alan büyüklüğü gereklidir"),
  pestTypes: z.array(z.enum([
    "BİLMİYORUM",
    "PİRE",
    "TAHTA KURUSU",
    "KUŞ BİTİ",
    "AKREP",
    "ARI",
    "BİT",
    "GÜMÜŞCÜN BÖCEĞİ",
    "GÜVE",
    "HAMAM BÖCEĞİ",
    "KANALİZASYON SİNEĞİ",
    "KARINCA",
    "KENE",
    "KIRK AYAK",
    "MEYVE SİNEKLERİ",
    "SİVRİSİNEK",
    "TIRTIL",
    "TOZ AKARI",
    "UYUZ",
    "ÇIYAN",
    "ÖRÜMCEK"
  ])).min(1, "En az bir haşere türü seçilmelidir"),
  city: z.enum(["İstanbul", "Ankara"]),
  district: z.string().min(1, "İlçe seçimi gereklidir"),
  message: z.string().optional(),
  appointmentDate: z.date().nullable(),
  appointmentTime: z.string().optional()
})

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", 
  "14:00", "15:00", "16:00", "17:00"
]

const districts = {
  "İstanbul": [
    "Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler",
    "Bakırköy", "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü",
    "Beyoğlu", "Büyükçekmece", "Çatalca", "Çekmeköy", "Esenler", "Esenyurt",
    "Eyüp", "Fatih", "Gaziosmanpaşa", "Güngören", "Kadıköy", "Kâğıthane",
    "Kartal", "Küçükçekmece", "Maltepe", "Pendik", "Sancaktepe", "Sarıyer",
    "Silivri", "Sultanbeyli", "Sultangazi", "Şile", "Şişli", "Tuzla",
    "Ümraniye", "Üsküdar", "Zeytinburnu"
  ],
  "Ankara": [
    "Akyurt", "Altındağ", "Ayaş", "Bala", "Beypazarı", "Çamlıdere",
    "Çankaya", "Çubuk", "Elmadağ", "Etimesgut", "Evren", "Gölbaşı",
    "Güdül", "Haymana", "Kalecik", "Kahramankazan", "Keçiören", "Kızılcahamam",
    "Mamak", "Nallıhan", "Polatlı", "Pursaklar", "Sincan", "Şereflikoçhisar",
    "Yenimahalle"
  ]
}

const pestIcons = {
  "BİLMİYORUM": Bug,
  "HAMAM BÖCEĞİ": BugOff,
  "PİRE": Bug,
  "TAHTA KURUSU": BugOff,
  "KUŞ BİTİ": Bird,
  "AKREP": Shell,
  "ARI": Beef,
  "KARINCA": Bug,
  "SİVRİSİNEK": Bug,
  "BİT": Microscope,
  "GÜMÜŞCÜN BÖCEĞİ": BugOff,
  "GÜVE": Bug,
  "KANALİZASYON SİNEĞİ": Waves,
  "KENE": CircleDot,
  "KIRK AYAK": Footprints,
  "MEYVE SİNEKLERİ": Bug,
  "TIRTIL": Shell,
  "TOZ AKARI": Microscope,
  "UYUZ": Skull,
  "ÇIYAN": Footprints,
  "ÖRÜMCEK": CircleDot
}

const steps = [
  {
    id: 1,
    title: "Mekan Tipi",
    description: "Mekan tipini seçin",
    icon: ClipboardList,
    fields: ["placeType"]
  },
  {
    id: 2,
    title: "Alan Bilgisi",
    description: "Alan büyüklüğü",
    icon: Square,
    fields: ["area"]
  },
  {
    id: 3,
    title: "Haşere Bilgisi",
    description: "Haşere türü seçimi",
    icon: Bug,
    fields: ["pestTypes"]
  },
  {
    id: 4,
    title: "Konum Bilgisi",
    description: "Şehir ve ilçe seçimi",
    icon: MapPinned,
    fields: ["city", "district"]
  },
  {
    id: 5,
    title: "İletişim Bilgileri",
    description: "Kişisel bilgiler ve randevu",
    icon: User,
    fields: ["name", "phone", "email", "message", "appointmentDate", "appointmentTime"]
  },
  {
    id: 6,
    title: "Özet",
    description: "Bilgileri gözden geçirin",
    icon: ClipboardList,
    fields: []
  }
]

const placeTypes = [
  { value: "Konut", icon: Home, label: "Konut" },
  { value: "Ofis", icon: Building2, label: "Ofis" },
  { value: "Apartman", icon: Building, label: "Apartman" },
  { value: "Site", icon: Store, label: "Site" },
  { value: "Bahçe - Arazi", icon: TreePine, label: "Bahçe - Arazi" },
  { value: "Depo - Sığınak - Otopark", icon: Warehouse, label: "Depo - Sığınak - Otopark" },
  { value: "Kafe ve Restoran", icon: Coffee, label: "Kafe ve Restoran" }
]

interface FormData {
  name: string
  phone: string
  email: string
  address: string
  service: string
  details: string
}

interface QuoteFormProps {
  onFormSubmit?: (data: z.infer<typeof formSchema>) => void
}

export function QuoteForm({ onFormSubmit }: QuoteFormProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
      appointmentDate: null,
      appointmentTime: undefined,
      pestTypes: [],
    },
  })

  const [selectedCity, setSelectedCity] = useState<"İstanbul" | "Ankara" | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Email gönderilemedi')
      }

      toast.success('Teklifiniz başarıyla gönderildi!')
      if (onFormSubmit) {
        onFormSubmit(data)
      }
      form.reset()
      setCurrentStep(0)
    } catch (error) {
      console.error('Form gönderme hatası:', error)
      toast.error('Teklifiniz gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (date: Date | null) => {
    if (!date) return ""
    return format(date, "PPP", { locale: tr })
  }

  const nextStep = () => {
    const currentStepFields = steps[currentStep - 1].fields
    const isValid = currentStepFields.every(field => {
      const value = form.getValues(field as keyof z.infer<typeof formSchema>)
      return value !== undefined && value !== "" && value !== null
    })

    if (isValid) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length))
    } else {
      form.trigger(currentStepFields as any)
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const isLastStep = currentStep === steps.length

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    form.setValue(name, value)
  }

  const handleServiceChange = (value: string) => {
    // Implementation needed
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form.getValues())
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F8E9] to-[#E8F5E9] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="mb-4">
            <Image
              src="/logo.jpg"
              alt="Peston İlaçlama Logo"
              width={200}
              height={200}
              className="object-contain mx-auto"
              priority
            />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] bg-clip-text text-transparent">
            İlaçlama Teklifi Al
          </h2>
          <p className="text-[#558B2F] mt-2 text-lg">
            Size en uygun hizmeti sunabilmemiz için bilgilerinizi paylaşın
          </p>
          <p className="text-[#558B2F] mt-1">
            Fiyatlarımız 700 TL'den başlamaktadır
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {steps.map((step) => (
              <div key={step.id} className="flex-1">
                <div className={`relative flex flex-col items-center ${currentStep >= step.id ? 'text-[#2E7D32]' : 'text-gray-400'}`}>
                  <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mb-2 
                    ${currentStep > step.id ? 'bg-[#4CAF50] border-[#4CAF50]' : 
                      currentStep === step.id ? 'border-[#4CAF50] text-[#4CAF50]' : 
                      'border-gray-300'}`}>
                    {currentStep > step.id ? (
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    ) : (
                      <step.icon className={`w-6 h-6 ${currentStep === step.id ? 'text-[#4CAF50]' : ''}`} />
                    )}
                  </div>
                  <div className="text-sm font-medium">{step.title}</div>
                  <div className="text-xs mt-1">{step.description}</div>
                  {step.id !== steps.length && (
                    <div className={`absolute top-6 -right-1/2 w-full h-0.5 
                      ${currentStep > step.id ? 'bg-[#4CAF50]' : 'bg-gray-300'}`} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 && (
                <FormField
                  control={form.control}
                  name="placeType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1B5E20] font-medium text-2xl mb-8 block text-center">
                        Mekan Tipini Seçin
                      </FormLabel>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {placeTypes.map((option) => (
                          <Button
                            key={option.value}
                            type="button"
                            variant="outline"
                            className={cn(
                              "w-full h-44 flex flex-col items-center justify-center gap-4 relative group transition-all duration-300 rounded-2xl overflow-hidden p-0",
                              field.value === option.value 
                                ? "border-2 border-[#2E7D32] bg-gradient-to-br from-[#E8F5E9] to-white text-[#1B5E20] shadow-xl ring-4 ring-[#4CAF50]/30" 
                                : "border-gray-100 hover:border-[#2E7D32] hover:bg-gradient-to-br hover:from-[#E8F5E9]/80 hover:to-white hover:shadow-2xl hover:scale-105 hover:ring-4 hover:ring-[#4CAF50]/20"
                            )}
                            onClick={() => {
                              field.onChange(option.value)
                              nextStep()
                            }}
                          >
                            <div className={cn(
                              "w-24 h-24 rounded-2xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg",
                              field.value === option.value 
                                ? "bg-gradient-to-br from-[#2E7D32] via-[#388E3C] to-[#4CAF50]" 
                                : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 group-hover:from-[#2E7D32] group-hover:via-[#388E3C] group-hover:to-[#4CAF50]"
                            )}>
                              <option.icon className={cn(
                                "w-14 h-14 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3",
                                field.value === option.value 
                                  ? "text-white drop-shadow-lg" 
                                  : "text-gray-500 group-hover:text-white"
                              )} />
                            </div>
                            <span className="font-medium text-lg text-center px-2 transition-colors duration-300 group-hover:text-[#1B5E20]">
                              {option.label}
                            </span>
                            {field.value === option.value && (
                              <div className="absolute top-3 right-3 animate-fade-in">
                                <div className="bg-[#2E7D32] rounded-full p-1 shadow-lg">
                                  <Check className="w-5 h-5 text-white" />
                                </div>
                              </div>
                            )}
                          </Button>
                        ))}
                      </div>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              )}

              {currentStep === 2 && (
                <FormField
                  control={form.control}
                  name="area"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1B5E20] font-medium text-xl mb-6 block text-center">
                        {form.getValues("placeType")} İlaçlaması
                      </FormLabel>
                      <FormLabel className="text-[#1B5E20] font-medium text-lg mb-4 block flex items-center gap-2">
                        <Square className="w-5 h-5 text-[#2E7D32] opacity-50" />
                        İlaçlanacak Alan Kaç Metrekare?
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          placeholder="Örn: 100"
                          className="border-[#81C784] focus:border-[#2E7D32] focus:ring-[#2E7D32] h-14 text-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                      <div className="mt-6 flex justify-between">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={prevStep}
                          className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9] h-12 px-6"
                        >
                          Geri
                        </Button>
                        <Button
                          type="button"
                          onClick={nextStep}
                          disabled={!field.value}
                          className="bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] hover:from-[#1B5E20] hover:to-[#2E7D32] text-white h-12 px-6"
                        >
                          Devam
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                      </div>
                    </FormItem>
                  )}
                />
              )}

              {currentStep === 3 && (
                <FormField
                  control={form.control}
                  name="pestTypes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1B5E20] font-medium text-2xl mb-8 block text-center">
                        Haşere Türlerini Seçin
                      </FormLabel>
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                        {Object.entries(pestIcons).map(([pest, Icon]) => (
                          <Button
                            key={pest}
                            type="button"
                            variant="outline"
                            className={cn(
                              "w-full h-32 flex flex-col items-center justify-center gap-3 relative group transition-all duration-300 rounded-2xl overflow-hidden p-0",
                              field.value?.includes(pest as any)
                                ? "border-2 border-[#2E7D32] bg-gradient-to-br from-[#E8F5E9] to-white text-[#1B5E20] shadow-xl ring-4 ring-[#4CAF50]/30" 
                                : "border-gray-100 hover:border-[#2E7D32] hover:bg-gradient-to-br hover:from-[#E8F5E9]/80 hover:to-white hover:shadow-2xl hover:scale-105 hover:ring-4 hover:ring-[#4CAF50]/20"
                            )}
                            onClick={() => {
                              const value = pest as any
                              const currentValues = field.value || []
                              const newValues = currentValues.includes(value)
                                ? currentValues.filter(v => v !== value)
                                : [...currentValues, value]
                              field.onChange(newValues)
                            }}
                          >
                            <div className={cn(
                              "w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 shadow-lg",
                              field.value?.includes(pest as any)
                                ? "bg-gradient-to-br from-[#2E7D32] via-[#388E3C] to-[#4CAF50]" 
                                : "bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 group-hover:from-[#2E7D32] group-hover:via-[#388E3C] group-hover:to-[#4CAF50]"
                            )}>
                              <Icon className={cn(
                                "w-10 h-10 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3",
                                field.value?.includes(pest as any)
                                  ? "text-white drop-shadow-lg" 
                                  : "text-gray-500 group-hover:text-white"
                              )} />
                            </div>
                            <span className="font-medium text-sm text-center px-1 transition-colors duration-300 group-hover:text-[#1B5E20] line-clamp-2">
                              {pest === "BİLMİYORUM" ? "Bilmiyorum" : pest}
                            </span>
                            {field.value?.includes(pest as any) && (
                              <div className="absolute top-2 right-2 animate-fade-in">
                                <div className="bg-[#2E7D32] rounded-full p-1 shadow-lg">
                                  <Check className="w-4 h-4 text-white" />
                                </div>
                              </div>
                            )}
                          </Button>
                        ))}
                      </div>
                      <div className="mt-4 flex justify-end">
                        <Button
                          type="button"
                          onClick={nextStep}
                          disabled={!field.value?.length}
                          className="bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] hover:from-[#1B5E20] hover:to-[#2E7D32] text-white h-12 px-6 disabled:opacity-50"
                        >
                          Devam
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                      </div>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              )}

              {currentStep === 4 && (
                <>
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1B5E20] font-medium text-lg">Şehir</FormLabel>
                        <Select 
                          onValueChange={(value) => {
                            field.onChange(value)
                            setSelectedCity(value as "İstanbul" | "Ankara")
                            form.setValue("district", "")
                          }} 
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-[#81C784] focus:border-[#2E7D32] focus:ring-[#2E7D32] h-12">
                              <SelectValue placeholder="Şehir seçiniz" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="İstanbul">
                              <div className="flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-[#2E7D32]" />
                                İstanbul
                              </div>
                            </SelectItem>
                            <SelectItem value="Ankara">
                              <div className="flex items-center">
                                <MapPin className="w-5 h-5 mr-2 text-[#2E7D32]" />
                                Ankara
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1B5E20] font-medium text-lg">İlçe</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger 
                              className="border-[#81C784] focus:border-[#2E7D32] focus:ring-[#2E7D32] h-12"
                              disabled={!selectedCity}
                            >
                              <SelectValue placeholder={selectedCity ? "İlçe seçiniz" : "Önce şehir seçiniz"} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {selectedCity && districts[selectedCity].map((district) => (
                              <SelectItem key={district} value={district}>
                                {district}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-red-500" />
                      </FormItem>
                    )}
                  />

                  <div className="mt-6 flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9] h-12 px-6"
                    >
                      Geri
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!form.getValues("city") || !form.getValues("district")}
                      className="bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] hover:from-[#1B5E20] hover:to-[#2E7D32] text-white h-12 px-6"
                    >
                      Devam
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </>
              )}

              {currentStep === 5 && (
                <>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-[#1B5E20] font-medium text-lg block mb-1 flex items-center gap-2">
                          <User className="w-5 h-5 text-[#2E7D32] opacity-50" />
                          Ad Soyad
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Ad Soyad"
                            className="border-[#81C784] focus:border-[#2E7D32] focus:ring-[#2E7D32] h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-[#1B5E20] font-medium text-lg block mb-1 flex items-center gap-2">
                          <Phone className="w-5 h-5 text-[#2E7D32] opacity-50" />
                          Telefon
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="05XX XXX XX XX"
                            maxLength={11}
                            className="border-[#81C784] focus:border-[#2E7D32] focus:ring-[#2E7D32] h-12"
                            value={field.value}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9]/g, '')
                              if (value.length <= 11) {
                                field.onChange(value)
                              }
                            }}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-[#1B5E20] font-medium text-lg block mb-1 flex items-center gap-2">
                          <Mail className="w-5 h-5 text-[#2E7D32] opacity-50" />
                          E-posta
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="ornek@email.com"
                            className="border-[#81C784] focus:border-[#2E7D32] focus:ring-[#2E7D32] h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-[#1B5E20] font-medium text-lg block mb-1 flex items-center gap-2">
                          <MessageSquare className="w-5 h-5 text-[#2E7D32] opacity-50" />
                          Ek Bilgiler
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="İlaçlama yapılacak alan ve haşere yoğunluğu hakkında detaylı bilgi verebilirsiniz"
                            className="min-h-[100px] resize-none border-[#81C784] focus:border-[#2E7D32] focus:ring-[#2E7D32]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-red-500 text-sm mt-1" />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="appointmentDate"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-[#1B5E20] font-medium text-lg">Randevu Tarihi</FormLabel>
                          <div className="grid grid-cols-3 gap-2">
                            <Select 
                              onValueChange={(value) => {
                                const currentDate = field.value || new Date()
                                const newDate = new Date(currentDate)
                                newDate.setDate(parseInt(value))
                                field.onChange(newDate)
                              }}
                              value={field.value ? field.value.getDate().toString() : undefined}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Gün" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {Array.from({length: 31}, (_, i) => i + 1).map((day) => (
                                  <SelectItem key={day} value={day.toString()}>
                                    {day}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <Select 
                              onValueChange={(value) => {
                                const currentDate = field.value || new Date()
                                const newDate = new Date(currentDate)
                                newDate.setMonth(parseInt(value))
                                field.onChange(newDate)
                              }}
                              value={field.value ? field.value.getMonth().toString() : undefined}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Ay" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"].map((month, index) => (
                                  <SelectItem key={index} value={index.toString()}>
                                    {month}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <Select 
                              onValueChange={(value) => {
                                const currentDate = field.value || new Date()
                                const newDate = new Date(currentDate)
                                newDate.setFullYear(parseInt(value))
                                field.onChange(newDate)
                              }}
                              value={field.value ? field.value.getFullYear().toString() : undefined}
                            >
                              <FormControl>
                                <SelectTrigger className="h-12">
                                  <SelectValue placeholder="Yıl" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[2024, 2025].map((year) => (
                                  <SelectItem key={year} value={year.toString()}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="appointmentTime"
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormLabel className="text-[#1B5E20] font-medium text-lg">Randevu Saati</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-[#81C784] focus:border-[#2E7D32] focus:ring-[#2E7D32] h-12 pl-10 relative">
                                <Clock className="w-5 h-5 text-[#2E7D32] absolute left-3 top-3" />
                                <SelectValue placeholder="Saat seçiniz" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeSlots.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="mt-6 flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9] h-12 px-6"
                    >
                      Geri
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={!form.getValues("name") || !form.getValues("phone") || !form.getValues("email")}
                      className="bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] hover:from-[#1B5E20] hover:to-[#2E7D32] text-white h-12 px-6"
                    >
                      Devam
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </div>
                </>
              )}

              {currentStep === 6 && (
                <div className="space-y-8">
                  <h3 className="text-[#1B5E20] font-medium text-2xl mb-8 text-center">
                    Bilgilerinizi Gözden Geçirin
                  </h3>
                  
                  <div className="space-y-6 bg-gray-50 p-6 rounded-xl">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-[#1B5E20]">Mekan Bilgileri</h4>
                        <div className="mt-2 space-y-1 text-gray-600">
                          <p><span className="font-medium">Mekan Tipi:</span> {form.getValues("placeType")}</p>
                          <p><span className="font-medium">Alan:</span> {form.getValues("area")} m²</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-[#1B5E20]">Konum Bilgileri</h4>
                        <div className="mt-2 space-y-1 text-gray-600">
                          <p><span className="font-medium">Şehir:</span> {form.getValues("city")}</p>
                          <p><span className="font-medium">İlçe:</span> {form.getValues("district")}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-[#1B5E20]">Haşere Türleri</h4>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {form.getValues("pestTypes").map((pest) => (
                          <span key={pest} className="bg-[#E8F5E9] text-[#1B5E20] px-3 py-1 rounded-full text-sm">
                            {pest}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-[#1B5E20]">Kişisel Bilgiler</h4>
                        <div className="mt-2 space-y-1 text-gray-600">
                          <p><span className="font-medium">Ad Soyad:</span> {form.getValues("name")}</p>
                          <p><span className="font-medium">Telefon:</span> {form.getValues("phone")}</p>
                          <p><span className="font-medium">E-posta:</span> {form.getValues("email")}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-[#1B5E20]">Randevu Bilgileri</h4>
                        <div className="mt-2 space-y-1 text-gray-600">
                          <p><span className="font-medium">Tarih:</span> {form.getValues("appointmentDate") ? format(form.getValues("appointmentDate")!, "d MMMM yyyy", { locale: tr }) : "-"}</p>
                          <p><span className="font-medium">Saat:</span> {form.getValues("appointmentTime") || "-"}</p>
                        </div>
                      </div>
                    </div>

                    {form.getValues("message") && (
                      <div>
                        <h4 className="font-medium text-[#1B5E20]">Ek Bilgiler</h4>
                        <p className="mt-2 text-gray-600">{form.getValues("message")}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9] h-12 px-6"
                    >
                      Düzenle
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        type="submit" 
                        className="bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] hover:from-[#1B5E20] hover:to-[#2E7D32] text-white h-12 px-6"
                        disabled={isLoading}
                      >
                        Teklif Al
                        <Send className="ml-2 w-5 h-5" />
                      </Button>
                      <Button
                        type="button"
                        onClick={() => {
                          const values = form.getValues();
                          const formattedDate = values.appointmentDate 
                            ? format(values.appointmentDate, "d MMMM yyyy", { locale: tr })
                            : "Belirtilmedi";

                          const message = `*Yeni Teklif Talebi*%0A%0A
*Kişisel Bilgiler*%0A
İsim: ${values.name}%0A
Telefon: ${values.phone}%0A
E-posta: ${values.email}%0A%0A
*Hizmet Detayları*%0A
Mekan Tipi: ${values.placeType}%0A
Alan: ${values.area}%0A
Haşere Türleri: ${values.pestTypes.join(", ")}%0A%0A
*Konum Bilgileri*%0A
Şehir: ${values.city}%0A
İlçe: ${values.district}%0A%0A
*Randevu Bilgileri*%0A
Tarih: ${formattedDate}%0A
Saat: ${values.appointmentTime || "Belirtilmedi"}%0A%0A
*Ek Mesaj*%0A${values.message || "Belirtilmedi"}`;

                          window.open(`https://wa.me/905309456325?text=${message}`, "_blank");
                        }}
                        className="bg-[#25D366] hover:bg-[#128C7E] text-white h-12 px-6"
                      >
                        <MessageSquare className="w-5 h-5 mr-2" />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </div>

        <div className="mt-8 text-center text-sm text-[#558B2F] space-y-2">
          <div className="font-medium text-base mb-4">Neden Bizi Tercih Etmelisiniz?</div>
          <p>• 20 yıllık tecrübe</p>
          <p>• Sağlık Bakanlığı ruhsatlı ve TSE belgeli hizmet</p>
          <p>• %100 Memnuniyet garantisi</p>
          <p>• İlaçlama sonrası 6 ay garanti</p>
          <p>• Profesyonel ekip ve ekipman</p>
          <p>• Sigortalı işlem</p>
          <p>• Ödeme hizmet sonrası nakit veya kredi kartı ile yapılabilir</p>
          <div className="text-xs mt-4 text-[#558B2F]/80">
            * İlaçlama sonrası ortam 6 saat havalandırılmalıdır
          </div>
        </div>
      </div>
    </div>
  )
}
// Site genel ayarları
export const SITE_CONFIG = {
    name: 'Peston İlaçlama',
    title: 'Profesyonel İlaçlama ve Peyzaj Hizmetleri',
    description: 'İstanbul ve çevresinde profesyonel ilaçlama, dezenfeksiyon ve peyzaj hizmetleri',
    contact: {
        phone: '444 XX XX',
        whatsapp: '0532 XXX XX XX',
        email: 'info@example.com',
        address: 'İstanbul, Türkiye'
    },
    social: {
        facebook: 'https://facebook.com/pestonilacama',
        instagram: 'https://instagram.com/pestonilacama',
        twitter: 'https://twitter.com/pestonilacama',
        youtube: 'https://youtube.com/pestonilacama'
    }
};

// Hizmet kategorileri
export const SERVICES = {
    ilaclama: {
        title: 'İlaçlama ve Dezenfeksiyon',
        items: [
            {
                id: 'ev-ilaclama',
                title: 'Ev İlaçlama',
                description: 'Evlerde görülen her türlü haşere için profesyonel ilaçlama',
                icon: 'fas fa-home'
            },
            {
                id: 'is-yeri-ilaclama',
                title: 'İş Yeri İlaçlama',
                description: 'İş yerleri, fabrikalar ve depolar için özel ilaçlama',
                icon: 'fas fa-building'
            },
            {
                id: 'dezenfeksiyon',
                title: 'Dezenfeksiyon',
                description: 'Virüs ve bakterilere karşı profesyonel dezenfeksiyon',
                icon: 'fas fa-shield-virus'
            }
        ]
    },
    peyzaj: {
        title: 'Peyzaj Hizmetleri',
        items: [
            {
                id: 'bahce-duzenleme',
                title: 'Bahçe Düzenleme',
                description: 'Profesyonel bahçe tasarım ve düzenleme',
                icon: 'fas fa-tree'
            },
            {
                id: 'bitki-bakim',
                title: 'Bitki Bakımı',
                description: 'Periyodik bitki bakım ve ilaçlama',
                icon: 'fas fa-leaf'
            },
            {
                id: 'cim-serimi',
                title: 'Çim Serimi',
                description: 'Hazır rulo çim ve tohum ile çim serimi',
                icon: 'fas fa-seedling'
            },
            {
                id: 'sulama-sistemleri',
                title: 'Sulama Sistemleri',
                description: 'Otomatik sulama sistemi kurulumu',
                icon: 'fas fa-tint'
            }
        ]
    }
};

// Haşere türleri
export const PESTS = [
    {
        id: 'hamam-bocegi',
        name: 'Hamam Böceği',
        description: 'Her türlü hamam böceği türü için garantili ilaçlama',
        icon: 'fas fa-bug'
    },
    {
        id: 'fare',
        name: 'Fare',
        description: 'Fare ve kemirgen mücadelesi',
        icon: 'fas fa-mouse'
    },
    {
        id: 'karinca',
        name: 'Karınca',
        description: 'Karınca türlerine özel ilaçlama',
        icon: 'fas fa-bug'
    },
    {
        id: 'pire',
        name: 'Pire',
        description: 'Pire ve kene ilaçlama',
        icon: 'fas fa-bug'
    },
    {
        id: 'tahta-kurusu',
        name: 'Tahta Kurusu',
        description: 'Tahta kurusu için özel ilaçlama',
        icon: 'fas fa-bug'
    }
];

// API ayarları
export const API_CONFIG = {
    baseUrl: 'https://api.example.com',
    endpoints: {
        teklifAl: '/teklif',
        iletisim: '/iletisim',
        newsletter: '/newsletter'
    },
    timeout: 5000
};

// Cache ayarları
export const CACHE_CONFIG = {
    duration: 3600, // 1 saat
    enabled: true,
    prefix: 'peston_'
};

// SEO ayarları
export const SEO_CONFIG = {
    defaultTitle: 'Peston İlaçlama - Profesyonel İlaçlama ve Peyzaj Hizmetleri',
    defaultDescription: 'İstanbul ve çevresinde profesyonel ilaçlama, dezenfeksiyon ve peyzaj hizmetleri sunuyoruz. Garantili ve güvenli çözümler için bizi tercih edin.',
    defaultKeywords: 'ilaçlama, haşere, böcek ilaçlama, fare ilaçlama, dezenfeksiyon, peyzaj, bahçe düzenleme, çim serimi',
    titleTemplate: '%s | Peston İlaçlama'
};

// Hizmet bölgeleri
export const SERVICE_AREAS = {
    istanbul: ['Avrupa Yakası', 'Anadolu Yakası'],
    yakinIller: ['Kocaeli', 'Tekirdağ', 'Yalova']
};

// Form validasyon kuralları
export const VALIDATION_RULES = {
    phone: {
        pattern: '^[0-9]{10}$',
        message: 'Lütfen geçerli bir telefon numarası giriniz'
    },
    email: {
        pattern: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$',
        message: 'Lütfen geçerli bir e-posta adresi giriniz'
    }
}; 
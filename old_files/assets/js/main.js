(function ($) {
    "use strict";

    // Spinner yönetimi
    const spinner = {
        show: function() {
            $('#spinner').addClass('show');
        },
        hide: function() {
            $('#spinner').removeClass('show');
        }
    };

    // Component yönetimi
    function loadComponents() {
        return new Promise((resolve, reject) => {
            const components = ['header', 'navbar', 'footer'];
            let loadedCount = 0;
            let hasError = false;

            // Tüm componentleri yüklemeyi dene
            components.forEach(component => {
                const element = document.getElementById(component);
                if (element) {
                    $.get(`../components/${component}.html`)
                        .done(function(data) {
                            element.innerHTML = data;
                            loadedCount++;
                            if (loadedCount === components.length) {
                                resolve();
                            }
                        })
                        .fail(function(error) {
                            // İlk denemede başarısız olursa, kök dizinden dene
                            $.get(`/components/${component}.html`)
                                .done(function(data) {
                                    element.innerHTML = data;
                                    loadedCount++;
                                    if (loadedCount === components.length) {
                                        resolve();
                                    }
                                })
                                .fail(function(error) {
                                    console.error(`${component} yüklenirken hata:`, error);
                                    hasError = true;
                                    loadedCount++;
                                    if (loadedCount === components.length) {
                                        resolve();
                                    }
                                });
                        });
                } else {
                    loadedCount++;
                    if (loadedCount === components.length) {
                        resolve();
                    }
                }
            });

            // Zaman aşımı kontrolü
            setTimeout(() => {
                if (loadedCount !== components.length && !hasError) {
                    console.warn('Component yükleme zaman aşımı, devam ediliyor...');
                    resolve();
                }
            }, 3000);
        });
    }

    // Sayfa yüklendiğinde
    $(document).ready(function() {
        // Önce spinner'ı göster
        spinner.show();

        // Component'leri yükle ve spinner'ı yönet
        loadComponents()
            .then(() => {
                // Component'ler yüklendi veya zaman aşımı oldu
                setTimeout(() => {
                    spinner.hide();
                    initializeUI();
                }, 500);
            })
            .catch(error => {
                console.warn('Component yükleme hatası:', error);
                setTimeout(() => {
                    spinner.hide();
                    initializeUI();
                }, 500);
            });
    });

    // UI başlatma
    function initializeUI() {
        try {
            // WOW.js başlat
            if (typeof WOW !== 'undefined') {
                new WOW().init();
            }

            // Sticky Navbar
            $(window).scroll(function () {
                if ($(this).scrollTop() > 300) {
                    $('.sticky-top').addClass('sticky-nav').css('top', '0px');
                } else {
                    $('.sticky-top').removeClass('sticky-nav').css('top', '-100px');
                }
            });
            
            // Back to top button
            $(window).scroll(function () {
                if ($(this).scrollTop() > 300) {
                    $('.back-to-top').fadeIn('slow');
                } else {
                    $('.back-to-top').fadeOut('slow');
                }
            });
            $('.back-to-top').click(function () {
                $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
                return false;
            });

            // Header carousel
            $(".header-carousel").owlCarousel({
                autoplay: true,
                smartSpeed: 1500,
                items: 1,
                dots: true,
                loop: true,
                nav : true,
                navText : [
                    '<i class="bi bi-chevron-left"></i>',
                    '<i class="bi bi-chevron-right"></i>'
                ]
            });

            // Testimonials carousel
            $(".testimonial-carousel").owlCarousel({
                autoplay: true,
                smartSpeed: 1000,
                center: true,
                margin: 24,
                dots: true,
                loop: true,
                nav : false,
                responsive: {
                    0:{
                        items:1
                    },
                    768:{
                        items:2
                    },
                    992:{
                        items:3
                    }
                }
            });

            // Form elementlerine bootstrap sınıfları ekle
            $('input, select, textarea').addClass('form-control');
            $('.btn').addClass('btn-primary');
            
            // Teklif formu özel stilleri
            $('#teklifForm').addClass('bg-light p-4 rounded shadow-sm');
            $('.hasere-item').addClass('btn btn-outline-primary m-2');

            // Aktif menü öğesini işaretle
            const currentPath = window.location.pathname;
            $('.nav-item .nav-link').each(function() {
                const href = $(this).attr('href');
                if (currentPath.includes(href)) {
                    $(this).addClass('active');
                }
            });
            
        } catch (error) {
            console.error('UI başlatma hatası:', error);
        }
    }

})(jQuery);

// Temel konfigürasyon
window.CONFIG = {
    SITE_NAME: 'Peston İlaçlama',
    API_URL: 'https://api.example.com',
    CACHE_TIME: 3600,
    DEBUG: false
};

// Cache yönetimi
window.cache = {
    data: new Map(),
    set: function(key, value) {
        this.data.set(key, {
            value,
            timestamp: Date.now()
        });
    },
    get: function(key) {
        const item = this.data.get(key);
        if (!item) return null;
        if (Date.now() - item.timestamp > window.CONFIG.CACHE_TIME * 1000) {
            this.data.delete(key);
            return null;
        }
        return item.value;
    }
};

// İl-İlçe Verileri
window.ilceler = {
    istanbul: ["Adalar", "Arnavutköy", "Ataşehir", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy", "Başakşehir", "Bayrampaşa", "Beşiktaş", "Beykoz", "Beylikdüzü", "Beyoğlu", "Büyükçekmece", "Çatalca", "Çekmeköy", "Esenler", "Esenyurt", "Eyüp", "Fatih", "Gaziosmanpaşa", "Güngören", "Kadıköy", "Kağıthane", "Kartal", "Küçükçekmece", "Maltepe", "Pendik", "Sancaktepe", "Sarıyer", "Silivri", "Sultanbeyli", "Sultangazi", "Şile", "Şişli", "Tuzla", "Ümraniye", "Üsküdar", "Zeytinburnu"],
    ankara: ["Akyurt", "Altındağ", "Ayaş", "Balâ", "Beypazarı", "Çamlıdere", "Çankaya", "Çubuk", "Elmadağ", "Etimesgut", "Evren", "Gölbaşı", "Güdül", "Haymana", "Kalecik", "Kahramankazan", "Keçiören", "Kızılcahamam", "Mamak", "Nallıhan", "Polatlı", "Pursaklar", "Sincan", "Şereflikoçhisar", "Yenimahalle"],
    izmir: ["Aliağa", "Balçova", "Bayındır", "Bayraklı", "Bergama", "Beydağ", "Bornova", "Buca", "Çeşme", "Çiğli", "Dikili", "Foça", "Gaziemir", "Güzelbahçe", "Karabağlar", "Karaburun", "Karşıyaka", "Kemalpaşa", "Kınık", "Kiraz", "Konak", "Menderes", "Menemen", "Narlıdere", "Ödemiş", "Seferihisar", "Selçuk", "Tire", "Torbalı", "Urla"],
    bursa: ["Büyükorhan", "Gemlik", "Gürsu", "Harmancık", "İnegöl", "İznik", "Karacabey", "Keles", "Kestel", "Mudanya", "Mustafakemalpaşa", "Nilüfer", "Orhaneli", "Orhangazi", "Osmangazi", "Yenişehir", "Yıldırım"],
    antalya: ["Akseki", "Aksu", "Alanya", "Demre", "Döşemealtı", "Elmalı", "Finike", "Gazipaşa", "Gündoğmuş", "İbradı", "Kaş", "Kemer", "Kepez", "Konyaaltı", "Korkuteli", "Kumluca", "Manavgat", "Muratpaşa", "Serik"]
};

// Form işlemleri
document.addEventListener('DOMContentLoaded', function() {
    // İl seçimi değiştiğinde ilçeleri güncelle
    const ilSelect = document.getElementById('il');
    const ilceSelect = document.getElementById('ilce');

    if (ilSelect && ilceSelect) {
        ilSelect.addEventListener('change', function() {
            const selectedIl = this.value;
            ilceSelect.innerHTML = '<option value="">İlçe Seçiniz</option>';
            
            if (selectedIl && window.ilceler[selectedIl]) {
                window.ilceler[selectedIl].forEach(ilce => {
                    const option = document.createElement('option');
                    option.value = ilce.toLowerCase();
                    option.textContent = ilce;
                    ilceSelect.appendChild(option);
                });
                ilceSelect.disabled = false;
            } else {
                ilceSelect.disabled = true;
            }
        });
    }

    // Haşere seçimi işlemleri
    const hasereItems = document.querySelectorAll('.hasere-item');
    const selectedHasere = new Set();

    hasereItems.forEach(item => {
        item.addEventListener('click', function() {
            const value = this.dataset.value;
            
            if (this.classList.contains('selected')) {
                this.classList.remove('selected');
                selectedHasere.delete(value);
            } else {
                this.classList.add('selected');
                selectedHasere.add(value);
            }
        });
    });

    // Form gönderimi
    const form = document.getElementById('teklifForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Form validasyonu
            if (selectedHasere.size === 0) {
                alert('Lütfen en az bir haşere türü seçiniz.');
                return;
            }

            // Form verilerini gönder
            alert('Teklif talebiniz alınmıştır. En kısa sürede sizinle iletişime geçeceğiz.');
            
            // Formu sıfırla
            form.reset();
            hasereItems.forEach(item => item.classList.remove('selected'));
            selectedHasere.clear();
        });
    }
});


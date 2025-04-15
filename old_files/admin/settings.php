<?php
require_once 'config.php';

if (!isAdmin()) {
    header("Location: login.php");
    exit;
}

// Ayarları güncelle
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $settings = [
        'site_title' => $_POST['site_title'] ?? '',
        'site_description' => $_POST['site_description'] ?? '',
        'site_keywords' => $_POST['site_keywords'] ?? '',
        'contact_phone' => $_POST['contact_phone'] ?? '',
        'contact_email' => $_POST['contact_email'] ?? '',
        'contact_address' => $_POST['contact_address'] ?? '',
        'contact_map' => $_POST['contact_map'] ?? '',
        'working_hours' => $_POST['working_hours'] ?? '',
        'facebook_url' => $_POST['facebook_url'] ?? '',
        'twitter_url' => $_POST['twitter_url'] ?? '',
        'instagram_url' => $_POST['instagram_url'] ?? '',
        'youtube_url' => $_POST['youtube_url'] ?? '',
        'whatsapp_number' => $_POST['whatsapp_number'] ?? ''
    ];
    
    // Logo güncelleme
    if ($_FILES['logo']['name']) {
        $logo = uploadFile($_FILES['logo'], '../uploads/');
        if ($logo) {
            // Eski logoyu sil
            $old_logo = getSetting('logo');
            if ($old_logo && file_exists('../uploads/' . $old_logo)) {
                unlink('../uploads/' . $old_logo);
            }
            $settings['logo'] = $logo;
        }
    }
    
    // Favicon güncelleme
    if ($_FILES['favicon']['name']) {
        $favicon = uploadFile($_FILES['favicon'], '../uploads/');
        if ($favicon) {
            // Eski favicon'u sil
            $old_favicon = getSetting('favicon');
            if ($old_favicon && file_exists('../uploads/' . $old_favicon)) {
                unlink('../uploads/' . $old_favicon);
            }
            $settings['favicon'] = $favicon;
        }
    }
    
    // Ayarları veritabanına kaydet
    foreach ($settings as $key => $value) {
        if ($value !== '') {
            updateSetting($key, $value);
        }
    }
    
    header("Location: settings.php?success=1");
    exit;
}
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Site Ayarları - Peston İlaçlama</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        .sidebar {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            z-index: 100;
            padding: 48px 0 0;
            box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
            background-color: #343a40;
        }
        .sidebar-sticky {
            position: relative;
            top: 0;
            height: calc(100vh - 48px);
            padding-top: .5rem;
            overflow-x: hidden;
            overflow-y: auto;
        }
        .sidebar .nav-link {
            font-weight: 500;
            color: #fff;
            padding: 1rem;
        }
        .sidebar .nav-link:hover {
            background-color: rgba(255,255,255,0.1);
        }
        .sidebar .nav-link i {
            margin-right: 10px;
        }
        .main-content {
            margin-left: 250px;
            padding: 20px;
        }
        .preview-image {
            max-width: 200px;
            max-height: 100px;
            object-fit: contain;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <nav class="navbar navbar-dark fixed-top bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Peston İlaçlama Yönetim Paneli</a>
            <div class="d-flex">
                <span class="navbar-text me-3">Hoş geldiniz, <?php echo $_SESSION['admin_username']; ?></span>
                <a href="logout.php" class="btn btn-outline-light btn-sm">Çıkış Yap</a>
            </div>
        </div>
    </nav>

    <div class="container-fluid">
        <div class="row">
            <nav class="col-md-3 col-lg-2 d-md-block sidebar">
                <div class="sidebar-sticky">
                    <ul class="nav flex-column">
                        <li class="nav-item">
                            <a class="nav-link" href="index.php">
                                <i class="fas fa-home"></i> Ana Sayfa
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="sliders.php">
                                <i class="fas fa-images"></i> Slider Yönetimi
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="services.php">
                                <i class="fas fa-briefcase"></i> Hizmetler
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="testimonials.php">
                                <i class="fas fa-comments"></i> Referanslar
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="quotes.php">
                                <i class="fas fa-file-alt"></i> Teklif Talepleri
                            </a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link active" href="settings.php">
                                <i class="fas fa-cog"></i> Ayarlar
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <main class="main-content">
                <div class="container-fluid">
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h1 class="h2">Site Ayarları</h1>
                    </div>

                    <?php if (isset($_GET['success'])): ?>
                    <div class="alert alert-success">Ayarlar başarıyla güncellendi.</div>
                    <?php endif; ?>

                    <div class="card">
                        <div class="card-body">
                            <form action="" method="POST" enctype="multipart/form-data">
                                <div class="row">
                                    <div class="col-md-6">
                                        <h4 class="mb-3">Genel Ayarlar</h4>
                                        
                                        <div class="mb-3">
                                            <label class="form-label">Site Başlığı</label>
                                            <input type="text" name="site_title" class="form-control" value="<?php echo getSetting('site_title'); ?>">
                                        </div>
                                        
                                        <div class="mb-3">
                                            <label class="form-label">Site Açıklaması</label>
                                            <textarea name="site_description" class="form-control" rows="3"><?php echo getSetting('site_description'); ?></textarea>
                                        </div>
                                        
                                        <div class="mb-3">
                                            <label class="form-label">Anahtar Kelimeler</label>
                                            <textarea name="site_keywords" class="form-control" rows="2"><?php echo getSetting('site_keywords'); ?></textarea>
                                            <small class="text-muted">Virgülle ayırarak yazınız</small>
                                        </div>
                                        
                                        <div class="mb-3">
                                            <label class="form-label">Logo</label>
                                            <input type="file" name="logo" class="form-control" accept="image/*">
                                            <?php if ($logo = getSetting('logo')): ?>
                                            <img src="../uploads/<?php echo $logo; ?>" alt="Logo" class="preview-image">
                                            <?php endif; ?>
                                        </div>
                                        
                                        <div class="mb-3">
                                            <label class="form-label">Favicon</label>
                                            <input type="file" name="favicon" class="form-control" accept="image/*">
                                            <?php if ($favicon = getSetting('favicon')): ?>
                                            <img src="../uploads/<?php echo $favicon; ?>" alt="Favicon" class="preview-image">
                                            <?php endif; ?>
                                        </div>
                                    </div>
                                    
                                    <div class="col-md-6">
                                        <h4 class="mb-3">İletişim Bilgileri</h4>
                                        
                                        <div class="mb-3">
                                            <label class="form-label">Telefon</label>
                                            <input type="text" name="contact_phone" class="form-control" value="<?php echo getSetting('contact_phone'); ?>">
                                        </div>
                                        
                                        <div class="mb-3">
                                            <label class="form-label">E-posta</label>
                                            <input type="email" name="contact_email" class="form-control" value="<?php echo getSetting('contact_email'); ?>">
                                        </div>
                                        
                                        <div class="mb-3">
                                            <label class="form-label">Adres</label>
                                            <textarea name="contact_address" class="form-control" rows="2"><?php echo getSetting('contact_address'); ?></textarea>
                                        </div>
                                        
                                        <div class="mb-3">
                                            <label class="form-label">Google Maps Iframe</label>
                                            <textarea name="contact_map" class="form-control" rows="3"><?php echo getSetting('contact_map'); ?></textarea>
                                        </div>
                                        
                                        <div class="mb-3">
                                            <label class="form-label">Çalışma Saatleri</label>
                                            <input type="text" name="working_hours" class="form-control" value="<?php echo getSetting('working_hours'); ?>">
                                            <small class="text-muted">Örn: Pzt - Cmt : 09.00 - 18.00</small>
                                        </div>
                                        
                                        <h4 class="mb-3 mt-4">Sosyal Medya</h4>
                                        
                                        <div class="mb-3">
                                            <label class="form-label">Facebook URL</label>
                                            <input type="url" name="facebook_url" class="form-control" value="<?php echo getSetting('facebook_url'); ?>">
                                        </div>
                                        
                                        <div class="mb-3">
                                            <label class="form-label">Twitter URL</label>
                                            <input type="url" name="twitter_url" class="form-control" value="<?php echo getSetting('twitter_url'); ?>">
                                        </div>
                                        
                                        <div class="mb-3">
                                            <label class="form-label">Instagram URL</label>
                                            <input type="url" name="instagram_url" class="form-control" value="<?php echo getSetting('instagram_url'); ?>">
                                        </div>
                                        
                                        <div class="mb-3">
                                            <label class="form-label">YouTube URL</label>
                                            <input type="url" name="youtube_url" class="form-control" value="<?php echo getSetting('youtube_url'); ?>">
                                        </div>
                                        
                                        <div class="mb-3">
                                            <label class="form-label">WhatsApp Numarası</label>
                                            <input type="text" name="whatsapp_number" class="form-control" value="<?php echo getSetting('whatsapp_number'); ?>">
                                            <small class="text-muted">Örn: 905551234567</small>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="text-end mt-4">
                                    <button type="submit" class="btn btn-primary">
                                        <i class="fas fa-save"></i> Ayarları Kaydet
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html> 
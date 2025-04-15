<?php
require_once 'config.php';

if (!isAdmin()) {
    header("Location: login.php");
    exit;
}

// İstatistikleri al
$stats = [
    'teklif' => $db->query("SELECT COUNT(*) FROM quote_requests")->fetchColumn(),
    'hizmet' => $db->query("SELECT COUNT(*) FROM services")->fetchColumn(),
    'referans' => $db->query("SELECT COUNT(*) FROM testimonials")->fetchColumn(),
    'slider' => $db->query("SELECT COUNT(*) FROM sliders")->fetchColumn()
];

// Son teklifleri al
$recent_quotes = $db->query("SELECT * FROM quote_requests ORDER BY created_at DESC LIMIT 5")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yönetici Paneli - Peston İlaçlama</title>
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
        .stat-card {
            border-radius: 10px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 0 15px rgba(0,0,0,0.1);
        }
        .stat-card i {
            font-size: 2rem;
            margin-bottom: 10px;
        }
        .stat-card .number {
            font-size: 1.5rem;
            font-weight: bold;
        }
        .stat-card.teklif { background-color: #00B074; color: white; }
        .stat-card.hizmet { background-color: #0dcaf0; color: white; }
        .stat-card.referans { background-color: #ffc107; color: white; }
        .stat-card.slider { background-color: #6f42c1; color: white; }
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
                            <a class="nav-link active" href="index.php">
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
                            <a class="nav-link" href="settings.php">
                                <i class="fas fa-cog"></i> Ayarlar
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>

            <main class="main-content">
                <div class="container-fluid">
                    <h1 class="h2 mb-4">Genel Bakış</h1>
                    
                    <div class="row">
                        <div class="col-md-3">
                            <div class="stat-card teklif">
                                <i class="fas fa-file-alt"></i>
                                <div class="number"><?php echo $stats['teklif']; ?></div>
                                <div class="text">Teklif Talebi</div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="stat-card hizmet">
                                <i class="fas fa-briefcase"></i>
                                <div class="number"><?php echo $stats['hizmet']; ?></div>
                                <div class="text">Aktif Hizmet</div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="stat-card referans">
                                <i class="fas fa-comments"></i>
                                <div class="number"><?php echo $stats['referans']; ?></div>
                                <div class="text">Referans</div>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="stat-card slider">
                                <i class="fas fa-images"></i>
                                <div class="number"><?php echo $stats['slider']; ?></div>
                                <div class="text">Slider Görseli</div>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-4">
                        <div class="col-md-12">
                            <div class="card">
                                <div class="card-header">
                                    <h5 class="card-title mb-0">Son Teklif Talepleri</h5>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table">
                                            <thead>
                                                <tr>
                                                    <th>Ad Soyad</th>
                                                    <th>Telefon</th>
                                                    <th>Lokasyon</th>
                                                    <th>Tarih</th>
                                                    <th>Durum</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <?php foreach ($recent_quotes as $quote): ?>
                                                <tr>
                                                    <td><?php echo clean($quote['name']); ?></td>
                                                    <td><?php echo clean($quote['phone']); ?></td>
                                                    <td><?php echo clean($quote['location']); ?></td>
                                                    <td><?php echo date('d.m.Y H:i', strtotime($quote['created_at'])); ?></td>
                                                    <td>
                                                        <span class="badge bg-<?php echo $quote['status'] == 'new' ? 'warning' : 'success'; ?>">
                                                            <?php echo $quote['status'] == 'new' ? 'Yeni' : 'İncelendi'; ?>
                                                        </span>
                                                    </td>
                                                </tr>
                                                <?php endforeach; ?>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html> 
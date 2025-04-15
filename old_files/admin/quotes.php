<?php
require_once 'config.php';

if (!isAdmin()) {
    header("Location: login.php");
    exit;
}

// Teklif silme işlemi
if (isset($_GET['delete']) && is_numeric($_GET['delete'])) {
    $id = (int)$_GET['delete'];
    
    // Teklifi veritabanından sil
    $stmt = $db->prepare("DELETE FROM quote_requests WHERE id = ?");
    $stmt->execute([$id]);
    
    header("Location: quotes.php?success=1");
    exit;
}

// Teklif durumunu güncelle
if (isset($_GET['status']) && isset($_GET['id'])) {
    $id = (int)$_GET['id'];
    $status = $_GET['status'] === 'reviewed' ? 'reviewed' : 'new';
    
    $stmt = $db->prepare("UPDATE quote_requests SET status = ? WHERE id = ?");
    $stmt->execute([$status, $id]);
    
    header("Location: quotes.php?success=1");
    exit;
}

// Teklif listesini al
$quotes = $db->query("SELECT * FROM quote_requests ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Teklif Talepleri - Peston İlaçlama</title>
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
        .quote-details {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            margin-top: 10px;
        }
        .quote-details p {
            margin-bottom: 5px;
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
                            <a class="nav-link active" href="quotes.php">
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
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h1 class="h2">Teklif Talepleri</h1>
                    </div>

                    <?php if (isset($_GET['success'])): ?>
                    <div class="alert alert-success">İşlem başarıyla tamamlandı.</div>
                    <?php endif; ?>

                    <div class="card">
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table table-striped">
                                    <thead>
                                        <tr>
                                            <th>Tarih</th>
                                            <th>Ad Soyad</th>
                                            <th>Telefon</th>
                                            <th>E-posta</th>
                                            <th>Lokasyon</th>
                                            <th>Durum</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach ($quotes as $quote): ?>
                                        <tr>
                                            <td><?php echo date('d.m.Y H:i', strtotime($quote['created_at'])); ?></td>
                                            <td><?php echo clean($quote['name']); ?></td>
                                            <td><?php echo clean($quote['phone']); ?></td>
                                            <td><?php echo clean($quote['email']); ?></td>
                                            <td><?php echo clean($quote['location']); ?></td>
                                            <td>
                                                <span class="badge bg-<?php echo $quote['status'] == 'new' ? 'warning' : 'success'; ?>">
                                                    <?php echo $quote['status'] == 'new' ? 'Yeni' : 'İncelendi'; ?>
                                                </span>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-sm btn-info view-quote" 
                                                        data-bs-toggle="modal" data-bs-target="#quoteModal"
                                                        data-details="<?php echo htmlspecialchars(json_encode([
                                                            'name' => $quote['name'],
                                                            'phone' => $quote['phone'],
                                                            'email' => $quote['email'],
                                                            'location' => $quote['location'],
                                                            'area' => $quote['area'],
                                                            'pests' => $quote['pests'],
                                                            'periodic' => $quote['periodic'],
                                                            'apartment' => $quote['apartment'],
                                                            'message' => $quote['message'],
                                                            'created_at' => date('d.m.Y H:i', strtotime($quote['created_at']))
                                                        ])); ?>">
                                                    <i class="fas fa-eye"></i>
                                                </button>
                                                <?php if ($quote['status'] == 'new'): ?>
                                                <a href="?status=reviewed&id=<?php echo $quote['id']; ?>" class="btn btn-sm btn-success">
                                                    <i class="fas fa-check"></i>
                                                </a>
                                                <?php else: ?>
                                                <a href="?status=new&id=<?php echo $quote['id']; ?>" class="btn btn-sm btn-warning">
                                                    <i class="fas fa-undo"></i>
                                                </a>
                                                <?php endif; ?>
                                                <a href="?delete=<?php echo $quote['id']; ?>" class="btn btn-sm btn-danger" onclick="return confirm('Bu teklif talebini silmek istediğinizden emin misiniz?')">
                                                    <i class="fas fa-trash"></i>
                                                </a>
                                            </td>
                                        </tr>
                                        <?php endforeach; ?>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>

    <!-- Teklif Detay Modal -->
    <div class="modal fade" id="quoteModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Teklif Detayları</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="quote-details">
                        <p><strong>Ad Soyad:</strong> <span id="detail-name"></span></p>
                        <p><strong>Telefon:</strong> <span id="detail-phone"></span></p>
                        <p><strong>E-posta:</strong> <span id="detail-email"></span></p>
                        <p><strong>Lokasyon:</strong> <span id="detail-location"></span></p>
                        <p><strong>Alan (m²):</strong> <span id="detail-area"></span></p>
                        <p><strong>Haşere Türleri:</strong> <span id="detail-pests"></span></p>
                        <p><strong>Periyodik İlaçlama:</strong> <span id="detail-periodic"></span></p>
                        <p><strong>Apartman Teklifi:</strong> <span id="detail-apartment"></span></p>
                        <p><strong>Mesaj:</strong> <span id="detail-message"></span></p>
                        <p><strong>Tarih:</strong> <span id="detail-date"></span></p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Teklif detaylarını göster
        document.querySelectorAll('.view-quote').forEach(function(button) {
            button.addEventListener('click', function() {
                var details = JSON.parse(this.dataset.details);
                document.getElementById('detail-name').textContent = details.name;
                document.getElementById('detail-phone').textContent = details.phone;
                document.getElementById('detail-email').textContent = details.email;
                document.getElementById('detail-location').textContent = details.location;
                document.getElementById('detail-area').textContent = details.area;
                document.getElementById('detail-pests').textContent = details.pests;
                document.getElementById('detail-periodic').textContent = details.periodic ? 'Evet' : 'Hayır';
                document.getElementById('detail-apartment').textContent = details.apartment ? 'Evet' : 'Hayır';
                document.getElementById('detail-message').textContent = details.message;
                document.getElementById('detail-date').textContent = details.created_at;
            });
        });
    });
    </script>
</body>
</html> 
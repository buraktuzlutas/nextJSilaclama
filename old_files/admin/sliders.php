<?php
require_once 'config.php';

if (!isAdmin()) {
    header("Location: login.php");
    exit;
}

// Slider silme işlemi
if (isset($_GET['delete']) && is_numeric($_GET['delete'])) {
    $id = (int)$_GET['delete'];
    
    // Önce mevcut resmi sil
    $stmt = $db->prepare("SELECT image FROM sliders WHERE id = ?");
    $stmt->execute([$id]);
    $slider = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($slider && file_exists('../uploads/' . $slider['image'])) {
        unlink('../uploads/' . $slider['image']);
    }
    
    // Slider'ı veritabanından sil
    $stmt = $db->prepare("DELETE FROM sliders WHERE id = ?");
    $stmt->execute([$id]);
    
    header("Location: sliders.php?success=1");
    exit;
}

// Slider ekleme/güncelleme işlemi
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = isset($_POST['id']) ? (int)$_POST['id'] : 0;
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $button_text = $_POST['button_text'] ?? '';
    $button_link = $_POST['button_link'] ?? '';
    $status = $_POST['status'] ?? 1;
    
    if ($id > 0) { // Güncelleme
        if ($_FILES['image']['name']) {
            $image = uploadFile($_FILES['image'], '../uploads/');
            if ($image) {
                // Eski resmi sil
                $stmt = $db->prepare("SELECT image FROM sliders WHERE id = ?");
                $stmt->execute([$id]);
                $old_slider = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($old_slider && file_exists('../uploads/' . $old_slider['image'])) {
                    unlink('../uploads/' . $old_slider['image']);
                }
                
                $stmt = $db->prepare("UPDATE sliders SET title = ?, description = ?, button_text = ?, button_link = ?, image = ?, status = ? WHERE id = ?");
                $stmt->execute([$title, $description, $button_text, $button_link, $image, $status, $id]);
            }
        } else {
            $stmt = $db->prepare("UPDATE sliders SET title = ?, description = ?, button_text = ?, button_link = ?, status = ? WHERE id = ?");
            $stmt->execute([$title, $description, $button_text, $button_link, $status, $id]);
        }
    } else { // Yeni ekleme
        if ($_FILES['image']['name']) {
            $image = uploadFile($_FILES['image'], '../uploads/');
            if ($image) {
                $stmt = $db->prepare("INSERT INTO sliders (title, description, button_text, button_link, image, status) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt->execute([$title, $description, $button_text, $button_link, $image, $status]);
            }
        }
    }
    
    header("Location: sliders.php?success=1");
    exit;
}

// Slider listesini al
$sliders = $db->query("SELECT * FROM sliders ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slider Yönetimi - Peston İlaçlama</title>
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
            object-fit: cover;
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
                            <a class="nav-link active" href="sliders.php">
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
                    <div class="d-flex justify-content-between align-items-center mb-4">
                        <h1 class="h2">Slider Yönetimi</h1>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#sliderModal">
                            <i class="fas fa-plus"></i> Yeni Slider Ekle
                        </button>
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
                                            <th>Görsel</th>
                                            <th>Başlık</th>
                                            <th>Açıklama</th>
                                            <th>Buton Metni</th>
                                            <th>Durum</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach ($sliders as $slider): ?>
                                        <tr>
                                            <td>
                                                <img src="../uploads/<?php echo clean($slider['image']); ?>" alt="" class="preview-image">
                                            </td>
                                            <td><?php echo clean($slider['title']); ?></td>
                                            <td><?php echo clean($slider['description']); ?></td>
                                            <td><?php echo clean($slider['button_text']); ?></td>
                                            <td>
                                                <span class="badge bg-<?php echo $slider['status'] ? 'success' : 'danger'; ?>">
                                                    <?php echo $slider['status'] ? 'Aktif' : 'Pasif'; ?>
                                                </span>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-sm btn-warning edit-slider" 
                                                        data-id="<?php echo $slider['id']; ?>"
                                                        data-title="<?php echo clean($slider['title']); ?>"
                                                        data-description="<?php echo clean($slider['description']); ?>"
                                                        data-button-text="<?php echo clean($slider['button_text']); ?>"
                                                        data-button-link="<?php echo clean($slider['button_link']); ?>"
                                                        data-status="<?php echo $slider['status']; ?>"
                                                        data-bs-toggle="modal" data-bs-target="#sliderModal">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <a href="?delete=<?php echo $slider['id']; ?>" class="btn btn-sm btn-danger" onclick="return confirm('Bu slider\'ı silmek istediğinizden emin misiniz?')">
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

    <!-- Slider Modal -->
    <div class="modal fade" id="sliderModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <form action="" method="POST" enctype="multipart/form-data">
                    <input type="hidden" name="id" id="slider_id">
                    <div class="modal-header">
                        <h5 class="modal-title">Slider Ekle/Düzenle</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Görsel</label>
                            <input type="file" name="image" class="form-control" accept="image/*">
                            <small class="text-muted">Önerilen boyut: 1920x800 piksel</small>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Başlık</label>
                            <input type="text" name="title" id="title" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Açıklama</label>
                            <textarea name="description" id="description" class="form-control" rows="3"></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Buton Metni</label>
                            <input type="text" name="button_text" id="button_text" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Buton Linki</label>
                            <input type="text" name="button_link" id="button_link" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Durum</label>
                            <select name="status" id="status" class="form-select">
                                <option value="1">Aktif</option>
                                <option value="0">Pasif</option>
                            </select>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">İptal</button>
                        <button type="submit" class="btn btn-primary">Kaydet</button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
    document.addEventListener('DOMContentLoaded', function() {
        // Düzenleme modalını hazırla
        document.querySelectorAll('.edit-slider').forEach(function(button) {
            button.addEventListener('click', function() {
                document.getElementById('slider_id').value = this.dataset.id;
                document.getElementById('title').value = this.dataset.title;
                document.getElementById('description').value = this.dataset.description;
                document.getElementById('button_text').value = this.dataset.buttonText;
                document.getElementById('button_link').value = this.dataset.buttonLink;
                document.getElementById('status').value = this.dataset.status;
            });
        });
        
        // Yeni ekleme modalını temizle
        document.querySelector('[data-bs-target="#sliderModal"]').addEventListener('click', function() {
            if (!this.classList.contains('edit-slider')) {
                document.getElementById('slider_id').value = '';
                document.getElementById('title').value = '';
                document.getElementById('description').value = '';
                document.getElementById('button_text').value = '';
                document.getElementById('button_link').value = '';
                document.getElementById('status').value = '1';
            }
        });
    });
    </script>
</body>
</html> 
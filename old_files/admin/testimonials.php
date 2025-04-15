<?php
require_once 'config.php';

if (!isAdmin()) {
    header("Location: login.php");
    exit;
}

// Referans silme işlemi
if (isset($_GET['delete']) && is_numeric($_GET['delete'])) {
    $id = (int)$_GET['delete'];
    
    // Önce mevcut resmi sil
    $stmt = $db->prepare("SELECT image FROM testimonials WHERE id = ?");
    $stmt->execute([$id]);
    $testimonial = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($testimonial && file_exists('../uploads/' . $testimonial['image'])) {
        unlink('../uploads/' . $testimonial['image']);
    }
    
    // Referansı veritabanından sil
    $stmt = $db->prepare("DELETE FROM testimonials WHERE id = ?");
    $stmt->execute([$id]);
    
    header("Location: testimonials.php?success=1");
    exit;
}

// Referans ekleme/güncelleme işlemi
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = isset($_POST['id']) ? (int)$_POST['id'] : 0;
    $name = $_POST['name'] ?? '';
    $title = $_POST['title'] ?? '';
    $comment = $_POST['comment'] ?? '';
    $status = $_POST['status'] ?? 1;
    
    if ($id > 0) { // Güncelleme
        if ($_FILES['image']['name']) {
            $image = uploadFile($_FILES['image'], '../uploads/');
            if ($image) {
                // Eski resmi sil
                $stmt = $db->prepare("SELECT image FROM testimonials WHERE id = ?");
                $stmt->execute([$id]);
                $old_testimonial = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($old_testimonial && file_exists('../uploads/' . $old_testimonial['image'])) {
                    unlink('../uploads/' . $old_testimonial['image']);
                }
                
                $stmt = $db->prepare("UPDATE testimonials SET name = ?, title = ?, comment = ?, image = ?, status = ? WHERE id = ?");
                $stmt->execute([$name, $title, $comment, $image, $status, $id]);
            }
        } else {
            $stmt = $db->prepare("UPDATE testimonials SET name = ?, title = ?, comment = ?, status = ? WHERE id = ?");
            $stmt->execute([$name, $title, $comment, $status, $id]);
        }
    } else { // Yeni ekleme
        if ($_FILES['image']['name']) {
            $image = uploadFile($_FILES['image'], '../uploads/');
            if ($image) {
                $stmt = $db->prepare("INSERT INTO testimonials (name, title, comment, image, status) VALUES (?, ?, ?, ?, ?)");
                $stmt->execute([$name, $title, $comment, $image, $status]);
            }
        }
    }
    
    header("Location: testimonials.php?success=1");
    exit;
}

// Referans listesini al
$testimonials = $db->query("SELECT * FROM testimonials ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Referans Yönetimi - Peston İlaçlama</title>
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
            max-width: 100px;
            max-height: 100px;
            object-fit: cover;
            border-radius: 50%;
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
                            <a class="nav-link active" href="testimonials.php">
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
                        <h1 class="h2">Referans Yönetimi</h1>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#testimonialModal">
                            <i class="fas fa-plus"></i> Yeni Referans Ekle
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
                                            <th>Fotoğraf</th>
                                            <th>Ad Soyad</th>
                                            <th>Ünvan</th>
                                            <th>Yorum</th>
                                            <th>Durum</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach ($testimonials as $testimonial): ?>
                                        <tr>
                                            <td>
                                                <img src="../uploads/<?php echo clean($testimonial['image']); ?>" alt="" class="preview-image">
                                            </td>
                                            <td><?php echo clean($testimonial['name']); ?></td>
                                            <td><?php echo clean($testimonial['title']); ?></td>
                                            <td><?php echo clean($testimonial['comment']); ?></td>
                                            <td>
                                                <span class="badge bg-<?php echo $testimonial['status'] ? 'success' : 'danger'; ?>">
                                                    <?php echo $testimonial['status'] ? 'Aktif' : 'Pasif'; ?>
                                                </span>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-sm btn-warning edit-testimonial" 
                                                        data-id="<?php echo $testimonial['id']; ?>"
                                                        data-name="<?php echo clean($testimonial['name']); ?>"
                                                        data-title="<?php echo clean($testimonial['title']); ?>"
                                                        data-comment="<?php echo clean($testimonial['comment']); ?>"
                                                        data-status="<?php echo $testimonial['status']; ?>"
                                                        data-bs-toggle="modal" data-bs-target="#testimonialModal">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <a href="?delete=<?php echo $testimonial['id']; ?>" class="btn btn-sm btn-danger" onclick="return confirm('Bu referansı silmek istediğinizden emin misiniz?')">
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

    <!-- Referans Modal -->
    <div class="modal fade" id="testimonialModal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <form action="" method="POST" enctype="multipart/form-data">
                    <input type="hidden" name="id" id="testimonial_id">
                    <div class="modal-header">
                        <h5 class="modal-title">Referans Ekle/Düzenle</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Fotoğraf</label>
                            <input type="file" name="image" class="form-control" accept="image/*">
                            <small class="text-muted">Önerilen boyut: 200x200 piksel</small>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Ad Soyad</label>
                            <input type="text" name="name" id="name" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Ünvan</label>
                            <input type="text" name="title" id="title" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Yorum</label>
                            <textarea name="comment" id="comment" class="form-control" rows="4" required></textarea>
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
        document.querySelectorAll('.edit-testimonial').forEach(function(button) {
            button.addEventListener('click', function() {
                document.getElementById('testimonial_id').value = this.dataset.id;
                document.getElementById('name').value = this.dataset.name;
                document.getElementById('title').value = this.dataset.title;
                document.getElementById('comment').value = this.dataset.comment;
                document.getElementById('status').value = this.dataset.status;
            });
        });
        
        // Yeni ekleme modalını temizle
        document.querySelector('[data-bs-target="#testimonialModal"]').addEventListener('click', function() {
            if (!this.classList.contains('edit-testimonial')) {
                document.getElementById('testimonial_id').value = '';
                document.getElementById('name').value = '';
                document.getElementById('title').value = '';
                document.getElementById('comment').value = '';
                document.getElementById('status').value = '1';
            }
        });
    });
    </script>
</body>
</html> 
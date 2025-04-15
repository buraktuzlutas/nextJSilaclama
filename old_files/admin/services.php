<?php
require_once 'config.php';

if (!isAdmin()) {
    header("Location: login.php");
    exit;
}

// Hizmet silme işlemi
if (isset($_GET['delete']) && is_numeric($_GET['delete'])) {
    $id = (int)$_GET['delete'];
    
    // Önce mevcut resmi sil
    $stmt = $db->prepare("SELECT image FROM services WHERE id = ?");
    $stmt->execute([$id]);
    $service = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($service && file_exists('../uploads/' . $service['image'])) {
        unlink('../uploads/' . $service['image']);
    }
    
    // Hizmeti veritabanından sil
    $stmt = $db->prepare("DELETE FROM services WHERE id = ?");
    $stmt->execute([$id]);
    
    header("Location: services.php?success=1");
    exit;
}

// Hizmet ekleme/güncelleme işlemi
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $id = isset($_POST['id']) ? (int)$_POST['id'] : 0;
    $title = $_POST['title'] ?? '';
    $description = $_POST['description'] ?? '';
    $content = $_POST['content'] ?? '';
    $slug = $_POST['slug'] ?? '';
    $status = $_POST['status'] ?? 1;
    
    if (empty($slug)) {
        $slug = strtolower(str_replace([' ', 'ı', 'ğ', 'ü', 'ş', 'ö', 'ç'], ['-', 'i', 'g', 'u', 's', 'o', 'c'], $title));
    }
    
    if ($id > 0) { // Güncelleme
        if ($_FILES['image']['name']) {
            $image = uploadFile($_FILES['image'], '../uploads/');
            if ($image) {
                // Eski resmi sil
                $stmt = $db->prepare("SELECT image FROM services WHERE id = ?");
                $stmt->execute([$id]);
                $old_service = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($old_service && file_exists('../uploads/' . $old_service['image'])) {
                    unlink('../uploads/' . $old_service['image']);
                }
                
                $stmt = $db->prepare("UPDATE services SET title = ?, description = ?, content = ?, slug = ?, image = ?, status = ? WHERE id = ?");
                $stmt->execute([$title, $description, $content, $slug, $image, $status, $id]);
            }
        } else {
            $stmt = $db->prepare("UPDATE services SET title = ?, description = ?, content = ?, slug = ?, status = ? WHERE id = ?");
            $stmt->execute([$title, $description, $content, $slug, $status, $id]);
        }
    } else { // Yeni ekleme
        if ($_FILES['image']['name']) {
            $image = uploadFile($_FILES['image'], '../uploads/');
            if ($image) {
                $stmt = $db->prepare("INSERT INTO services (title, description, content, slug, image, status) VALUES (?, ?, ?, ?, ?, ?)");
                $stmt->execute([$title, $description, $content, $slug, $image, $status]);
            }
        }
    }
    
    header("Location: services.php?success=1");
    exit;
}

// Hizmet listesini al
$services = $db->query("SELECT * FROM services ORDER BY id DESC")->fetchAll(PDO::FETCH_ASSOC);
?>
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hizmet Yönetimi - Peston İlaçlama</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.css" rel="stylesheet">
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
                            <a class="nav-link active" href="services.php">
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
                        <h1 class="h2">Hizmet Yönetimi</h1>
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#serviceModal">
                            <i class="fas fa-plus"></i> Yeni Hizmet Ekle
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
                                            <th>URL</th>
                                            <th>Durum</th>
                                            <th>İşlemler</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php foreach ($services as $service): ?>
                                        <tr>
                                            <td>
                                                <img src="../uploads/<?php echo clean($service['image']); ?>" alt="" class="preview-image">
                                            </td>
                                            <td><?php echo clean($service['title']); ?></td>
                                            <td><?php echo clean($service['description']); ?></td>
                                            <td><?php echo clean($service['slug']); ?></td>
                                            <td>
                                                <span class="badge bg-<?php echo $service['status'] ? 'success' : 'danger'; ?>">
                                                    <?php echo $service['status'] ? 'Aktif' : 'Pasif'; ?>
                                                </span>
                                            </td>
                                            <td>
                                                <button type="button" class="btn btn-sm btn-warning edit-service" 
                                                        data-id="<?php echo $service['id']; ?>"
                                                        data-title="<?php echo clean($service['title']); ?>"
                                                        data-description="<?php echo clean($service['description']); ?>"
                                                        data-content="<?php echo clean($service['content']); ?>"
                                                        data-slug="<?php echo clean($service['slug']); ?>"
                                                        data-status="<?php echo $service['status']; ?>"
                                                        data-bs-toggle="modal" data-bs-target="#serviceModal">
                                                    <i class="fas fa-edit"></i>
                                                </button>
                                                <a href="?delete=<?php echo $service['id']; ?>" class="btn btn-sm btn-danger" onclick="return confirm('Bu hizmeti silmek istediğinizden emin misiniz?')">
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

    <!-- Hizmet Modal -->
    <div class="modal fade" id="serviceModal" tabindex="-1">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <form action="" method="POST" enctype="multipart/form-data">
                    <input type="hidden" name="id" id="service_id">
                    <div class="modal-header">
                        <h5 class="modal-title">Hizmet Ekle/Düzenle</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label class="form-label">Görsel</label>
                            <input type="file" name="image" class="form-control" accept="image/*">
                            <small class="text-muted">Önerilen boyut: 800x600 piksel</small>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Başlık</label>
                            <input type="text" name="title" id="title" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">URL</label>
                            <input type="text" name="slug" id="slug" class="form-control" placeholder="Otomatik oluşturulacak">
                            <small class="text-muted">Boş bırakırsanız başlıktan otomatik oluşturulacaktır</small>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Kısa Açıklama</label>
                            <textarea name="description" id="description" class="form-control" rows="3"></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">İçerik</label>
                            <textarea name="content" id="content" class="form-control summernote"></textarea>
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

    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-bs4.min.js"></script>
    <script>
    $(document).ready(function() {
        // Summernote editörünü başlat
        $('.summernote').summernote({
            height: 300,
            toolbar: [
                ['style', ['style']],
                ['font', ['bold', 'underline', 'clear']],
                ['color', ['color']],
                ['para', ['ul', 'ol', 'paragraph']],
                ['table', ['table']],
                ['insert', ['link', 'picture']],
                ['view', ['fullscreen', 'codeview', 'help']]
            ]
        });
        
        // Düzenleme modalını hazırla
        $('.edit-service').click(function() {
            $('#service_id').val($(this).data('id'));
            $('#title').val($(this).data('title'));
            $('#description').val($(this).data('description'));
            $('#content').summernote('code', $(this).data('content'));
            $('#slug').val($(this).data('slug'));
            $('#status').val($(this).data('status'));
        });
        
        // Yeni ekleme modalını temizle
        $('[data-bs-target="#serviceModal"]').click(function() {
            if (!$(this).hasClass('edit-service')) {
                $('#service_id').val('');
                $('#title').val('');
                $('#description').val('');
                $('#content').summernote('code', '');
                $('#slug').val('');
                $('#status').val('1');
            }
        });
        
        // Başlıktan otomatik URL oluştur
        $('#title').keyup(function() {
            if ($('#slug').val() == '') {
                var slug = $(this).val().toLowerCase()
                    .replace(/[ıİ]/g, 'i')
                    .replace(/[ğĞ]/g, 'g')
                    .replace(/[üÜ]/g, 'u')
                    .replace(/[şŞ]/g, 's')
                    .replace(/[öÖ]/g, 'o')
                    .replace(/[çÇ]/g, 'c')
                    .replace(/[^a-z0-9]/g, '-')
                    .replace(/-+/g, '-')
                    .replace(/^-|-$/g, '');
                $('#slug').val(slug);
            }
        });
    });
    </script>
</body>
</html> 
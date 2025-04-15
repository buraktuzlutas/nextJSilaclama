<?php
// Hata raporlamayı aktif et
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Oturum başlat
session_start();

// Veritabanı bağlantı bilgileri
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'peston_db');

// Veritabanı bağlantısı
try {
    $db = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=utf8mb4", DB_USER, DB_PASS);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo "Bağlantı hatası: " . $e->getMessage();
    exit;
}

// Yönetici kontrolü
function isAdmin() {
    return isset($_SESSION['admin_id']);
}

// Güvenli çıkış fonksiyonu
function logout() {
    session_destroy();
    header("Location: login.php");
    exit;
}

// XSS koruması
function clean($data) {
    return htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
}

// Dosya yükleme fonksiyonu
function uploadFile($file, $target_dir = "../uploads/") {
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    
    $target_file = $target_dir . basename($file["name"]);
    $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
    
    // Dosya türü kontrolü
    $allowed_types = array("jpg", "jpeg", "png", "gif");
    if (!in_array($imageFileType, $allowed_types)) {
        return ["error" => "Sadece JPG, JPEG, PNG & GIF dosyaları yüklenebilir."];
    }
    
    // Dosya boyutu kontrolü (5MB)
    if ($file["size"] > 5000000) {
        return ["error" => "Dosya boyutu çok büyük (max: 5MB)."];
    }
    
    // Benzersiz dosya adı oluştur
    $new_filename = uniqid() . '.' . $imageFileType;
    $target_file = $target_dir . $new_filename;
    
    if (move_uploaded_file($file["tmp_name"], $target_file)) {
        return ["success" => true, "filename" => $new_filename];
    } else {
        return ["error" => "Dosya yüklenirken bir hata oluştu."];
    }
}

// Ayarları getir
function getSetting($key) {
    global $db;
    $stmt = $db->prepare("SELECT setting_value FROM settings WHERE setting_key = ?");
    $stmt->execute([$key]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result ? $result['setting_value'] : null;
}

// Ayarları güncelle
function updateSetting($key, $value) {
    global $db;
    $stmt = $db->prepare("UPDATE settings SET setting_value = ? WHERE setting_key = ?");
    return $stmt->execute([$value, $key]);
}
?> 
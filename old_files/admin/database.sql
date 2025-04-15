-- Veritabanı oluştur
CREATE DATABASE IF NOT EXISTS peston_db CHARACTER SET utf8mb4 COLLATE utf8mb4_turkish_ci;
USE peston_db;

-- Yönetici tablosu
CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    last_login DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Slider tablosu
CREATE TABLE sliders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    description TEXT,
    image_path VARCHAR(255) NOT NULL,
    button_text VARCHAR(50),
    button_link VARCHAR(255),
    order_number INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Hizmetler tablosu
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_path VARCHAR(255),
    icon_class VARCHAR(50),
    button_text VARCHAR(50),
    button_link VARCHAR(255),
    order_number INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Müşteri yorumları tablosu
CREATE TABLE testimonials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_name VARCHAR(100) NOT NULL,
    client_title VARCHAR(100),
    comment TEXT NOT NULL,
    image_path VARCHAR(255),
    rating INT DEFAULT 5,
    is_active TINYINT(1) DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Teklif talepleri tablosu
CREATE TABLE quote_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(100),
    city VARCHAR(50) NOT NULL,
    district VARCHAR(50) NOT NULL,
    property_type VARCHAR(50) NOT NULL,
    area INT NOT NULL,
    pest_types TEXT NOT NULL,
    periodic_discount TINYINT(1) DEFAULT 0,
    apartment_discount TINYINT(1) DEFAULT 0,
    warranty_requested TINYINT(1) DEFAULT 0,
    status ENUM('new', 'processing', 'completed', 'cancelled') DEFAULT 'new',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Genel ayarlar tablosu
CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    setting_key VARCHAR(50) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_group VARCHAR(50) DEFAULT 'general',
    is_public TINYINT(1) DEFAULT 1,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Örnek veriler
INSERT INTO admin_users (username, password, email) VALUES 
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@example.com'); -- Şifre: password

INSERT INTO settings (setting_key, setting_value, setting_group) VALUES 
('site_title', 'Peston İlaçlama', 'general'),
('phone', '+90 555 123 45 67', 'contact'),
('email', 'info@peston.com.tr', 'contact'),
('address', 'İstanbul, Türkiye', 'contact'),
('facebook', 'https://facebook.com/', 'social'),
('twitter', 'https://twitter.com/', 'social'),
('instagram', 'https://instagram.com/', 'social'),
('youtube', 'https://youtube.com/', 'social'),
('working_hours', 'Pzt - Cmt : 09.00 - 18.00', 'contact'); 
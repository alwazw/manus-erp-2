-- Create products table with all required fields
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    item_description VARCHAR(255) NOT NULL,
    sku VARCHAR(100) UNIQUE NOT NULL,
    screen_size_in NUMERIC(5,1),
    touchscreen BOOLEAN,
    storage_tb NUMERIC(10,2),
    memory_gb INTEGER,
    charger VARCHAR(100),
    accessories VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index on commonly queried fields
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_brand ON products(brand);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);

-- Insert sample product data
INSERT INTO products (category, brand, item_description, sku, screen_size_in, touchscreen, storage_tb, memory_gb, charger, accessories)
VALUES
    ('Laptops', 'Dell', 'Dell Latitude 5420 Touch screen', '5420-T-32-1000', 14, TRUE, 1, 32, 'N/A', NULL),
    ('Laptops', 'Dell', 'Dell Latitude 5420 Touch screen with Backpack', '5420-T-32-1000-BKPK', 14, TRUE, 1, 32, NULL, 'Backpack'),
    ('Laptops', 'HP', 'HP EliteBook 840 G8', 'EB840-16-512', 14, FALSE, 0.5, 16, 'USB-C', NULL),
    ('Laptops', 'Lenovo', 'Lenovo ThinkPad X1 Carbon', 'X1C-32-1000', 14, TRUE, 1, 32, 'USB-C', 'Docking Station'),
    ('Laptops', 'Apple', 'MacBook Pro 16', 'MBP16-32-1000', 16, FALSE, 1, 32, 'MagSafe', 'AppleCare+'),
    ('Desktops', 'Dell', 'Dell OptiPlex 7090', 'OPT7090-16-512', NULL, FALSE, 0.5, 16, NULL, 'Keyboard, Mouse'),
    ('Tablets', 'Apple', 'iPad Pro 12.9', 'IPAD-PRO-12-256', 12.9, TRUE, 0.25, 8, 'USB-C', 'Apple Pencil'),
    ('Tablets', 'Samsung', 'Galaxy Tab S8 Ultra', 'TABS8U-512', 14.6, TRUE, 0.5, 16, 'USB-C', 'S Pen'),
    ('Monitors', 'Dell', 'Dell UltraSharp 27 4K', 'U2720Q', 27, FALSE, NULL, NULL, NULL, 'HDMI Cable'),
    ('Accessories', 'Logitech', 'MX Master 3 Mouse', 'MX-MASTER-3', NULL, FALSE, NULL, NULL, 'USB-C', NULL);

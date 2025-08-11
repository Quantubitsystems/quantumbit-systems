import sqlite3 from 'sqlite3';

const dbPath = process.env.DATABASE_PATH || 'quantum.db';
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
  // Products table
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    price REAL NOT NULL,
    stock INTEGER DEFAULT 0,
    category TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Orders table
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    customer_phone TEXT NOT NULL,
    product_id INTEGER,
    quantity INTEGER DEFAULT 1,
    total_amount REAL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products (id)
  )`);

  // Testimonials table
  db.run(`CREATE TABLE IF NOT EXISTS testimonials (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    company TEXT,
    rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
    message TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Add image_url column if it doesn't exist
  db.run(`ALTER TABLE products ADD COLUMN image_url TEXT`, (err) => {
    // Ignore error if column already exists
  });

  // Categories table
  db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    value TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert default categories
  db.run(`INSERT OR IGNORE INTO categories (name, value) VALUES
    ('Toner', 'toner'),
    ('Ink', 'ink'),
    ('OPC Drum', 'opc_drum'),
    ('Cleaning Blade', 'cleaning_blade'),
    ('Fuser Roller', 'fuser_roller'),
    ('Teflon', 'teflon')
  `);

  // Projects table
  db.run(`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    project_url TEXT,
    technologies TEXT,
    features TEXT,
    status TEXT DEFAULT 'completed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Add features column if it doesn't exist
  db.run(`ALTER TABLE projects ADD COLUMN features TEXT`, (err) => {
    // Ignore error if column already exists
  });

  // Newsletter subscribers table
  db.run(`CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'active'
  )`);

  // Product reviews table
  db.run(`CREATE TABLE IF NOT EXISTS product_reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    customer_name TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    status TEXT DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products (id)
  )`);

  // Blog posts table
  db.run(`CREATE TABLE IF NOT EXISTS blog_posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    author TEXT NOT NULL,
    status TEXT DEFAULT 'published',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert sample products
  db.run(`INSERT OR IGNORE INTO products (id, brand, model, price, stock, category) VALUES
    (1, 'HP', 'CF217A Toner Cartridge', 8500, 15, 'toner'),
    (2, 'Kyocera', 'TK-1170 Toner Kit', 12000, 8, 'toner'),
    (3, 'Epson', 'T664 Ink Bottles Set', 3200, 10, 'ink'),
    (4, 'Canon', 'CRG-337 Toner', 6800, 12, 'toner')
  `);
  
  // Update existing products to be in stock
  db.run(`UPDATE products SET stock = 10 WHERE stock = 0`);

  // Insert sample testimonials
  db.run(`INSERT OR IGNORE INTO testimonials (id, customer_name, customer_email, company, rating, message, status) VALUES
    (1, 'Sarah Johnson', 'sarah@techstart.com', 'TechStart Inc.', 5, 'Quantum Systems delivered our e-commerce platform ahead of schedule. Their attention to detail and technical expertise is outstanding.', 'approved'),
    (2, 'Michael Chen', 'michael@globalcorp.com', 'Global Corp', 5, 'Professional WiFi installation for our 200-person office. Zero downtime and excellent ongoing support.', 'approved'),
    (3, 'Lisa Rodriguez', 'lisa@creative.com', 'Creative Agency', 5, 'Our printer fleet has never run smoother. Quantum maintenance service is reliable and cost-effective.', 'approved')
  `);

  // Settings table
  db.run(`CREATE TABLE IF NOT EXISTS settings (
    id INTEGER PRIMARY KEY,
    social_links TEXT NOT NULL
  )`);

  // Insert default social links
  db.run(`INSERT OR IGNORE INTO settings (id, social_links) VALUES (1, ?)`, 
    [JSON.stringify({
      facebook: 'https://facebook.com/quantumbitsystems',
      twitter: 'https://twitter.com/quantumbitsys', 
      linkedin: 'https://linkedin.com/company/quantumbit-systems',
      instagram: 'https://instagram.com/quantumbitsystems'
    })]);

  // No sample projects - start with empty portfolio
});

export default db;
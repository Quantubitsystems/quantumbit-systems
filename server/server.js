import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './database.js';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Quantum Backend API is running!' });
});

app.use(cors({ 
  origin: [
    'http://localhost:8080', 
    'http://172.32.0.250:8080',
    'https://quantumbitsystems.com',
    'https://www.quantumbitsystems.com',
    'https://quantumbitsystems.pages.dev',
    'https://quantumbit-systems.pages.dev'
  ],
  credentials: true 
}));
app.use(express.json());

// Simple auth middleware for admin routes
const adminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== 'Bearer quantum2024admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// Email transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Get all products
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  db.get('SELECT * FROM products WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Product not found' });
    res.json(row);
  });
});

// Add new product
app.post('/api/products', adminAuth, (req, res) => {
  const { brand, model, price, stock, category, image_url } = req.body;
  
  if (!brand || !model || !category || typeof price !== 'number' || typeof stock !== 'number') {
    return res.status(400).json({ error: 'Invalid product data' });
  }
  
  db.run(
    'INSERT INTO products (brand, model, price, stock, category, image_url) VALUES (?, ?, ?, ?, ?, ?)',
    [brand, model, price, stock, category, image_url || null],
    function(err) {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to add product' });
      }
      res.json({ id: this.lastID, message: 'Product added successfully' });
    }
  );
});

// Update product
app.put('/api/products/:id', adminAuth, (req, res) => {
  const { brand, model, price, stock, category, image_url } = req.body;
  
  if (!brand || !model || !category || typeof price !== 'number' || typeof stock !== 'number') {
    return res.status(400).json({ error: 'Invalid product data' });
  }
  
  db.run(
    'UPDATE products SET brand = ?, model = ?, price = ?, stock = ?, category = ?, image_url = ? WHERE id = ?',
    [brand, model, price, stock, category, image_url || null, req.params.id],
    function(err) {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Failed to update product' });
      }
      res.json({ message: 'Product updated successfully' });
    }
  );
});

// Delete product
app.delete('/api/products/:id', adminAuth, (req, res) => {
  db.run('DELETE FROM products WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to delete product' });
    }
    res.json({ message: 'Product deleted successfully' });
  });
});

// Get categories
app.get('/api/categories', (req, res) => {
  db.all('SELECT * FROM categories ORDER BY name', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add category
app.post('/api/categories', (req, res) => {
  const { name, value } = req.body;
  db.run('INSERT INTO categories (name, value) VALUES (?, ?)', [name, value], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, message: 'Category added successfully' });
  });
});

// Get projects
app.get('/api/projects', (req, res) => {
  db.all('SELECT * FROM projects ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add project
app.post('/api/projects', (req, res) => {
  const { title, description, category, image_url, project_url, technologies, features } = req.body;
  db.run('INSERT INTO projects (title, description, category, image_url, project_url, technologies, features) VALUES (?, ?, ?, ?, ?, ?, ?)', 
    [title, description, category, image_url, project_url, technologies, features], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, message: 'Project added successfully' });
  });
});

// Update project
app.put('/api/projects/:id', (req, res) => {
  const { title, description, category, image_url, project_url, technologies, features } = req.body;
  db.run('UPDATE projects SET title = ?, description = ?, category = ?, image_url = ?, project_url = ?, technologies = ?, features = ? WHERE id = ?', 
    [title, description, category, image_url, project_url, technologies, features, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Project updated successfully' });
  });
});

// Delete project
app.delete('/api/projects/:id', (req, res) => {
  db.run('DELETE FROM projects WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Project deleted successfully' });
  });
});

// Create order
app.post('/api/orders', async (req, res) => {
  const { customer_name, customer_email, customer_phone, product_id, quantity = 1 } = req.body;

  // Validate input
  if (!customer_name || !customer_email || !customer_phone || !product_id || !quantity) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Get product details
  db.get('SELECT * FROM products WHERE id = ?', [product_id], (err, product) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    if (product.stock < quantity) return res.status(400).json({ error: 'Insufficient stock' });

    const total_amount = product.price * quantity;

    // Create order
    db.run(
      'INSERT INTO orders (customer_name, customer_email, customer_phone, product_id, quantity, total_amount) VALUES (?, ?, ?, ?, ?, ?)',
      [customer_name, customer_email, customer_phone, product_id, quantity, total_amount],
      function(err) {
        if (err) return res.status(500).json({ error: err.message });

        // Update stock
        db.run('UPDATE products SET stock = stock - ? WHERE id = ?', [quantity, product_id]);

        // Send confirmation email to customer
        const customerMailOptions = {
          from: process.env.EMAIL_USER,
          to: customer_email,
          subject: 'Order Confirmation - QuantumBit Systems',
          html: `
            <h2>Order Confirmation</h2>
            <p>Dear ${customer_name},</p>
            <p>Your order has been received:</p>
            <ul>
              <li>Product: ${product.brand} ${product.model}</li>
              <li>Quantity: ${quantity}</li>
              <li>Total: KSh ${total_amount.toLocaleString()}</li>
            </ul>
            <p>We'll contact you shortly to arrange delivery.</p>
            <p>Best regards,<br>QuantumBit Systems</p>
          `
        };

        // Send notification to you
        const adminMailOptions = {
          from: process.env.EMAIL_USER,
          to: 'quantumbitsystems@outlook.com',
          subject: 'New Order Received - QuantumBit Systems',
          html: `
            <h2>New Order Received</h2>
            <p><strong>Customer:</strong> ${customer_name}</p>
            <p><strong>Email:</strong> ${customer_email}</p>
            <p><strong>Phone:</strong> ${customer_phone}</p>
            <p><strong>Product:</strong> ${product.brand} ${product.model}</p>
            <p><strong>Quantity:</strong> ${quantity}</p>
            <p><strong>Total:</strong> KSh ${total_amount.toLocaleString()}</p>
            <p><strong>Order ID:</strong> ${this.lastID}</p>
          `
        };

        transporter.sendMail(customerMailOptions);
        transporter.sendMail(adminMailOptions);

        res.json({ 
          id: this.lastID, 
          message: 'Order created successfully',
          total_amount 
        });
      }
    );
  });
});

// Get orders
app.get('/api/orders', (req, res) => {
  db.all(`
    SELECT o.*, p.brand, p.model 
    FROM orders o 
    JOIN products p ON o.product_id = p.id 
    ORDER BY o.created_at DESC
  `, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Update order status (admin)
app.patch('/api/admin/orders/:id', adminAuth, (req, res) => {
  const { status } = req.body;
  
  db.run('UPDATE orders SET status = ? WHERE id = ?', [status, req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Order status updated successfully' });
  });
});

// Contact form
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, phone, service, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'quantumbitsystems@outlook.com',
    subject: `New Contact Form Submission - QuantumBit - ${service}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service:</strong> ${service}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Get approved testimonials
app.get('/api/testimonials', (req, res) => {
  db.all('SELECT * FROM testimonials WHERE status = "approved" ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Submit testimonial
app.post('/api/testimonials', async (req, res) => {
  const { customer_name, customer_email, company, rating, message } = req.body;

  db.run(
    'INSERT INTO testimonials (customer_name, customer_email, company, rating, message) VALUES (?, ?, ?, ?, ?)',
    [customer_name, customer_email, company || '', rating, message],
    function(err) {
      if (err) return res.status(500).json({ error: err.message });
      
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'quantumbitsystems@outlook.com',
        subject: 'New Testimonial Submitted',
        html: `
          <h2>New Testimonial Submitted</h2>
          <p><strong>Name:</strong> ${customer_name}</p>
          <p><strong>Company:</strong> ${company || 'N/A'}</p>
          <p><strong>Rating:</strong> ${rating}/5 stars</p>
          <p><strong>Message:</strong> ${message}</p>
        `
      };

      transporter.sendMail(mailOptions);
      res.json({ id: this.lastID, message: 'Testimonial submitted successfully' });
    }
  );
});

// Get all testimonials (admin)
app.get('/api/admin/testimonials', adminAuth, (req, res) => {
  db.all('SELECT * FROM testimonials ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Approve testimonial
app.put('/api/admin/testimonials/:id/approve', adminAuth, (req, res) => {
  db.run('UPDATE testimonials SET status = "approved" WHERE id = ?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Testimonial approved' });
  });
});

// Delete testimonial
app.delete('/api/admin/testimonials/:id', adminAuth, (req, res) => {
  db.run('DELETE FROM testimonials WHERE id = ?', [req.params.id], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Testimonial deleted successfully' });
  });
});

// Newsletter subscription
app.post('/api/newsletter/subscribe', async (req, res) => {
  const { email } = req.body;
  
  db.run('INSERT OR IGNORE INTO newsletter_subscribers (email) VALUES (?)', [email], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'quantumbitsystems@outlook.com',
      subject: 'New Newsletter Subscriber',
      html: `<p>New subscriber: ${email}</p>`
    };
    
    transporter.sendMail(mailOptions);
    res.json({ message: 'Subscribed successfully' });
  });
});

// Get newsletter subscribers (admin)
app.get('/api/admin/subscribers', adminAuth, (req, res) => {
  db.all('SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get product reviews
app.get('/api/products/:id/reviews', (req, res) => {
  db.all('SELECT * FROM product_reviews WHERE product_id = ? AND status = "approved" ORDER BY created_at DESC', 
    [req.params.id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add product review
app.post('/api/products/:id/reviews', (req, res) => {
  const { customer_name, rating, comment } = req.body;
  
  db.run('INSERT INTO product_reviews (product_id, customer_name, rating, comment) VALUES (?, ?, ?, ?)',
    [req.params.id, customer_name, rating, comment], function(err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: this.lastID, message: 'Review submitted for approval' });
  });
});

// Get blog posts
app.get('/api/blog', (req, res) => {
  db.all('SELECT * FROM blog_posts WHERE status = "published" ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Get single blog post
app.get('/api/blog/:id', (req, res) => {
  db.get('SELECT * FROM blog_posts WHERE id = ? AND status = "published"', [req.params.id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Blog post not found' });
    res.json(row);
  });
});

// Get all blog posts (admin)
app.get('/api/admin/blog', adminAuth, (req, res) => {
  db.all('SELECT * FROM blog_posts ORDER BY created_at DESC', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add blog post (admin)
app.post('/api/admin/blog', adminAuth, (req, res) => {
  const { title, excerpt, content, category, author, status = 'published' } = req.body;
  
  if (!title || !excerpt || !content || !category || !author) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  db.run('INSERT INTO blog_posts (title, excerpt, content, category, author, status) VALUES (?, ?, ?, ?, ?, ?)',
    [title, excerpt, content, category, author, status], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to add blog post' });
    }
    res.json({ id: this.lastID, message: 'Blog post added successfully' });
  });
});

// Update blog post (admin)
app.put('/api/admin/blog/:id', adminAuth, (req, res) => {
  const { title, excerpt, content, category, author, status = 'published' } = req.body;
  
  if (!title || !excerpt || !content || !category || !author) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  
  db.run('UPDATE blog_posts SET title = ?, excerpt = ?, content = ?, category = ?, author = ?, status = ? WHERE id = ?',
    [title, excerpt, content, category, author, status, req.params.id], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to update blog post' });
    }
    res.json({ message: 'Blog post updated successfully' });
  });
});

// Delete blog post (admin)
app.delete('/api/admin/blog/:id', adminAuth, (req, res) => {
  db.run('DELETE FROM blog_posts WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to delete blog post' });
    }
    res.json({ message: 'Blog post deleted successfully' });
  });
});

// Settings endpoints
app.get('/api/admin/settings', adminAuth, (req, res) => {
  db.get('SELECT * FROM settings WHERE id = 1', (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) {
      // Return default settings if none exist
      return res.json({
        facebook: 'https://facebook.com/quantumbitsystems',
        twitter: 'https://twitter.com/quantumbitsys',
        linkedin: 'https://linkedin.com/company/quantumbit-systems',
        instagram: 'https://instagram.com/quantumbitsystems'
      });
    }
    res.json(JSON.parse(row.social_links));
  });
});

app.post('/api/admin/settings', adminAuth, (req, res) => {
  const { socialLinks } = req.body;
  
  db.run('INSERT OR REPLACE INTO settings (id, social_links) VALUES (1, ?)', 
    [JSON.stringify(socialLinks)], function(err) {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ error: 'Failed to update settings' });
    }
    res.json({ message: 'Settings updated successfully' });
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Quantum Backend running on port ${PORT}`);
});
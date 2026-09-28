import express from 'express';
import cors from 'cors';
import crypto from 'crypto';
import db, { initDatabase } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));
app.use(express.json());

// Initialize SQLite schema and initial seed
initDatabase();

const SESSION_DAYS = 7;

function hashPassword(password, salt = crypto.randomBytes(16).toString('hex')) {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
}

function verifyPassword(password, storedHash) {
  const [salt, expected] = String(storedHash).split(':');
  if (!salt || !expected) return false;
  const actual = crypto.scryptSync(password, salt, 64).toString('hex');
  return crypto.timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(expected, 'hex'));
}

function createSession(userId) {
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  db.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)').run(token, userId, expiresAt);
  return token;
}

function getUserFromRequest(req) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return null;

  const row = db.prepare(`
    SELECT u.id, u.name, u.email, u.created_at
    FROM sessions s
    JOIN users u ON u.id = s.user_id
    WHERE s.token = ? AND s.expires_at > ?
  `).get(token, Date.now());

  if (!row) return null;
  return { ...row, token };
}

// Helper to format product from DB row
function formatProduct(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    subtitle: row.subtitle,
    category: row.category,
    collection: row.collection,
    price: row.price,
    originalPrice: row.original_price || undefined,
    description: row.description,
    editorialQuote: row.editorial_quote || undefined,
    details: JSON.parse(row.details || '[]'),
    materials: row.materials,
    care: row.care,
    sustainability: row.sustainability,
    images: JSON.parse(row.images || '[]'),
    colors: JSON.parse(row.colors || '[]'),
    sizes: JSON.parse(row.sizes || '[]'),
    stock: JSON.parse(row.stock || '{}'),
    rating: row.rating,
    reviewCount: row.review_count,
    isNew: Boolean(row.is_new),
    isBestseller: Boolean(row.is_bestseller),
    isFeatured: Boolean(row.is_featured),
    isLimited: Boolean(row.is_limited)
  };
}


// 0. Authentication
app.post('/api/auth/signup', (req, res) => {
  try {
    const name = String(req.body?.name || '').trim();
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email and password are required.' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address.' });
    }
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters.' });
    }

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const passwordHash = hashPassword(password);
    const result = db.prepare(
      'INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)'
    ).run(name, email, passwordHash);

    const user = {
      id: Number(result.lastInsertRowid),
      name,
      email
    };
    const token = createSession(user.id);

    res.status(201).json({ success: true, user, token });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Could not create your account.' });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const email = String(req.body?.email || '').trim().toLowerCase();
    const password = String(req.body?.password || '');

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const row = db.prepare('SELECT id, name, email, password_hash FROM users WHERE email = ?').get(email);
    if (!row || !verifyPassword(password, row.password_hash)) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = createSession(row.id);
    res.json({
      success: true,
      user: { id: row.id, name: row.name, email: row.email },
      token
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Could not sign you in.' });
  }
});

app.get('/api/auth/me', (req, res) => {
  const user = getUserFromRequest(req);
  if (!user) return res.status(401).json({ error: 'Not authenticated.' });
  res.json({ user: { id: user.id, name: user.name, email: user.email } });
});

app.post('/api/auth/logout', (req, res) => {
  try {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (token) db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Could not sign out.' });
  }
});

// 1. Health & Database Stats
app.get('/api/health', (req, res) => {
  try {
    const productsCount = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
    const ordersCount = db.prepare('SELECT COUNT(*) as count FROM orders').get().count;
    const reviewsCount = db.prepare('SELECT COUNT(*) as count FROM reviews').get().count;
    const subscribersCount = db.prepare('SELECT COUNT(*) as count FROM subscribers').get().count;

    res.json({
      status: 'ok',
      engine: 'SQLite (Node built-in)',
      databaseFile: 'server/aurel.db',
      stats: {
        products: productsCount,
        orders: ordersCount,
        reviews: reviewsCount,
        subscribers: subscribersCount
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// 2. GET /api/products (with filtering & search)
app.get('/api/products', (req, res) => {
  try {
    const { category, collection, search, minPrice, maxPrice, sort } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category && category !== 'all') {
      query += ' AND category = ?';
      params.push(category);
    }

    if (collection) {
      query += ' AND collection = ?';
      params.push(collection);
    }

    if (minPrice) {
      query += ' AND price >= ?';
      params.push(Number(minPrice));
    }

    if (maxPrice) {
      query += ' AND price <= ?';
      params.push(Number(maxPrice));
    }

    if (search) {
      query += ' AND (name LIKE ? OR subtitle LIKE ? OR description LIKE ? OR materials LIKE ?)';
      const term = `%${search}%`;
      params.push(term, term, term, term);
    }

    // Sorting
    if (sort === 'price-asc') {
      query += ' ORDER BY price ASC';
    } else if (sort === 'price-desc') {
      query += ' ORDER BY price DESC';
    } else if (sort === 'rating') {
      query += ' ORDER BY rating DESC';
    } else if (sort === 'newest') {
      query += ' ORDER BY is_new DESC, created_at DESC';
    } else {
      query += ' ORDER BY is_featured DESC, is_bestseller DESC, id ASC';
    }

    const rows = db.prepare(query).all(...params);
    res.json(rows.map(formatProduct));
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ error: 'Failed to fetch products from database' });
  }
});

// 3. GET /api/products/:id
app.get('/api/products/:id', (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
    if (!row) {
      return res.status(404).json({ error: 'Product not found in database' });
    }

    const product = formatProduct(row);
    const reviews = db.prepare('SELECT * FROM reviews WHERE product_id = ? ORDER BY created_at DESC').all(req.params.id);

    res.json({
      ...product,
      reviews: reviews.map(r => ({
        id: r.id,
        productId: r.product_id,
        author: r.author,
        rating: r.rating,
        date: r.date,
        title: r.title,
        comment: r.comment,
        verifiedPurchase: Boolean(r.verified_purchase),
        fitFeedback: r.fit_feedback
      }))
    });
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ error: 'Database query failed' });
  }
});

// 4. POST /api/reviews
app.post('/api/reviews', (req, res) => {
  try {
    const { productId, author, rating, title, comment, fitFeedback } = req.body;

    if (!productId || !author || !comment || !rating) {
      return res.status(400).json({ error: 'Missing required review fields' });
    }

    const id = `rev-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const insert = db.prepare(`
      INSERT INTO reviews (id, product_id, author, rating, date, title, comment, verified_purchase, fit_feedback)
      VALUES (?, ?, ?, ?, ?, ?, ?, 1, ?)
    `);

    insert.run(id, productId, author, rating, date, title || 'Client Experience', comment, fitFeedback || 'True to Size');

    // Recalculate average rating & review count for the product
    const stats = db.prepare(`
      SELECT AVG(rating) as avgRating, COUNT(*) as count FROM reviews WHERE product_id = ?
    `).get(productId);

    if (stats) {
      const roundedRating = Math.round(stats.avgRating * 10) / 10;
      db.prepare(`
        UPDATE products SET rating = ?, review_count = ? WHERE id = ?
      `).run(roundedRating, stats.count, productId);
    }

    res.status(201).json({
      success: true,
      review: {
        id,
        productId,
        author,
        rating,
        date,
        title: title || 'Client Experience',
        comment,
        verifiedPurchase: true,
        fitFeedback: fitFeedback || 'True to Size'
      }
    });
  } catch (err) {
    console.error('Error inserting review:', err);
    res.status(500).json({ error: 'Failed to write review to SQLite database' });
  }
});

// 5. POST /api/orders
app.post('/api/orders', (req, res) => {
  try {
    const { items, subtotal, discount, shipping, tax, total, currency, shippingDetails, paymentMethod } = req.body;

    if (!items || !items.length || !shippingDetails) {
      return res.status(400).json({ error: 'Invalid order payload' });
    }

    const orderId = `AURL-${Math.floor(10000 + Math.random() * 90000)}`;
    const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const insert = db.prepare(`
      INSERT INTO orders (
        order_id, date, items, subtotal, discount, shipping, tax, total,
        currency, shipping_details, payment_method, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'confirmed')
    `);

    insert.run(
      orderId,
      date,
      JSON.stringify(items),
      subtotal,
      discount || 0,
      shipping || 0,
      tax || 0,
      total,
      currency || 'INR',
      JSON.stringify(shippingDetails),
      paymentMethod || 'Credit Card'
    );

    console.log(`Order ${orderId} successfully registered in SQLite database for ${shippingDetails.firstName} ${shippingDetails.lastName}.`);

    res.status(201).json({
      success: true,
      order: {
        orderId,
        date,
        items,
        subtotal,
        discount: discount || 0,
        shipping: shipping || 0,
        tax: tax || 0,
        total,
        currency: currency || 'INR',
        shippingDetails,
        paymentMethod: paymentMethod || 'Credit Card',
        status: 'confirmed'
      }
    });
  } catch (err) {
    console.error('Error saving order:', err);
    res.status(500).json({ error: 'Failed to record order into SQLite database' });
  }
});

// 6. GET /api/orders/:orderId
app.get('/api/orders/:orderId', (req, res) => {
  try {
    const row = db.prepare('SELECT * FROM orders WHERE order_id = ?').get(req.params.orderId);
    if (!row) {
      return res.status(404).json({ error: 'Order not found in database ledger' });
    }

    res.json({
      orderId: row.order_id,
      date: row.date,
      items: JSON.parse(row.items || '[]'),
      subtotal: row.subtotal,
      discount: row.discount,
      shipping: row.shipping,
      tax: row.tax,
      total: row.total,
      currency: row.currency,
      shippingDetails: JSON.parse(row.shipping_details || '{}'),
      paymentMethod: row.payment_method,
      status: row.status,
      createdAt: row.created_at
    });
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

// 7. POST /api/newsletter
app.post('/api/newsletter', (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Valid email address is required' });
    }

    try {
      db.prepare('INSERT INTO subscribers (email) VALUES (?)').run(email.trim().toLowerCase());
    } catch (dbErr) {
      // Ignore unique constraint error if already subscribed
    }

    res.json({ success: true, message: 'Subscription recorded in atelier ledger' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to record subscription' });
  }
});

app.listen(PORT, () => {
  console.log(`[AUREL BACKEND] SQLite database API server listening at http://localhost:${PORT}`);
});

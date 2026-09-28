import { supabaseFetch } from '../_lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { name, email, password } = req.body || {};
    if (!name || !email || !password) return res.status(400).json({ error: 'Name, email and password are required.' });
    if (String(password).length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters.' });

    const upstream = await supabaseFetch('/auth/v1/signup', {
      method: 'POST',
      body: JSON.stringify({ email: String(email).trim().toLowerCase(), password: String(password), data: { name: String(name).trim() } })
    });
    const data = await upstream.json();
    if (!upstream.ok) return res.status(upstream.status).json({ error: data?.msg || data?.message || data?.error_description || 'Could not create your account.' });

    const user = data.user || data;
    return res.status(201).json({
      success: true,
      user: { id: user.id, name: user.user_metadata?.name || String(name).trim(), email: user.email },
      token: data.access_token || null
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message || 'Authentication service is not configured.' });
  }
}

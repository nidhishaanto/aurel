import { supabaseFetch } from '../_lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ error: 'Email and password are required.' });
    const upstream = await supabaseFetch('/auth/v1/token?grant_type=password', {
      method: 'POST',
      body: JSON.stringify({ email: String(email).trim().toLowerCase(), password: String(password) })
    });
    const data = await upstream.json();
    if (!upstream.ok) return res.status(upstream.status).json({ error: data?.msg || data?.message || data?.error_description || 'Invalid email or password.' });
    const user = data.user;
    return res.status(200).json({
      success: true,
      user: { id: user.id, name: user.user_metadata?.name || user.email?.split('@')[0] || 'Aurel Client', email: user.email },
      token: data.access_token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message || 'Authentication service is not configured.' });
  }
}

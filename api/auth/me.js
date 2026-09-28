import { supabaseFetch } from '../_lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Not authenticated.' });
  try {
    const upstream = await supabaseFetch('/auth/v1/user', { headers: { Authorization: auth } });
    const data = await upstream.json();
    if (!upstream.ok) return res.status(401).json({ error: 'Not authenticated.' });
    return res.status(200).json({ user: { id: data.id, name: data.user_metadata?.name || data.email?.split('@')[0] || 'Aurel Client', email: data.email } });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Authentication service is not configured.' });
  }
}

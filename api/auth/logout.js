import { supabaseFetch } from '../_lib/supabase.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const auth = req.headers.authorization || '';
  if (auth.startsWith('Bearer ')) {
    try { await supabaseFetch('/auth/v1/logout', { method: 'POST', headers: { Authorization: auth } }); } catch {}
  }
  return res.status(200).json({ success: true });
}

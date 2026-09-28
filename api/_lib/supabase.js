export function supabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error('Missing SUPABASE_URL and SUPABASE_ANON_KEY environment variables.');
  return { url: url.replace(/\/$/, ''), anonKey };
}

export async function supabaseFetch(path, options = {}) {
  const { url, anonKey } = supabaseConfig();
  const headers = {
    apikey: anonKey,
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  return fetch(`${url}${path}`, { ...options, headers });
}

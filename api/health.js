export default function handler(_req, res) {
  res.status(200).json({ status: 'ok', platform: 'Vercel', products: 'static catalog API' });
}

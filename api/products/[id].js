import products from '../data/products.json' with { type: 'json' };
import reviews from '../data/reviews.json' with { type: 'json' };

export default function handler(req, res) {
  const id = req.query?.id;
  const product = products.find(p => p.id === id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  return res.status(200).json({
    ...product,
    reviews: reviews.filter(r => r.productId === id)
  });
}

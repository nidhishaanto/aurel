import products from './data/products.json' with { type: 'json' };

export default function handler(req, res) {
  try {
    const { category, collection, search, minPrice, maxPrice, sort } = req.query || {};
    let result = [...products];

    if (category && category !== 'all') result = result.filter(p => p.category === category);
    if (collection) result = result.filter(p => p.collection === collection);
    if (minPrice !== undefined && minPrice !== '') result = result.filter(p => p.price >= Number(minPrice));
    if (maxPrice !== undefined && maxPrice !== '') result = result.filter(p => p.price <= Number(maxPrice));
    if (search) {
      const term = String(search).toLowerCase();
      result = result.filter(p => [p.name,p.subtitle,p.description,p.materials].some(v => String(v || '').toLowerCase().includes(term)));
    }

    if (sort === 'price-asc') result.sort((a,b) => a.price - b.price);
    else if (sort === 'price-desc') result.sort((a,b) => b.price - a.price);
    else if (sort === 'rating') result.sort((a,b) => b.rating - a.rating);
    else if (sort === 'newest') result.sort((a,b) => Number(b.isNew) - Number(a.isNew));
    else result.sort((a,b) => Number(b.isFeatured) - Number(a.isFeatured) || Number(b.isBestseller) - Number(a.isBestseller));

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
}

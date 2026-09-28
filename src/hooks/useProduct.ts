import { useState, useEffect } from 'react';
import { Product } from '../types/ecommerce';

/**
 * Hook to fetch a single product by its ID.
 * Returns the product data along with loading and error states.
 */
export const useProduct = (productId: string) => {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`/api/products/${productId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Product request failed (${res.status}). Start Aurel with npm run dev.`);
        const data = await res.json();
        setProduct(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [productId]);

  return { product, loading, error };
};

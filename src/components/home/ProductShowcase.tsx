import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '../../hooks/useProducts';
import type { Product } from '../../types/ecommerce';
import { ProductCard } from '../shop/ProductCard';

interface ProductShowcaseProps {
  onSelectProduct: (productId: string) => void;
  onViewAll: () => void;
  onQuickView: (product: Product) => void;
}

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({
  onSelectProduct,
  onViewAll,
  onQuickView
}) => {
  const [activeTab, setActiveTab] = useState<'featured' | 'new' | 'bestsellers'>('featured');

  const { products, loading, error } = useProducts();
  if (loading) return <div className="py-20 text-center">Loading products…</div>;
  if (error) return <div className="py-20 text-center text-red-600">Error: {error}</div>;

  const filteredProducts = products.filter((product) => {
    if (activeTab === 'new') return product.isNew;
    if (activeTab === 'bestsellers') return product.isBestseller;
    return product.isFeatured;
  }).slice(0, 8);

  return (
    <section className="py-20 bg-[#FBF9F5] border-b border-[#E8E3D8]">
      <div className="editorial-container">
        
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E8E3D8] gap-6">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#5E1924] block mb-2">
              Artisanal Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917] tracking-tight">
              Selected Silhouettes
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setActiveTab('featured')}
              className={`text-xs tracking-[0.16em] uppercase py-1 border-b-2 transition-all cursor-pointer ${
                activeTab === 'featured'
                  ? 'border-[#5E1924] text-[#5E1924] font-semibold'
                  : 'border-transparent text-[#78746D] hover:text-[#1A1917]'
              }`}
            >
              Curated Edit
            </button>
            <button
              onClick={() => setActiveTab('new')}
              className={`text-xs tracking-[0.16em] uppercase py-1 border-b-2 transition-all cursor-pointer ${
                activeTab === 'new'
                  ? 'border-[#5E1924] text-[#5E1924] font-semibold'
                  : 'border-transparent text-[#78746D] hover:text-[#1A1917]'
              }`}
            >
              New Season
            </button>
            <button
              onClick={() => setActiveTab('bestsellers')}
              className={`text-xs tracking-[0.16em] uppercase py-1 border-b-2 transition-all cursor-pointer ${
                activeTab === 'bestsellers'
                  ? 'border-[#5E1924] text-[#5E1924] font-semibold'
                  : 'border-transparent text-[#78746D] hover:text-[#1A1917]'
              }`}
            >
              Permanent Bestsellers
            </button>
          </div>
        </div>

        {/* Product Grid: 4 items per row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onQuickView={onQuickView}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <button
            onClick={onViewAll}
            className="inline-flex items-center gap-3 py-3.5 px-8 bg-[#1A1917] hover:bg-[#5E1924] text-[#FBF9F5] text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-all shadow-sm group cursor-pointer"
          >
            <span>Explore All {products.length} Silhouettes</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

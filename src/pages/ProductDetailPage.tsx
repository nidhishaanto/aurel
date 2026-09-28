import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types/ecommerce';
import { PRODUCTS } from '../data/products';
import { ImageGallery } from '../components/product/ImageGallery';
import { ProductInfo } from '../components/product/ProductInfo';
import { SizeGuideModal } from '../components/product/SizeGuideModal';
import { ProductReviews } from '../components/product/ProductReviews';
import { ProductCard } from '../components/shop/ProductCard';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (page: string, param?: string) => void;
  onSelectProduct: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onNavigate,
  onSelectProduct,
  onQuickView
}) => {
  const [product, setProduct] = useState<Product | undefined>(() =>
    PRODUCTS.find((p) => p.id === productId) || PRODUCTS[0]
  );
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    const found = PRODUCTS.find((p) => p.id === productId);
    if (found) {
      setProduct(found);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="py-24 text-center">
        <h2 className="font-serif text-2xl">Product not found.</h2>
        <button
          onClick={() => onNavigate('shop')}
          className="mt-4 text-xs uppercase tracking-widest text-[#5E1924] underline"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  // Related products from same category or collection
  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.collection === product.collection)
  ).slice(0, 4);

  // Styled with product
  const styledWithProduct = PRODUCTS.find(
    (p) => p.id !== product.id && p.category !== product.category
  ) || PRODUCTS[1];

  return (
    <div className="py-8 bg-[#FBF9F5] min-h-screen">
      <div className="editorial-container">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs tracking-wider uppercase text-[#78746D] mb-8 pb-3 border-b border-[#E8E3D8]">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#1A1917] transition-colors"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-[#A8A297]" />
          <button
            onClick={() => onNavigate('shop')}
            className="hover:text-[#1A1917] transition-colors"
          >
            Shop
          </button>
          <ChevronRight className="w-3 h-3 text-[#A8A297]" />
          <button
            onClick={() => onNavigate('shop', product.category)}
            className="hover:text-[#1A1917] transition-colors"
          >
            {product.category}
          </button>
          <ChevronRight className="w-3 h-3 text-[#A8A297]" />
          <span className="text-[#1A1917] font-medium truncate max-w-xs">
            {product.name}
          </span>
        </div>

        {/* Back Link */}
        <button
          onClick={() => onNavigate('shop')}
          className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-[#78746D] hover:text-[#5E1924] mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Collection</span>
        </button>

        {/* Main Product Showcase (Left Gallery, Right Sticky Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">
          {/* Gallery Column (60% width on desktop) */}
          <div className="lg:col-span-7">
            <ImageGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Details & Ordering Sticky Column (40% width on desktop) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <ProductInfo
                product={product}
                onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
                onSelectColor={() => {}}
              />
            </div>
          </div>
        </div>

        {/* Complete the Look / Styled With Section */}
        {styledWithProduct && (
          <div className="mt-20 pt-12 border-t border-[#E8E3D8]">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#5E1924] block mb-2">
              Atelier Pairing
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1917] mb-8">
              Complete the Look
            </h3>

            <div className="bg-[#F7F4EE] border border-[#E8E3D8] p-6 sm:p-8 rounded-xs grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 aspect-[3/4] max-w-xs mx-auto overflow-hidden bg-white border border-[#E0D8CA]">
                <img
                  src={styledWithProduct.images[0]}
                  alt={styledWithProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-8 space-y-4">
                <span className="text-[10px] tracking-widest uppercase text-[#78746D]">
                  Curator&rsquo;s Choice &bull; {styledWithProduct.category}
                </span>
                <h4 className="font-serif text-2xl text-[#1A1917]">
                  {styledWithProduct.name}
                </h4>
                <p className="text-xs text-[#5C5852] leading-relaxed max-w-xl">
                  {styledWithProduct.description}
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => onSelectProduct(styledWithProduct.id)}
                    className="py-3 px-6 bg-[#1A1917] hover:bg-[#5E1924] text-white text-xs tracking-[0.18em] uppercase rounded-xs transition-colors"
                  >
                    Explore Companion Silhouette
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Customer Reviews & Testimonials */}
        <ProductReviews
          productId={product.id}
          rating={product.rating}
          reviewCount={product.reviewCount}
        />

        {/* You May Also Admire Carousel / Grid */}
        <div className="mt-20 pt-12 border-t border-[#E8E3D8]">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-[#E8E3D8]">
            <div>
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#5E1924] block mb-1">
                Complementary Pieces
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1A1917]">
                You May Also Admire
              </h3>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs tracking-wider uppercase text-[#5E1924] hover:underline"
            >
              View Full Collection &rarr;
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard
                key={rel.id}
                product={rel}
                onSelect={onSelectProduct}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        </div>

      </div>

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        category={product.category}
      />
    </div>
  );
};

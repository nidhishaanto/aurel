import React from 'react';
import { Heart, ArrowLeft, Trash2, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types/ecommerce';

interface WishlistPageProps {
  onNavigate: (page: string, param?: string) => void;
  onSelectProduct: (productId: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  onNavigate,
  onSelectProduct
}) => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const savedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleMoveToBag = (product: Product) => {
    addToCart({
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      image: product.images[0],
      size: product.sizes[0] || 'M',
      color: product.colors[0]?.name || 'Classic'
    }, 1);

    toggleWishlist(product.id);
  };

  return (
    <div className="py-12 bg-[#FBF9F5] min-h-screen">
      <div className="editorial-container">
        
        {/* Header */}
        <div className="pb-6 mb-8 border-b border-[#E8E3D8] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#5E1924] block mb-1">
              Private Archives
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1917]">
              Saved Wishlist ({savedProducts.length})
            </h1>
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-[#78746D] hover:text-[#5E1924]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Collection</span>
          </button>
        </div>

        {savedProducts.length === 0 ? (
          <div className="py-24 text-center bg-[#F7F4EE] border border-[#E8E3D8] rounded-xs max-w-xl mx-auto p-8">
            <div className="w-14 h-14 rounded-full bg-[#EFEAE1] flex items-center justify-center mx-auto mb-4 text-[#78746D]">
              <Heart className="w-6 h-6 stroke-[1.5]" />
            </div>
            <span className="font-serif text-2xl text-[#2E2C29] italic block mb-2">
              Your wishlist is pristine and empty
            </span>
            <p className="text-xs text-[#78746D] mb-8 leading-relaxed max-w-sm mx-auto">
              Save your favorite silhouettes as you browse to review fit, coordinate palettes, or return when you are ready.
            </p>
            <button
              onClick={() => onNavigate('shop')}
              className="py-3.5 px-8 bg-[#1A1917] hover:bg-[#5E1924] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-colors cursor-pointer"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {savedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-[#E8E3D8] rounded-xs overflow-hidden flex flex-col group"
              >
                <div 
                  className="aspect-[3/4] relative bg-[#F4F0E8] overflow-hidden cursor-pointer"
                  onClick={() => onSelectProduct(product.id)}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                    className="absolute top-3 right-3 p-2 bg-white/90 text-[#5E1924] rounded-full shadow-sm"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-[#78746D]">
                      {product.category}
                    </span>
                    <h3
                      onClick={() => onSelectProduct(product.id)}
                      className="font-serif text-base text-[#1A1917] hover:text-[#5E1924] transition-colors cursor-pointer truncate mt-0.5"
                    >
                      {product.name}
                    </h3>
                    <span className="text-xs font-semibold text-[#1A1917] block mt-1">
                      {formatPrice(product.price)}
                    </span>
                  </div>

                  <div className="pt-4 mt-3 border-t border-[#EFEAE1] space-y-2">
                    <button
                      onClick={() => handleMoveToBag(product)}
                      className="w-full py-2.5 bg-[#1A1917] hover:bg-[#5E1924] text-white text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

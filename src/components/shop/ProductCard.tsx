import React, { useState } from 'react';
import { Heart, Eye, Plus, Check } from 'lucide-react';
import { Product } from '../../types/ecommerce';
import { useCurrency } from '../../context/CurrencyContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onQuickView
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickAddSizes, setShowQuickAddSizes] = useState(false);
  const [addedSize, setAddedSize] = useState<string | null>(null);

  const { formatPrice } = useCurrency();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  const isSaved = isInWishlist(product.id);

  // When hovering, switch to secondary photo if available, unless user specifically hovered a colorway
  const displayImage = isHovered && activeImageIndex === 0 && product.images.length > 1
    ? product.images[1]
    : product.images[activeImageIndex] || product.images[0];

  const handleQuickAdd = (size: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const chosenColor = product.colors[0]?.name || 'Classic';
    addToCart({
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      image: product.images[0],
      size,
      color: chosenColor
    }, 1);

    setAddedSize(size);
    setTimeout(() => {
      setAddedSize(null);
      setShowQuickAddSizes(false);
    }, 1200);
  };

  return (
    <div
      className="group relative flex flex-col cursor-pointer transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickAddSizes(false);
      }}
      onClick={() => onSelect(product.id)}
    >
      {/* Image Container with 3:4 Portrait Ratio */}
      <div className="relative aspect-[3/4] w-full bg-[#F4F0E8] overflow-hidden border border-[#EBE6DC]">
        {/* Main Product Image with subtle scale */}
        <img
          src={displayImage}
          alt={product.name}
          className={`w-full h-full object-cover object-center transition-all duration-700 ease-out ${
            isHovered ? 'scale-105 filter brightness-[0.98]' : 'scale-100'
          }`}
          loading="lazy"
        />

        {/* Eyebrow Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isNew && (
            <span className="bg-[#FAF2F0] text-[#5E1924] border border-[#5E1924]/20 text-[10px] font-semibold tracking-[0.16em] uppercase px-2 py-0.5 shadow-xs">
              New Season
            </span>
          )}
          {product.isBestseller && !product.isNew && (
            <span className="bg-[#FFFFFF]/90 backdrop-blur-xs text-[#2E2C29] text-[10px] font-medium tracking-[0.16em] uppercase px-2 py-0.5">
              Bestseller
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-[#5E1924] text-[#FBF9F5] text-[10px] font-medium tracking-[0.16em] uppercase px-2 py-0.5">
              Archive Sale
            </span>
          )}
        </div>

        {/* Wishlist Button (Floating, appears on hover or stays visible if active) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all duration-300 z-20 ${
            isSaved
              ? 'bg-[#5E1924] text-[#FBF9F5] opacity-100 shadow-md scale-105'
              : isHovered
              ? 'bg-white/90 text-[#2E2C29] hover:text-[#5E1924] opacity-100 shadow-sm'
              : 'opacity-0'
          }`}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : 'stroke-[1.75]'}`} />
        </button>

        {/* Quick View Button */}
        {onQuickView && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className={`absolute bottom-14 right-3 p-2 bg-white/90 hover:bg-white text-[#2E2C29] hover:text-[#5E1924] rounded-full shadow-md backdrop-blur-sm transition-all duration-300 z-20 ${
              isHovered && !showQuickAddSizes ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
            }`}
            title="Quick View"
          >
            <Eye className="w-4 h-4 stroke-[1.75]" />
          </button>
        )}

        {/* Quick Add Bar (Sliding up from bottom) */}
        <div
          className={`absolute inset-x-0 bottom-0 z-20 bg-white/95 backdrop-blur-sm border-t border-[#E8E3D8] transition-all duration-300 p-2.5 ${
            showQuickAddSizes
              ? 'translate-y-0 opacity-100'
              : isHovered
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0 pointer-events-none'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {!showQuickAddSizes ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (product.sizes.length === 1 && product.sizes[0] === 'One Size') {
                  handleQuickAdd('One Size', e);
                } else {
                  setShowQuickAddSizes(true);
                }
              }}
              className="w-full py-2 bg-[#1A1917] hover:bg-[#5E1924] text-[#FBF9F5] text-[11px] font-medium tracking-[0.16em] uppercase flex items-center justify-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Quick Add to Bag</span>
            </button>
          ) : (
            <div>
              <p className="text-[10px] tracking-widest uppercase text-[#78746D] text-center mb-1.5 font-medium">
                Select Your Size
              </p>
              <div className="flex justify-center gap-1.5 flex-wrap">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => handleQuickAdd(size, e)}
                    className={`py-1 px-2.5 text-[11px] tracking-wider uppercase border transition-all ${
                      addedSize === size
                        ? 'bg-[#5E1924] text-white border-[#5E1924]'
                        : 'bg-[#FBF9F5] text-[#2E2C29] border-[#D8D2C5] hover:border-[#1A1917]'
                    }`}
                  >
                    {addedSize === size ? (
                      <span className="flex items-center gap-1">
                        <Check className="w-3 h-3" />
                      </span>
                    ) : (
                      size
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-1 flex flex-col flex-1">
        {/* Category & Collection Eyebrow */}
        <div className="flex items-center justify-between text-[10px] tracking-[0.18em] uppercase text-[#78746D] font-medium">
          <span>{product.collection}</span>
          <span className="text-[#8C877E]">{product.category}</span>
        </div>

        {/* Product Title */}
        <h3 className="font-serif text-base font-medium text-[#1A1917] mt-1 group-hover:text-[#5E1924] transition-colors line-clamp-1">
          {product.name}
        </h3>

        {/* Price & Currency */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-sm font-semibold text-[#1A1917]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#9C968B] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-2 mt-2 pt-1">
          <span className="text-[10px] text-[#78746D] tracking-wider uppercase">
            Available in:
          </span>
          <div className="flex items-center gap-1.5">
            {product.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImageIndex(color.imageIndex);
                }}
                className={`w-3.5 h-3.5 rounded-full border transition-all ${
                  activeImageIndex === color.imageIndex
                    ? 'ring-1 ring-[#5E1924] ring-offset-1 border-[#1A1917]'
                    : 'border-[#D0C9BD] hover:scale-110'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                aria-label={`Color option ${color.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

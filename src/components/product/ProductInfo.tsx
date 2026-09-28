import React, { useState } from 'react';
import { Star, Heart, Plus, Minus, Check, Ruler, Truck, RotateCcw, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { Product } from '../../types/ecommerce';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductInfoProps {
  product: Product;
  onOpenSizeGuide: () => void;
  onSelectColor: (index: number) => void;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  onOpenSizeGuide,
  onSelectColor
}) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isSaved = isInWishlist(product.id);
  const chosenColor = product.colors[selectedColorIdx]?.name || 'Classic';
  const currentStock = product.stock[selectedSize] ?? 5;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      image: product.images[selectedColorIdx] || product.images[0],
      size: selectedSize,
      color: chosenColor
    }, quantity);

    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1500);
  };

  const toggleSection = (id: string) => {
    setOpenAccordion(prev => prev === id ? null : id);
  };

  return (
    <div className="flex flex-col space-y-6 lg:pl-4">
      {/* Category Eyebrow & Badges */}
      <div className="flex items-center justify-between text-xs tracking-[0.2em] uppercase text-[#78746D] font-medium">
        <div className="flex items-center gap-2">
          <span>{product.collection}</span>
          <span>&bull;</span>
          <span>{product.category}</span>
        </div>

        {product.isNew && (
          <span className="text-[#5E1924] font-semibold bg-[#FAF2F0] px-2 py-0.5 border border-[#5E1924]/20">
            New Release
          </span>
        )}
      </div>

      {/* Title & Subtitle */}
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1A1917] tracking-tight leading-tight">
          {product.name}
        </h1>
        <p className="text-xs sm:text-sm text-[#78746D] mt-1.5 font-normal tracking-wide">
          {product.subtitle}
        </p>
      </div>

      {/* Price & Rating Row */}
      <div className="flex items-center justify-between py-2 border-y border-[#E8E3D8]">
        <div className="flex items-baseline gap-3">
          <span className="font-serif text-2xl sm:text-3xl font-semibold text-[#1A1917]">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-[#9C968B] line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[#5C5852]">
          <div className="flex text-[#5E1924]">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="font-semibold text-[#1A1917]">{product.rating}</span>
          <span className="text-[#8C877E]">({product.reviewCount})</span>
        </div>
      </div>

      {/* Description & Editorial Quote */}
      <div className="space-y-3">
        <p className="text-xs sm:text-sm text-[#4A4742] leading-relaxed">
          {product.description}
        </p>
        {product.editorialQuote && (
          <p className="font-serif text-base italic text-[#5E1924]">
            {product.editorialQuote}
          </p>
        )}
      </div>

      {/* Colorway Selection */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between text-xs tracking-wider uppercase text-[#5C5852]">
          <span>
            Color: <strong className="text-[#1A1917] font-semibold">{chosenColor}</strong>
          </span>
          <span className="text-[10px] text-[#8C877E]">{product.colors.length} Colorways</span>
        </div>

        <div className="flex items-center gap-3">
          {product.colors.map((color, idx) => (
            <button
              key={color.name}
              type="button"
              onClick={() => {
                setSelectedColorIdx(idx);
                onSelectColor(color.imageIndex);
              }}
              className={`w-7 h-7 rounded-full border relative flex items-center justify-center transition-all ${
                selectedColorIdx === idx
                  ? 'ring-2 ring-[#5E1924] ring-offset-2 border-[#1A1917] scale-105'
                  : 'border-[#D0C9BD] hover:scale-110'
              }`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
              aria-label={`Select color ${color.name}`}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-2.5 pt-2">
        <div className="flex items-center justify-between text-xs tracking-wider uppercase text-[#5C5852]">
          <div className="flex items-center gap-2">
            <span>Size: <strong className="text-[#1A1917]">{selectedSize}</strong></span>
            {currentStock <= 3 && currentStock > 0 && (
              <span className="text-[10px] text-[#9E5336] bg-[#F9EFEA] px-2 py-0.5 font-semibold">
                Only {currentStock} left
              </span>
            )}
          </div>

          <button
            onClick={onOpenSizeGuide}
            className="flex items-center gap-1 text-[11px] text-[#5E1924] hover:underline"
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Size Guide &amp; Fit</span>
          </button>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {product.sizes.map((size) => {
            const isSelected = selectedSize === size;
            return (
              <button
                key={size}
                type="button"
                onClick={() => setSelectedSize(size)}
                className={`py-2.5 text-xs font-medium tracking-wider uppercase border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1A1917] text-[#FBF9F5] border-[#1A1917] shadow-xs'
                    : 'bg-white text-[#2E2C29] border-[#D8D2C5] hover:border-[#1A1917]'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quantity & Add to Cart CTAs */}
      <div className="space-y-3 pt-4">
        <div className="flex gap-3">
          {/* Quantity Stepper */}
          <div className="flex items-center border border-[#D8D2C5] rounded-xs bg-white">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-3 text-[#78746D] hover:text-[#1A1917] transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs px-3 min-w-8 text-center font-semibold text-[#1A1917]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-3 text-[#78746D] hover:text-[#1A1917] transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Bag Button */}
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-4 px-6 text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
              isAddedRecently
                ? 'bg-[#5E1924] text-[#FBF9F5]'
                : 'bg-[#1A1917] hover:bg-[#5E1924] text-[#FBF9F5]'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-4 h-4" />
                <span>Added to Bag</span>
              </>
            ) : (
              <span>Add to Bag &bull; {formatPrice(product.price * quantity)}</span>
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product.id)}
            className={`p-4 border rounded-xs transition-colors flex items-center justify-center cursor-pointer ${
              isSaved
                ? 'border-[#5E1924] bg-[#FAF2F0] text-[#5E1924]'
                : 'border-[#D8D2C5] bg-white text-[#2E2C29] hover:border-[#1A1917]'
            }`}
            aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : 'stroke-[1.5]'}`} />
          </button>
        </div>

        {/* Free Shipping Microcopy */}
        <div className="flex items-center gap-2 text-[11px] text-[#78746D] pt-1">
          <Truck className="w-3.5 h-3.5 text-[#5E1924]" />
          <span>Complimentary global shipping on this order &bull; Dispatched in 24 hours</span>
        </div>
      </div>

      {/* Accordions */}
      <div className="divide-y divide-[#E8E3D8] border-t border-[#E8E3D8] pt-2">
        {/* Details & Tailoring */}
        <div className="py-3">
          <button
            onClick={() => toggleSection('details')}
            className="w-full flex items-center justify-between text-xs tracking-wider uppercase font-medium text-[#1A1917] text-left"
          >
            <span>Details &amp; Tailoring Notes</span>
            {openAccordion === 'details' ? <ChevronUp className="w-4 h-4 text-[#78746D]" /> : <ChevronDown className="w-4 h-4 text-[#78746D]" />}
          </button>
          {openAccordion === 'details' && (
            <ul className="mt-3 space-y-1.5 text-xs text-[#5C5852] pl-4 list-disc">
              {product.details.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          )}
        </div>

        {/* Composition & Care */}
        <div className="py-3">
          <button
            onClick={() => toggleSection('care')}
            className="w-full flex items-center justify-between text-xs tracking-wider uppercase font-medium text-[#1A1917] text-left"
          >
            <span>Composition &amp; Garment Care</span>
            {openAccordion === 'care' ? <ChevronUp className="w-4 h-4 text-[#78746D]" /> : <ChevronDown className="w-4 h-4 text-[#78746D]" />}
          </button>
          {openAccordion === 'care' && (
            <div className="mt-3 space-y-2 text-xs text-[#5C5852]">
              <p><strong>Composition:</strong> {product.materials}</p>
              <p><strong>Care:</strong> {product.care}</p>
            </div>
          )}
        </div>

        {/* Shipping & Returns */}
        <div className="py-3">
          <button
            onClick={() => toggleSection('shipping')}
            className="w-full flex items-center justify-between text-xs tracking-wider uppercase font-medium text-[#1A1917] text-left"
          >
            <span>Complimentary Shipping &amp; Returns</span>
            {openAccordion === 'shipping' ? <ChevronUp className="w-4 h-4 text-[#78746D]" /> : <ChevronDown className="w-4 h-4 text-[#78746D]" />}
          </button>
          {openAccordion === 'shipping' && (
            <div className="mt-3 space-y-2 text-xs text-[#5C5852]">
              <p>Complimentary carbon-neutral standard delivery within 3-5 business days. Express next-day courier available at checkout.</p>
              <p>We welcome returns and exchanges within 30 days of delivery. All garments must be unworn with original tags attached.</p>
            </div>
          )}
        </div>

        {/* Ethical Sourcing */}
        <div className="py-3">
          <button
            onClick={() => toggleSection('sustainability')}
            className="w-full flex items-center justify-between text-xs tracking-wider uppercase font-medium text-[#1A1917] text-left"
          >
            <span>Ethical Sourcing &amp; Traceability</span>
            {openAccordion === 'sustainability' ? <ChevronUp className="w-4 h-4 text-[#78746D]" /> : <ChevronDown className="w-4 h-4 text-[#78746D]" />}
          </button>
          {openAccordion === 'sustainability' && (
            <div className="mt-3 text-xs text-[#5C5852] leading-relaxed">
              <p>{product.sustainability}</p>
            </div>
          )}
        </div>
      </div>

      {/* Assurance Icons */}
      <div className="pt-2 grid grid-cols-3 gap-3 border-t border-[#E8E3D8] text-[11px] text-[#78746D] text-center">
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-[#5E1924]" />
          <span>Lifetime Repair Guarantee</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <RotateCcw className="w-4 h-4 text-[#5E1924]" />
          <span>30-Day Effortless Returns</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Truck className="w-4 h-4 text-[#5E1924]" />
          <span>Plastic-Free Delivery</span>
        </div>
      </div>

    </div>
  );
};

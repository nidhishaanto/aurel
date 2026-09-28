import React, { useState } from 'react';
import { X, Check, ArrowRight } from 'lucide-react';
import { Product } from '../../types/ecommerce';
import { useCurrency } from '../../context/CurrencyContext';
import { useCart } from '../../context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onViewFullDetails: (productId: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onViewFullDetails
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || 'Classic');
  const quantity = 1;
  const [isAdded, setIsAdded] = useState(false);

  const { formatPrice } = useCurrency();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      price: product.price,
      image: product.images[selectedImage] || product.images[0],
      size: selectedSize,
      color: selectedColor
    }, quantity);

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1917]/50 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-4xl bg-[#FBF9F5] border border-[#E8E3D8] shadow-2xl rounded-xs overflow-hidden max-h-[90vh] flex flex-col md:flex-row animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 text-[#5C5852] hover:text-[#1A1917] bg-white/80 rounded-full hover:bg-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Column */}
        <div className="md:w-1/2 bg-[#F4F0E8] p-6 flex flex-col justify-between border-r border-[#E8E3D8]">
          <div className="aspect-[3/4] w-full overflow-hidden border border-[#E5DFD4] bg-white">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 mt-4 justify-center">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-14 h-18 border overflow-hidden transition-all ${
                    selectedImage === idx ? 'border-[#5E1924] ring-1 ring-[#5E1924]' : 'border-[#D8D2C5] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Column */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between text-xs tracking-[0.2em] uppercase text-[#78746D] font-medium mb-1">
              <span>{product.collection}</span>
              <span>{product.category}</span>
            </div>

            <h2 className="font-serif text-2xl font-medium text-[#1A1917]">
              {product.name}
            </h2>
            <p className="text-xs text-[#78746D] mt-0.5 mb-3 font-sans">
              {product.subtitle}
            </p>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-xl font-semibold text-[#1A1917]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#9C968B] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <p className="text-xs text-[#5C5852] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Colors */}
            <div className="mb-4">
              <span className="text-xs tracking-wider uppercase text-[#5C5852] font-medium block mb-2">
                Color: <strong className="text-[#1A1917]">{selectedColor}</strong>
              </span>
              <div className="flex gap-2">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => {
                      setSelectedColor(c.name);
                      setSelectedImage(c.imageIndex);
                    }}
                    className={`w-6 h-6 rounded-full border transition-all ${
                      selectedColor === c.name
                        ? 'ring-2 ring-[#5E1924] ring-offset-2 border-[#1A1917]'
                        : 'border-[#D8D2C5]'
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <span className="text-xs tracking-wider uppercase text-[#5C5852] font-medium block mb-2">
                Size
              </span>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-1.5 px-3.5 text-xs tracking-wider uppercase border transition-all ${
                      selectedSize === s
                        ? 'bg-[#1A1917] text-[#FBF9F5] border-[#1A1917]'
                        : 'bg-white text-[#2E2C29] border-[#D8D2C5] hover:border-[#1A1917]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-[#E8E3D8] space-y-3">
            <button
              onClick={handleAddToCart}
              className={`w-full py-3.5 text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isAdded
                  ? 'bg-[#5E1924] text-white'
                  : 'bg-[#1A1917] hover:bg-[#5E1924] text-[#FBF9F5]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Bag</span>
                </>
              ) : (
                <span>Add to Bag &bull; {formatPrice(product.price * quantity)}</span>
              )}
            </button>

            <button
              onClick={() => {
                onClose();
                onViewFullDetails(product.id);
              }}
              className="w-full text-center text-xs tracking-wider uppercase text-[#78746D] hover:text-[#5E1924] flex items-center justify-center gap-1 transition-colors"
            >
              <span>View Full Editorial Specs &amp; Care</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

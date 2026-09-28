import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Gift, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

interface CartDrawerProps {
  onNavigateToCheckout: () => void;
  onNavigateToCart: () => void;
  onNavigateToShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onNavigateToCheckout,
  onNavigateToCart,
  onNavigateToShop
}) => {
  const {
    cart,
    cartCount,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    shipping,
    total,
    freeShippingThreshold,
    freeShippingRemaining,
    promoCode,
    applyPromoCode,
    removePromoCode,
    isGiftWrap,
    toggleGiftWrap
  } = useCart();

  const { formatPrice } = useCurrency();
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ text: string; error?: boolean } | null>(null);

  if (!isCartOpen) return null;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMessage({ text: res.message, error: !res.success });
    if (res.success) {
      setPromoInput('');
    }
  };

  const freeShippingPercentage = Math.min(100, Math.round(((freeShippingThreshold - freeShippingRemaining) / freeShippingThreshold) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1A1917]/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF9F5] shadow-2xl flex flex-col border-l border-[#E8E3D8] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E8E3D8] flex items-center justify-between bg-[#FBF9F5]">
            <div>
              <h2 className="font-serif text-lg tracking-wider text-[#1A1917] uppercase">
                Your Bag
              </h2>
              <span className="text-[11px] tracking-widest text-[#78746D] uppercase">
                {cartCount} {cartCount === 1 ? 'Object Selected' : 'Objects Selected'}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="p-1.5 text-[#5C5852] hover:text-[#1A1917] rounded-full hover:bg-[#EFEAE1] transition-colors"
              aria-label="Close bag drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Complimentary Shipping Progress */}
          <div className="bg-[#F4EFE6] px-6 py-3 border-b border-[#E8E3D8]">
            {freeShippingRemaining > 0 ? (
              <div>
                <p className="text-xs text-[#45423D] tracking-wide mb-1.5">
                  Add <span className="font-semibold text-[#5E1924]">{formatPrice(freeShippingRemaining)}</span> more for complimentary global delivery
                </p>
                <div className="w-full bg-[#E5DFD4] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#5E1924] h-full transition-all duration-500 ease-out"
                    style={{ width: `${freeShippingPercentage}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-[#5E1924] font-medium tracking-wide">
                <Check className="w-4 h-4" />
                <span>Complimentary White-Glove Shipping unlocked</span>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-[#EFEAE1]">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-14 h-14 rounded-full bg-[#F2EDE4] flex items-center justify-center mb-4">
                  <span className="font-serif text-2xl text-[#8C877E] italic">A</span>
                </div>
                <h3 className="font-serif text-xl text-[#2E2C29] mb-2">
                  Your bag is currently empty.
                </h3>
                <p className="text-xs text-[#78746D] max-w-xs mb-6 leading-relaxed">
                  Objects chosen with intention stay for life. Explore our new season silhouettes and permanent wardrobe staples.
                </p>
                <button
                  onClick={() => {
                    closeCart();
                    onNavigateToShop();
                  }}
                  className="py-2.5 px-6 bg-[#1A1917] hover:bg-[#5E1924] text-[#FBF9F5] text-xs tracking-[0.16em] uppercase rounded-sm transition-colors cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  {/* Thumbnail */}
                  <div className="w-20 h-26 bg-[#F4F0E8] overflow-hidden flex-shrink-0 border border-[#E8E3D8]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-serif text-sm font-medium text-[#1A1917] leading-snug">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#9C968B] hover:text-[#5E1924] transition-colors p-1"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-3 text-[11px] text-[#78746D] mt-1 tracking-wider uppercase">
                        <span>Size: <strong className="text-[#33312E]">{item.size}</strong></span>
                        <span>•</span>
                        <span>Color: <strong className="text-[#33312E]">{item.color}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Stepper */}
                      <div className="flex items-center border border-[#D8D2C5] rounded-xs bg-[#FFFFFF]">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 px-2 text-[#78746D] hover:text-[#1A1917] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs px-2 min-w-6 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 px-2 text-[#78746D] hover:text-[#1A1917] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-semibold text-[#1A1917]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer calculation & CTAs (if bag has items) */}
          {cart.length > 0 && (
            <div className="border-t border-[#E8E3D8] bg-[#F7F4EE] px-6 py-5 space-y-4">
              {/* Gift wrapping toggle */}
              <div className="flex items-center justify-between text-xs py-1 border-b border-[#E8E3D8]/60">
                <label className="flex items-center gap-2 cursor-pointer text-[#45423D]">
                  <input
                    type="checkbox"
                    checked={isGiftWrap}
                    onChange={toggleGiftWrap}
                    className="accent-[#5E1924] rounded-sm"
                  />
                  <Gift className="w-3.5 h-3.5 text-[#5E1924]" />
                  <span>Artisanal Gift Box with Handwritten Note (+{formatPrice(250)})</span>
                </label>
              </div>

              {/* Promo code input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Privilege Code (try AUREL10)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="flex-1 bg-white border border-[#D8D2C5] px-3 py-1.5 text-xs text-[#1A1917] placeholder:text-[#9C968B] uppercase tracking-wider outline-none focus:border-[#5E1924]"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#2E2C29] text-white text-xs tracking-wider uppercase hover:bg-[#5E1924] transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoMessage && (
                <p className={`text-[11px] tracking-wide ${promoMessage.error ? 'text-red-700' : 'text-emerald-800'}`}>
                  {promoMessage.text}
                </p>
              )}

              {promoCode && (
                <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded">
                  <span>Code <strong>{promoCode}</strong> Active</span>
                  <button onClick={removePromoCode} className="text-red-700 text-[10px] uppercase underline">
                    Remove
                  </button>
                </div>
              )}

              {/* Cost breakdown */}
              <div className="space-y-1.5 text-xs text-[#5C5852]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#5E1924]">
                    <span>Privilege Courtesy</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span>{shipping === 0 ? <strong className="text-emerald-700 uppercase">Complimentary</strong> : formatPrice(shipping)}</span>
                </div>
                {isGiftWrap && (
                  <div className="flex justify-between">
                    <span>Artisanal Gift Packaging</span>
                    <span>{formatPrice(250)}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2 border-t border-[#D8D2C5] text-sm font-semibold text-[#1A1917]">
                  <span>Estimated Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    closeCart();
                    onNavigateToCheckout();
                  }}
                  className="w-full py-3.5 bg-[#1A1917] hover:bg-[#5E1924] text-[#FBF9F5] text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => {
                    closeCart();
                    onNavigateToCart();
                  }}
                  className="w-full py-2 text-center text-xs tracking-wider uppercase text-[#78746D] hover:text-[#1A1917] transition-colors"
                >
                  View Full Bag Details
                </button>
              </div>

              {/* Secure guarantee */}
              <div className="flex items-center justify-center gap-1.5 text-[10px] tracking-wider uppercase text-[#8C877E] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#5E1924]" />
                <span>Encrypted 256-bit Checkout &bull; 30-Day Returns</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

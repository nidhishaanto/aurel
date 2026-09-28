import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft, ShieldCheck, Gift, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

interface CartPageProps {
  onNavigate: (page: string, param?: string) => void;
  onProceedToCheckout: () => void;
}

export const CartPage: React.FC<CartPageProps> = ({
  onNavigate,
  onProceedToCheckout
}) => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    subtotal,
    discount,
    shipping,
    tax,
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
  const [promoMsg, setPromoMsg] = useState<{ text: string; error?: boolean } | null>(null);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    setPromoMsg({ text: res.message, error: !res.success });
    if (res.success) setPromoInput('');
  };

  const freeShippingPct = Math.min(100, Math.round(((freeShippingThreshold - freeShippingRemaining) / freeShippingThreshold) * 100));

  return (
    <div className="py-12 bg-[#FBF9F5] min-h-screen">
      <div className="editorial-container">
        
        {/* Header */}
        <div className="pb-6 mb-8 border-b border-[#E8E3D8] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#5E1924] block mb-1">
              Curated Selections
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1917]">
              Your Shopping Bag
            </h1>
          </div>

          <button
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-[#78746D] hover:text-[#5E1924]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="py-24 text-center bg-[#F7F4EE] border border-[#E8E3D8] rounded-xs max-w-xl mx-auto p-8">
            <span className="font-serif text-3xl text-[#2E2C29] italic block mb-3">
              Your bag is currently empty
            </span>
            <p className="text-xs text-[#78746D] mb-8 leading-relaxed max-w-sm mx-auto">
              Our permanent collection and seasonal edits are crafted in small artisanal batches. Take your time to discover pieces you will cherish for life.
            </p>
            <button
              onClick={() => onNavigate('shop')}
              className="py-3.5 px-8 bg-[#1A1917] hover:bg-[#5E1924] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-colors cursor-pointer"
            >
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Bag Table (8 Cols) */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Shipping Progress */}
              <div className="p-4 bg-[#F4EFE6] border border-[#E2DBD0] rounded-xs">
                {freeShippingRemaining > 0 ? (
                  <div>
                    <p className="text-xs text-[#45423D] mb-2">
                      Add <strong className="text-[#5E1924]">{formatPrice(freeShippingRemaining)}</strong> more to receive complimentary white-glove global shipping.
                    </p>
                    <div className="w-full bg-[#E0D8CB] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#5E1924] h-full transition-all duration-500"
                        style={{ width: `${freeShippingPct}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-[#5E1924] font-medium">
                    <Check className="w-4 h-4" />
                    <span>Complimentary White-Glove Global Shipping Unlocked</span>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="divide-y divide-[#E8E3D8] border-y border-[#E8E3D8]">
                {cart.map((item) => (
                  <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    
                    {/* Thumbnail */}
                    <div className="w-24 h-32 bg-[#F4F0E8] border border-[#E8E3D8] overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Meta */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-lg text-[#1A1917]">
                        {item.name}
                      </h3>
                      <p className="text-xs text-[#78746D] mt-0.5">
                        {item.subtitle}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-[#5C5852] tracking-wider uppercase mt-2">
                        <span>Size: <strong className="text-[#1A1917]">{item.size}</strong></span>
                        <span>&bull;</span>
                        <span>Color: <strong className="text-[#1A1917]">{item.color}</strong></span>
                      </div>
                      <span className="text-xs text-[#8C877E] block mt-1">
                        Unit: {formatPrice(item.price)}
                      </span>
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center border border-[#D8D2C5] rounded-xs bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 text-[#78746D] hover:text-[#1A1917]"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs px-3 min-w-8 text-center font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 text-[#78746D] hover:text-[#1A1917]"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Subtotal & Delete */}
                    <div className="text-right flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3">
                      <span className="font-serif text-base font-semibold text-[#1A1917]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#9C968B] hover:text-[#5E1924] p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}
              </div>

              {/* Gift Wrap option */}
              <div className="p-4 bg-white border border-[#E8E3D8] rounded-xs flex items-center justify-between">
                <label className="flex items-center gap-2.5 text-xs text-[#33312E] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isGiftWrap}
                    onChange={toggleGiftWrap}
                    className="accent-[#5E1924] rounded-sm"
                  />
                  <Gift className="w-4 h-4 text-[#5E1924]" />
                  <span>Include signature unbleached gift box with wax-sealed personalized message (+{formatPrice(250)})</span>
                </label>
              </div>

            </div>

            {/* Sticky Order Calculation (4 Cols) */}
            <div className="lg:col-span-4">
              <div className="bg-[#F7F4EE] border border-[#E8E3D8] p-6 rounded-xs space-y-6 lg:sticky lg:top-24">
                <h3 className="font-serif text-lg font-medium text-[#1A1917] tracking-wider uppercase pb-3 border-b border-[#D8D2C5]">
                  Summary
                </h3>

                {/* Promo Code Form */}
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Privilege Code (AUREL10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-white border border-[#D8D2C5] px-3 py-2 text-xs uppercase tracking-wider outline-none focus:border-[#5E1924]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#1A1917] hover:bg-[#5E1924] text-white text-xs uppercase tracking-wider font-semibold transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMsg && (
                    <p className={`text-[11px] ${promoMsg.error ? 'text-red-700' : 'text-emerald-800'}`}>
                      {promoMsg.text}
                    </p>
                  )}
                  {promoCode && (
                    <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-50 p-2 rounded">
                      <span>Code <strong>{promoCode}</strong> Active</span>
                      <button onClick={removePromoCode} className="text-red-700 text-[10px] uppercase underline">
                        Remove
                      </button>
                    </div>
                  )}
                </form>

                {/* Calculation breakdown */}
                <div className="space-y-2 text-xs text-[#5C5852] pt-2 border-t border-[#D8D2C5]">
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
                    <span>Estimated Shipping</span>
                    <span>{shipping === 0 ? <strong className="text-emerald-800 uppercase">Complimentary</strong> : formatPrice(shipping)}</span>
                  </div>
                  {isGiftWrap && (
                    <div className="flex justify-between">
                      <span>Artisanal Gift Packaging</span>
                      <span>{formatPrice(250)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Estimated Tax (5% GST/VAT Included)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t border-[#D8D2C5] text-base font-semibold text-[#1A1917]">
                    <span>Estimated Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Primary CTA */}
                <button
                  onClick={onProceedToCheckout}
                  className="w-full py-4 bg-[#1A1917] hover:bg-[#5E1924] text-[#FBF9F5] text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[10px] tracking-wider uppercase text-[#8C877E] pt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5E1924]" />
                  <span>Guaranteed Safe Checkout &bull; 30-Day Returns</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

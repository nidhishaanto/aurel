import React from 'react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';
import { ShieldCheck } from 'lucide-react';

export const OrderSummary: React.FC = () => {
  const { cart, subtotal, discount, shipping, tax, total, promoCode, isGiftWrap } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <div className="bg-[#F7F4EE] border border-[#E8E3D8] p-6 rounded-xs space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#D8D2C5]">
        <h3 className="font-serif text-lg font-medium text-[#1A1917] tracking-wider uppercase">
          Order Summary
        </h3>
        <span className="text-xs text-[#78746D] tracking-wider uppercase">
          {cart.length} {cart.length === 1 ? 'Piece' : 'Pieces'}
        </span>
      </div>

      {/* Item List */}
      <div className="space-y-4 max-h-80 overflow-y-auto pr-1 divide-y divide-[#EBE6DC]">
        {cart.map((item) => (
          <div key={item.id} className="pt-3 first:pt-0 flex gap-3 items-center">
            <div className="w-14 h-18 bg-[#EFEAE1] border border-[#E0D8CA] overflow-hidden flex-shrink-0">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-serif text-xs font-medium text-[#1A1917] truncate">
                {item.name}
              </h4>
              <p className="text-[10px] text-[#78746D] tracking-wider uppercase">
                {item.size} &bull; {item.color} &bull; Qty {item.quantity}
              </p>
              <span className="text-xs font-semibold text-[#1A1917] block mt-1">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Financial Calculations */}
      <div className="space-y-2 pt-4 border-t border-[#D8D2C5] text-xs text-[#5C5852]">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-[#5E1924]">
            <span>Privilege Discount ({promoCode})</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Delivery</span>
          <span>{shipping === 0 ? <strong className="text-emerald-800 uppercase font-semibold">Complimentary</strong> : formatPrice(shipping)}</span>
        </div>

        {isGiftWrap && (
          <div className="flex justify-between">
            <span>Artisanal Gift Packaging</span>
            <span>{formatPrice(250)}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Estimated Taxes (Included)</span>
          <span>{formatPrice(tax)}</span>
        </div>

        <div className="flex justify-between pt-3 border-t border-[#D8D2C5] text-base font-semibold text-[#1A1917]">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>

      {/* Assurance */}
      <div className="p-3 bg-[#EFEAE1] border border-[#DCD5C7] rounded-xs text-[11px] text-[#78746D] flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#5E1924] flex-shrink-0" />
        <span>Complimentary 30-day returns &bull; Insured transit</span>
      </div>
    </div>
  );
};

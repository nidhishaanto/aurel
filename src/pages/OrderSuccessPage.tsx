import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle, Download, ArrowRight, Calendar, Mail, MapPin } from 'lucide-react';
import { Order } from '../types/ecommerce';
import { useCurrency } from '../context/CurrencyContext';

interface OrderSuccessPageProps {
  order: Order | null;
  onContinueShopping: () => void;
}

export const OrderSuccessPage: React.FC<OrderSuccessPageProps> = ({
  order,
  onContinueShopping
}) => {
  const { formatPrice } = useCurrency();

  useEffect(() => {
    // Subtle luxury celebratory confetti
    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#5E1924', '#D4AF37', '#EDE7DC', '#1A1917']
    });
  }, []);

  if (!order) {
    return (
      <div className="py-24 text-center">
        <h2 className="font-serif text-2xl">No recent order found.</h2>
        <button
          onClick={onContinueShopping}
          className="mt-4 text-xs uppercase tracking-widest text-[#5E1924] underline"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="py-16 bg-[#FBF9F5] min-h-screen">
      <div className="editorial-container max-w-3xl">
        
        {/* Header confirmation card */}
        <div className="bg-white border border-[#E8E3D8] p-8 sm:p-12 text-center rounded-xs shadow-xs mb-8">
          <div className="w-16 h-16 rounded-full bg-[#FAF2F0] border border-[#5E1924]/20 flex items-center justify-center mx-auto mb-4 text-[#5E1924]">
            <CheckCircle className="w-8 h-8 stroke-[1.5]" />
          </div>

          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#5E1924] block mb-1">
            Order Confirmed &bull; Reference #{order.orderId}
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#1A1917] mb-3">
            Thank you, {order.shippingDetails.firstName}.
          </h1>

          <p className="text-xs sm:text-sm text-[#5C5852] max-w-md mx-auto leading-relaxed mb-6">
            Your pieces have entered our atelier preparation queue. A confirmation dispatch has been transmitted to <strong className="text-[#1A1917]">{order.shippingDetails.email}</strong>.
          </p>

          <div className="inline-flex items-center gap-2 py-2 px-4 bg-[#F7F4EE] border border-[#E0D8CB] rounded-xs text-xs text-[#45423D]">
            <Calendar className="w-3.5 h-3.5 text-[#5E1924]" />
            <span>Estimated White-Glove Handover: <strong>3–5 Business Days</strong></span>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="bg-white border border-[#E8E3D8] p-8 rounded-xs space-y-8 mb-8">
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E3D8]">
            <h3 className="font-serif text-xl text-[#1A1917]">
              Atelier Ledger Recap
            </h3>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 text-xs text-[#78746D] hover:text-[#5E1924] tracking-wider uppercase"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Print / Download Receipt</span>
            </button>
          </div>

          {/* Delivery & Payment Information */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#5C5852]">
            <div className="space-y-1">
              <span className="font-semibold uppercase tracking-wider text-[#1A1917] flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#5E1924]" />
                Destination Address
              </span>
              <p className="text-[#1A1917]">{order.shippingDetails.firstName} {order.shippingDetails.lastName}</p>
              <p>{order.shippingDetails.address}, {order.shippingDetails.apartment}</p>
              <p>{order.shippingDetails.city}, {order.shippingDetails.state} {order.shippingDetails.postalCode}</p>
              <p>{order.shippingDetails.country}</p>
            </div>

            <div className="space-y-1">
              <span className="font-semibold uppercase tracking-wider text-[#1A1917] flex items-center gap-1.5 mb-1">
                <Mail className="w-3.5 h-3.5 text-[#5E1924]" />
                Payment &amp; Logistics
              </span>
              <p>Payment: <strong className="text-[#1A1917]">{order.paymentMethod}</strong></p>
              <p>Courier: <strong className="text-[#1A1917]">{order.shippingDetails.deliveryMethod.toUpperCase()} Carbon-Neutral Transit</strong></p>
              <p>Contact: {order.shippingDetails.phone}</p>
            </div>
          </div>

          {/* Itemized List */}
          <div className="border-t border-[#E8E3D8] pt-6 space-y-4">
            <span className="text-[11px] uppercase tracking-wider text-[#78746D] font-semibold block">
              Ordered Silhouettes ({order.items.length})
            </span>

            <div className="divide-y divide-[#EFEAE1]">
              {order.items.map((item) => (
                <div key={item.id} className="py-3 flex items-center gap-4">
                  <div className="w-14 h-18 bg-[#F4F0E8] border border-[#E8E3D8] overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-medium text-[#1A1917]">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-[#78746D] tracking-wider uppercase block">
                      Size: {item.size} &bull; Color: {item.color} &bull; Qty {item.quantity}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-[#1A1917]">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Totals */}
          <div className="border-t border-[#E8E3D8] pt-4 space-y-2 text-xs text-[#5C5852]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#5E1924]">
                <span>Privilege Courtesy</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>White-Glove Delivery</span>
              <span>{order.shipping === 0 ? 'Complimentary' : formatPrice(order.shipping)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-[#D8D2C5] text-base font-semibold text-[#1A1917]">
              <span>Total Paid</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Back to Shopping Action */}
        <div className="text-center">
          <button
            onClick={onContinueShopping}
            className="py-3.5 px-8 bg-[#1A1917] hover:bg-[#5E1924] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Continue Exploring Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

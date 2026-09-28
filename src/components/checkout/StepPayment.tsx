import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Lock, QrCode, Banknote, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

interface StepPaymentProps {
  onBack: () => void;
  onCompleteOrder: (method: string) => void;
}

export const StepPayment: React.FC<StepPaymentProps> = ({
  onBack,
  onCompleteOrder
}) => {
  const { total } = useCart();
  const { formatPrice } = useCurrency();

  const [paymentType, setPaymentType] = useState<'card' | 'upi' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardName, setCardName] = useState('Camille Valmont');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('•••');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      onCompleteOrder(
        paymentType === 'card'
          ? 'Credit Card (Visa ending in 4242)'
          : paymentType === 'upi'
          ? `UPI (${upiId || 'client@upi'})`
          : 'Pay on Delivery / Arrival'
      );
    }, 1200);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl text-[#1A1917] mb-1">
          Payment Details
        </h3>
        <p className="text-xs text-[#78746D]">
          All transactions are encrypted with 256-bit SSL protocols.
        </p>
      </div>

      {/* Payment Method Selector */}
      <div className="grid grid-cols-3 gap-3">
        <button
          type="button"
          onClick={() => setPaymentType('card')}
          className={`p-3 text-center border rounded-xs transition-all flex flex-col items-center gap-1.5 ${
            paymentType === 'card'
              ? 'border-[#5E1924] bg-white ring-1 ring-[#5E1924] text-[#1A1917]'
              : 'border-[#D8D2C5] bg-[#FBF9F5] text-[#5C5852]'
          }`}
        >
          <CreditCard className="w-5 h-5 text-[#5E1924]" />
          <span className="text-[11px] font-medium tracking-wider uppercase">Card</span>
        </button>

        <button
          type="button"
          onClick={() => setPaymentType('upi')}
          className={`p-3 text-center border rounded-xs transition-all flex flex-col items-center gap-1.5 ${
            paymentType === 'upi'
              ? 'border-[#5E1924] bg-white ring-1 ring-[#5E1924] text-[#1A1917]'
              : 'border-[#D8D2C5] bg-[#FBF9F5] text-[#5C5852]'
          }`}
        >
          <QrCode className="w-5 h-5 text-[#5E1924]" />
          <span className="text-[11px] font-medium tracking-wider uppercase">UPI / QR</span>
        </button>

        <button
          type="button"
          onClick={() => setPaymentType('cod')}
          className={`p-3 text-center border rounded-xs transition-all flex flex-col items-center gap-1.5 ${
            paymentType === 'cod'
              ? 'border-[#5E1924] bg-white ring-1 ring-[#5E1924] text-[#1A1917]'
              : 'border-[#D8D2C5] bg-[#FBF9F5] text-[#5C5852]'
          }`}
        >
          <Banknote className="w-5 h-5 text-[#5E1924]" />
          <span className="text-[11px] font-medium tracking-wider uppercase">Pay on Delivery</span>
        </button>
      </div>

      {/* Card Form */}
      {paymentType === 'card' && (
        <div className="p-5 bg-white border border-[#E8E3D8] rounded-xs space-y-4">
          <div>
            <label className="text-[11px] font-medium tracking-wider uppercase text-[#5C5852] block mb-1.5">
              Card Number
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="4242 4242 4242 4242"
                className="w-full bg-[#FBF9F5] border border-[#D8D2C5] px-3 py-2.5 text-xs text-[#1A1917] font-mono outline-none focus:border-[#5E1924]"
              />
              <span className="absolute right-3 top-2.5 text-xs font-serif font-bold text-[#5E1924]">
                VISA
              </span>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-medium tracking-wider uppercase text-[#5C5852] block mb-1.5">
              Cardholder Name
            </label>
            <input
              type="text"
              required
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              placeholder="e.g. Camille Valmont"
              className="w-full bg-[#FBF9F5] border border-[#D8D2C5] px-3 py-2.5 text-xs text-[#1A1917] outline-none focus:border-[#5E1924]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] font-medium tracking-wider uppercase text-[#5C5852] block mb-1.5">
                Expiry Date
              </label>
              <input
                type="text"
                required
                value={cardExpiry}
                onChange={(e) => setCardExpiry(e.target.value)}
                placeholder="MM/YY"
                className="w-full bg-[#FBF9F5] border border-[#D8D2C5] px-3 py-2.5 text-xs text-[#1A1917] font-mono outline-none focus:border-[#5E1924]"
              />
            </div>

            <div>
              <label className="text-[11px] font-medium tracking-wider uppercase text-[#5C5852] block mb-1.5">
                Security Code (CVC)
              </label>
              <input
                type="password"
                required
                maxLength={4}
                value={cardCvc}
                onChange={(e) => setCardCvc(e.target.value)}
                placeholder="•••"
                className="w-full bg-[#FBF9F5] border border-[#D8D2C5] px-3 py-2.5 text-xs text-[#1A1917] font-mono outline-none focus:border-[#5E1924]"
              />
            </div>
          </div>
        </div>
      )}

      {/* UPI Form */}
      {paymentType === 'upi' && (
        <div className="p-5 bg-white border border-[#E8E3D8] rounded-xs space-y-4">
          <label className="text-[11px] font-medium tracking-wider uppercase text-[#5C5852] block mb-1.5">
            UPI Virtual Payment Address (VPA)
          </label>
          <input
            type="text"
            required
            placeholder="e.g. yourname@okhdfcbank or yourname@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="w-full bg-[#FBF9F5] border border-[#D8D2C5] px-3 py-2.5 text-xs text-[#1A1917] outline-none focus:border-[#5E1924]"
          />
          <p className="text-[11px] text-[#78746D]">
            A payment request will be sent to your UPI application upon placing the order.
          </p>
        </div>
      )}

      {/* Cash on Delivery Note */}
      {paymentType === 'cod' && (
        <div className="p-5 bg-white border border-[#E8E3D8] rounded-xs space-y-2 text-xs text-[#5C5852]">
          <p className="font-semibold text-[#1A1917]">Pay upon White-Glove Handover</p>
          <p>
            Please have the exact amount of {formatPrice(total)} ready at the time of delivery. Card or digital payment upon courier handover is also supported.
          </p>
        </div>
      )}

      <div className="pt-2">
        <label className="flex items-center gap-2 text-xs text-[#5C5852] cursor-pointer">
          <input
            type="checkbox"
            defaultChecked
            className="accent-[#5E1924] rounded-sm"
          />
          <span>Billing address matches delivery address</span>
        </label>
      </div>

      <div className="pt-4 border-t border-[#E8E3D8] flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-xs tracking-wider uppercase text-[#78746D] hover:text-[#1A1917] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Delivery</span>
        </button>

        <button
          type="submit"
          disabled={isProcessing}
          className="py-3.5 px-8 bg-[#5E1924] hover:bg-[#45121A] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-colors flex items-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
        >
          <Lock className="w-3.5 h-3.5" />
          <span>{isProcessing ? 'Authorizing Payment...' : `Authorize & Complete &bull; ${formatPrice(total)}`}</span>
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 text-[10px] tracking-wider uppercase text-[#8C877E] pt-2">
        <ShieldCheck className="w-4 h-4 text-[#5E1924]" />
        <span>PCI-DSS Level 1 Certified &bull; 256-Bit SSL Protection</span>
      </div>
    </form>
  );
};

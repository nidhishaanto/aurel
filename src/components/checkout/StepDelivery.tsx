import React from 'react';
import { ArrowRight, ArrowLeft, Truck, Zap, Leaf } from 'lucide-react';
import { ShippingDetails } from '../../types/ecommerce';
import { useCurrency } from '../../context/CurrencyContext';

interface StepDeliveryProps {
  details: ShippingDetails;
  onChange: (method: 'standard' | 'express' | 'eco') => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepDelivery: React.FC<StepDeliveryProps> = ({
  details,
  onChange,
  onNext,
  onBack
}) => {
  const { formatPrice } = useCurrency();

  const options = [
    {
      id: 'standard' as const,
      title: 'Standard Atelier White-Glove',
      time: '3–5 Business Days',
      price: 'Complimentary',
      icon: Truck,
      description: 'Delivered in signature unbleached cotton dust bags with carbon-neutral transit tracking.'
    },
    {
      id: 'express' as const,
      title: 'Express Courier Priority',
      time: '1–2 Business Days',
      price: formatPrice(350),
      icon: Zap,
      description: 'Expedited air courier dispatch with direct signature on delivery.'
    },
    {
      id: 'eco' as const,
      title: 'Zero-Emission Ground Logistics',
      time: '4–6 Business Days',
      price: 'Complimentary',
      icon: Leaf,
      description: 'Dispatched via verified 100% electric delivery fleets. Includes reforestation offset token.'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl text-[#1A1917] mb-1">
          Delivery Method
        </h3>
        <p className="text-xs text-[#78746D]">
          Select your preferred transit timeline and environmental packaging preference.
        </p>
      </div>

      <div className="space-y-3">
        {options.map((opt) => {
          const Icon = opt.icon;
          const isSelected = details.deliveryMethod === opt.id;
          return (
            <div
              key={opt.id}
              onClick={() => onChange(opt.id)}
              className={`p-4 border rounded-xs cursor-pointer transition-all flex items-start gap-4 ${
                isSelected
                  ? 'border-[#5E1924] bg-white ring-1 ring-[#5E1924] shadow-xs'
                  : 'border-[#D8D2C5] bg-[#FBF9F5] hover:border-[#1A1917]'
              }`}
            >
              <div className={`p-2 rounded-xs flex-shrink-0 ${
                isSelected ? 'bg-[#5E1924] text-white' : 'bg-[#EFEAE1] text-[#5C5852]'
              }`}>
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="font-serif text-sm font-medium text-[#1A1917]">
                    {opt.title}
                  </h4>
                  <span className="text-xs font-semibold text-[#1A1917]">
                    {opt.price}
                  </span>
                </div>
                <span className="text-[11px] text-[#5E1924] font-medium tracking-wide block mt-0.5">
                  {opt.time}
                </span>
                <p className="text-xs text-[#5C5852] mt-1 leading-relaxed">
                  {opt.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-4 border-t border-[#E8E3D8] flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-xs tracking-wider uppercase text-[#78746D] hover:text-[#1A1917] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Address</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          className="py-3 px-8 bg-[#1A1917] hover:bg-[#5E1924] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span>Continue to Payment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

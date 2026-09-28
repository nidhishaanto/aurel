import React from 'react';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import { ShippingDetails } from '../../types/ecommerce';

interface StepContactProps {
  details: ShippingDetails;
  onChange: (field: keyof ShippingDetails, value: string) => void;
  onNext: () => void;
}

export const StepContact: React.FC<StepContactProps> = ({
  details,
  onChange,
  onNext
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (details.email.trim() && details.phone.trim()) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl text-[#1A1917] mb-1">
          Contact Details
        </h3>
        <p className="text-xs text-[#78746D]">
          We will send your order confirmation and bespoke courier tracking updates here.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="text-[11px] font-medium tracking-wider uppercase text-[#5C5852] block mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-[#8C877E] absolute left-3 top-3" />
            <input
              type="email"
              required
              placeholder="e.g. camille.valmont@domain.com"
              value={details.email}
              onChange={(e) => onChange('email', e.target.value)}
              className="w-full bg-white border border-[#D8D2C5] pl-10 pr-3 py-2.5 text-xs text-[#1A1917] outline-none focus:border-[#5E1924]"
            />
          </div>
        </div>

        <div>
          <label className="text-[11px] font-medium tracking-wider uppercase text-[#5C5852] block mb-1.5">
            Mobile Number (for Courier Dispatch Updates)
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-[#8C877E] absolute left-3 top-3" />
            <input
              type="tel"
              required
              placeholder="e.g. +91 98765 43210 or +1 (555) 234-5678"
              value={details.phone}
              onChange={(e) => onChange('phone', e.target.value)}
              className="w-full bg-white border border-[#D8D2C5] pl-10 pr-3 py-2.5 text-xs text-[#1A1917] outline-none focus:border-[#5E1924]"
            />
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 text-xs text-[#5C5852] cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="accent-[#5E1924] rounded-sm"
            />
            <span>Receive Aurel Gazette invitations and private archive releases</span>
          </label>
        </div>
      </div>

      <div className="pt-4 border-t border-[#E8E3D8] flex justify-end">
        <button
          type="submit"
          className="py-3 px-8 bg-[#1A1917] hover:bg-[#5E1924] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span>Continue to Shipping</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

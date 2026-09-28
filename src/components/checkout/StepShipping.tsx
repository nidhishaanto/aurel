import React from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { ShippingDetails } from '../../types/ecommerce';

interface StepShippingProps {
  details: ShippingDetails;
  onChange: (field: keyof ShippingDetails, value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepShipping: React.FC<StepShippingProps> = ({
  details,
  onChange,
  onNext,
  onBack
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      details.firstName.trim() &&
      details.lastName.trim() &&
      details.address.trim() &&
      details.city.trim() &&
      details.postalCode.trim()
    ) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="font-serif text-2xl text-[#1A1917] mb-1">
          Delivery Address
        </h3>
        <p className="text-xs text-[#78746D]">
          Please enter the precise destination where your pieces will be received.
        </p>
      </div>

      <div className="space-y-4">
        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-[11px] font-medium tracking-wider uppercase text-[#5C5852] block mb-1.5">
              First Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Camille"
              value={details.firstName}
              onChange={(e) => onChange('firstName', e.target.value)}
              className="w-full bg-white border border-[#D8D2C5] px-3 py-2.5 text-xs text-[#1A1917] outline-none focus:border-[#5E1924]"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium tracking-wider uppercase text-[#5C5852] block mb-1.5">
              Last Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Valmont"
              value={details.lastName}
              onChange={(e) => onChange('lastName', e.target.value)}
              className="w-full bg-white border border-[#D8D2C5] px-3 py-2.5 text-xs text-[#1A1917] outline-none focus:border-[#5E1924]"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="text-[11px] font-medium tracking-wider uppercase text-[#5C5852] block mb-1.5">
            Street Address
          </label>
          <input
            type="text"
            required
            placeholder="e.g. 42 Colaba Causeway, Apt 4B"
            value={details.address}
            onChange={(e) => onChange('address', e.target.value)}
            className="w-full bg-white border border-[#D8D2C5] px-3 py-2.5 text-xs text-[#1A1917] outline-none focus:border-[#5E1924]"
          />
        </div>

        {/* Apartment / Suite */}
        <div>
          <label className="text-[11px] font-medium tracking-wider uppercase text-[#5C5852] block mb-1.5">
            Apartment, Suite, Studio (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. Penthouse West"
            value={details.apartment}
            onChange={(e) => onChange('apartment', e.target.value)}
            className="w-full bg-white border border-[#D8D2C5] px-3 py-2.5 text-xs text-[#1A1917] outline-none focus:border-[#5E1924]"
          />
        </div>

        {/* City, State, Postal */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-[11px] font-medium tracking-wider uppercase text-[#5C5852] block mb-1.5">
              City
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Mumbai / Paris"
              value={details.city}
              onChange={(e) => onChange('city', e.target.value)}
              className="w-full bg-white border border-[#D8D2C5] px-3 py-2.5 text-xs text-[#1A1917] outline-none focus:border-[#5E1924]"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium tracking-wider uppercase text-[#5C5852] block mb-1.5">
              State / Region
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Maharashtra / Île-de-France"
              value={details.state}
              onChange={(e) => onChange('state', e.target.value)}
              className="w-full bg-white border border-[#D8D2C5] px-3 py-2.5 text-xs text-[#1A1917] outline-none focus:border-[#5E1924]"
            />
          </div>

          <div>
            <label className="text-[11px] font-medium tracking-wider uppercase text-[#5C5852] block mb-1.5">
              Postal Code / ZIP
            </label>
            <input
              type="text"
              required
              placeholder="e.g. 400001"
              value={details.postalCode}
              onChange={(e) => onChange('postalCode', e.target.value)}
              className="w-full bg-white border border-[#D8D2C5] px-3 py-2.5 text-xs text-[#1A1917] outline-none focus:border-[#5E1924]"
            />
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="text-[11px] font-medium tracking-wider uppercase text-[#5C5852] block mb-1.5">
            Country / Region
          </label>
          <select
            value={details.country}
            onChange={(e) => onChange('country', e.target.value)}
            className="w-full bg-white border border-[#D8D2C5] px-3 py-2.5 text-xs text-[#1A1917] outline-none focus:border-[#5E1924]"
          >
            <option value="India">India</option>
            <option value="United States">United States</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="France">France</option>
            <option value="Italy">Italy</option>
            <option value="Germany">Germany</option>
            <option value="Japan">Japan</option>
            <option value="United Arab Emirates">United Arab Emirates</option>
          </select>
        </div>
      </div>

      <div className="pt-4 border-t border-[#E8E3D8] flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="text-xs tracking-wider uppercase text-[#78746D] hover:text-[#1A1917] flex items-center gap-1.5"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Contact</span>
        </button>

        <button
          type="submit"
          className="py-3 px-8 bg-[#1A1917] hover:bg-[#5E1924] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span>Continue to Delivery</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};

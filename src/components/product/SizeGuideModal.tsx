import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({
  isOpen,
  onClose,
  category
}) => {
  const [unit, setUnit] = useState<'cm' | 'in'>('cm');

  if (!isOpen) return null;

  const measurements = unit === 'cm' ? [
    { size: 'XS', bust: '80-84', waist: '62-66', hip: '88-92', length: '68' },
    { size: 'S', bust: '84-88', waist: '66-70', hip: '92-96', length: '70' },
    { size: 'M', bust: '88-94', waist: '70-76', hip: '96-102', length: '72' },
    { size: 'L', bust: '94-100', waist: '76-82', hip: '102-108', length: '74' },
    { size: 'XL', bust: '100-106', waist: '82-88', hip: '108-114', length: '76' }
  ] : [
    { size: 'XS', bust: '31.5-33', waist: '24.5-26', hip: '34.5-36', length: '26.8' },
    { size: 'S', bust: '33-34.5', waist: '26-27.5', hip: '36-37.8', length: '27.5' },
    { size: 'M', bust: '34.5-37', waist: '27.5-30', hip: '37.8-40', length: '28.3' },
    { size: 'L', bust: '37-39.5', waist: '30-32.5', hip: '40-42.5', length: '29.1' },
    { size: 'XL', bust: '39.5-41.7', waist: '32.5-34.6', hip: '42.5-44.8', length: '29.9' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1A1917]/50 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-[#FBF9F5] border border-[#E8E3D8] shadow-2xl rounded-xs p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1 text-[#78746D] hover:text-[#1A1917]"
          aria-label="Close size guide"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Ruler className="w-4 h-4 text-[#5E1924]" />
          <span className="text-[11px] tracking-[0.25em] uppercase text-[#5E1924] font-medium">
            Atelier Fitting Guide
          </span>
        </div>

        <h3 className="font-serif text-2xl text-[#1A1917] mb-2">
          Garment Measurements ({category})
        </h3>

        <p className="text-xs text-[#5C5852] leading-relaxed mb-6">
          Aurel silhouettes are intentionally proportioned with an unhurried, architectural drape. For a relaxed, editorial silhouette, select your true size. For a tailored, closer contour, take one size down.
        </p>

        {/* Unit Switcher */}
        <div className="flex justify-end mb-4">
          <div className="inline-flex border border-[#D8D2C5] rounded-xs bg-white text-xs">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 font-medium tracking-wider uppercase transition-colors ${
                unit === 'cm' ? 'bg-[#1A1917] text-[#FBF9F5]' : 'text-[#78746D]'
              }`}
            >
              Centimeters (cm)
            </button>
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 font-medium tracking-wider uppercase transition-colors ${
                unit === 'in' ? 'bg-[#1A1917] text-[#FBF9F5]' : 'text-[#78746D]'
              }`}
            >
              Inches (in)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-[#E8E3D8] bg-white mb-6">
          <table className="w-full text-xs text-left">
            <thead className="bg-[#F7F4EE] border-b border-[#E8E3D8] text-[11px] uppercase tracking-wider text-[#5C5852]">
              <tr>
                <th className="py-2.5 px-4 font-semibold">Size</th>
                <th className="py-2.5 px-4 font-semibold">Bust / Chest</th>
                <th className="py-2.5 px-4 font-semibold">Natural Waist</th>
                <th className="py-2.5 px-4 font-semibold">Full Hip</th>
                <th className="py-2.5 px-4 font-semibold">Garment Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFEAE1]">
              {measurements.map((row) => (
                <tr key={row.size} className="hover:bg-[#FBF9F5]">
                  <td className="py-2.5 px-4 font-semibold text-[#1A1917]">{row.size}</td>
                  <td className="py-2.5 px-4 text-[#5C5852]">{row.bust}</td>
                  <td className="py-2.5 px-4 text-[#5C5852]">{row.waist}</td>
                  <td className="py-2.5 px-4 text-[#5C5852]">{row.hip}</td>
                  <td className="py-2.5 px-4 text-[#5C5852]">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Model Spec Note */}
        <div className="p-4 bg-[#F4F0E8] border border-[#E2DBD0] text-xs text-[#4A4742] space-y-1">
          <span className="font-semibold text-[#1A1917] block">Model Reference</span>
          <p>
            Camille is 179cm / 5&apos;10.5&quot; tall, with an 82cm bust, 61cm waist, and 89cm hips. She wears size <strong>S</strong> across all Aurel garments.
          </p>
        </div>
      </div>
    </div>
  );
};

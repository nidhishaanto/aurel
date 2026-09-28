import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#5E1924] text-[#FBF9F5] text-[11px] sm:text-xs tracking-[0.2em] uppercase py-2 px-4 transition-all">
      <div className="editorial-container flex items-center justify-between">
        <div className="flex-1 text-center font-medium flex items-center justify-center gap-2">
          <span className="hidden sm:inline-block opacity-75">
            <Sparkles className="w-3 h-3 text-[#F3EFE8]" />
          </span>
          <span>Complimentary Global Shipping on Orders over ₹5,000</span>
          <span className="hidden md:inline-block opacity-50">•</span>
          <span className="hidden md:inline-block text-[#F3EFE8]/90">Use Code AUREL10 for 10% Privileged Invitation</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-[#FBF9F5]/70 hover:text-white transition-colors p-1"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

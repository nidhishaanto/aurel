import React from 'react';
import { Check, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';

interface ToastProps {
  onOpenBag: () => void;
}

export const Toast: React.FC<ToastProps> = ({ onOpenBag }) => {
  const { showAddedToast, lastAddedItem, dismissToast } = useCart();

  if (!showAddedToast || !lastAddedItem) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full bg-[#FFFFFF] border border-[#E8E3D8] shadow-2xl p-4 rounded-xs animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-start gap-3">
        <div className="w-12 h-16 bg-[#F4F0E8] overflow-hidden flex-shrink-0 border border-[#E8E3D8]">
          <img
            src={lastAddedItem.image}
            alt={lastAddedItem.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-[#5E1924] font-medium tracking-wider uppercase mb-1">
            <Check className="w-3.5 h-3.5" />
            <span>Added to Bag</span>
          </div>
          <h4 className="font-serif text-sm font-medium text-[#1A1917] truncate">
            {lastAddedItem.name}
          </h4>
          <p className="text-[11px] text-[#78746D] tracking-wider uppercase mt-0.5">
            Size {lastAddedItem.size} &bull; {lastAddedItem.color}
          </p>

          <button
            onClick={() => {
              dismissToast();
              onOpenBag();
            }}
            className="mt-2 text-xs font-semibold tracking-wider uppercase text-[#1A1917] hover:text-[#5E1924] flex items-center gap-1 transition-colors"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Review Bag &amp; Checkout</span>
          </button>
        </div>

        <button
          onClick={dismissToast}
          className="text-[#9C968B] hover:text-[#1A1917] p-1 transition-colors"
          aria-label="Dismiss toast"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

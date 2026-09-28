import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem } from '../types/ecommerce';

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>, quantity?: number) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  
  // Financials
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  freeShippingThreshold: number;
  freeShippingRemaining: number;
  
  // Promo code & gift options
  promoCode: string | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  isGiftWrap: boolean;
  toggleGiftWrap: () => void;
  
  // Notification / Micro-feedback
  lastAddedItem: CartItem | null;
  showAddedToast: boolean;
  dismissToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 5000; // in INR
const STANDARD_SHIPPING_FEE = 350;
const GIFT_WRAP_FEE = 250;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('aurel_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoDiscountRate, setPromoDiscountRate] = useState<number>(0);
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  
  const [lastAddedItem, setLastAddedItem] = useState<CartItem | null>(null);
  const [showAddedToast, setShowAddedToast] = useState(false);

  useEffect(() => {
    localStorage.setItem('aurel_cart', JSON.stringify(cart));
  }, [cart]);

  // Toast auto-dismiss
  useEffect(() => {
    if (showAddedToast) {
      const timer = setTimeout(() => {
        setShowAddedToast(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showAddedToast]);

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const dismissToast = () => setShowAddedToast(false);

  const addToCart = (item: Omit<CartItem, 'id' | 'quantity'>, quantity = 1) => {
    const id = `${item.productId}-${item.size}-${item.color}`;
    
    setCart(prev => {
      const existing = prev.find(i => i.id === id);
      if (existing) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { ...item, id, quantity }];
    });

    const addedItemObj: CartItem = { ...item, id, quantity };
    setLastAddedItem(addedItemObj);
    setShowAddedToast(true);
    
    // Automatically open drawer after a micro-moment for tactile feedback
    setTimeout(() => {
      setIsCartOpen(true);
    }, 250);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode(null);
    setPromoDiscountRate(0);
    setIsGiftWrap(false);
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'AUREL10') {
      setPromoCode('AUREL10');
      setPromoDiscountRate(0.10);
      return { success: true, message: 'Archive code AUREL10 applied: 10% privilege discount' };
    }
    if (clean === 'FIRSTLOOK') {
      setPromoCode('FIRSTLOOK');
      setPromoDiscountRate(0.15);
      return { success: true, message: 'Private invitation FIRSTLOOK applied: 15% discount' };
    }
    return { success: false, message: 'Invalid or expired invitation code' };
  };

  const removePromoCode = () => {
    setPromoCode(null);
    setPromoDiscountRate(0);
  };

  const toggleGiftWrap = () => {
    setIsGiftWrap(prev => !prev);
  };

  // Calculations
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discount = Math.round(subtotal * promoDiscountRate);
  const freeShippingRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;
  const tax = Math.round((subtotal - discount) * 0.05); // 5% GST/VAT
  const giftWrapFee = isGiftWrap ? GIFT_WRAP_FEE : 0;
  const total = Math.max(0, subtotal - discount + shipping + tax + giftWrapFee);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        isCartOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        discount,
        shipping,
        tax,
        total,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        freeShippingRemaining,
        promoCode,
        applyPromoCode,
        removePromoCode,
        isGiftWrap,
        toggleGiftWrap,
        lastAddedItem,
        showAddedToast,
        dismissToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

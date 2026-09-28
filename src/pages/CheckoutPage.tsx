import React, { useState } from 'react';
import { Check, ChevronRight, Lock } from 'lucide-react';
import { ShippingDetails, Order } from '../types/ecommerce';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { OrderSummary } from '../components/checkout/OrderSummary';
import { StepContact } from '../components/checkout/StepContact';
import { StepShipping } from '../components/checkout/StepShipping';
import { StepDelivery } from '../components/checkout/StepDelivery';
import { StepPayment } from '../components/checkout/StepPayment';

interface CheckoutPageProps {
  onOrderCompleted: (order: Order) => void;
  onNavigate: (page: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  onOrderCompleted,
  onNavigate
}) => {
  const { cart, subtotal, discount, shipping, tax, total, clearCart } = useCart();
  const { currency } = useCurrency();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    email: 'client@atelier-aurel.com',
    phone: '+91 98200 12345',
    firstName: 'Camille',
    lastName: 'Valmont',
    address: '14 Altamount Road, Cumballa Hill',
    apartment: 'Floor 12, West Wing',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400026',
    country: 'India',
    deliveryMethod: 'standard'
  });

  const handleFieldChange = (field: keyof ShippingDetails, value: string) => {
    setShippingDetails(prev => ({ ...prev, [field]: value }));
  };

  const handleCompleteOrder = (paymentMethod: string) => {
    const generatedOrder: Order = {
      orderId: `AURL-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      items: [...cart],
      subtotal,
      discount,
      shipping,
      tax,
      total,
      currency,
      shippingDetails,
      paymentMethod,
      status: 'confirmed'
    };

    clearCart();
    onOrderCompleted(generatedOrder);
  };

  if (cart.length === 0) {
    return (
      <div className="py-24 text-center">
        <h2 className="font-serif text-2xl text-[#1A1917] mb-2">No items to checkout</h2>
        <p className="text-xs text-[#78746D] mb-6">Your shopping bag is empty.</p>
        <button
          onClick={() => onNavigate('shop')}
          className="py-3 px-6 bg-[#1A1917] text-white text-xs uppercase tracking-widest"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  const steps = [
    { number: 1, label: 'Contact' },
    { number: 2, label: 'Address' },
    { number: 3, label: 'Delivery' },
    { number: 4, label: 'Payment' }
  ];

  return (
    <div className="py-10 bg-[#FBF9F5] min-h-screen">
      <div className="editorial-container">
        
        {/* Checkout Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E8E3D8]">
          <span className="font-serif text-2xl tracking-[0.2em] font-semibold text-[#1A1917]">
            A U R E L
          </span>

          <div className="flex items-center gap-1.5 text-xs text-[#78746D]">
            <Lock className="w-3.5 h-3.5 text-[#5E1924]" />
            <span className="tracking-widest uppercase text-[11px]">256-Bit Encrypted Checkout</span>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 mb-12 overflow-x-auto py-2">
          {steps.map((st, idx) => {
            const isCompleted = currentStep > st.number;
            const isCurrent = currentStep === st.number;
            return (
              <React.Fragment key={st.number}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-medium transition-colors ${
                      isCompleted
                        ? 'bg-[#5E1924] text-white'
                        : isCurrent
                        ? 'bg-[#1A1917] text-white'
                        : 'bg-[#E8E3D8] text-[#78746D]'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5" /> : st.number}
                  </div>
                  <span
                    className={`text-xs tracking-wider uppercase ${
                      isCurrent ? 'font-semibold text-[#1A1917]' : 'text-[#78746D]'
                    }`}
                  >
                    {st.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-[#C5BEB3]" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Checkout Grid (Step form + Order Summary) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 border border-[#E8E3D8] rounded-xs shadow-xs">
            {currentStep === 1 && (
              <StepContact
                details={shippingDetails}
                onChange={handleFieldChange}
                onNext={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 2 && (
              <StepShipping
                details={shippingDetails}
                onChange={handleFieldChange}
                onNext={() => setCurrentStep(3)}
                onBack={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 3 && (
              <StepDelivery
                details={shippingDetails}
                onChange={(m) => handleFieldChange('deliveryMethod', m)}
                onNext={() => setCurrentStep(4)}
                onBack={() => setCurrentStep(2)}
              />
            )}

            {currentStep === 4 && (
              <StepPayment
                onBack={() => setCurrentStep(3)}
                onCompleteOrder={handleCompleteOrder}
              />
            )}
          </div>

          {/* Sticky Summary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <OrderSummary />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CurrencyCode, CurrencyConfig } from '../types/ecommerce';

const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  INR: {
    code: 'INR',
    symbol: '₹',
    rate: 1,
    format: (amount) => `₹${Math.round(amount).toLocaleString('en-IN')}`
  },
  USD: {
    code: 'USD',
    symbol: '$',
    rate: 0.012,
    format: (amount) => `$${(amount * 0.012).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    rate: 0.011,
    format: (amount) => `€${(amount * 0.011).toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    rate: 0.0095,
    format: (amount) => `£${(amount * 0.0095).toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
  }
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  formatPrice: (amountInINR: number) => string;
  config: CurrencyConfig;
  availableCurrencies: CurrencyConfig[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    const saved = localStorage.getItem('aurel_currency');
    return (saved as CurrencyCode) || 'INR';
  });

  useEffect(() => {
    localStorage.setItem('aurel_currency', currency);
  }, [currency]);

  const setCurrency = (code: CurrencyCode) => {
    if (CURRENCIES[code]) {
      setCurrencyState(code);
    }
  };

  const config = CURRENCIES[currency];

  const formatPrice = (amountInINR: number): string => {
    return config.format(amountInINR);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        formatPrice,
        config,
        availableCurrencies: Object.values(CURRENCIES)
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

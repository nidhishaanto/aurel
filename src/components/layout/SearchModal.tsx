import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types/ecommerce';
import { useCurrency } from '../../context/CurrencyContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredProducts: Product[] = query.trim()
    ? PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(query.toLowerCase()) ||
        p.materials.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const popularSearches = ['Mulberry Silk', 'Pleated Trouser', 'Wool Trench', 'Crescent Bag', 'Merino Knit', 'Bio-Acetate'];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start bg-[#1A1917]/50 backdrop-blur-sm transition-opacity">
      <div 
        className="w-full bg-[#FBF9F5] border-b border-[#E8E3D8] shadow-2xl py-6 px-4 sm:px-8 transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="editorial-container">
          <div className="flex items-center justify-between border-b border-[#D8D2C5] pb-4">
            <div className="flex items-center gap-3 flex-1">
              <Search className="w-5 h-5 text-[#78746D]" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search collection by piece, fabric, or silhouette..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-lg sm:text-2xl font-serif tracking-wide text-[#1A1917] placeholder:text-[#9C968B] placeholder:font-sans placeholder:text-base outline-none"
              />
            </div>
            <button
              onClick={onClose}
              className="p-2 text-[#78746D] hover:text-[#1A1917] rounded-full hover:bg-[#EFEAE1] transition-colors"
              aria-label="Close search"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Quick tags */}
          {!query && (
            <div className="py-6">
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#78746D] font-medium mb-3">
                Curated Suggestions
              </p>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs tracking-wider uppercase py-1.5 px-3.5 bg-[#F2EDE4] hover:bg-[#E8E1D5] text-[#33312E] rounded-full transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search results */}
          {query && (
            <div className="py-6 max-h-[60vh] overflow-y-auto">
              <p className="text-xs tracking-widest uppercase text-[#78746D] mb-4">
                Found {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}
              </p>
              {filteredProducts.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="font-serif text-xl text-[#5C5852] italic">
                    No results found for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs text-[#8C877E] mt-2">
                    Try searching for &lsquo;silk&rsquo;, &lsquo;trouser&rsquo;, or &lsquo;coat&rsquo;.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredProducts.map(product => (
                    <div
                      key={product.id}
                      onClick={() => {
                        onSelectProduct(product.id);
                        onClose();
                      }}
                      className="group flex items-center gap-3 p-2 rounded bg-white/60 hover:bg-white border border-transparent hover:border-[#E8E3D8] transition-all cursor-pointer"
                    >
                      <div className="w-16 h-20 bg-[#F4F0E8] overflow-hidden flex-shrink-0">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] tracking-widest uppercase text-[#78746D] block">
                          {product.category}
                        </span>
                        <h4 className="font-serif text-sm font-medium text-[#1A1917] truncate group-hover:text-[#5E1924] transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-xs text-[#5C5852] mt-1 font-medium">
                          {formatPrice(product.price)}
                        </p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#9C968B] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Click outside to close */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, User, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useCurrency } from '../../context/CurrencyContext';
import { CurrencyCode } from '../../types/ecommerce';
import { useAuth } from '../../context/AuthContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string, param?: string) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenSearch
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { currency, setCurrency, availableCurrencies } = useCurrency();
  const { user, logout } = useAuth();
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Shop All', page: 'shop' },
    { label: 'New Arrivals', page: 'shop', param: 'new' },
    { label: 'Tops & Silk', page: 'shop', param: 'tops' },
    { label: 'Tailored Bottoms', page: 'shop', param: 'bottoms' },
    { label: 'Outerwear', page: 'shop', param: 'outerwear' },
    { label: 'Journal', page: 'journal' },
    { label: 'Atelier', page: 'about' }
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E8E3D8] shadow-xs py-3.5'
          : 'bg-[#FBF9F5] border-b border-[#EFEAE1] py-4'
      }`}
    >
      <div className="editorial-container flex items-center justify-between">
        {/* Mobile menu trigger */}
        <div className="flex items-center lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#1A1917] hover:opacity-70 transition-opacity"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          
          <button
            onClick={onOpenSearch}
            className="p-2 ml-1 text-[#1A1917] hover:opacity-70 transition-opacity"
            aria-label="Search collection"
          >
            <Search className="w-4 h-4 stroke-[1.5]" />
          </button>
        </div>

        {/* Brand Wordmark */}
        <div className="flex items-center">
          <button
            onClick={() => onNavigate('home')}
            className="text-left group cursor-pointer"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.22em] text-[#1A1917] font-semibold transition-colors group-hover:text-[#5E1924]">
              AUREL
            </span>
            <span className="hidden sm:block text-[8px] tracking-[0.35em] text-[#78746D] uppercase -mt-0.5">
              Atelier &bull; Paris &bull; Milan
            </span>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((item) => (
            <button
              key={`${item.page}-${item.param || ''}`}
              onClick={() => onNavigate(item.page, item.param)}
              className={`text-[12px] tracking-[0.14em] uppercase transition-colors relative py-1 cursor-pointer ${
                currentPage === item.page
                  ? 'text-[#5E1924] font-medium'
                  : 'text-[#47443E] hover:text-[#1A1917]'
              }`}
            >
              {item.label}
              {currentPage === item.page && (
                <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#5E1924] rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Header Actions (Right) */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Desktop Search trigger */}
          <button
            onClick={onOpenSearch}
            className="hidden lg:flex items-center gap-2 text-xs tracking-wider uppercase text-[#5C5852] hover:text-[#1A1917] px-2 py-1.5 transition-colors cursor-pointer"
            aria-label="Open search dialog"
          >
            <Search className="w-4 h-4 stroke-[1.5]" />
            <span className="text-[11px] tracking-[0.15em]">Search</span>
          </button>

          {/* Currency Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
              className="flex items-center gap-1 text-[11px] font-medium tracking-widest uppercase text-[#5C5852] hover:text-[#1A1917] px-2 py-1 rounded transition-colors"
              aria-label="Change currency"
            >
              <span>{currency}</span>
              <ChevronDown className="w-3 h-3 stroke-[1.5]" />
            </button>

            {isCurrencyDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-28 bg-[#FFFFFF] border border-[#E8E3D8] shadow-lg rounded-sm py-1 z-50 text-left"
                onMouseLeave={() => setIsCurrencyDropdownOpen(false)}
              >
                {availableCurrencies.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCurrency(c.code as CurrencyCode);
                      setIsCurrencyDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs tracking-wider flex items-center justify-between hover:bg-[#F7F4EE] transition-colors ${
                      currency === c.code ? 'font-semibold text-[#5E1924]' : 'text-[#4A4742]'
                    }`}
                  >
                    <span>{c.code}</span>
                    <span className="text-gray-400">{c.symbol}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Account */}
          <div className="relative">
            <button
              onClick={() => setIsAccountOpen(!isAccountOpen)}
              className="relative p-2 text-[#2E2C29] hover:text-[#5E1924] transition-colors cursor-pointer"
              aria-label="Account"
            >
              <User className="w-5 h-5 stroke-[1.5]" />
            </button>

            {isAccountOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E8E3D8] shadow-lg z-50 py-2">
                {user ? (
                  <>
                    <div className="px-4 py-2 border-b border-[#EFEAE1]">
                      <p className="text-xs font-semibold text-[#1A1917] truncate">{user.name}</p>
                      <p className="text-[10px] text-[#78746D] truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={async () => { await logout(); setIsAccountOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-xs text-[#5C5852] hover:bg-[#F7F4EE]"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => { onNavigate('auth', 'login'); setIsAccountOpen(false); }}
                      className="w-full px-4 py-2.5 text-left text-xs text-[#5C5852] hover:bg-[#F7F4EE]"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => { onNavigate('auth', 'signup'); setIsAccountOpen(false); }}
                      className="w-full px-4 py-2.5 text-left text-xs text-[#5C5852] hover:bg-[#F7F4EE]"
                    >
                      Create Account
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => onNavigate('wishlist')}
            className="relative p-2 text-[#2E2C29] hover:text-[#5E1924] transition-colors cursor-pointer"
            aria-label={`Wishlist with ${wishlistCount} items`}
          >
            <Heart className="w-5 h-5 stroke-[1.5]" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#5E1924] text-[#FBF9F5] text-[9px] font-medium flex items-center justify-center animate-in zoom-in-50 duration-200">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart / Bag Button */}
          <button
            onClick={openCart}
            className="relative flex items-center gap-2 py-1.5 px-2.5 rounded-full hover:bg-[#F2ECE1] transition-all cursor-pointer group"
            aria-label={`Shopping bag with ${cartCount} items`}
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5] text-[#1A1917] group-hover:scale-105 transition-transform" />
            <span className="text-xs font-semibold tracking-wider text-[#1A1917] min-w-4 text-center">
              {cartCount}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#FBF9F5] border-b border-[#E8E3D8] shadow-xl py-6 px-6 z-50 animate-in slide-in-from-top-4 duration-300">
          <nav className="flex flex-col gap-4">
            {navLinks.map((item) => (
              <button
                key={`${item.page}-${item.param || ''}`}
                onClick={() => {
                  onNavigate(item.page, item.param);
                  setIsMobileMenuOpen(false);
                }}
                className="text-left text-sm tracking-[0.16em] uppercase py-2 border-b border-[#EFEAE1] text-[#2E2C29] hover:text-[#5E1924] transition-colors"
              >
                {item.label}
              </button>
            ))}
            
            <div className="pt-2 flex items-center justify-between text-xs text-[#78746D]">
              <span>Complimentary Shipping Worldwide</span>
              <span>Atelier Online</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

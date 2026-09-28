import React, { useState } from 'react';
import { CurrencyProvider } from './context/CurrencyContext';
import { WishlistProvider } from './context/WishlistContext';
import { CartProvider, useCart } from './context/CartContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartDrawer } from './components/layout/CartDrawer';
import { SearchModal } from './components/layout/SearchModal';
import { Toast } from './components/ui/Toast';
import { QuickViewModal } from './components/shop/QuickViewModal';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { WishlistPage } from './pages/WishlistPage';
import { AboutPage } from './pages/AboutPage';
import { JournalPage } from './pages/JournalPage';
import { AuthPage } from './pages/AuthPage';
import { AuthProvider } from './context/AuthContext';

import { Product, Order } from './types/ecommerce';

const MainApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [pageParam, setPageParam] = useState<string | undefined>(undefined);
  const [selectedProductId, setSelectedProductId] = useState<string>('luna-draped-top');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const { openCart } = useCart();

  const handleNavigate = (page: string, param?: string) => {
    setCurrentPage(page);
    setPageParam(param);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProductId(productId);
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderCompleted = (order: Order) => {
    setCompletedOrder(order);
    setCurrentPage('order-success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1A1917] selection:bg-[#5E1924] selection:text-[#FBF9F5]">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Sticky Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Active Page View */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            initialCategory={pageParam}
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {currentPage === 'product' && (
          <ProductDetailPage
            productId={selectedProductId}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onQuickView={(p) => setQuickViewProduct(p)}
          />
        )}

        {currentPage === 'cart' && (
          <CartPage
            onNavigate={handleNavigate}
            onProceedToCheckout={() => handleNavigate('checkout')}
          />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage
            onOrderCompleted={handleOrderCompleted}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'order-success' && (
          <OrderSuccessPage
            order={completedOrder}
            onContinueShopping={() => handleNavigate('shop')}
          />
        )}

        {currentPage === 'wishlist' && (
          <WishlistPage
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentPage === 'about' && (
          <AboutPage
            onNavigateToShop={() => handleNavigate('shop')}
          />
        )}

        {currentPage === 'auth' && (
          <AuthPage
            mode={pageParam === 'signup' ? 'signup' : 'login'}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'journal' && (
          <JournalPage
            onSelectProduct={handleSelectProduct}
            onNavigateToShop={() => handleNavigate('shop')}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Slide-out Mini-Bag Drawer */}
      <CartDrawer
        onNavigateToCheckout={() => handleNavigate('checkout')}
        onNavigateToCart={() => handleNavigate('cart')}
        onNavigateToShop={() => handleNavigate('shop')}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onViewFullDetails={handleSelectProduct}
      />

      {/* Toast Notification */}
      <Toast onOpenBag={openCart} />
    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <WishlistProvider>
          <CartProvider>
            <MainApp />
          </CartProvider>
        </WishlistProvider>
      </CurrencyProvider>
    </AuthProvider>
  );
}

export default App;

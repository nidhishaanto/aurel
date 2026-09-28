import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { FeaturedCategories } from '../components/home/FeaturedCategories';
import { ProductShowcase } from '../components/home/ProductShowcase';
import { EditorialStory } from '../components/home/EditorialStory';
import { PressReviews } from '../components/home/PressReviews';
import { ProductCategory, Product } from '../types/ecommerce';

interface HomePageProps {
  onNavigate: (page: string, param?: string) => void;
  onSelectProduct: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProduct,
  onQuickView
}) => {
  return (
    <div className="min-h-screen">
      <HeroSection
        onShopClick={() => onNavigate('shop')}
        onLookbookClick={() => onNavigate('journal')}
      />

      <FeaturedCategories
        onSelectCategory={(category: ProductCategory) => onNavigate('shop', category)}
      />

      <ProductShowcase
        onSelectProduct={onSelectProduct}
        onViewAll={() => onNavigate('shop')}
        onQuickView={onQuickView}
      />

      <EditorialStory
        onLearnMore={() => onNavigate('about')}
      />

      <PressReviews />
    </div>
  );
};

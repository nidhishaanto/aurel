import React, { useState, useMemo, useEffect } from 'react';
import { LayoutGrid, Grid3X3, SlidersHorizontal, X } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { Product, ProductCategory } from '../types/ecommerce';
import { ProductCard } from '../components/shop/ProductCard';
import { FilterSidebar } from '../components/shop/FilterSidebar';

interface ShopPageProps {
  initialCategory?: string;
  onSelectProduct: (productId: string) => void;
  onQuickView: (product: Product) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory,
  onSelectProduct,
  onQuickView
}) => {
  const [category, setCategory] = useState<ProductCategory>(
    (initialCategory as ProductCategory) || 'all'
  );
  const [collection, setCollection] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(10000);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [gridColumns, setGridColumns] = useState<2 | 3 | 4>(3);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      if (initialCategory === 'new') {
        setSortBy('newest');
        setCategory('all');
      } else {
        setCategory(initialCategory as ProductCategory);
      }
    }
  }, [initialCategory]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev => 
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors(prev => 
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    );
  };

  const handleResetFilters = () => {
    setCategory('all');
    setCollection('');
    setMaxPrice(10000);
    setSelectedSizes([]);
    setSelectedColors([]);
    setInStockOnly(false);
    setSortBy('featured');
  };

  const hasActiveFilters = 
    category !== 'all' || 
    collection !== '' || 
    maxPrice < 10000 || 
    selectedSizes.length > 0 || 
    selectedColors.length > 0 || 
    inStockOnly;

  // Filter & Sort Logic
  const { products, loading, error } = useProducts();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category
      if (category !== 'all' && product.category !== category) {
        return false;
      }
      // Collection
      if (collection && product.collection !== collection) {
        return false;
      }
      // Price
      if (product.price > maxPrice) {
        return false;
      }
      // Sizes
      if (selectedSizes.length > 0) {
        const hasMatchingSize = selectedSizes.some((s) => product.sizes.includes(s));
        if (!hasMatchingSize) return false;
      }
      // Colors
      if (selectedColors.length > 0) {
        const hasMatchingColor = selectedColors.some((c) =>
          product.colors.some((pc) => pc.name.toLowerCase().includes(c.toLowerCase().split(' ')[0]))
        );
        if (!hasMatchingColor) return false;
      }
      // Stock
      if (inStockOnly) {
        const totalStock = Object.values(product.stock).reduce((a, b) => a + b, 0);
        if (totalStock <= 0) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [category, collection, maxPrice, selectedSizes, selectedColors, inStockOnly, sortBy, products]);

  if (loading) return <div className="py-20 text-center">Loading products…</div>;
  if (error) return <div className="py-20 text-center text-red-600">Error: {error}</div>;

  return (
    <div className="py-10 bg-[#FBF9F5] min-h-screen">
      <div className="editorial-container">
        
        {/* Editorial Page Header */}
        <div className="pb-8 mb-8 border-b border-[#E8E3D8]">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#5E1924] block mb-2">
            The Complete Wardrobe
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-4xl sm:text-5xl text-[#1A1917] tracking-tight">
                {category === 'all' 
                  ? 'All Silhouettes' 
                  : category.charAt(0).toUpperCase() + category.slice(1)}
              </h1>
              <p className="text-xs sm:text-sm text-[#78746D] mt-1 max-w-xl">
                Uncompromising materials and deliberate proportions. Designed for continuous daily rotation.
              </p>
            </div>

            <span className="text-xs tracking-wider uppercase text-[#78746D]">
              Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Piece' : 'Pieces'}
            </span>
          </div>
        </div>

        {/* Filter Controls Bar (Mobile toggle + Desktop Sort & Grid switcher) */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-[#E8E3D8]">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 py-2 px-4 border border-[#D8D2C5] rounded-xs text-xs tracking-wider uppercase font-medium bg-white text-[#1A1917]"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#5E1924]" />
            <span>Refine Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
          </button>

          {/* Desktop Filter status indicator */}
          <div className="hidden lg:flex items-center gap-2 flex-wrap">
            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap text-xs">
                <span className="text-[#78746D]">Active Filters:</span>
                {category !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-[#F2EDE4] px-2.5 py-1 text-[11px] uppercase tracking-wider text-[#33312E] rounded-xs">
                    {category}
                    <button onClick={() => setCategory('all')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {collection && (
                  <span className="inline-flex items-center gap-1 bg-[#F2EDE4] px-2.5 py-1 text-[11px] uppercase tracking-wider text-[#33312E] rounded-xs">
                    {collection}
                    <button onClick={() => setCollection('')}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedSizes.map(s => (
                  <span key={s} className="inline-flex items-center gap-1 bg-[#F2EDE4] px-2.5 py-1 text-[11px] uppercase tracking-wider text-[#33312E] rounded-xs">
                    Size {s}
                    <button onClick={() => toggleSize(s)}><X className="w-3 h-3" /></button>
                  </span>
                ))}
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#5E1924] underline ml-1 hover:text-[#1A1917]"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* Sort & Grid Toggle (Right) */}
          <div className="flex items-center gap-4 ml-auto">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="hidden sm:inline text-[#78746D] tracking-wider uppercase text-[11px]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white border border-[#D8D2C5] px-3 py-1.5 text-xs text-[#1A1917] outline-none rounded-xs focus:border-[#5E1924] cursor-pointer"
              >
                <option value="featured">Curated &bull; Featured</option>
                <option value="newest">Newest Releases</option>
                <option value="price-asc">Price: Low &rarr; High</option>
                <option value="price-desc">Price: High &rarr; Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            {/* Grid Toggle (Desktop) */}
            <div className="hidden sm:flex items-center border border-[#D8D2C5] rounded-xs bg-white">
              <button
                onClick={() => setGridColumns(2)}
                className={`p-1.5 transition-colors ${gridColumns === 2 ? 'bg-[#1A1917] text-white' : 'text-[#78746D]'}`}
                title="2 Columns (Editorial View)"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridColumns(3)}
                className={`p-1.5 transition-colors ${gridColumns === 3 ? 'bg-[#1A1917] text-white' : 'text-[#78746D]'}`}
                title="3 Columns (Catalog View)"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Layout (Sidebar + Product Grid) */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              selectedCategory={category}
              onSelectCategory={setCategory}
              selectedCollection={collection}
              onSelectCollection={setCollection}
              maxPrice={maxPrice}
              onPriceChange={setMaxPrice}
              selectedSizes={selectedSizes}
              onToggleSize={toggleSize}
              selectedColors={selectedColors}
              onToggleColor={toggleColor}
              inStockOnly={inStockOnly}
              onToggleInStock={() => setInStockOnly(!inStockOnly)}
              onResetFilters={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
            />
          </div>

          {/* Product Grid Area */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center bg-[#F7F4EE] border border-[#E8E3D8] rounded-xs px-6">
                <span className="font-serif text-3xl text-[#5E1924] italic block mb-2">
                  No matching silhouettes found
                </span>
                <p className="text-xs text-[#78746D] max-w-md mx-auto mb-6">
                  We could not find any pieces matching your current combination of filters. Try widening your price range or resetting attributes.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="py-2.5 px-6 bg-[#1A1917] text-white text-xs tracking-widest uppercase hover:bg-[#5E1924] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                className={`grid gap-6 sm:gap-8 ${
                  gridColumns === 2
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                }`}
              >
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={onSelectProduct}
                    onQuickView={onQuickView}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Mobile Filter Slide-Over Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-[#FBF9F5] h-full shadow-2xl p-6 overflow-y-auto border-l border-[#E8E3D8]">
            <div className="flex items-center justify-between pb-4 border-b border-[#E8E3D8] mb-6">
              <h3 className="font-serif text-lg font-medium text-[#1A1917]">
                Filters &amp; Refinements
              </h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-1">
                <X className="w-5 h-5 text-[#5C5852]" />
              </button>
            </div>

            <FilterSidebar
              selectedCategory={category}
              onSelectCategory={(c) => {
                setCategory(c);
                setIsMobileFilterOpen(false);
              }}
              selectedCollection={collection}
              onSelectCollection={(col) => {
                setCollection(col);
                setIsMobileFilterOpen(false);
              }}
              maxPrice={maxPrice}
              onPriceChange={setMaxPrice}
              selectedSizes={selectedSizes}
              onToggleSize={toggleSize}
              selectedColors={selectedColors}
              onToggleColor={toggleColor}
              inStockOnly={inStockOnly}
              onToggleInStock={() => setInStockOnly(!inStockOnly)}
              onResetFilters={handleResetFilters}
              hasActiveFilters={hasActiveFilters}
            />

            <div className="pt-6 mt-6 border-t border-[#E8E3D8]">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-[#1A1917] text-white text-xs font-semibold tracking-widest uppercase"
              >
                Apply &amp; View {filteredProducts.length} Pieces
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { RotateCcw, Check } from 'lucide-react';
import { ProductCategory } from '../../types/ecommerce';
import { useCurrency } from '../../context/CurrencyContext';

interface FilterSidebarProps {
  selectedCategory: ProductCategory;
  onSelectCategory: (category: ProductCategory) => void;
  selectedCollection: string;
  onSelectCollection: (col: string) => void;
  maxPrice: number;
  onPriceChange: (val: number) => void;
  selectedSizes: string[];
  onToggleSize: (size: string) => void;
  selectedColors: string[];
  onToggleColor: (color: string) => void;
  inStockOnly: boolean;
  onToggleInStock: () => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedCollection,
  onSelectCollection,
  maxPrice,
  onPriceChange,
  selectedSizes,
  onToggleSize,
  selectedColors,
  onToggleColor,
  inStockOnly,
  onToggleInStock,
  onResetFilters,
  hasActiveFilters
}) => {
  const { formatPrice } = useCurrency();

  const categories: { label: string; value: ProductCategory }[] = [
    { label: 'All Silhouettes', value: 'all' },
    { label: 'Tops & Silk', value: 'tops' },
    { label: 'Tailored Bottoms', value: 'bottoms' },
    { label: 'Coats & Outerwear', value: 'outerwear' },
    { label: 'Dresses', value: 'dresses' },
    { label: 'Leather Bags', value: 'bags' },
    { label: 'Sculpted Footwear', value: 'footwear' },
    { label: 'Accessories & Jewelry', value: 'accessories' }
  ];

  const collections = ['All Curations', 'Everyday Edit', 'Permanent Collection'];

  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'One Size', '38 EU', '39 EU', '40 EU'];

  const availableColors = [
    { name: 'Ivory / Ecru', hex: '#F7F4EE' },
    { name: 'Noir / Jet', hex: '#1C1B1A' },
    { name: 'Bordeaux', hex: '#581D23' },
    { name: 'Camel / Sand', hex: '#BA946E' },
    { name: 'Olive', hex: '#4B5244' },
    { name: 'Slate', hex: '#63686D' }
  ];

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 space-y-8 pr-0 lg:pr-6">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E8E3D8]">
        <h3 className="font-serif text-lg font-medium text-[#1A1917]">
          Refine Pieces
        </h3>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center gap-1 text-[11px] tracking-wider uppercase text-[#5E1924] hover:underline"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#78746D] font-medium">
          Category
        </h4>
        <div className="flex flex-col space-y-1.5">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onSelectCategory(cat.value)}
              className={`text-left text-xs tracking-wide py-1 transition-colors flex items-center justify-between ${
                selectedCategory === cat.value
                  ? 'text-[#5E1924] font-semibold'
                  : 'text-[#4A4742] hover:text-[#1A1917]'
              }`}
            >
              <span>{cat.label}</span>
              {selectedCategory === cat.value && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#5E1924]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Collection / Line */}
      <div className="space-y-3">
        <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#78746D] font-medium">
          Collection
        </h4>
        <div className="flex flex-col space-y-1.5">
          {collections.map((col) => (
            <button
              key={col}
              onClick={() => onSelectCollection(col === 'All Curations' ? '' : col)}
              className={`text-left text-xs tracking-wide py-1 transition-colors flex items-center justify-between ${
                (col === 'All Curations' && !selectedCollection) || selectedCollection === col
                  ? 'text-[#5E1924] font-semibold'
                  : 'text-[#4A4742] hover:text-[#1A1917]'
              }`}
            >
              <span>{col}</span>
              {((col === 'All Curations' && !selectedCollection) || selectedCollection === col) && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#5E1924]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price Slider */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-[11px] tracking-[0.2em] uppercase text-[#78746D] font-medium">
          <span>Max Price</span>
          <span className="font-sans font-semibold text-[#1A1917]">
            {formatPrice(maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min={1000}
          max={10000}
          step={200}
          value={maxPrice}
          onChange={(e) => onPriceChange(Number(e.target.value))}
          className="w-full accent-[#5E1924] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#8C877E]">
          <span>{formatPrice(1000)}</span>
          <span>{formatPrice(10000)}</span>
        </div>
      </div>

      {/* Size Badges */}
      <div className="space-y-3">
        <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#78746D] font-medium">
          Size
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {availableSizes.map((size) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => onToggleSize(size)}
                className={`py-1.5 px-3 text-[11px] tracking-wider uppercase border transition-all ${
                  isSelected
                    ? 'bg-[#1A1917] text-white border-[#1A1917]'
                    : 'bg-white text-[#4A4742] border-[#D8D2C5] hover:border-[#8C877E]'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Filter */}
      <div className="space-y-3">
        <h4 className="text-[11px] tracking-[0.2em] uppercase text-[#78746D] font-medium">
          Color Palette
        </h4>
        <div className="flex flex-wrap gap-2">
          {availableColors.map((color) => {
            const isSelected = selectedColors.includes(color.name);
            return (
              <button
                key={color.name}
                onClick={() => onToggleColor(color.name)}
                className={`w-7 h-7 rounded-full border relative flex items-center justify-center transition-all ${
                  isSelected
                    ? 'ring-2 ring-[#5E1924] ring-offset-2 border-[#1A1917]'
                    : 'border-[#D0C9BD] hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {isSelected && (
                  <Check className={`w-3.5 h-3.5 ${color.hex === '#F7F4EE' ? 'text-black' : 'text-white'}`} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stock Availability */}
      <div className="pt-2 border-t border-[#E8E3D8]">
        <label className="flex items-center gap-2.5 text-xs text-[#33312E] cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={onToggleInStock}
            className="accent-[#5E1924] rounded-sm"
          />
          <span>In-Stock Pieces Only</span>
        </label>
      </div>
    </aside>
  );
};

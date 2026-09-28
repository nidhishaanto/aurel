import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ProductCategory } from '../../types/ecommerce';

interface FeaturedCategoriesProps {
  onSelectCategory: (category: ProductCategory) => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ onSelectCategory }) => {
  const cards = [
    {
      category: 'tops' as ProductCategory,
      tagline: 'EVERYDAY SILHOUETTES',
      title: 'Sandwashed Silk & Poplin',
      description: 'Fluid 22mm mulberry silks with liquid necklines and Egyptian Giza cotton boyfriend shirts.',
      image: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=800&q=80',
      aspect: 'aspect-[3/4]'
    },
    {
      category: 'outerwear' as ProductCategory,
      tagline: 'PERMANENT ARCHIVE',
      title: 'Double-Faced Cashmere',
      description: 'Hand-rolled split seams in heavyweight virgin wool and Mongolian cashmere to endure decades.',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=800&q=80',
      aspect: 'aspect-[3/4]'
    },
    {
      category: 'bottoms' as ProductCategory,
      tagline: 'TAILORED EDIT',
      title: 'Architectural Trousers',
      description: 'Super 120s Italian wool pleats with an elongated rise designed for natural movement.',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
      aspect: 'aspect-[3/4]'
    },
    {
      category: 'bags' as ProductCategory,
      tagline: 'TUSCAN OBJECTS',
      title: 'Vegetable-Tanned Leather',
      description: 'Sculpted crescent and architectural tote forms with hand-brushed solid brass fixtures.',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      aspect: 'aspect-[3/4]'
    }
  ];

  return (
    <section className="py-20 bg-[#FBF9F5] border-b border-[#E8E3D8]">
      <div className="editorial-container">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#E8E3D8]">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#5E1924] block mb-2">
              The Curated Chapters
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1A1917] tracking-tight">
              The New Edit
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#78746D] max-w-sm mt-3 md:mt-0 font-normal leading-relaxed">
            Form follows feeling. Four foundational categories curated for seamless daily rotation.
          </p>
        </div>

        {/* 4 Large Editorial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card) => (
            <div
              key={card.category}
              onClick={() => onSelectCategory(card.category)}
              className="group cursor-pointer flex flex-col transition-all duration-300"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EFEAE1] border border-[#E2DBD0]">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-106"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
              </div>

              {/* Card Meta Content */}
              <div className="pt-4 flex flex-col flex-1">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#78746D] font-medium block">
                  {card.tagline}
                </span>

                <h3 className="font-serif text-xl font-medium text-[#1A1917] mt-1 group-hover:text-[#5E1924] transition-all duration-300 group-hover:translate-x-1">
                  {card.title}
                </h3>

                <p className="text-xs text-[#5C5852] mt-1.5 leading-relaxed line-clamp-2">
                  {card.description}
                </p>

                {/* Arrow link */}
                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase text-[#1A1917] group-hover:text-[#5E1924] transition-colors">
                  <span>Explore Silhouettes</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

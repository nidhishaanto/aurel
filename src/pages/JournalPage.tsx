import React from 'react';
import { ArrowRight } from 'lucide-react';
import { LOOKBOOK_STORIES } from '../data/lookbooks';
import { PRODUCTS } from '../data/products';

interface JournalPageProps {
  onSelectProduct: (productId: string) => void;
  onNavigateToShop: () => void;
}

export const JournalPage: React.FC<JournalPageProps> = ({
  onSelectProduct,
  onNavigateToShop
}) => {
  return (
    <div className="py-16 bg-[#FBF9F5] min-h-screen">
      <div className="editorial-container max-w-5xl">
        
        {/* Header */}
        <div className="text-center pb-12 mb-16 border-b border-[#E8E3D8]">
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5E1924] block mb-2">
            The Lookbook Ledger
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1A1917] font-light">
            The Aurel Journal
          </h1>
          <p className="text-xs sm:text-sm text-[#78746D] max-w-md mx-auto mt-4 tracking-wide">
            Visual essays, fabric provenance notes, and seasonal campaign narratives captured on film.
          </p>
        </div>

        {/* Stories list */}
        <div className="space-y-28">
          {LOOKBOOK_STORIES.map((story) => {
            const featuredProducts = PRODUCTS.filter((p) =>
              story.featuredProductIds.includes(p.id)
            );

            return (
              <article key={story.id} className="space-y-8">
                {/* Volume Eyebrow */}
                <div className="flex items-center justify-between border-b border-[#E8E3D8] pb-3 text-xs tracking-[0.2em] uppercase text-[#78746D]">
                  <span className="font-semibold text-[#5E1924]">{story.volume}</span>
                  <span>{story.date}</span>
                </div>

                {/* Title */}
                <div>
                  <h2 className="font-serif text-3xl sm:text-5xl text-[#1A1917] font-normal mb-2">
                    {story.title}
                  </h2>
                  <p className="font-serif text-lg sm:text-xl text-[#5C5852] italic max-w-2xl">
                    {story.subtitle}
                  </p>
                </div>

                {/* Hero Photo */}
                <div className="aspect-[16/10] w-full bg-[#EFEAE1] border border-[#E0D8CA] overflow-hidden shadow-md">
                  <img
                    src={story.heroImage}
                    alt={story.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Pull quote */}
                <blockquote className="border-l-2 border-[#5E1924] pl-6 py-2 my-8 font-serif text-xl sm:text-2xl text-[#1A1917] italic">
                  {story.quote}
                </blockquote>

                {/* Essay paragraphs + secondary image */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-7 space-y-4 text-xs sm:text-sm text-[#4A4742] leading-relaxed">
                    <p className="font-medium text-[#1A1917] text-sm sm:text-base">
                      {story.excerpt}
                    </p>
                    {story.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                  </div>

                  <div className="md:col-span-5 aspect-[3/4] bg-[#EFEAE1] border border-[#E0D8CA] overflow-hidden shadow-xs">
                    <img
                      src={story.secondaryImage}
                      alt="Campaign detail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Featured Silhouettes in Story */}
                {featuredProducts.length > 0 && (
                  <div className="pt-8 mt-8 border-t border-[#E8E3D8]">
                    <span className="text-[10px] tracking-[0.2em] uppercase text-[#78746D] font-semibold block mb-4">
                      Silhouettes Featured in {story.volume}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {featuredProducts.map((p) => (
                        <div
                          key={p.id}
                          onClick={() => onSelectProduct(p.id)}
                          className="flex items-center gap-3 p-3 bg-white border border-[#E8E3D8] hover:border-[#1A1917] cursor-pointer transition-all group"
                        >
                          <div className="w-12 h-16 bg-[#F4F0E8] overflow-hidden flex-shrink-0">
                            <img src={p.images[0]} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-serif text-sm text-[#1A1917] group-hover:text-[#5E1924] truncate">
                              {p.name}
                            </h4>
                            <span className="text-[11px] text-[#78746D]">
                              View Silhouette &rarr;
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="pt-20 text-center">
          <button
            onClick={onNavigateToShop}
            className="py-4 px-10 bg-[#1A1917] hover:bg-[#5E1924] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Explore All Pieces in Collection</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

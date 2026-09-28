import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onShopClick: () => void;
  onLookbookClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopClick,
  onLookbookClick
}) => {
  return (
    <section className="relative overflow-hidden bg-[#FBF9F5] border-b border-[#E8E3D8] pt-8 pb-16 lg:py-20">
      <div className="editorial-container">
        
        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Asymmetric Typography & Story */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1 z-10">
            
            {/* Eyebrow */}
            <div className="flex items-center gap-2 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
              <span className="w-6 h-[1px] bg-[#5E1924]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#5E1924] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                The Autumn / Winter Edit
              </span>
            </div>

            {/* Asymmetric Editorial Headline */}
            <h1 className="font-serif text-5xl sm:text-6xl xl:text-7xl font-light text-[#1A1917] tracking-tight leading-[1.05] mb-6">
              Made for<br />
              <span className="font-normal italic">the days</span><br />
              you remember.
            </h1>

            {/* Supporting Editorial Copy */}
            <p className="text-sm sm:text-base text-[#5C5852] font-normal leading-relaxed max-w-md mb-8">
              Thoughtfully designed pieces for everyday living. Sculpted from 22-momme sandwashed mulberry silk, tropical Italian virgin wool, and vegetable-tanned Tuscan calfskin.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onShopClick}
                className="py-4 px-8 bg-[#1A1917] hover:bg-[#5E1924] text-[#FBF9F5] text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-all duration-300 flex items-center justify-center gap-3 group shadow-sm cursor-pointer"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
              </button>

              <button
                onClick={onLookbookClick}
                className="py-4 px-6 border border-[#D5CEBF] hover:border-[#1A1917] text-[#2E2C29] text-xs tracking-[0.18em] uppercase rounded-xs transition-colors duration-200 cursor-pointer text-center"
              >
                Explore Volume IV
              </button>
            </div>

            {/* Small Spec / Details footer */}
            <div className="mt-12 pt-6 border-t border-[#E8E3D8] flex items-center justify-between text-[11px] tracking-widest uppercase text-[#8C877E]">
              <span>Small-Batch Atelier Craft</span>
              <span>100% Traceable Fibers</span>
            </div>
          </div>

          {/* Right Column: Large Editorial Photography */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative">
              
              {/* Main Photo Frame */}
              <div className="relative aspect-[4/5] sm:aspect-[16/13] lg:aspect-[4/5] w-full overflow-hidden bg-[#EFEAE1] border border-[#E0D8CA] shadow-xl group">
                <img
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=85"
                  alt="AUREL Autumn Winter Editorial Campaign"
                  className="w-full h-full object-cover object-top transition-transform duration-1000 ease-out group-hover:scale-102"
                />

                {/* Subtle vignette / overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />

                {/* Overlaid Editorial Caption */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white pointer-events-none">
                  <div>
                    <span className="text-[10px] tracking-[0.25em] uppercase text-white/80 block">
                      Campaign 04 &bull; Bretagne
                    </span>
                    <span className="font-serif text-lg tracking-wide">
                      Double-Breasted Coat in Camel Virgin Wool
                    </span>
                  </div>
                  <span className="text-[11px] tracking-widest uppercase text-white/90 underline pointer-events-auto cursor-pointer" onClick={onShopClick}>
                    View Piece
                  </span>
                </div>
              </div>

              {/* Floating Small Accent Frame */}
              <div className="hidden sm:block absolute -bottom-8 -left-8 w-44 aspect-[3/4] bg-[#F4F0E8] p-1.5 border border-[#DCD5C7] shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=600&q=80"
                  alt="Luna Draped Silk Detail"
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-2 left-2 text-[9px] tracking-widest uppercase bg-[#1A1917]/80 text-[#FBF9F5] px-1.5 py-0.5">
                  Luna Silk Top
                </span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

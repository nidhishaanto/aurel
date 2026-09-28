import React from 'react';
import { ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigateToShop: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToShop }) => {
  return (
    <div className="py-16 bg-[#FBF9F5] min-h-screen">
      <div className="editorial-container max-w-4xl">
        
        {/* Header */}
        <div className="text-center pb-12 mb-12 border-b border-[#E8E3D8]">
          <span className="text-[11px] font-semibold tracking-[0.3em] uppercase text-[#5E1924] block mb-2">
            The Atelier Story
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl text-[#1A1917] font-light leading-tight">
            Permanence, Drape, &amp;<br />
            <span className="italic font-normal">Conscious Materiality</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#78746D] max-w-md mx-auto mt-4 tracking-wide">
            Founded with an uncompromising belief that everyday garments should be designed as objects of lasting beauty.
          </p>
        </div>

        {/* Hero Studio Spread */}
        <div className="aspect-[16/9] w-full bg-[#EFEAE1] border border-[#E0D8CA] overflow-hidden mb-16 shadow-md">
          <img
            src="https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=1600&q=85"
            alt="Aurel Atelier Workshop"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Editorial Story Text */}
        <div className="space-y-10 text-[#4A4742] text-sm sm:text-base leading-relaxed">
          <section className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1917] font-normal">
              1. The Architecture of Restraint
            </h2>
            <p>
              In contemporary culture, fashion has been reduced to an endless cycle of disposable micro-trends and ephemeral visual stimulation. At AUREL, our practice is deliberate and slow. Every pattern begins with bodily movement: how a shoulder drops when entering a room, how double knife pleats release fabric during a stride, how heavy silk slides over skin without static cling.
            </p>
            <p>
              We design in our Milan studio on Via della Spiga, working directly with master tailors whose families have cut cloth for generations. A single prototype undergoes dozens of wear trials before entering our permanent archive.
            </p>
          </section>

          <blockquote className="border-l-2 border-[#5E1924] pl-6 py-2 italic font-serif text-xl sm:text-2xl text-[#1A1917]">
            &ldquo;When a seam is hand-rolled and natural fibers are allowed to breathe, clothing ceases to be superficial—it becomes an everyday sanctuary.&rdquo;
          </blockquote>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1917] font-normal">
              2. Sourcing Without Compromise
            </h2>
            <p>
              We maintain a strict zero-synthetics pledge across all ready-to-wear lines. You will never find polyester, acrylic, or petroleum-based elastane in an Aurel garment. Instead, we invest in raw materials of extraordinary integrity:
            </p>
            <ul className="space-y-2 pl-4 border-l border-[#D8D2C5] text-xs sm:text-sm text-[#5C5852]">
              <li><strong>Mulberry Silk (Como, Italy):</strong> 22 to 30 momme sandwashed charmeuse with natural liquid drape.</li>
              <li><strong>Virgin Tropical Wool (Biella, Italy):</strong> Super 120s four-season wool from regenerative sheep farms.</li>
              <li><strong>Egyptian Giza 87 Cotton:</strong> Extra-long staple fibers woven into crisp, architectural poplin.</li>
              <li><strong>Tuscan Calfskin:</strong> Full-grain leather vegetable-tanned with mimosa and chestnut bark extracts.</li>
            </ul>
          </section>

          {/* Two-photo editorial grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-10">
            <div className="aspect-[4/5] bg-[#EFEAE1] border border-[#E0D8CA] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80"
                alt="Fabric Detail"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[4/5] bg-[#EFEAE1] border border-[#E0D8CA] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&w=800&q=80"
                alt="Studio Draping"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <section className="space-y-4">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1917] font-normal">
              3. Lifetime Stitch Guarantee
            </h2>
            <p>
              Every Aurel garment is created to be repaired rather than discarded. We provide lifetime complimentary seam and button restoration across all our pieces. When you acquire an Aurel object, you acquire a permanent relationship with our studio artisans.
            </p>
          </section>

          {/* Bottom CTA */}
          <div className="pt-10 border-t border-[#E8E3D8] text-center">
            <button
              onClick={onNavigateToShop}
              className="py-4 px-10 bg-[#1A1917] hover:bg-[#5E1924] text-white text-xs font-semibold tracking-[0.2em] uppercase rounded-xs transition-colors inline-flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <span>Explore The Permanent Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface EditorialStoryProps {
  onLearnMore: () => void;
}

export const EditorialStory: React.FC<EditorialStoryProps> = ({ onLearnMore }) => {
  return (
    <section className="py-24 bg-[#F4F0E8] border-b border-[#E0D9CC] text-[#1A1917]">
      <div className="editorial-container">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Studio Narrative */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#5E1924]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#5E1924] flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                The Atelier Manifesto
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-light text-[#1A1917] leading-[1.12]">
              Permanence in a world<br />
              <span className="font-normal italic">of transient</span> velocity.
            </h2>

            <p className="text-sm sm:text-base text-[#4A4742] leading-relaxed font-normal">
              AUREL was founded on a singular conviction: that the clothes we wear every day should outlast seasons, micro-trends, and ephemeral algorithms. We work solely with regenerative, unblended natural fibers—long-staple Egyptian cotton, heavy mulberry silk, and untamed virgin wool.
            </p>

            <blockquote className="border-l-2 border-[#5E1924] pl-4 py-1 italic font-serif text-lg text-[#33312E]">
              &ldquo;When a seam is hand-turned and tension is balanced, a garment ceases to be mere fabric; it becomes an everyday sanctuary.&rdquo;
            </blockquote>

            <div className="pt-4">
              <button
                onClick={onLearnMore}
                className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-[#1A1917] hover:text-[#5E1924] transition-colors group"
              >
                <span>Read The Studio Manifesto &amp; Traceability Report</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Right Column: Editorial Visual Spread */}
          <div className="lg:col-span-6">
            <div className="relative">
              <div className="aspect-[4/5] w-full overflow-hidden bg-[#EAE4D8] border border-[#D5CEBF] shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80"
                  alt="Aurel Atelier Draped Silhouette"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Floating caption card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-[#FBF9F5] p-5 border border-[#DCD5C7] shadow-xl max-w-xs hidden sm:block">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#78746D] block mb-1">
                  Atelier Como &bull; Lot No. 04
                </span>
                <p className="font-serif text-sm text-[#1A1917]">
                  &ldquo;Bias-cut silk requires forty-five minutes of hand-smoothing per panel to ensure natural drop.&rdquo;
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* 4 Pillars of Craft */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 mt-16 border-t border-[#DCD5C7]">
          <div>
            <span className="font-serif text-2xl text-[#5E1924] block mb-1 font-semibold">01</span>
            <h4 className="text-xs tracking-wider uppercase font-semibold text-[#1A1917] mb-1">
              Zero Synthetics
            </h4>
            <p className="text-xs text-[#6B665E] leading-relaxed">
              100% natural, biodegradable fibers. No polyester blends, acrylics, or synthetic coatings.
            </p>
          </div>

          <div>
            <span className="font-serif text-2xl text-[#5E1924] block mb-1 font-semibold">02</span>
            <h4 className="text-xs tracking-wider uppercase font-semibold text-[#1A1917] mb-1">
              Small-Batch Runs
            </h4>
            <p className="text-xs text-[#6B665E] leading-relaxed">
              Limited numbered production runs to prevent excess inventory and respect artisans.
            </p>
          </div>

          <div>
            <span className="font-serif text-2xl text-[#5E1924] block mb-1 font-semibold">03</span>
            <h4 className="text-xs tracking-wider uppercase font-semibold text-[#1A1917] mb-1">
              Lifetime Care
            </h4>
            <p className="text-xs text-[#6B665E] leading-relaxed">
              Complimentary seam restoration and button replacement services for the lifetime of each piece.
            </p>
          </div>

          <div>
            <span className="font-serif text-2xl text-[#5E1924] block mb-1 font-semibold">04</span>
            <h4 className="text-xs tracking-wider uppercase font-semibold text-[#1A1917] mb-1">
              Plastic-Free Pack
            </h4>
            <p className="text-xs text-[#6B665E] leading-relaxed">
              Packaged exclusively in unbleached organic cotton dustbags and recycled paper mailers.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

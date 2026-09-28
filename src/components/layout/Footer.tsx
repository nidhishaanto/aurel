import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, param?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setIsSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#1A1917] text-[#EDE7DC] pt-16 pb-12 border-t border-[#33312E]">
      <div className="editorial-container">
        
        {/* Brand Statement / Manifesto */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-[#33312E]">
          <div className="lg:col-span-6 space-y-4">
            <span className="font-serif text-3xl sm:text-4xl tracking-[0.25em] text-[#FBF9F5] font-semibold block">
              AUREL
            </span>
            <p className="font-serif text-xl sm:text-2xl text-[#C5BEB3] max-w-lg leading-relaxed italic">
              &ldquo;Objects you&rsquo;ll want to keep. Thoughtfully designed pieces for everyday living and quiet permanence.&rdquo;
            </p>
            <p className="text-xs text-[#8C877E] max-w-md leading-relaxed tracking-wide">
              Crafted in small, audited ateliers across Como, Biella, and Florence using certified organic and regenerative natural fibers.
            </p>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#D8D2C5] font-medium mb-2">
                The Aurel Gazette
              </p>
              <p className="text-xs text-[#8C877E] mb-4">
                Receive private invitations to seasonal archives, studio dispatches, and private trunk shows.
              </p>

              {isSubscribed ? (
                <div className="p-3 bg-[#2A2926] border border-[#5E1924] text-xs text-[#FBF9F5] flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#A84855]" />
                  <span>Welcome to the Aurel Gazette. Your confirmation has been dispatched.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-0 border-b border-[#5C5852] pb-1">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="bg-transparent flex-1 text-sm text-[#FBF9F5] placeholder:text-[#6E6A62] outline-none font-sans"
                  />
                  <button
                    type="submit"
                    className="text-xs tracking-widest uppercase text-[#FBF9F5] hover:text-[#D4AF37] px-3 py-1 flex items-center gap-1 transition-colors"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            <div className="pt-6 flex flex-wrap gap-6 text-[11px] tracking-widest uppercase text-[#78746D]">
              <span>Milan &bull; Paris &bull; Kyoto</span>
              <span>Plastic-Free Certified</span>
              <span>100% Traceable Fibers</span>
            </div>
          </div>
        </div>

        {/* Links Navigation Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[#33312E] text-xs">
          {/* Column 1: Collections */}
          <div className="space-y-3">
            <h4 className="tracking-[0.2em] uppercase text-[#D8D2C5] font-medium">
              Curations
            </h4>
            <ul className="space-y-2 text-[#9C968B]">
              <li>
                <button onClick={() => onNavigate('shop', 'new')} className="hover:text-white transition-colors">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'tops')} className="hover:text-white transition-colors">
                  Sandwashed Silk &amp; Tops
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'bottoms')} className="hover:text-white transition-colors">
                  Tailored Virgin Wool
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'outerwear')} className="hover:text-white transition-colors">
                  Cashmere Coats &amp; Outerwear
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'bags')} className="hover:text-white transition-colors">
                  Tuscan Leather Bags
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('shop', 'all')} className="hover:text-white transition-colors">
                  Permanent Collection
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Customer Care */}
          <div className="space-y-3">
            <h4 className="tracking-[0.2em] uppercase text-[#D8D2C5] font-medium">
              Client Services
            </h4>
            <ul className="space-y-2 text-[#9C968B]">
              <li>
                <span className="cursor-default hover:text-white transition-colors">
                  Complimentary Delivery
                </span>
              </li>
              <li>
                <span className="cursor-default hover:text-white transition-colors">
                  30-Day Effortless Returns
                </span>
              </li>
              <li>
                <span className="cursor-default hover:text-white transition-colors">
                  Garment Repair &amp; Care
                </span>
              </li>
              <li>
                <span className="cursor-default hover:text-white transition-colors">
                  Private Styling Consultation
                </span>
              </li>
              <li>
                <span className="cursor-default hover:text-white transition-colors">
                  Traceability Ledger
                </span>
              </li>
            </ul>
          </div>

          {/* Column 3: The Atelier */}
          <div className="space-y-3">
            <h4 className="tracking-[0.2em] uppercase text-[#D8D2C5] font-medium">
              The Atelier
            </h4>
            <ul className="space-y-2 text-[#9C968B]">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Our Philosophy &amp; Craft
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('journal')} className="hover:text-white transition-colors">
                  The Journal &amp; Lookbooks
                </button>
              </li>
              <li>
                <span className="cursor-default hover:text-white transition-colors">
                  Regenerative Mills
                </span>
              </li>
              <li>
                <span className="cursor-default hover:text-white transition-colors">
                  Studio Appointments
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Boutiques */}
          <div className="space-y-3">
            <h4 className="tracking-[0.2em] uppercase text-[#D8D2C5] font-medium">
              Sanctuaries
            </h4>
            <p className="text-[#9C968B] leading-relaxed">
              Via della Spiga, 14<br />
              20121 Milano MI, Italy<br />
              <span className="text-[#6E6A62]">client@aurel-atelier.com</span>
            </p>
            <p className="text-[#9C968B] leading-relaxed pt-1">
              Rue Saint-Honoré, 224<br />
              75001 Paris, France
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#6E6A62]">
          <div>
            &copy; {new Date().getFullYear()} AUREL STUDIO. All rights reserved. Handcrafted with reverence.
          </div>
          <div className="flex gap-6">
            <span className="hover:text-[#9C968B] cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#9C968B] cursor-pointer">Terms of Service</span>
            <span className="hover:text-[#9C968B] cursor-pointer">Accessibility</span>
            <span className="hover:text-[#9C968B] cursor-pointer">Sitemap</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

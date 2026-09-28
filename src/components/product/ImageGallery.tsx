import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, productName }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const nextImage = () => setActiveIdx((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveIdx((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails list */}
      <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[640px] flex-shrink-0 py-1">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIdx(idx)}
            className={`w-16 h-22 sm:w-20 sm:h-26 flex-shrink-0 overflow-hidden border transition-all ${
              activeIdx === idx
                ? 'border-[#5E1924] ring-1 ring-[#5E1924] opacity-100'
                : 'border-[#E2DBD0] opacity-60 hover:opacity-100'
            }`}
            aria-label={`View photo ${idx + 1}`}
          >
            <img src={img} alt="" className="w-full h-full object-cover object-center" />
          </button>
        ))}
      </div>

      {/* Main Image View with Zoom on Hover */}
      <div className="relative flex-1 aspect-[3/4] bg-[#F4F0E8] overflow-hidden border border-[#E8E3D8] group">
        <div
          className="w-full h-full cursor-zoom-in"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setIsLightboxOpen(true)}
        >
          <img
            src={images[activeIdx] || images[0]}
            alt={productName}
            className={`w-full h-full object-cover object-center transition-transform duration-200 ${
              isZoomed ? 'scale-175' : 'scale-100'
            }`}
            style={
              isZoomed
                ? { transformOrigin: `${mousePos.x}% ${mousePos.y}%` }
                : undefined
            }
          />
        </div>

        {/* Expand / Lightbox Trigger */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-4 right-4 p-2.5 bg-white/80 hover:bg-white text-[#1A1917] rounded-full shadow-md backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
          aria-label="Expand image fullscreen"
        >
          <Maximize2 className="w-4 h-4 stroke-[1.5]" />
        </button>

        {/* Mobile Navigation Arrows */}
        {images.length > 1 && (
          <div className="lg:hidden absolute inset-y-0 inset-x-2 flex items-center justify-between pointer-events-none">
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="p-2 bg-white/80 rounded-full shadow pointer-events-auto text-[#1A1917]"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="p-2 bg-white/80 rounded-full shadow pointer-events-auto text-[#1A1917]"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Image Counter indicator */}
        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm text-[10px] tracking-widest uppercase font-medium px-2 py-1 text-[#2E2C29]">
          {activeIdx + 1} / {images.length}
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-[#1A1917]/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors"
            aria-label="Close fullscreen view"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="max-w-4xl max-h-[85vh] overflow-hidden">
            <img
              src={images[activeIdx]}
              alt={productName}
              className="w-full h-full object-contain max-h-[85vh]"
            />
          </div>

          <button
            onClick={nextImage}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white bg-white/10 rounded-full transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-xs tracking-widest uppercase font-medium">
            {productName} &bull; Image {activeIdx + 1} of {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

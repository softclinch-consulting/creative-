import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import type { GalleryItem } from '../../types/resort';
import { soundEngine } from '../../utils/soundEngine';

interface GalleryLightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const GalleryLightboxModal: React.FC<GalleryLightboxModalProps> = ({
  item,
  onClose,
  onNext,
  onPrev
}) => {
  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        onNext();
      } else if (e.key === 'ArrowLeft') {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, onClose, onNext, onPrev]);

  if (!item) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/95 backdrop-blur-2xl animate-fade-in select-none"
      onClick={onClose}
    >
      {/* Top Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/10 text-neutral-300 hover:text-white hover:bg-white/20 transition-colors"
        aria-label="Close lightbox"
      >
        <X size={22} />
      </button>

      {/* Navigation Arrows */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          soundEngine.playSubtleTick();
          onPrev();
        }}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full glass-panel-luxury text-white hover:text-[#C5A880] transition-colors"
        aria-label="Previous image"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          soundEngine.playSubtleTick();
          onNext();
        }}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 p-3.5 rounded-full glass-panel-luxury text-white hover:text-[#C5A880] transition-colors"
        aria-label="Next image"
      >
        <ChevronRight size={24} />
      </button>

      {/* Main Image Stage */}
      <div
        className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={item.image}
          alt={item.title}
          className="max-h-[70vh] w-auto max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
        />

        {/* Caption Card */}
        <div className="mt-5 text-center max-w-2xl px-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-tech text-[#C5A880] mb-1">
            <MapPin size={12} />
            <span>{item.location}</span>
          </div>
          <h3 className="font-editorial text-2xl text-white font-normal mb-1">
            {item.title}
          </h3>
          <p className="text-xs text-neutral-300 font-light">
            {item.caption}
          </p>
        </div>
      </div>
    </div>
  );
};

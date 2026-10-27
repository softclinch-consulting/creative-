import React, { useState } from 'react';
import { Camera, Eye, MapPin } from 'lucide-react';
import { GALLERY_ITEMS } from '../../data/resortData';
import type { GalleryItem } from '../../types/resort';
import { GalleryLightboxModal } from './GalleryLightboxModal';
import { soundEngine } from '../../utils/soundEngine';

export const EditorialGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Villas', 'Atoll & Aerial', 'Gastronomy', 'Wellness'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const handleNext = () => {
    if (!activeItem) return;
    const currIdx = GALLERY_ITEMS.findIndex(g => g.id === activeItem.id);
    const nextIdx = (currIdx + 1) % GALLERY_ITEMS.length;
    setActiveItem(GALLERY_ITEMS[nextIdx]);
  };

  const handlePrev = () => {
    if (!activeItem) return;
    const currIdx = GALLERY_ITEMS.findIndex(g => g.id === activeItem.id);
    const prevIdx = (currIdx - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setActiveItem(GALLERY_ITEMS[prevIdx]);
  };

  return (
    <section id="gallery" className="relative py-28 md:py-36 bg-[#08090C] text-[#EDE8DF] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-[11px] font-tech text-[#C5A880] tracking-[0.25em] uppercase mb-4">
              <Camera size={12} />
              <span>VISUAL ARCHIVE</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-white">
              The Atmospheric <br />
              <span className="italic font-light gold-text-gradient">Chronicles.</span>
            </h2>
          </div>

          <p className="font-sans-clean text-neutral-400 text-sm md:text-base max-w-md font-light leading-relaxed">
            A visual documentation of changing tides, equatorial golden hours, and moments of uninterrupted stillness.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 border-b border-white/5">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  soundEngine.playSubtleTick();
                  setSelectedCategory(cat);
                }}
                className={`px-5 py-2.5 rounded-full text-xs font-tech tracking-wider uppercase transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#C5A880] text-[#08090C] font-bold shadow-lg shadow-[#C5A880]/20'
                    : 'glass-panel-subtle text-neutral-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                soundEngine.playSubtleTick();
                setActiveItem(item);
              }}
              className={`group relative rounded-2xl overflow-hidden glass-panel-luxury border border-white/5 cursor-pointer glass-panel-hover aspect-[4/5]`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Hover inspect badge */}
              <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full glass-panel-luxury flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye size={14} />
              </div>

              {/* Title & Location Footer */}
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <span className="text-[10px] font-tech text-[#C5A880] tracking-wider uppercase flex items-center gap-1 mb-1">
                  <MapPin size={10} />
                  {item.location}
                </span>
                <h3 className="font-editorial text-lg text-white font-normal leading-tight group-hover:text-[#C5A880] transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <GalleryLightboxModal
        item={activeItem}
        onClose={() => setActiveItem(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </section>
  );
};

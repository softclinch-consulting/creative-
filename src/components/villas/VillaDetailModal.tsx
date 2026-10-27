import React, { useState } from 'react';
import { X, Check, Calendar, ArrowRight, Maximize2, Users, Bed, Bath, Droplets, Compass } from 'lucide-react';
import type { VillaSuite } from '../../types/resort';
import { formatPrice } from '../../utils/formatters';
import { soundEngine } from '../../utils/soundEngine';

interface VillaDetailModalProps {
  villa: VillaSuite | null;
  onClose: () => void;
  onBookVilla: (villaId: string) => void;
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY';
}

export const VillaDetailModal: React.FC<VillaDetailModalProps> = ({
  villa,
  onClose,
  onBookVilla,
  currency
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!villa) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-xl animate-fade-in">
      <div 
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0E1015] border border-[#C5A880]/30 shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => {
            soundEngine.playSubtleTick();
            onClose();
          }}
          className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-black/60 text-neutral-300 hover:text-white hover:bg-black/90 transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Hero Imagery & Gallery Carousel */}
        <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-black">
          <img
            src={villa.gallery[activeImageIndex] || villa.heroImage}
            alt={villa.name}
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E1015] via-transparent to-black/40" />

          {/* Category Tag */}
          <div className="absolute top-6 left-6 z-10 px-3.5 py-1.5 rounded-full glass-panel-luxury text-xs font-tech text-[#C5A880] tracking-widest uppercase">
            {villa.category} RESIDENCE
          </div>

          {/* Thumbnail Strip */}
          <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center gap-2 overflow-x-auto pb-1">
            {villa.gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  soundEngine.playSubtleTick();
                  setActiveImageIndex(idx);
                }}
                className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                  activeImageIndex === idx ? 'border-[#C5A880] scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-10 flex-1 flex flex-col justify-between">
          <div>
            
            {/* Title & Price Header */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6 pb-6 border-b border-white/10">
              <div>
                <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal mb-1">
                  {villa.name}
                </h3>
                <p className="font-editorial italic text-lg text-[#C5A880]">
                  {villa.tagline}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="font-tech text-xs text-neutral-400 block mb-0.5">FROM</span>
                <span className="font-cinzel text-2xl sm:text-3xl text-white font-semibold">
                  {formatPrice(villa.pricePerNightUSD, currency)}
                </span>
                <span className="text-xs text-neutral-400"> / night</span>
              </div>
            </div>

            {/* Core Architectural Specifications */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="glass-panel-subtle p-3.5 rounded-xl flex items-center gap-3">
                <Maximize2 size={18} className="text-[#C5A880]" />
                <div>
                  <div className="text-[10px] font-tech text-neutral-400 uppercase">INTERNAL AREA</div>
                  <div className="text-sm font-semibold text-white">{villa.sqm} m² ({villa.sqft} sq ft)</div>
                </div>
              </div>

              <div className="glass-panel-subtle p-3.5 rounded-xl flex items-center gap-3">
                <Users size={18} className="text-[#C5A880]" />
                <div>
                  <div className="text-[10px] font-tech text-neutral-400 uppercase">OCCUPANCY</div>
                  <div className="text-sm font-semibold text-white">Up to {villa.maxGuests} Guests</div>
                </div>
              </div>

              <div className="glass-panel-subtle p-3.5 rounded-xl flex items-center gap-3">
                <Bed size={18} className="text-[#C5A880]" />
                <div>
                  <div className="text-[10px] font-tech text-neutral-400 uppercase">BEDROOMS</div>
                  <div className="text-sm font-semibold text-white">{villa.bedrooms} Master Suite{villa.bedrooms > 1 ? 's' : ''}</div>
                </div>
              </div>

              <div className="glass-panel-subtle p-3.5 rounded-xl flex items-center gap-3">
                <Droplets size={18} className="text-[#C5A880]" />
                <div>
                  <div className="text-[10px] font-tech text-neutral-400 uppercase">POOL TYPE</div>
                  <div className="text-sm font-semibold text-white">{villa.poolType.split(' ')[0]} Pool</div>
                </div>
              </div>
            </div>

            {/* Spatial Layout Description */}
            <div className="mb-8">
              <h4 className="font-tech text-xs tracking-widest text-[#C5A880] uppercase mb-2">
                SPATIAL CONFIGURATION & ORIENTATION
              </h4>
              <p className="text-sm text-neutral-300 font-light leading-relaxed mb-4">
                {villa.floorPlanDetails}
              </p>
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Compass size={14} className="text-[#C5A880]" />
                <span>Orientation: {villa.view}</span>
              </div>
            </div>

            {/* Architectural Highlights & Signature Amenities */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 pt-6 border-t border-white/10">
              <div>
                <h4 className="font-tech text-xs tracking-widest text-[#C5A880] uppercase mb-4">
                  ARCHITECTURAL FEATURES
                </h4>
                <ul className="space-y-2.5">
                  {villa.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] mt-1.5 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-tech text-xs tracking-widest text-[#C5A880] uppercase mb-4">
                  EXCLUSIVE RESIDENCE SERVICES
                </h4>
                <ul className="space-y-2.5">
                  {villa.amenities.map((amenity, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300">
                      <Check size={14} className="text-emerald-400 mt-0.5 flex-shrink-0" />
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

          {/* Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
            <div className="text-xs text-neutral-400 font-tech">
              * Rates include gourmet breakfast, seaplane transfers & butler service.
            </div>
            
            <button
              onClick={() => {
                soundEngine.playHarmonicChime();
                onBookVilla(villa.id);
                onClose();
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#C5A880] text-[#08090C] text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#D9C19D] shadow-xl shadow-[#C5A880]/30 transition-all"
            >
              <Calendar size={15} />
              <span>Reserve This Residence</span>
              <ArrowRight size={15} />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

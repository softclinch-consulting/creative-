import React, { useState } from 'react';
import { Sparkles, Maximize2, Users, Bed, ArrowRight, Eye, Calendar } from 'lucide-react';
import { VILLA_SUITES } from '../../data/resortData';
import type { VillaSuite } from '../../types/resort';
import { formatPrice } from '../../utils/formatters';
import { VillaDetailModal } from './VillaDetailModal';
import { soundEngine } from '../../utils/soundEngine';

interface VillaSuitesSectionProps {
  onOpenBookingModal: (preselectedVillaId?: string) => void;
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY';
}

export const VillaSuitesSection: React.FC<VillaSuitesSectionProps> = ({
  onOpenBookingModal,
  currency
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeVillaForModal, setActiveVillaForModal] = useState<VillaSuite | null>(null);

  const categories = ['All', 'Overwater', 'Cliffside', 'Beachfront', 'Presidential'];

  const filteredVillas = selectedCategory === 'All'
    ? VILLA_SUITES
    : VILLA_SUITES.filter(v => v.category === selectedCategory);

  return (
    <section id="villas" className="relative py-28 md:py-36 bg-[#08090C] text-[#EDE8DF]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-[11px] font-tech text-[#C5A880] tracking-[0.25em] uppercase mb-4">
              <Sparkles size={12} />
              <span>ACCOMMODATION PORTFOLIO</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-white">
              Twenty-Four Private <br />
              <span className="italic font-light gold-text-gradient">Ocean Sanctuaries.</span>
            </h2>
          </div>

          <p className="font-sans-clean text-neutral-400 text-sm md:text-base max-w-md font-light leading-relaxed">
            Each villa is an isolated architectural pavilion sculpted with native teak, basalt volcanic stone, and expansive horizon glass.
          </p>
        </div>

        {/* Category Filter Tabs */}
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
                    : 'glass-panel-subtle text-neutral-300 hover:text-white hover:border-[#C5A880]/40'
                }`}
              >
                {cat === 'All' ? 'All Residences (24)' : `${cat} Pavilions`}
              </button>
            );
          })}
        </div>

        {/* Villa Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {filteredVillas.map((villa) => (
            <div
              key={villa.id}
              className="group rounded-3xl overflow-hidden glass-panel-luxury border border-white/5 flex flex-col justify-between glass-panel-hover"
            >
              {/* Image Preview with Hover Zoom */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-black/40">
                <img
                  src={villa.heroImage}
                  alt={villa.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1015] via-transparent to-black/30" />

                {/* Category & Status Badges */}
                <div className="absolute top-5 left-5 z-10 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full glass-panel-subtle text-[10px] font-tech text-[#C5A880] tracking-widest uppercase">
                    {villa.category}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[10px] font-tech text-emerald-400 tracking-wider">
                    AVAILABLE
                  </span>
                </div>

                {/* Quick Inspect Button on Hover */}
                <button
                  onClick={() => {
                    soundEngine.playSubtleTick();
                    setActiveVillaForModal(villa);
                  }}
                  className="absolute bottom-5 right-5 z-10 flex items-center gap-2 px-4 py-2 rounded-full glass-panel-luxury text-xs font-tech text-white hover:border-[#C5A880] hover:text-[#C5A880] transition-all opacity-90 group-hover:opacity-100"
                  title="Inspect Spatial Details"
                >
                  <Eye size={13} />
                  <span>Inspect Plan</span>
                </button>
              </div>

              {/* Villa Information */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="font-editorial text-2xl sm:text-3xl text-white font-normal group-hover:text-[#C5A880] transition-colors">
                      {villa.name}
                    </h3>
                  </div>

                  <p className="font-editorial italic text-base text-[#D9C19D] mb-4">
                    {villa.tagline}
                  </p>

                  {/* Spec Icons */}
                  <div className="grid grid-cols-3 gap-3 py-3 border-y border-white/5 mb-6 text-xs text-neutral-300 font-tech">
                    <div className="flex items-center gap-1.5">
                      <Maximize2 size={13} className="text-[#C5A880]" />
                      <span>{villa.sqm} m²</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={13} className="text-[#C5A880]" />
                      <span>{villa.maxGuests} Guests</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Bed size={13} className="text-[#C5A880]" />
                      <span>{villa.bedrooms} Master Wing{villa.bedrooms > 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  {/* Feature Highlights */}
                  <div className="space-y-1.5 mb-6">
                    {villa.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-neutral-400">
                        <span className="w-1 h-1 rounded-full bg-[#C5A880]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price & Action Row */}
                <div className="flex items-center justify-between pt-6 border-t border-white/10">
                  <div>
                    <span className="font-tech text-[10px] text-neutral-500 uppercase block">FROM</span>
                    <span className="font-cinzel text-xl sm:text-2xl text-white font-semibold">
                      {formatPrice(villa.pricePerNightUSD, currency)}
                    </span>
                    <span className="text-xs text-neutral-400 font-tech"> / night</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        soundEngine.playSubtleTick();
                        setActiveVillaForModal(villa);
                      }}
                      className="p-3 rounded-full glass-panel-subtle text-neutral-300 hover:text-white hover:border-white/30 transition-all"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      onClick={() => {
                        soundEngine.playHarmonicChime();
                        onOpenBookingModal(villa.id);
                      }}
                      className="flex items-center gap-2 px-5 py-3 rounded-full bg-[#C5A880] text-[#08090C] text-xs font-bold tracking-widest uppercase hover:bg-[#D9C19D] transition-all shadow-md"
                    >
                      <span>Reserve</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Villa Detail Lightbox Modal */}
      <VillaDetailModal
        villa={activeVillaForModal}
        onClose={() => setActiveVillaForModal(null)}
        onBookVilla={(vId) => onOpenBookingModal(vId)}
        currency={currency}
      />
    </section>
  );
};

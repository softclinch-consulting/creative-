import React from 'react';
import { Utensils, Wine, Clock, Award, Sparkles, ArrowRight } from 'lucide-react';
import { DINING_VENUES } from '../../data/resortData';
import { soundEngine } from '../../utils/soundEngine';

interface DiningSanctuaryProps {
  onReserveTable: () => void;
}

export const DiningSanctuary: React.FC<DiningSanctuaryProps> = ({ onReserveTable }) => {
  return (
    <section id="dining" className="relative py-28 md:py-36 bg-[#08090C] text-[#EDE8DF] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-[11px] font-tech text-[#C5A880] tracking-[0.25em] uppercase mb-6">
            <Award size={12} />
            <span>MICHELIN-STARRED GASTRONOMY</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-white mb-6">
            Culinary Odyssey <br />
            <span className="italic font-light gold-text-gradient">From Tide to Table.</span>
          </h2>

          <p className="font-sans-clean text-neutral-300 text-sm md:text-base font-light leading-relaxed">
            Three distinctive culinary ateliers. From open-air reef tasting pavilions to a submerged underwater wine vault five meters beneath the Indian Ocean.
          </p>
        </div>

        {/* Dining Venues Stack */}
        <div className="space-y-16">
          {DINING_VENUES.map((venue, idx) => {
            const isReversed = idx % 2 === 1;
            return (
              <div
                key={venue.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center rounded-3xl overflow-hidden glass-panel-luxury border border-white/5 p-6 sm:p-10 ${
                  isReversed ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Image Column */}
                <div className={`lg:col-span-6 relative h-80 sm:h-96 rounded-2xl overflow-hidden bg-black/40 ${
                  isReversed ? 'lg:order-2' : 'lg:order-1'
                }`}>
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Accolade Badge */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full glass-panel-luxury text-[10px] font-tech text-[#C5A880] tracking-wider uppercase flex items-center gap-1.5">
                    <Sparkles size={11} />
                    <span>{venue.accolade}</span>
                  </div>
                </div>

                {/* Details Column */}
                <div className={`lg:col-span-6 flex flex-col justify-between ${
                  isReversed ? 'lg:order-1' : 'lg:order-2'
                }`}>
                  <div>
                    <span className="font-tech text-xs tracking-widest text-[#A99D8D] uppercase block mb-1">
                      {venue.cuisine}
                    </span>
                    <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal mb-2">
                      {venue.name}
                    </h3>
                    <div className="text-xs font-serif italic text-[#C5A880] mb-6">
                      Directed by {venue.chef}
                    </div>

                    <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                      {venue.description}
                    </p>

                    {/* Dish & Wine Details */}
                    <div className="space-y-3 p-4 rounded-2xl glass-panel-subtle mb-6 border border-white/5">
                      <div className="flex items-start gap-3">
                        <Utensils size={15} className="text-[#C5A880] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-[10px] font-tech text-neutral-400 uppercase block">SIGNATURE CREATION</span>
                          <span className="text-xs text-white font-medium">{venue.signatureDish}</span>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Wine size={15} className="text-[#C5A880] mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-[10px] font-tech text-neutral-400 uppercase block">SOMMELIER HIGHLIGHT</span>
                          <span className="text-xs text-white font-medium">{venue.sommelierHighlight}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-2 text-xs font-tech text-neutral-400">
                      <Clock size={13} className="text-[#C5A880]" />
                      <span>{venue.timings}</span>
                    </div>

                    <button
                      onClick={() => {
                        soundEngine.playHarmonicChime();
                        onReserveTable();
                      }}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C5A880] text-[#08090C] text-xs font-bold tracking-widest uppercase hover:bg-[#D9C19D] transition-all"
                    >
                      <span>Reserve Table</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

import React from 'react';
import { Compass, Waves, Sun, Sparkles, Feather } from 'lucide-react';

export const EditorialStory: React.FC = () => {
  return (
    <section id="arrival-story" className="relative py-28 md:py-36 bg-[#08090C] text-[#EDE8DF] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-[11px] font-tech text-[#C5A880] tracking-[0.25em] uppercase mb-6">
            <Feather size={12} />
            <span>THE ARCHITECTURAL MANIFESTO</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-white leading-tight mb-6">
            Where Stillness Becomes <br />
            <span className="italic font-light gold-text-gradient">The Ultimate Luxury.</span>
          </h2>

          <p className="font-sans-clean text-base md:text-lg text-neutral-300 font-light leading-relaxed">
            Aurelia was conceived not as a standard hotel, but as a living coastal sanctuary. Suspended delicately across an uninhabited barrier atoll, each space is sculpted to celebrate the quiet majesty of ocean currents, shifting sunlight, and total seclusion.
          </p>
        </div>

        {/* 3 Editorial Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-24">
          
          {/* Pillar 01 */}
          <div className="glass-panel-luxury p-8 md:p-10 rounded-2xl border border-white/5 flex flex-col justify-between glass-panel-hover group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#C5A880]/10 flex items-center justify-center text-[#C5A880] mb-8 group-hover:bg-[#C5A880] group-hover:text-[#08090C] transition-colors">
                <Waves size={24} />
              </div>
              <span className="font-tech text-xs tracking-widest text-[#A99D8D] uppercase block mb-2">
                01 // BIOPHILIC ARCHITECTURE
              </span>
              <h3 className="font-editorial text-2xl md:text-3xl text-white font-normal mb-4">
                Harmonic Coral Alignment
              </h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                Constructed on deep micro-pilings that allow natural tidal currents to flow freely beneath every villa, nurturing native manta ray and sea turtle feeding corridors.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/10 font-tech text-[11px] text-[#C5A880] tracking-wider">
              ZERO BENTHIC IMPACT CERTIFIED
            </div>
          </div>

          {/* Pillar 02 */}
          <div className="glass-panel-luxury p-8 md:p-10 rounded-2xl border border-white/5 flex flex-col justify-between glass-panel-hover group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#C5A880]/10 flex items-center justify-center text-[#C5A880] mb-8 group-hover:bg-[#C5A880] group-hover:text-[#08090C] transition-colors">
                <Sun size={24} />
              </div>
              <span className="font-tech text-xs tracking-widest text-[#A99D8D] uppercase block mb-2">
                02 // SENSORY SECLUSION
              </span>
              <h3 className="font-editorial text-2xl md:text-3xl text-white font-normal mb-4">
                Dissolving Horizons
              </h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                Motorized acoustic-grade glass panels slide silently into hidden wall pockets, transforming your living room into an open-air sun deck suspended over the turquoise abyss.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/10 font-tech text-[11px] text-[#C5A880] tracking-wider">
              360° ACOUSTIC PRIVACY
            </div>
          </div>

          {/* Pillar 03 */}
          <div className="glass-panel-luxury p-8 md:p-10 rounded-2xl border border-white/5 flex flex-col justify-between glass-panel-hover group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#C5A880]/10 flex items-center justify-center text-[#C5A880] mb-8 group-hover:bg-[#C5A880] group-hover:text-[#08090C] transition-colors">
                <Compass size={24} />
              </div>
              <span className="font-tech text-xs tracking-widest text-[#A99D8D] uppercase block mb-2">
                03 // INTUITIVE HOSPITALITY
              </span>
              <h3 className="font-editorial text-2xl md:text-3xl text-white font-normal mb-4">
                1:1 Butler Devotion
              </h3>
              <p className="text-sm text-neutral-400 font-light leading-relaxed">
                Your private island butler anticipates every unspoken wish — from arranging midnight stargazing champagne baths to curating private sandbank excursions.
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-white/10 font-tech text-[11px] text-[#C5A880] tracking-wider">
              BESPOKE INTUITIVE SERVICE
            </div>
          </div>

        </div>

        {/* Feature Split Quote Banner */}
        <div className="relative rounded-3xl overflow-hidden border border-[#C5A880]/20 bg-gradient-to-r from-[#0E1015] via-[#121620] to-[#0E1015] p-8 md:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7">
              <span className="font-tech text-xs text-[#C5A880] tracking-[0.25em] uppercase block mb-3">
                THE FOUNDER’S INTENT
              </span>
              <blockquote className="font-editorial italic text-2xl sm:text-3xl md:text-4xl text-white font-light leading-snug mb-6">
                “We did not seek to impose architecture upon this atoll; we asked the ocean where it wished for us to rest.”
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-[#C5A880] flex items-center justify-center text-xs font-cinzel text-[#C5A880]">
                  HM
                </div>
                <div>
                  <div className="font-sans-clean text-sm font-semibold text-white">Henri Montrose</div>
                  <div className="text-xs text-neutral-400">Principal Architect & Founder, Aurelia Sanctuary</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="p-4 rounded-xl glass-panel-subtle flex items-center justify-between">
                <span className="text-xs text-neutral-300">Renewable Solar Energy</span>
                <span className="font-tech text-xs text-[#C5A880]">100% Self-Sustaining</span>
              </div>
              <div className="p-4 rounded-xl glass-panel-subtle flex items-center justify-between">
                <span className="text-xs text-neutral-300">Desalinated Pure Mineral Water</span>
                <span className="font-tech text-xs text-[#C5A880]">On-Site Osmosis Plant</span>
              </div>
              <div className="p-4 rounded-xl glass-panel-subtle flex items-center justify-between">
                <span className="text-xs text-neutral-300">Coral Reef Propagation Program</span>
                <span className="font-tech text-xs text-[#C5A880]">2,500 Frags Restored / Yr</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

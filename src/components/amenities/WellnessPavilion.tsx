import React from 'react';
import { Waves, Sparkles, Clock, ShieldCheck, ArrowRight, HeartHandshake } from 'lucide-react';
import { WELLNESS_EXPERIENCES } from '../../data/resortData';
import { soundEngine } from '../../utils/soundEngine';

interface WellnessPavilionProps {
  onBookSpa: () => void;
}

export const WellnessPavilion: React.FC<WellnessPavilionProps> = ({ onBookSpa }) => {
  return (
    <section id="wellness" className="relative py-28 md:py-36 bg-[#08090C] text-[#EDE8DF] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-[11px] font-tech text-[#C5A880] tracking-[0.25em] uppercase mb-6">
            <Waves size={12} />
            <span>OCEANIC THALASSOTHERAPY & SPA</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-white mb-6">
            Reconnecting With <br />
            <span className="italic font-light gold-text-gradient">The Rhythm of the Tide.</span>
          </h2>

          <p className="font-sans-clean text-neutral-300 text-sm md:text-base font-light leading-relaxed">
            Harnessing the regenerative power of pure deep-sea mineral waters, ancient sound resonance, and botanical oceanic elixirs in an open-air lagoon pavilion.
          </p>
        </div>

        {/* 3 Wellness Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {WELLNESS_EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="rounded-3xl overflow-hidden glass-panel-luxury border border-white/5 flex flex-col justify-between glass-panel-hover group"
            >
              <div className="relative h-64 overflow-hidden bg-black/40">
                <img
                  src={exp.image}
                  alt={exp.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1015] via-transparent to-transparent" />
                <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full glass-panel-subtle text-[10px] font-tech text-[#C5A880] flex items-center gap-1.5">
                  <Clock size={11} />
                  <span>{exp.duration}</span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <span className="font-tech text-[10px] text-[#A99D8D] tracking-widest uppercase block mb-1">
                    {exp.focus}
                  </span>
                  <h3 className="font-editorial text-2xl text-white font-normal mb-3 group-hover:text-[#C5A880] transition-colors">
                    {exp.name}
                  </h3>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  <div className="p-3.5 rounded-xl glass-panel-subtle border border-white/5 text-xs mb-6">
                    <span className="font-tech text-[10px] text-[#C5A880] uppercase block mb-1">SIGNATURE PROTOCOL</span>
                    <span className="text-white font-medium">{exp.signatureTreatment}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-400 font-tech">Daily 09:00 – 21:00</span>
                  <button
                    onClick={() => {
                      soundEngine.playHarmonicChime();
                      onBookSpa();
                    }}
                    className="flex items-center gap-1.5 text-xs font-tech text-[#C5A880] hover:text-white transition-colors"
                  >
                    <span>Reserve Protocol</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

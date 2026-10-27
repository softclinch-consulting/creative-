import React from 'react';
import { Compass, Sparkles, Clock, ShieldCheck, ArrowRight, Anchor } from 'lucide-react';
import { CURATED_EXPERIENCES } from '../../data/resortData';
import { soundEngine } from '../../utils/soundEngine';

interface ExperiencesSectionProps {
  onInquireExperience: () => void;
}

export const ExperiencesSection: React.FC<ExperiencesSectionProps> = ({ onInquireExperience }) => {
  return (
    <section id="experiences" className="relative py-28 md:py-36 bg-[#08090C] text-[#EDE8DF] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-[11px] font-tech text-[#C5A880] tracking-[0.25em] uppercase mb-4">
              <Anchor size={12} />
              <span>BESPOKE EXPEDITIONS</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-white">
              Beyond The Shoreline, <br />
              <span className="italic font-light gold-text-gradient">Into The Unknown.</span>
            </h2>
          </div>

          <p className="font-sans-clean text-neutral-400 text-sm md:text-base max-w-md font-light leading-relaxed">
            Curated private sea and aerial journeys led by our resident marine biologists, private pilots, and master navigators.
          </p>
        </div>

        {/* Expeditions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CURATED_EXPERIENCES.map((exp) => (
            <div
              key={exp.id}
              className="rounded-3xl overflow-hidden glass-panel-luxury border border-white/5 flex flex-col justify-between glass-panel-hover group"
            >
              <div className="relative h-64 overflow-hidden bg-black/40">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1015] via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full glass-panel-subtle text-[10px] font-tech text-[#C5A880] tracking-wider uppercase">
                  {exp.type} EXPEDITION
                </div>

                {exp.exclusive && (
                  <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-[#C5A880] text-[#08090C] text-[9px] font-tech font-bold tracking-wider uppercase">
                    EXCLUSIVE
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-editorial text-2xl text-white font-normal mb-3 group-hover:text-[#C5A880] transition-colors">
                    {exp.title}
                  </h3>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                    {exp.description}
                  </p>

                  <div className="p-3.5 rounded-xl glass-panel-subtle border border-white/5 text-xs mb-6">
                    <span className="font-tech text-[10px] text-[#A99D8D] uppercase block mb-1">EXPEDITION HIGHLIGHT</span>
                    <span className="text-white font-medium">{exp.highlight}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-tech text-neutral-400">
                    <Clock size={13} className="text-[#C5A880]" />
                    <span>{exp.duration}</span>
                  </div>

                  <button
                    onClick={() => {
                      soundEngine.playHarmonicChime();
                      onInquireExperience();
                    }}
                    className="flex items-center gap-1.5 text-xs font-tech text-[#C5A880] hover:text-white transition-colors"
                  >
                    <span>Request Details</span>
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

import React from 'react';
import { Compass, HardHat, Layout, ClipboardCheck, ArrowRight, Check } from 'lucide-react';
import { SERVICES_LIST } from '../../data/buildingData';
import { soundEngine } from '../../utils/soundEngine';

interface ServiceOverviewSectionProps {
  onSelectService: () => void;
}

export const ServiceOverviewSection: React.FC<ServiceOverviewSectionProps> = ({ onSelectService }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Compass': return <Compass size={24} />;
      case 'HardHat': return <HardHat size={24} />;
      case 'Layout': return <Layout size={24} />;
      case 'ClipboardCheck': return <ClipboardCheck size={24} />;
      default: return <Compass size={24} />;
    }
  };

  return (
    <section id="services" className="relative py-28 md:py-36 bg-[#0A0C10]/60 backdrop-blur-sm text-[#EDE8DF] border-t border-white/5 overflow-hidden">
      
      {/* High-Resolution Architectural Texture in Background */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <img
          src="/images/backgrounds/blueprint-drafting.jpg"
          alt="Architectural Blueprint and Framework"
          className="w-full h-full object-cover object-center opacity-30 filter contrast-120 brightness-85"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C10]/80 via-transparent to-[#0A0C10]/80" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Section Header matching Storyboard Box 08 */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-[11px] font-tech text-[#D4AF37] tracking-[0.25em] uppercase mb-4">
            <span>08 // SERVICE OVERVIEW &bull; 26 – 30s</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-white mb-4">
            Our Services
          </h2>

          <p className="font-editorial italic text-xl sm:text-2xl text-[#E6C387] font-light mb-4">
            End-to-end solutions for your dream space.
          </p>

          <p className="font-sans-clean text-neutral-400 text-sm md:text-base font-light max-w-xl mx-auto">
            Scroll further to explore our services, process, and featured projects.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_LIST.map((srv) => (
            <div
              key={srv.id}
              className="group rounded-2xl glass-panel-luxury border border-white/5 p-6 sm:p-8 flex flex-col justify-between glass-panel-hover"
            >
              <div>
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] mb-6 group-hover:bg-[#D4AF37] group-hover:text-[#0A0C10] transition-colors">
                  {getIcon(srv.iconName)}
                </div>

                <h3 className="font-cinzel text-xl text-white font-bold mb-2 group-hover:text-[#D4AF37] transition-colors">
                  {srv.title}
                </h3>

                <p className="font-editorial italic text-sm text-[#E6C387] mb-4">
                  {srv.tagline}
                </p>

                <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                  {srv.description}
                </p>

                {/* Deliverables */}
                <ul className="space-y-2 pt-4 border-t border-white/10 text-xs text-neutral-300">
                  {srv.deliverables.map((d, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check size={12} className="text-[#D4AF37] flex-shrink-0" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  onClick={() => {
                    soundEngine.playSubtleTick();
                    onSelectService();
                  }}
                  className="flex items-center gap-1.5 text-xs font-tech text-[#D4AF37] hover:text-white transition-colors"
                >
                  <span>Enquire Service</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

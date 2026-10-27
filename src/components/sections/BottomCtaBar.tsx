import React from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Users, Clock, ArrowUp } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';
import { BuildingLogo } from '../common/BuildingLogo';

interface BottomCtaBarProps {
  onStartProject: () => void;
}

export const BottomCtaBar: React.FC<BottomCtaBarProps> = ({ onStartProject }) => {
  const scrollToTop = () => {
    soundEngine.playSubtleTick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#06080B]/80 text-[#EDE8DF] border-t border-[#D4AF37]/30 pt-20 pb-14 overflow-hidden">
      
      {/* High-Resolution Luxury Villa Background Image in Footer matching Storyboard */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <img
          src="/images/backgrounds/luxury-villa-dusk-footer.jpg"
          alt="Completed Luxury Architectural Villa at Dusk"
          className="w-full h-full object-cover object-center opacity-75 filter contrast-115 brightness-95"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C10] via-transparent to-transparent opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#06080B] via-[#06080B]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#06080B]/70 via-transparent to-[#06080B]/70" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Main Banner matching Storyboard Bottom Strip */}
        <div className="p-8 sm:p-12 rounded-3xl glass-panel-luxury border border-[#D4AF37]/35 shadow-2xl backdrop-blur-xl bg-black/60 mb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Brand Wordmark */}
            <div className="lg:col-span-4 flex items-center">
              <BuildingLogo size="lg" />
            </div>

            {/* Center: Impact Headline & CTA Button */}
            <div className="lg:col-span-4 flex flex-col items-start lg:items-center text-left lg:text-center">
              <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-white mb-4">
                Your Vision. Our Expertise. <br />
                <span className="italic font-light gold-text-gradient">One Beautiful Reality.</span>
              </h3>

              <button
                onClick={() => {
                  soundEngine.playHarmonicChime();
                  onStartProject();
                }}
                className="group flex items-center gap-2 px-7 py-3 rounded-full bg-[#D4AF37] text-[#0A0C10] text-xs font-bold tracking-widest uppercase hover:bg-[#E6C387] shadow-xl shadow-[#D4AF37]/25 transition-all"
              >
                <span>Start Your Project</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Right: 4 Badges matching storyboard */}
            <div className="lg:col-span-4 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2.5 p-3 rounded-xl glass-panel-subtle">
                <ShieldCheck size={18} className="text-[#D4AF37] flex-shrink-0" />
                <span className="text-xs font-tech text-neutral-300">Quality Workmanship</span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl glass-panel-subtle">
                <CheckCircle2 size={18} className="text-[#D4AF37] flex-shrink-0" />
                <span className="text-xs font-tech text-neutral-300">Transparent Process</span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl glass-panel-subtle">
                <Users size={18} className="text-[#D4AF37] flex-shrink-0" />
                <span className="text-xs font-tech text-neutral-300">Experienced Team</span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl glass-panel-subtle">
                <Clock size={18} className="text-[#D4AF37] flex-shrink-0" />
                <span className="text-xs font-tech text-neutral-300">On-Time Delivery</span>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Legal & Back to Top */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-neutral-500 pt-6 border-t border-white/5">
          <div>
            &copy; {new Date().getFullYear()} Building Tomorrow Architecture & Construction Pvt Ltd. Chennai, Tamil Nadu.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 p-2 px-3.5 rounded-full glass-panel-subtle text-neutral-300 hover:text-white transition-colors"
          >
            <span className="text-[10px] tracking-wider uppercase">Back to Top</span>
            <ArrowUp size={12} />
          </button>
        </div>

      </div>
    </footer>
  );
};

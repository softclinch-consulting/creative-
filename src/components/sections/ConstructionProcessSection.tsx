import React from 'react';
import { CheckCircle2, ChevronRight, Layers, FileText, Shield, Key } from 'lucide-react';
import { PROCESS_STEPS } from '../../data/buildingData';

export const ConstructionProcessSection: React.FC = () => {
  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0: return <FileText size={20} />;
      case 1: return <Layers size={20} />;
      case 2: return <Shield size={20} />;
      case 3: return <Key size={20} />;
      default: return <CheckCircle2 size={20} />;
    }
  };

  return (
    <section id="process" className="relative py-28 md:py-36 bg-[#0E1015]/70 backdrop-blur-sm text-[#EDE8DF] border-t border-white/5 overflow-hidden">
      
      {/* High-Resolution Architectural Blueprint & Engineering Backdrop */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <img
          src="/images/backgrounds/blueprint-drafting.jpg"
          alt="Architectural Construction Blueprint"
          className="w-full h-full object-cover object-center opacity-25 filter contrast-125 brightness-80"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C10]/85 via-[#0A0C10]/60 to-[#0A0C10]/85" />
      </div>

      {/* 3D Blueprint Wireframe Graphic in Background matching Box 10 */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-full opacity-15 pointer-events-none hidden lg:block z-0">
        <svg viewBox="0 0 600 600" className="w-full h-full stroke-[#D4AF37] fill-none stroke-[1]">
          {/* Isometric building wireframe */}
          <polygon points="300,50 550,190 300,330 50,190" />
          <polygon points="300,150 500,260 300,370 100,260" />
          <polygon points="300,250 450,330 300,420 150,330" />
          <line x1="300" y1="50" x2="300" y2="420" strokeDasharray="4 4" />
          <line x1="50" y1="190" x2="50" y2="450" />
          <line x1="550" y1="190" x2="550" y2="450" />
          <line x1="300" y1="330" x2="300" y2="550" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Section Header matching Storyboard Box 10 */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-[11px] font-tech text-[#D4AF37] tracking-[0.25em] uppercase mb-4">
            <span>10 // OUR PROCESS &bull; 36 – 42s</span>
          </div>

          <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-white mb-4">
            Our Construction Process
          </h2>

          <p className="font-editorial italic text-xl sm:text-2xl text-[#E6C387] font-light mb-4">
            From planning to handover &mdash; we build with care.
          </p>

          <p className="font-sans-clean text-neutral-400 text-sm md:text-base font-light max-w-xl mx-auto">
            A visual timeline shows the complete construction process with milestones and quality audits.
          </p>
        </div>

        {/* 4 Connected Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          
          {/* Horizontal connection line for desktop */}
          <div className="hidden lg:block absolute top-1/4 left-12 right-12 h-0.5 bg-gradient-to-r from-[#D4AF37]/20 via-[#D4AF37]/50 to-[#D4AF37]/20 z-0" />

          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="relative z-10 rounded-2xl glass-panel-luxury border border-white/5 p-6 sm:p-8 flex flex-col justify-between glass-panel-hover"
            >
              <div>
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
                    {getStepIcon(idx)}
                  </div>
                  <span className="font-cinzel text-3xl font-bold text-white/20">
                    {step.step}
                  </span>
                </div>

                <h3 className="font-cinzel text-lg text-white font-bold mb-1">
                  {step.title}
                </h3>
                <div className="text-xs font-tech text-[#D4AF37] mb-3">
                  {step.subtitle}
                </div>

                <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
                  {step.description}
                </p>

                {/* Milestones list */}
                <div className="space-y-2 pt-4 border-t border-white/10">
                  {step.milestones.map((m, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>{m}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-tech text-neutral-400">
                <span>PHASE 0{idx + 1}</span>
                <span className="text-[#D4AF37]">AUDITED &bull; QC PASS</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

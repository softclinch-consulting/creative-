import React from 'react';
import { Compass, Anchor, Wind, Eye } from 'lucide-react';
import type { ResortScene } from '../../types/resort';

interface ArrivalTelemetryHUDProps {
  currentScene: ResortScene;
  activeStageIndex: number;
  totalStages: number;
  scrollProgress: number;
  onSelectStage: (index: number) => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
}

export const ArrivalTelemetryHUD: React.FC<ArrivalTelemetryHUDProps> = ({
  currentScene,
  activeStageIndex,
  totalStages,
  scrollProgress,
  onSelectStage,
  reducedMotion,
  onToggleReducedMotion
}) => {
  return (
    <>
      {/* Top Left — Real-time Atoll Navigation Telemetry */}
      <div className="fixed top-24 left-6 md:left-12 z-30 pointer-events-none select-none transition-all duration-500">
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-[#C5A880] animate-pulse" />
          <span className="font-tech text-[10px] md:text-xs tracking-[0.25em] text-[#C5A880] uppercase">
            AURELIA RADIAL TELEMETRY
          </span>
        </div>
        <div className="font-tech text-[11px] text-[#A99D8D] tracking-wider flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <Compass size={12} className="text-[#C5A880]" />
            {currentScene.coordinates}
          </span>
          <span className="hidden sm:inline text-neutral-600">•</span>
          <span className="hidden sm:flex items-center gap-1">
            <Anchor size={12} className="text-[#C5A880]" />
            {currentScene.altitude}
          </span>
        </div>
      </div>

      {/* Top Right — Motion & View Mode Controls */}
      <div className="fixed top-24 right-6 md:right-12 z-30 flex items-center gap-3">
        <button
          onClick={onToggleReducedMotion}
          title={reducedMotion ? 'Enable Cinematic Motion' : 'Enable Static Reduced Motion'}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-tech tracking-wider border transition-all ${
            reducedMotion
              ? 'bg-[#C5A880]/20 text-[#C5A880] border-[#C5A880]/40 shadow-lg shadow-[#C5A880]/10'
              : 'glass-panel-subtle text-neutral-300 border-white/10 hover:border-white/30'
          }`}
        >
          <Eye size={12} />
          <span className="hidden sm:inline">{reducedMotion ? 'Reduced Motion: ON' : 'Cinematic Flow'}</span>
        </button>
      </div>

      {/* Right Lateral Stage Progress Rail */}
      <aside 
        aria-label="Arrival Journey Progress"
        className="fixed right-4 md:right-10 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-end gap-3 select-none"
      >
        <div className="flex flex-col gap-4 p-2 rounded-full glass-panel-subtle border border-white/5">
          {Array.from({ length: totalStages }).map((_, idx) => {
            const isActive = activeStageIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => onSelectStage(idx)}
                className="group relative flex items-center justify-end p-1 transition-all"
                title={`Jump to Stage 0${idx + 1}`}
              >
                {/* Floating tooltip */}
                <span
                  className={`absolute right-7 px-2.5 py-1 rounded text-[10px] font-tech tracking-widest uppercase whitespace-nowrap transition-all duration-300 pointer-events-none ${
                    isActive
                      ? 'opacity-100 translate-x-0 bg-[#0E1015]/90 text-[#C5A880] border border-[#C5A880]/30'
                      : 'opacity-0 translate-x-2 text-neutral-400 group-hover:opacity-100 group-hover:translate-x-0 bg-black/80'
                  }`}
                >
                  Stage 0{idx + 1}
                </span>

                {/* Circle Indicator */}
                <div
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                    isActive
                      ? 'bg-[#C5A880] scale-125 shadow-lg shadow-[#C5A880]/50 ring-2 ring-[#C5A880]/40'
                      : 'bg-white/20 group-hover:bg-white/60'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Numeric Progress Percentage */}
        <div className="font-tech text-[10px] text-neutral-400 tracking-widest pr-1">
          {Math.round(scrollProgress * 100)}%
        </div>
      </aside>
    </>
  );
};

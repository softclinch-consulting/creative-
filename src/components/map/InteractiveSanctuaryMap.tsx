import React, { useState } from 'react';
import { MapPin, Compass, Navigation, Info, Eye } from 'lucide-react';
import { SANCTUARY_MAP_POINTS } from '../../data/resortData';
import type { SanctuaryMapPoint } from '../../types/resort';
import { soundEngine } from '../../utils/soundEngine';

export const InteractiveSanctuaryMap: React.FC = () => {
  const [activePoint, setActivePoint] = useState<SanctuaryMapPoint>(SANCTUARY_MAP_POINTS[1]);

  return (
    <section id="map" className="relative py-28 md:py-36 bg-[#08090C] text-[#EDE8DF] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-[11px] font-tech text-[#C5A880] tracking-[0.25em] uppercase mb-4">
              <Compass size={12} />
              <span>SPATIAL TOPOGRAPHY</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-white">
              The Sanctuary <br />
              <span className="italic font-light gold-text-gradient">Cartography.</span>
            </h2>
          </div>

          <p className="font-sans-clean text-neutral-400 text-sm md:text-base max-w-md font-light leading-relaxed">
            Spanning 142 hectares of pristine coral atoll. Explore the orientation of our ocean pavilions, marine sanctuaries, and dining pavilions.
          </p>
        </div>

        {/* Interactive Map Visual Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Map Surface Column */}
          <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden glass-panel-luxury border border-[#C5A880]/30 p-4 sm:p-8 bg-[#091016]">
            
            {/* Atoll Vector Background Silhouette */}
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <svg viewBox="0 0 1000 600" className="w-full h-full stroke-[#C5A880]/20 fill-[#0F2432]/30">
                {/* Atoll lagoon ring shape */}
                <path d="M 150,380 Q 250,150 500,120 T 850,320 Q 750,520 450,540 Z" strokeWidth="2" strokeDasharray="6 4" />
                <path d="M 220,350 Q 300,180 500,160 T 780,310 Q 700,470 450,480 Z" strokeWidth="1" strokeDasharray="3 3" />
                {/* Outer reef boundary */}
                <ellipse cx="500" cy="330" rx="420" ry="240" fill="none" stroke="rgba(197, 168, 128, 0.15)" strokeWidth="1.5" />
              </svg>
            </div>

            {/* Depth Caustic Lines */}
            <div className="absolute inset-0 cinema-grain opacity-20 pointer-events-none" />

            {/* Top Left Lat/Long Legend */}
            <div className="absolute top-6 left-6 z-10 hidden sm:flex flex-col gap-1 text-[10px] font-tech text-[#A99D8D]">
              <span className="text-[#C5A880] tracking-widest font-semibold">OUTER BARRIER ATOLL GRID</span>
              <span>REF: 04°10'31.8"N 73°30'33.5"E</span>
              <span>DATUM: WGS84 • CHART 2026-A</span>
            </div>

            {/* Scale Bar */}
            <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2 text-[10px] font-tech text-neutral-400">
              <div className="w-16 h-1 bg-white/20 border-l border-r border-white/60" />
              <span>500 METERS</span>
            </div>

            {/* Interactive Pins */}
            {SANCTUARY_MAP_POINTS.map((point) => {
              const isSelected = activePoint.id === point.id;
              return (
                <button
                  key={point.id}
                  onClick={() => {
                    soundEngine.playSubtleTick();
                    setActivePoint(point);
                  }}
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 transition-all duration-300 focus:outline-none`}
                  title={point.name}
                >
                  {/* Ping Animation on Active */}
                  {isSelected && (
                    <span className="absolute -inset-2 rounded-full bg-[#C5A880]/30 animate-ping" />
                  )}

                  {/* Pin Circle */}
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 shadow-xl ${
                    isSelected
                      ? 'bg-[#C5A880] border-white text-[#08090C] scale-125 ring-4 ring-[#C5A880]/40'
                      : 'bg-[#0E1015]/90 border-[#C5A880]/60 text-[#C5A880] hover:scale-110 hover:border-white'
                  }`}>
                    <MapPin size={14} className={isSelected ? 'fill-current' : ''} />
                  </div>

                  {/* Pin Floating Label */}
                  <span className={`absolute top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded text-[10px] font-tech tracking-wider uppercase whitespace-nowrap pointer-events-none transition-all duration-300 ${
                    isSelected
                      ? 'opacity-100 bg-[#0E1015]/95 text-[#C5A880] border border-[#C5A880]/40 shadow-xl'
                      : 'opacity-0 group-hover:opacity-100 bg-black/80 text-white'
                  }`}>
                    {point.name}
                  </span>
                </button>
              );
            })}

          </div>

          {/* Active Location Detail Card Column */}
          <div className="lg:col-span-4 rounded-3xl overflow-hidden glass-panel-luxury border border-white/5 p-6 sm:p-8 flex flex-col justify-between h-full">
            <div>
              <div className="relative h-48 rounded-2xl overflow-hidden mb-6 bg-black/50">
                <img
                  src={activePoint.image}
                  alt={activePoint.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E1015] via-transparent to-transparent" />
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full glass-panel-subtle text-[10px] font-tech text-[#C5A880] tracking-widest uppercase">
                  {activePoint.tag}
                </div>
              </div>

              <span className="font-tech text-xs tracking-widest text-[#A99D8D] uppercase block mb-1">
                LOCATION SPECIFICATION
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-white font-normal mb-3">
                {activePoint.name}
              </h3>
              <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
                {activePoint.description}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs font-tech text-neutral-400">
              <span>COORDINATES VALIDATED</span>
              <span className="text-[#C5A880]">POINT 0{SANCTUARY_MAP_POINTS.findIndex(p => p.id === activePoint.id) + 1}</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

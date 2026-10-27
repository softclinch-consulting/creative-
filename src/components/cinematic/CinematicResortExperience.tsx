import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowDownRight, Sparkles, Volume2, VolumeX, Calendar, ChevronDown, Compass, ShieldCheck } from 'lucide-react';
import { RESORT_SCENES, RESORT_METRICS } from '../../data/resortData';
import { LayeredHorizonParallax } from './LayeredHorizonParallax';
import { ArrivalTelemetryHUD } from './ArrivalTelemetryHUD';
import { soundEngine } from '../../utils/soundEngine';

interface CinematicResortExperienceProps {
  onOpenBookingModal: (preselectedVillaId?: string) => void;
  onExploreVillas: () => void;
  onExploreExperiences: () => void;
}

export const CinematicResortExperience: React.FC<CinematicResortExperienceProps> = ({
  onOpenBookingModal,
  onExploreVillas,
  onExploreExperiences
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [mouseParallax, setMouseParallax] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // System prefers-reduced-motion check
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setReducedMotion(true);
      }
    }
  }, []);

  // Deterministic Scroll Progression Engine
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      // Calculate progress relative to the pinned container
      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setScrollProgress(progress);

      // 5 Stages => [0, 0.2, 0.4, 0.6, 0.8, 1.0]
      const stageIdx = Math.min(RESORT_SCENES.length - 1, Math.floor(progress * RESORT_SCENES.length));
      setActiveStageIndex(stageIdx);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth Mouse Parallax
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (reducedMotion) return;
    const { innerWidth, innerHeight } = window;
    const x = (e.clientX / innerWidth) * 2 - 1; // -1 to 1
    const y = (e.clientY / innerHeight) * 2 - 1;
    setMouseParallax({ x, y });
  }, [reducedMotion]);

  // Jump to specific stage
  const handleSelectStage = useCallback((index: number) => {
    if (!containerRef.current) return;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetScrollY = containerRef.current.offsetTop + (index / (RESORT_SCENES.length - 1)) * totalScrollable;
    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth'
    });
    soundEngine.playSubtleTick();
  }, []);

  // Toggle ambient soundscape
  const toggleAudio = () => {
    const nextMuted = !isAudioMuted;
    setIsAudioMuted(nextMuted);
    soundEngine.setMuted(nextMuted);
  };

  const currentScene = RESORT_SCENES[activeStageIndex];

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-[400vh] bg-[#08090C]"
      aria-label="Cinematic Arrival Journey"
    >
      {/* Sticky Viewport Stage (Pinned 100vh) */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">

        {/* Dynamic Multi-Layer Parallax Background */}
        <LayeredHorizonParallax
          scrollProgress={scrollProgress}
          stageIndex={activeStageIndex}
          mouseParallax={mouseParallax}
          reducedMotion={reducedMotion}
        />

        {/* Heads Up Display & Telemetry */}
        <ArrivalTelemetryHUD
          currentScene={currentScene}
          activeStageIndex={activeStageIndex}
          totalStages={RESORT_SCENES.length}
          scrollProgress={scrollProgress}
          onSelectStage={handleSelectStage}
          reducedMotion={reducedMotion}
          onToggleReducedMotion={() => setReducedMotion(!reducedMotion)}
        />

        {/* Main Editorial Stage Narrative Canvas */}
        <div className="relative z-20 flex-1 flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-7xl mx-auto w-full pointer-events-none select-none">
          
          <div className="max-w-3xl transition-all duration-700 ease-out transform">
            
            {/* Stage Indicator Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-panel-luxury text-[11px] font-tech text-[#C5A880] tracking-widest uppercase mb-6 pointer-events-auto">
              <Sparkles size={12} className="text-[#C5A880] animate-pulse" />
              <span>STAGE 0{activeStageIndex + 1} // {currentScene.ambientLabel}</span>
            </div>

            {/* Editorial Serif Stage Title */}
            <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#F7F4EE] leading-[1.05] mb-5">
              {currentScene.title.split(' ')[0]}{' '}
              <span className="italic font-light gold-text-gradient">
                {currentScene.title.split(' ').slice(1).join(' ')}
              </span>
            </h1>

            {/* Stage Poetic Subtitle */}
            <p className="font-editorial italic text-xl sm:text-2xl md:text-3xl text-[#D9C19D] font-light leading-relaxed mb-6 max-w-2xl">
              {currentScene.subtitle}
            </p>

            {/* Architectural & Geographical Description */}
            <p className="font-sans-clean text-sm sm:text-base md:text-lg text-neutral-300 font-light leading-relaxed max-w-xl mb-8">
              {currentScene.description}
            </p>

            {/* Interactive Call to Action Bar */}
            <div className="flex flex-wrap items-center gap-4 pointer-events-auto">
              
              {activeStageIndex === 4 ? (
                <button
                  onClick={() => onOpenBookingModal()}
                  className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#C5A880] text-[#08090C] text-xs font-semibold tracking-[0.2em] uppercase shadow-2xl shadow-[#C5A880]/40 hover:bg-[#D9C19D] active:scale-95 transition-all"
                >
                  <Calendar size={15} />
                  <span>Reserve a Sanctuary Suite</span>
                  <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </button>
              ) : (
                <button
                  onClick={onExploreVillas}
                  className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#C5A880] text-[#08090C] text-xs font-semibold tracking-[0.2em] uppercase shadow-2xl shadow-[#C5A880]/30 hover:bg-[#D9C19D] active:scale-95 transition-all"
                >
                  <span>Explore 24 Ocean Pavilions</span>
                  <ArrowDownRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                </button>
              )}

              <button
                onClick={onExploreExperiences}
                className="flex items-center gap-2 px-7 py-4 rounded-full glass-panel-subtle text-[#EDE8DF] text-xs font-semibold tracking-[0.2em] uppercase hover:border-[#C5A880]/60 hover:text-[#C5A880] active:scale-95 transition-all"
              >
                <span>Curated Experiences</span>
              </button>

              {/* Ambient Audio Pill */}
              <button
                onClick={toggleAudio}
                className="flex items-center gap-2 px-5 py-4 rounded-full glass-panel-subtle text-xs font-tech text-[#C5A880] hover:border-[#C5A880]/50 transition-all"
                title={isAudioMuted ? 'Play Ambient Ocean Waves' : 'Mute Ambient Audio'}
              >
                {isAudioMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="animate-pulse" />}
                <span className="hidden sm:inline">
                  {isAudioMuted ? 'Soundscape: OFF' : 'Ocean Ambiance'}
                </span>
              </button>

            </div>

          </div>

        </div>

        {/* Bottom Bar — Verified Property Metrics & Scroll Cue */}
        <div className="relative z-20 pb-8 px-6 md:px-16 lg:px-24 max-w-7xl mx-auto w-full pointer-events-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-6 border-t border-white/10">
            
            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
              <div>
                <span className="font-tech text-[10px] tracking-widest text-[#A99D8D] uppercase block mb-0.5">
                  PRIVATE ATOLL
                </span>
                <span className="font-cinzel text-sm sm:text-base text-white tracking-wider">
                  {RESORT_METRICS.privateAtollArea}
                </span>
              </div>
              <div>
                <span className="font-tech text-[10px] tracking-widest text-[#A99D8D] uppercase block mb-0.5">
                  RESIDENCES
                </span>
                <span className="font-cinzel text-sm sm:text-base text-white tracking-wider">
                  24 Ocean Villas
                </span>
              </div>
              <div>
                <span className="font-tech text-[10px] tracking-widest text-[#A99D8D] uppercase block mb-0.5">
                  BUTLER DEDICATION
                </span>
                <span className="font-cinzel text-sm sm:text-base text-white tracking-wider">
                  1:1 Private Butler
                </span>
              </div>
              <div>
                <span className="font-tech text-[10px] tracking-widest text-[#A99D8D] uppercase block mb-0.5">
                  WATER CLARITY
                </span>
                <span className="font-cinzel text-sm sm:text-base text-white tracking-wider">
                  35m Visibility
                </span>
              </div>
            </div>

            {/* Animated Scroll Down Indicator */}
            <div className="hidden lg:flex items-center gap-3 font-tech text-xs tracking-widest text-neutral-400 uppercase">
              <span className="animate-pulse">SCROLL TO ADVANCE ARRIVAL</span>
              <ChevronDown size={14} className="text-[#C5A880] animate-bounce" />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

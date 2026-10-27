import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles, Sliders, ChevronDown, CheckCircle2, RotateCcw } from 'lucide-react';
import { CONSTRUCTION_FRAMES, TOTAL_FRAMES, STORY_CAPTIONS } from '../../data/frameManifest';
import type { StoryCaption } from '../../data/frameManifest';
import { soundEngine } from '../../utils/soundEngine';

interface FrameSequenceScrolltellingProps {
  onExploreProcess: () => void;
  onStartProject: () => void;
}

export const FrameSequenceScrolltelling: React.FC<FrameSequenceScrolltellingProps> = ({
  onExploreProcess,
  onStartProject
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Image cache and loading state
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isInitialReady, setIsInitialReady] = useState<boolean>(false);
  
  // Active scroll state
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const lastRenderedIndex = useRef<number>(-1);
  const rAFId = useRef<number | null>(null);

  // Determine active story caption based on scrollProgress
  const activeCaption: StoryCaption = useMemo(() => {
    const found = STORY_CAPTIONS.find(
      c => scrollProgress >= c.startProgress && scrollProgress <= c.endProgress
    );
    return found || STORY_CAPTIONS[STORY_CAPTIONS.length - 1];
  }, [scrollProgress]);

  // Draw a specific frame onto the canvas with object-fit: cover math
  const drawFrame = useCallback((frameIdx: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Enable ultra-high-quality image interpolation for razor-sharp pixels
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Find requested frame or the nearest loaded frame to prevent flickering
    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Find nearest loaded frame
      let nearestDist = Infinity;
      let fallbackImg: HTMLImageElement | null = null;
      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const candidate = imagesRef.current[i];
        if (candidate && candidate.complete && candidate.naturalWidth > 0) {
          const dist = Math.abs(i - frameIdx);
          if (dist < nearestDist) {
            nearestDist = dist;
            fallbackImg = candidate;
          }
        }
      }
      img = fallbackImg;
    }

    if (!img) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = img.naturalWidth || 1280;
    const imgHeight = img.naturalHeight || 720;

    const canvasRatio = canvasWidth / canvasHeight;
    const imgRatio = imgWidth / imgHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = canvasWidth / imgRatio;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * imgRatio;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    // High performance draw
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    lastRenderedIndex.current = frameIdx;
  }, []);

  // Resize canvas to physical display pixels with DPR clamping
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      // Redraw current frame after resize
      drawFrame(currentFrameIndex);
    }
  }, [currentFrameIndex, drawFrame]);

  // Progressive frame preloading engine
  useEffect(() => {
    let isCancelled = false;
    let count = 0;

    // Load a single frame and update cache
    const loadSingleImage = (index: number): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = CONSTRUCTION_FRAMES[index];
        img.onload = () => {
          if (!isCancelled) {
            imagesRef.current[index] = img;
            count++;
            setLoadedCount(count);
            // First frame loaded: mark ready and draw immediately
            if (index === 0) {
              setIsInitialReady(true);
              requestAnimationFrame(() => drawFrame(0));
            }
          }
          resolve(img);
        };
        img.onerror = () => {
          resolve(img);
        };
      });
    };

    // Priority 1: Load first 15 frames immediately
    const priorityIndices = Array.from({ length: Math.min(15, TOTAL_FRAMES) }, (_, i) => i);
    Promise.all(priorityIndices.map(loadSingleImage)).then(() => {
      if (isCancelled) return;

      // Priority 2: Progressively load remaining frames in batches of 6
      const remainingIndices = Array.from({ length: TOTAL_FRAMES - 15 }, (_, i) => i + 15);
      const batchSize = 6;
      let currentIndex = 0;

      const loadNextBatch = () => {
        if (isCancelled || currentIndex >= remainingIndices.length) return;
        const batch = remainingIndices.slice(currentIndex, currentIndex + batchSize);
        currentIndex += batchSize;
        Promise.all(batch.map(loadSingleImage)).then(() => {
          // Subtle idle delay between batches to keep main thread completely unblocked
          setTimeout(loadNextBatch, 30);
        });
      };

      loadNextBatch();
    });

    return () => {
      isCancelled = true;
    };
  }, [drawFrame]);

  // Handle window resize and screen orientation
  useEffect(() => {
    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  // Synchronize scroll progress to target frame index
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;

      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setScrollProgress(progress);

      const targetFrame = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));
      setCurrentFrameIndex(targetFrame);

      if (rAFId.current) cancelAnimationFrame(rAFId.current);
      rAFId.current = requestAnimationFrame(() => {
        if (lastRenderedIndex.current !== targetFrame) {
          drawFrame(targetFrame);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rAFId.current) cancelAnimationFrame(rAFId.current);
    };
  }, [drawFrame]);

  // Jump to specific progress when clicking progress timeline
  const handleJumpToProgress = (targetProgress: number) => {
    if (!containerRef.current) return;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = containerRef.current.offsetTop + targetProgress * totalScrollable;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
    soundEngine.playSubtleTick();
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(1, clickX / rect.width));
    handleJumpToProgress(newProgress);
  };

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative w-full h-[450vh] bg-[#0A0C10]"
      aria-label="Scroll-Driven Construction Frame Animation"
      data-cursor="SCROLL"
    >
      {/* Pinned 100vh Sticky Viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col justify-between">
        
        {/* High-Resolution Landscape Baseline Background (Ultra-HD 2560px) */}
        <div className="absolute inset-0 pointer-events-none select-none z-0">
          <img
            src="/images/backgrounds/golden-sunrise-land.jpg"
            alt="Golden Sunrise Land Landscape"
            className="w-full h-full object-cover object-center filter contrast-[1.05] brightness-[0.92]"
            loading="eager"
          />
        </div>

        {/* Hardware-Accelerated 60fps HTML5 Canvas with High-Quality Pixels */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block select-none pointer-events-none z-[1] filter contrast-[1.05] brightness-[0.98]"
        />

        {/* Cinematic Vignette Overlays for Depth and Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-transparent opacity-80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C10]/70 via-transparent to-transparent opacity-90 pointer-events-none" />

        {/* --- TOP STAGE TELEMETRY BAR --- */}
        <div className="relative z-20 pt-24 px-6 md:px-12 max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-none select-none">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-ping" />
            <span className="font-tech text-xs tracking-[0.25em] text-[#D4AF37] uppercase">
              IMAGE FRAME {String(currentFrameIndex + 1).padStart(3, '0')} / {TOTAL_FRAMES}
            </span>
            <span className="hidden sm:inline text-neutral-600">|</span>
            <span className="hidden sm:inline font-tech text-xs text-neutral-400 uppercase tracking-widest">
              {activeCaption.phase}
            </span>
          </div>

          {/* Frame Sequence Loading Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel-subtle text-[11px] font-tech text-neutral-300 pointer-events-auto">
            <Sparkles size={12} className="text-[#D4AF37]" />
            <span>
              {loadedCount >= TOTAL_FRAMES
                ? '150 IMAGE FRAMES SYNCED'
                : `LOADING IMAGES: ${loadedCount} / ${TOTAL_FRAMES}`}
            </span>
          </div>
        </div>

        {/* --- ELEGANT FLOATING STORYTELLING CAPTION CARD --- */}
        <div className="relative z-20 px-6 md:px-12 max-w-7xl mx-auto w-full mt-auto mb-4 pointer-events-none select-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCaption.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="max-w-lg p-6 sm:p-7 rounded-2xl glass-panel-luxury border border-[#D4AF37]/35 shadow-2xl pointer-events-auto backdrop-blur-xl bg-black/65"
            >
              {/* Story Stage Pill */}
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[9px] font-tech text-[#D4AF37] tracking-widest uppercase mb-3">
                <Sparkles size={10} className="text-[#D4AF37]" />
                <span>{activeCaption.phase} &bull; {activeCaption.highlight}</span>
              </div>

              {/* Exact Storytelling Caption Specified by User */}
              <h2 className="font-editorial text-2xl sm:text-3xl text-white font-normal mb-2 leading-tight">
                {activeCaption.caption}
              </h2>

              <p className="font-sans-clean text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-5">
                {currentFrameIndex < 50
                  ? 'The journey begins on an untouched parcel of land, ripe with potential and awaiting the architectural masterplan.'
                  : currentFrameIndex < 100
                  ? 'From initial sketches to parametric 3D blueprints, structural calculations, and landscape modeling.'
                  : 'Mass concrete excavation, laser-leveled foundation footings, and structural steel rising into reality.'}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {scrollProgress < 0.85 ? (
                  <button
                    onClick={onExploreProcess}
                    data-cursor="PROCESS"
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4AF37] text-[#0A0C10] text-[11px] font-bold tracking-widest uppercase hover:bg-[#E6C387] active:scale-95 transition-all shadow-lg"
                  >
                    <span>Explore Our Process</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button
                    onClick={onStartProject}
                    data-cursor="ENQUIRE"
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#D4AF37] text-[#0A0C10] text-[11px] font-bold tracking-widest uppercase hover:bg-[#E6C387] active:scale-95 transition-all shadow-lg"
                  >
                    <span>Build Your Dream Home</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </button>
                )}

                <button
                  onClick={onStartProject}
                  data-cursor="QUOTE"
                  className="px-4 py-2.5 rounded-full glass-panel-subtle text-neutral-200 text-[11px] font-semibold tracking-wider uppercase hover:border-[#D4AF37]/50 hover:text-[#D4AF37] transition-all"
                >
                  <span>Instant Estimate</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- BOTTOM PROGRESS TIMELINE & SCRUBBER --- */}
        <div className="relative z-20 pb-7 px-6 md:px-12 max-w-7xl mx-auto w-full select-none">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-4 border-t border-white/10">
            
            {/* Live Journey Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-10">
              <div>
                <div className="font-tech text-[10px] text-neutral-500 uppercase tracking-widest">
                  CONSTRUCTION PHASE
                </div>
                <div className="font-cinzel text-sm sm:text-base text-white font-bold truncate max-w-[150px]">
                  {activeCaption.highlight}
                </div>
              </div>

              <div>
                <div className="font-tech text-[10px] text-neutral-500 uppercase tracking-widest">
                  TRANSFORMATION
                </div>
                <div className="font-editorial text-sm sm:text-base text-[#D4AF37] font-semibold">
                  {Math.round(scrollProgress * 100)}% COMPLETE
                </div>
              </div>

              <div className="hidden sm:block">
                <div className="font-tech text-[10px] text-neutral-500 uppercase tracking-widest">
                  IMAGE FRAME SEQUENCE
                </div>
                <div className="font-tech text-xs sm:text-sm text-neutral-300">
                  {currentFrameIndex + 1} / {TOTAL_FRAMES} FRAMES
                </div>
              </div>

              <div className="hidden sm:block">
                <div className="font-tech text-[10px] text-neutral-500 uppercase tracking-widest">
                  LOCATION
                </div>
                <div className="font-tech text-xs sm:text-sm text-neutral-300">
                  Chennai, Tamil Nadu
                </div>
              </div>
            </div>

            {/* Scroll Hint & Scrubber Control */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <span className="font-tech text-[10px] text-neutral-400 tracking-widest uppercase flex items-center gap-1.5">
                <span>SCROLL OR CLICK TIMELINE TO ADVANCE</span>
                <ChevronDown size={12} className="text-[#D4AF37] animate-bounce" />
              </span>
            </div>

          </div>

          {/* Interactive Clickable Scrubber Bar with Story Milestone Markers */}
          <div
            onClick={handleScrubberClick}
            data-cursor="SEEK"
            className="group relative w-full h-3 mt-4 cursor-pointer flex items-center"
            title="Click or drag to scrub construction journey"
          >
            {/* Track background */}
            <div className="w-full h-1.5 rounded-full bg-white/10 group-hover:h-2 transition-all overflow-hidden relative">
              {/* Active Fill */}
              <div
                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E6C387] rounded-full transition-all duration-75 relative"
                style={{ width: `${scrollProgress * 100}%` }}
              />
            </div>

            {/* Glowing Scrubber Thumb */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#D4AF37] border-2 border-[#0A0C10] shadow-lg shadow-[#D4AF37]/50 pointer-events-none group-hover:scale-125 transition-transform"
              style={{ left: `${scrollProgress * 100}%` }}
            />

            {/* Milestone node ticks */}
            {STORY_CAPTIONS.map((cap) => (
              <div
                key={cap.id}
                className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/30 pointer-events-none"
                style={{ left: `${cap.startProgress * 100}%` }}
                title={cap.caption}
              />
            ))}
          </div>

        </div>

        {/* --- RIGHT VERTICAL STORY MILESTONE RAIL --- */}
        <aside
          aria-label="Story Milestones"
          className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-end gap-2.5 select-none"
        >
          <div className="flex flex-col gap-2.5 p-2 rounded-full glass-panel-subtle border border-white/10 relative">
            {STORY_CAPTIONS.map((cap, idx) => {
              const isActive = activeCaption.id === cap.id;
              return (
                <button
                  key={cap.id}
                  onClick={() => handleJumpToProgress(cap.startProgress + 0.02)}
                  className="group relative flex items-center justify-end p-1 transition-all"
                  title={cap.caption}
                  data-cursor={`STEP 0${idx + 1}`}
                >
                  {/* Hover Floating Tooltip */}
                  <span
                    className={`absolute right-7 px-2.5 py-1 rounded text-[10px] font-tech tracking-wider uppercase whitespace-nowrap transition-all duration-200 pointer-events-none ${
                      isActive
                        ? 'opacity-100 translate-x-0 bg-[#0E121A] text-[#D4AF37] border border-[#D4AF37]/40 shadow-xl'
                        : 'opacity-0 translate-x-2 text-neutral-400 group-hover:opacity-100 group-hover:translate-x-0 bg-black/80'
                    }`}
                  >
                    {cap.highlight}
                  </span>

                  {/* Indicator Dot */}
                  <div
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? 'bg-[#D4AF37] scale-150 shadow-md shadow-[#D4AF37]/60 ring-2 ring-[#D4AF37]/40'
                        : 'bg-white/20 group-hover:bg-white/60'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          <div className="font-tech text-[10px] text-neutral-400 tracking-widest pr-1">
            {Math.round(scrollProgress * 100)}%
          </div>
        </aside>

      </div>
    </section>
  );
};

import React, { useRef, useEffect } from 'react';

interface LayeredHorizonParallaxProps {
  scrollProgress: number;
  stageIndex: number;
  mouseParallax: { x: number; y: number };
  reducedMotion: boolean;
}

export const LayeredHorizonParallax: React.FC<LayeredHorizonParallaxProps> = ({
  scrollProgress,
  stageIndex,
  mouseParallax,
  reducedMotion
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Procedural Ocean Caustics and Sun Shimmer on Canvas
  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Shimmer particles representing sun reflections on tranquil atoll lagoon
    const particles = Array.from({ length: 45 }).map(() => ({
      x: Math.random() * width,
      y: height * 0.45 + Math.random() * (height * 0.55),
      size: Math.random() * 2.2 + 0.8,
      speed: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2,
      brightness: Math.random() * 0.5 + 0.3
    }));

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle warm golden shimmer
      particles.forEach((p) => {
        p.phase += p.speed;
        const currentAlpha = (Math.sin(p.phase) * 0.5 + 0.5) * p.brightness;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y + Math.sin(time + p.x * 0.01) * 3, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(217, 193, 157, ${currentAlpha * 0.4})`;
        ctx.shadowColor = 'rgba(197, 168, 128, 0.6)';
        ctx.shadowBlur = 6;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [reducedMotion]);

  // Stage-based visual imagery and depth
  const stageImages = [
    // Stage 01 - Approach & aerial atoll
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2400&q=88',
    // Stage 02 - Coral lagoon threshold & arrival jetty
    'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2400&q=88',
    // Stage 03 - Private overwater villa architecture
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2400&q=88',
    // Stage 04 - Michelin ocean dining & wine sanctuary
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2400&q=88',
    // Stage 05 - The private infinity plunge pool & sunset reservation
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=2400&q=88'
  ];

  const currentImg = stageImages[Math.min(stageIndex, stageImages.length - 1)];

  // Multi-layered parallax calculations
  const scale = reducedMotion ? 1 : 1 + scrollProgress * 0.12;
  const bgTranslateY = reducedMotion ? 0 : scrollProgress * -30;
  const mx = reducedMotion ? 0 : mouseParallax.x * 12;
  const my = reducedMotion ? 0 : mouseParallax.y * 12;

  return (
    <div className="absolute inset-0 overflow-hidden select-none pointer-events-none">
      
      {/* LAYER 1: Deep Horizon & Ocean Gradient */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out will-change-transform"
        style={{
          transform: `translate3d(${mx * 0.4}px, ${bgTranslateY + my * 0.4}px, 0) scale(${scale})`,
          transition: reducedMotion ? 'none' : 'transform 0.4s ease-out'
        }}
      >
        <img
          src={currentImg}
          alt="Aurelia Sanctuary Property Perspective"
          className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.08] transition-opacity duration-1000 ease-in-out"
          loading="eager"
        />
      </div>

      {/* LAYER 2: Sun Shimmer & Caustics Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 pointer-events-none opacity-70"
      />

      {/* LAYER 3: Cinematic Atmospheric Overlays */}
      {/* Soft Top Sky Gradient for Navigation Contrast */}
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#08090C]/90 via-[#08090C]/40 to-transparent z-15" />

      {/* Deep Bottom Vignette for Seamless Section Transition */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#08090C] via-[#08090C]/75 to-transparent z-15" />

      {/* Radial Cinematic Horizon Vignette */}
      <div className="absolute inset-0 cinematic-vignette opacity-80 z-15" />

      {/* Subtle Luxury Film Grain */}
      <div className="absolute inset-0 cinema-grain opacity-25 pointer-events-none z-16" />

    </div>
  );
};

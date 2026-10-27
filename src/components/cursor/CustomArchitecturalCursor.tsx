import React, { useEffect, useState, useRef } from 'react';

export const CustomArchitecturalCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Position smooth animation tracking
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // Only activate on devices with fine pointer (mouse)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    setIsVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setCoords({ x: Math.round(e.clientX), y: Math.round(e.clientY) });

      // Immediate position update for inner precision dot
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, select, input, textarea, [data-cursor]');
        if (interactive) {
          setIsHovered(true);
          const customText = interactive.getAttribute('data-cursor');
          if (customText) {
            setCursorText(customText);
          } else if (interactive.tagName === 'BUTTON' || interactive.tagName === 'A') {
            setCursorText('VIEW');
          } else {
            setCursorText('');
          }
        } else {
          setIsHovered(false);
          setCursorText('');
        }
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    // Smooth trailing animation loop for outer ring
    const render = () => {
      // Linear interpolation (lerp) for smooth trailing
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] select-none overflow-hidden">
      
      {/* Precision Center Crosshair Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-75 ease-out ${
          isHovered
            ? 'w-2 h-2 bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/80'
            : 'w-2.5 h-2.5 bg-[#D4AF37]'
        }`}
      />

      {/* Trailing Architectural Focus Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-200 ease-out border will-change-transform ${
          isHovered
            ? 'w-16 h-16 border-[#D4AF37] bg-[#D4AF37]/15 backdrop-blur-[2px] scale-110 shadow-2xl shadow-[#D4AF37]/30'
            : isClicked
            ? 'w-7 h-7 border-[#D4AF37] bg-[#D4AF37]/30 scale-90'
            : 'w-10 h-10 border-[#D4AF37]/40 bg-transparent'
        }`}
      >
        {cursorText && (
          <span className="font-tech text-[9px] tracking-widest text-white uppercase font-bold animate-fade-in drop-shadow">
            {cursorText}
          </span>
        )}
      </div>

      {/* Floating CAD Coordinates HUD near cursor */}
      <div
        className="fixed top-0 left-0 pointer-events-none transition-opacity duration-300 font-tech text-[9px] tracking-widest text-[#D4AF37]/70"
        style={{
          transform: `translate3d(${coords.x + 16}px, ${coords.y + 16}px, 0)`,
          opacity: coords.x > 0 ? 0.8 : 0
        }}
      >
        <span>X:{coords.x} Y:{coords.y}</span>
      </div>

    </div>
  );
};

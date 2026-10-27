import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, ShieldCheck, Clock, Award, Users } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

interface BuildingNavbarProps {
  onStartProject: () => void;
  activeSection: string;
}

export const BuildingNavbar: React.FC<BuildingNavbarProps> = ({
  onStartProject,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'journey', label: '01 The Journey' },
    { id: 'services', label: '02 Services' },
    { id: 'projects', label: '03 Projects' },
    { id: 'process', label: '04 Process' },
    { id: 'enquiry', label: '05 Contact' }
  ];

  const handleNavClick = (id: string) => {
    soundEngine.playSubtleTick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'journey') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0A0C10]/95 backdrop-blur-md border-b border-[#D4AF37]/20 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Brand Logo matching Storyboard */}
          <button
            onClick={() => handleNavClick('journey')}
            className="flex items-center gap-3.5 text-left focus:outline-none group"
          >
            {/* Geometric Modern House Frame Logo */}
            <div className="w-10 h-10 border-2 border-[#D4AF37] relative flex items-center justify-center p-1.5 transition-transform group-hover:scale-105">
              <svg viewBox="0 0 24 24" className="w-full h-full stroke-[#D4AF37] fill-none stroke-[2]">
                {/* Modern gable outline with interior pillar */}
                <path d="M3 11 L12 4 L21 11 V20 H3 Z" />
                <path d="M9 20 V12 H15 V20" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-cinzel text-lg md:text-xl font-bold tracking-[0.2em] text-white group-hover:text-[#D4AF37] transition-colors leading-tight">
                BUILDING TOMORROW
              </span>
              <span className="font-tech text-[9px] tracking-[0.25em] text-[#A39887] uppercase">
                CONSTRUCTION &bull; ARCHITECTURE &bull; INTERIOR DESIGN
              </span>
            </div>
          </button>

          {/* Desktop Tagline Subtitle */}
          <div className="hidden xl:flex flex-col text-right border-l border-white/10 pl-6 text-xs">
            <span className="font-editorial italic text-neutral-300">A journey you can scroll through.</span>
            <span className="font-tech text-[10px] text-[#D4AF37] tracking-wider uppercase">
              Real spaces. Real progress. Your future home.
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative font-sans-clean text-xs tracking-wider uppercase transition-colors py-1 ${
                    isActive ? 'text-[#D4AF37] font-semibold' : 'text-neutral-300 hover:text-white'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => {
                soundEngine.playHarmonicChime();
                onStartProject();
              }}
              className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#D4AF37] text-[#0A0C10] text-xs font-bold tracking-widest uppercase hover:bg-[#E6C387] shadow-lg shadow-[#D4AF37]/25 transition-all"
            >
              <span>Start Your Project</span>
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg glass-panel-subtle text-neutral-200 hover:text-white lg:hidden"
            aria-label="Toggle navigation"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0C10]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 lg:hidden animate-fade-in">
          <div className="flex flex-col gap-5">
            <span className="font-tech text-xs tracking-widest text-[#D4AF37] uppercase">
              NAVIGATION
            </span>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="font-editorial text-2xl text-left text-white hover:text-[#D4AF37] py-2 border-b border-white/5"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onStartProject();
              }}
              className="w-full py-4 rounded-full bg-[#D4AF37] text-[#0A0C10] text-xs font-bold tracking-widest uppercase shadow-xl"
            >
              Start Your Project &rarr;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

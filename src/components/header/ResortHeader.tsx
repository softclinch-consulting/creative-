import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Globe, Sparkles } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

interface ResortHeaderProps {
  onOpenBookingModal: () => void;
  onNavigateToSection: (sectionId: string) => void;
  activeSection: string;
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY';
  onChangeCurrency: (c: 'USD' | 'EUR' | 'GBP' | 'JPY') => void;
}

export const ResortHeader: React.FC<ResortHeaderProps> = ({
  onOpenBookingModal,
  onNavigateToSection,
  activeSection,
  currency,
  onChangeCurrency
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [localTime, setLocalTime] = useState('');

  // Clock for the resort atoll (UTC+5)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format time in resort time zone
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Indian/Maldives',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      setLocalTime(`${timeStr} ATOLL TIME`);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection for header glass transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'arrival', label: 'Arrival Journey' },
    { id: 'villas', label: 'Residences & Villas' },
    { id: 'dining', label: 'Gastronomy' },
    { id: 'wellness', label: 'Thalasso Spa' },
    { id: 'experiences', label: 'Expeditions' },
    { id: 'map', label: 'Sanctuary Map' },
    { id: 'gallery', label: 'Gallery' }
  ];

  const handleNavClick = (id: string) => {
    soundEngine.playSubtleTick();
    onNavigateToSection(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#08090C]/90 backdrop-blur-md border-b border-[#C5A880]/20 py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo & Property Brand */}
          <button
            onClick={() => handleNavClick('arrival')}
            className="group flex flex-col items-start text-left select-none focus:outline-none"
          >
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] group-hover:scale-150 transition-transform" />
              <span className="font-cinzel text-xl md:text-2xl tracking-[0.25em] text-[#F7F4EE] group-hover:text-[#C5A880] transition-colors">
                AURELIA
              </span>
            </div>
            <span className="font-tech text-[9px] tracking-[0.35em] text-[#A99D8D] uppercase ml-3.5">
              SANCTUARY & OCEAN ATOLL
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`relative font-sans-clean text-xs tracking-[0.18em] uppercase transition-colors py-1 ${
                    isActive
                      ? 'text-[#C5A880] font-medium'
                      : 'text-neutral-300 hover:text-[#C5A880]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C5A880] rounded-full animate-fade-in" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Utilities & Booking CTA */}
          <div className="hidden sm:flex items-center gap-4">
            
            {/* Live Atoll Time Indicator */}
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel-subtle text-[11px] font-tech text-neutral-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{localTime}</span>
            </div>

            {/* Currency Selector */}
            <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-panel-subtle text-xs font-tech text-neutral-300 hover:border-[#C5A880]/40 transition-colors">
              <Globe size={13} className="text-[#C5A880]" />
              <select
                aria-label="Currency Selector"
                value={currency}
                onChange={(e) => onChangeCurrency(e.target.value as 'USD' | 'EUR' | 'GBP' | 'JPY')}
                className="bg-transparent text-xs font-tech text-neutral-200 focus:outline-none cursor-pointer"
              >
                <option value="USD" className="bg-[#0E1015] text-white">USD ($)</option>
                <option value="EUR" className="bg-[#0E1015] text-white">EUR (€)</option>
                <option value="GBP" className="bg-[#0E1015] text-white">GBP (£)</option>
                <option value="JPY" className="bg-[#0E1015] text-white">JPY (¥)</option>
              </select>
            </div>

            {/* Primary Reservation CTA Button */}
            <button
              onClick={() => {
                soundEngine.playHarmonicChime();
                onOpenBookingModal();
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#C5A880] text-[#08090C] text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#D9C19D] shadow-lg shadow-[#C5A880]/20 active:scale-95 transition-all"
            >
              <Calendar size={13} />
              <span>Reserve</span>
            </button>

          </div>

          {/* Mobile Menu Hamburger Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playHarmonicChime();
                onOpenBookingModal();
              }}
              className="px-4 py-2 rounded-full bg-[#C5A880] text-[#08090C] text-[10px] font-semibold tracking-widest uppercase"
            >
              Reserve
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg glass-panel-subtle text-neutral-200 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#08090C]/98 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 sm:hidden animate-fade-in">
          <div className="flex flex-col gap-5">
            <span className="font-tech text-xs tracking-widest text-[#C5A880] uppercase">
              SANCTUARY NAVIGATION
            </span>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="font-editorial text-2xl text-left text-[#EDE8DF] hover:text-[#C5A880] transition-colors py-2 border-b border-white/5"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
            <div className="flex items-center justify-between text-xs font-tech text-neutral-400">
              <span>ATOLL LOCAL TIME</span>
              <span className="text-[#C5A880]">{localTime}</span>
            </div>

            <div className="flex items-center justify-between text-xs font-tech text-neutral-400">
              <span>PREFERRED CURRENCY</span>
              <div className="flex gap-2">
                {(['USD', 'EUR', 'GBP', 'JPY'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => onChangeCurrency(curr)}
                    className={`px-2.5 py-1 rounded text-xs ${
                      currency === curr
                        ? 'bg-[#C5A880] text-[#08090C] font-bold'
                        : 'bg-white/5 text-neutral-300'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBookingModal();
              }}
              className="w-full py-4 rounded-full bg-[#C5A880] text-[#08090C] text-xs font-bold tracking-widest uppercase shadow-xl"
            >
              Reserve a Sanctuary Suite
            </button>
          </div>
        </div>
      )}
    </>
  );
};

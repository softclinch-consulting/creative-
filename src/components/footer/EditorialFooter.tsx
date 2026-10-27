import React from 'react';
import { Compass, Phone, Mail, MapPin, Globe, Sparkles, ArrowUp } from 'lucide-react';
import { soundEngine } from '../../utils/soundEngine';

interface EditorialFooterProps {
  onNavigateToSection: (id: string) => void;
  onOpenBookingModal: () => void;
}

export const EditorialFooter: React.FC<EditorialFooterProps> = ({
  onNavigateToSection,
  onOpenBookingModal
}) => {
  const scrollToTop = () => {
    soundEngine.playSubtleTick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#060709] text-[#EDE8DF] border-t border-white/10 pt-24 pb-12 overflow-hidden">
      
      {/* Decorative Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#C5A880]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Top Invitation Banner */}
        <div className="p-8 sm:p-14 rounded-3xl glass-panel-luxury border border-[#C5A880]/30 mb-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="font-tech text-xs tracking-[0.25em] text-[#C5A880] uppercase block mb-2">
              SECLUSION AWAITS
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal mb-2">
              Begin Your Sanctuary Journey
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-xl">
              Dedicated twin-otter amphibious seaplane transfers direct from Malé International Airport to our private lagoon arrival jetty.
            </p>
          </div>

          <button
            onClick={() => {
              soundEngine.playHarmonicChime();
              onOpenBookingModal();
            }}
            className="flex-shrink-0 px-8 py-4 rounded-full bg-[#C5A880] text-[#08090C] text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#D9C19D] shadow-xl shadow-[#C5A880]/20 transition-all"
          >
            Reserve Your Villa
          </button>
        </div>

        {/* 4 Columns Navigation & Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-16 border-b border-white/10">
          
          {/* Col 1: Brand & Coordinates */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
              <span className="font-cinzel text-2xl tracking-[0.25em] text-white">
                AURELIA
              </span>
            </div>
            <p className="font-tech text-[10px] tracking-[0.3em] text-[#A99D8D] uppercase mb-6">
              SANCTUARY & PRIVATE OCEAN ATOLL
            </p>
            <p className="text-xs text-neutral-400 font-light leading-relaxed mb-6">
              A private 142-hectare marine biosphere sanctuary designed for profound stillness, high oceanic gastronomy, and restored vitality.
            </p>
            <div className="flex items-center gap-2 text-xs font-tech text-[#C5A880]">
              <Compass size={14} />
              <span>LAT 4.1755° N • LON 73.5093° E</span>
            </div>
          </div>

          {/* Col 2: Sanctuaries Navigation */}
          <div className="lg:col-span-2">
            <h4 className="font-tech text-xs tracking-widest text-white uppercase mb-4">
              DESTINATIONS
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => onNavigateToSection('villas')} className="hover:text-[#C5A880] transition-colors">
                  24 Ocean Villas
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('villas')} className="hover:text-[#C5A880] transition-colors">
                  Ocean Horizon Estate
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('dining')} className="hover:text-[#C5A880] transition-colors">
                  L’Éphémère Atoll
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('dining')} className="hover:text-[#C5A880] transition-colors">
                  Sub-Aquatic Vault
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('wellness')} className="hover:text-[#C5A880] transition-colors">
                  Thalasso Spa
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('map')} className="hover:text-[#C5A880] transition-colors">
                  Sanctuary Map
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Experiences & Stewardship */}
          <div className="lg:col-span-3">
            <h4 className="font-tech text-xs tracking-widest text-white uppercase mb-4">
              STEWARDSHIP & EXPEDITIONS
            </h4>
            <ul className="space-y-2.5 text-xs text-neutral-400">
              <li>
                <button onClick={() => onNavigateToSection('experiences')} className="hover:text-[#C5A880] transition-colors">
                  Catamaran Outer Reef Charter
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('experiences')} className="hover:text-[#C5A880] transition-colors">
                  Coral Nursery Adoption Program
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('experiences')} className="hover:text-[#C5A880] transition-colors">
                  Amphibious Seaplane Flights
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateToSection('gallery')} className="hover:text-[#C5A880] transition-colors">
                  Atmospheric Gallery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: VIP Concierge Dispatch */}
          <div className="lg:col-span-3">
            <h4 className="font-tech text-xs tracking-widest text-white uppercase mb-4">
              PRIVATE CONCIERGE
            </h4>
            <div className="space-y-3 text-xs text-neutral-300">
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-[#C5A880] mt-0.5 flex-shrink-0" />
                <span>Outer Reef Archipelago, North Haven Atoll, MV</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-[#C5A880] flex-shrink-0" />
                <span>+1 (800) AURELIA-RESORT</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#C5A880] flex-shrink-0" />
                <span>concierge@aurelia-sanctuary.com</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5">
              <span className="text-[10px] font-tech text-neutral-400 block mb-1">AMPHIBIOUS SEAPLANE VHF</span>
              <span className="text-xs font-tech text-[#C5A880]">CH-16 MARINE // 122.80 MHz</span>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-neutral-500">
          <div>
            © {new Date().getFullYear()} Aurelia Sanctuary & Ocean Atoll Ltd. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-neutral-300 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-neutral-300 cursor-pointer">Marine Biosphere Policy</span>
            <span className="hover:text-neutral-300 cursor-pointer">Terms of Stay</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 p-2 px-3 rounded-full glass-panel-subtle text-neutral-300 hover:text-white hover:border-[#C5A880]/40 transition-colors"
            title="Back to Top"
          >
            <span className="text-[10px]">BACK TO TOP</span>
            <ArrowUp size={12} />
          </button>
        </div>

      </div>
    </footer>
  );
};

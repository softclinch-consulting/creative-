import React from 'react';
import { X, CheckCircle2, Calendar, MapPin, Users, Phone, Download, Sparkles } from 'lucide-react';
import type { BookingConfirmation } from '../../types/resort';
import { formatPrice, formatDateDisplay } from '../../utils/formatters';
import { soundEngine } from '../../utils/soundEngine';

interface BookingConfirmationModalProps {
  confirmation: BookingConfirmation | null;
  onClose: () => void;
}

export const BookingConfirmationModal: React.FC<BookingConfirmationModalProps> = ({
  confirmation,
  onClose
}) => {
  if (!confirmation) return null;

  const { booking, referenceCode, totalPrice, villaName } = confirmation;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-[#0E1015] border border-[#C5A880]/40 p-6 sm:p-10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            soundEngine.playSubtleTick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-neutral-300 hover:text-white transition-colors"
          aria-label="Close confirmation"
        >
          <X size={18} />
        </button>

        {/* Success Icon & Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-[#C5A880]/15 border border-[#C5A880]/50 flex items-center justify-center text-[#C5A880] mx-auto mb-4 animate-bounce">
            <CheckCircle2 size={32} />
          </div>

          <span className="font-tech text-xs tracking-[0.25em] text-[#C5A880] uppercase block mb-1">
            RESERVATION CONFIRMED & PREVIEW RESERVED
          </span>
          <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal mb-2">
            Welcome to Aurelia Sanctuary
          </h3>
          <p className="text-xs sm:text-sm text-neutral-300 font-light max-w-md mx-auto">
            Your private island sanctuary has been reserved. Your personal butler will contact you within 2 hours to curate your arrival itinerary.
          </p>
        </div>

        {/* Reference Code Ribbon */}
        <div className="p-4 rounded-2xl glass-panel-luxury border border-[#C5A880]/30 flex items-center justify-between mb-6">
          <div>
            <span className="text-[10px] font-tech text-neutral-400 uppercase block">RESERVATION REFERENCE</span>
            <span className="font-cinzel text-xl sm:text-2xl text-[#C5A880] font-bold tracking-widest">
              {referenceCode}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] font-tech text-neutral-400 uppercase block">STATUS</span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-tech text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              CONFIRMED
            </span>
          </div>
        </div>

        {/* Summary Itinerary Details */}
        <div className="space-y-3.5 mb-8 text-xs font-tech text-neutral-300">
          <div className="flex items-center justify-between p-3 rounded-xl glass-panel-subtle">
            <span className="text-neutral-400">RESIDENCE</span>
            <span className="text-white font-semibold">{villaName}</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl glass-panel-subtle">
            <span className="text-neutral-400">DATES & DURATION</span>
            <span className="text-white">
              {formatDateDisplay(booking.checkIn)} — {formatDateDisplay(booking.checkOut)} ({booking.nights} Nights)
            </span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl glass-panel-subtle">
            <span className="text-neutral-400">PRIMARY GUEST</span>
            <span className="text-white">{booking.guestName} ({booking.guests} Guests)</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-xl glass-panel-subtle">
            <span className="text-neutral-400">SEAPLANE TRANSFERS</span>
            <span className="text-[#C5A880]">Included (Private Seaplane Lagoon)</span>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#C5A880]/10 border border-[#C5A880]/30 text-sm">
            <span className="font-semibold text-white">ESTIMATED TOTAL INVESTMENT</span>
            <span className="font-cinzel text-lg font-bold text-[#C5A880]">
              {formatPrice(totalPrice, booking.currency)}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="text-[11px] font-tech text-neutral-400 flex items-center gap-2">
            <Phone size={13} className="text-[#C5A880]" />
            <span>24/7 VIP Concierge: +1 (800) AURELIA</span>
          </div>

          <button
            onClick={() => {
              soundEngine.playSubtleTick();
              onClose();
            }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#C5A880] text-[#08090C] text-xs font-bold tracking-widest uppercase hover:bg-[#D9C19D] transition-all"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};

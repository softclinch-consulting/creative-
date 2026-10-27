import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Home, Phone, Mail, MessageSquare, Check, Sparkles, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { VILLA_SUITES } from '../../data/resortData';
import type { ReservationQuery, BookingConfirmation } from '../../types/resort';
import { formatPrice, generateBookingRef } from '../../utils/formatters';
import { soundEngine } from '../../utils/soundEngine';

interface ReservationEngineModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedVillaId?: string;
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY';
  onBookingConfirmed: (confirmation: BookingConfirmation) => void;
}

export const ReservationEngineModal: React.FC<ReservationEngineModalProps> = ({
  isOpen,
  onClose,
  preselectedVillaId,
  currency,
  onBookingConfirmed
}) => {
  // Default dates: tomorrow to +5 days
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(fiveDaysLater.getDate() + 6);

  const formatDateValue = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState<string>(formatDateValue(tomorrow));
  const [checkOut, setCheckOut] = useState<string>(formatDateValue(fiveDaysLater));
  const [villaId, setVillaId] = useState<string>(preselectedVillaId || VILLA_SUITES[0].id);
  const [guests, setGuests] = useState<number>(2);
  const [guestName, setGuestName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  const [transfersRequired, setTransfersRequired] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Update selected villa if prop changes
  useEffect(() => {
    if (preselectedVillaId) {
      setVillaId(preselectedVillaId);
    }
  }, [preselectedVillaId]);

  if (!isOpen) return null;

  const selectedVilla = VILLA_SUITES.find((v) => v.id === villaId) || VILLA_SUITES[0];

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.max(0, checkOutDate.getTime() - checkInDate.getTime());
  const nights = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const totalInvestmentUSD = selectedVilla.pricePerNightUSD * nights;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !email.trim()) {
      setErrorMessage('Please provide your name and email address for reservation confirmation.');
      return;
    }

    setErrorMessage('');
    soundEngine.playHarmonicChime(580, 1.2);

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C5A880', '#D9C19D', '#F7F4EE']
      });
    } catch {
      // safe fallback
    }

    const ref = generateBookingRef();
    const query: ReservationQuery = {
      checkIn,
      checkOut,
      villaId,
      guests,
      nights,
      guestName,
      email,
      phone,
      specialRequests,
      transfersRequired,
      currency
    };

    const confirmation: BookingConfirmation = {
      referenceCode: ref,
      booking: query,
      totalPrice: totalInvestmentUSD,
      currency,
      timestamp: new Date().toISOString(),
      villaName: selectedVilla.name
    };

    onBookingConfirmed(confirmation);
    onClose();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Aurelia Sanctuary VIP Concierge, I would like to reserve ${selectedVilla.name} from ${checkIn} to ${checkOut} for ${guests} guests.`
  );
  const whatsappUrl = `https://wa.me/18002873542?text=${whatsappMessage}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#0E1015] border border-[#C5A880]/30 shadow-2xl p-6 sm:p-10 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playSubtleTick();
            onClose();
          }}
          className="absolute top-6 right-6 z-20 p-2.5 rounded-full bg-white/10 text-neutral-300 hover:text-white transition-colors"
          aria-label="Close booking modal"
        >
          <X size={20} />
        </button>

        <div>
          {/* Header */}
          <div className="mb-8">
            <span className="font-tech text-xs tracking-[0.25em] text-[#C5A880] uppercase block mb-1">
              DIRECT RESERVATION PORTAL
            </span>
            <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal mb-2">
              Reserve Your Sanctuary
            </h3>
            <p className="text-xs sm:text-sm text-neutral-400 font-light">
              Direct bookings enjoy complimentary roundtrip seaplane transfers, daily breakfast in suite, and dedicated island butler service.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3.5 mb-6 rounded-xl bg-red-950/60 border border-red-500/40 text-xs text-red-200">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Villa Suite Selection */}
            <div>
              <label className="block text-xs font-tech text-[#C5A880] uppercase tracking-wider mb-2">
                SELECT OCEAN RESIDENCE
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VILLA_SUITES.map((villa) => {
                  const isSelected = villa.id === villaId;
                  return (
                    <button
                      type="button"
                      key={villa.id}
                      onClick={() => {
                        soundEngine.playSubtleTick();
                        setVillaId(villa.id);
                      }}
                      className={`p-3.5 rounded-xl border text-left transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-[#C5A880]/15 border-[#C5A880] ring-1 ring-[#C5A880]'
                          : 'glass-panel-subtle border-white/5 hover:border-white/20'
                      }`}
                    >
                      <img
                        src={villa.heroImage}
                        alt={villa.name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="overflow-hidden">
                        <div className="text-xs font-semibold text-white truncate">{villa.name}</div>
                        <div className="text-[11px] font-tech text-[#C5A880]">
                          {formatPrice(villa.pricePerNightUSD, currency)} / night
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dates & Guests Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-tech text-neutral-300 uppercase tracking-wider mb-1.5">
                  CHECK-IN DATE
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-panel-subtle border border-white/10 text-xs font-tech text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-tech text-neutral-300 uppercase tracking-wider mb-1.5">
                  CHECK-OUT DATE
                </label>
                <div className="relative">
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl glass-panel-subtle border border-white/10 text-xs font-tech text-white focus:outline-none focus:border-[#C5A880]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-tech text-neutral-300 uppercase tracking-wider mb-1.5">
                  GUESTS (MAX {selectedVilla.maxGuests})
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl glass-panel-subtle border border-white/10 text-xs font-tech text-white focus:outline-none focus:border-[#C5A880] cursor-pointer"
                >
                  {Array.from({ length: selectedVilla.maxGuests }).map((_, i) => (
                    <option key={i + 1} value={i + 1} className="bg-[#0E1015] text-white">
                      {i + 1} Guest{i > 0 ? 's' : ''}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Guest Details Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-tech text-neutral-300 uppercase tracking-wider mb-1.5">
                  FULL NAME
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lord & Lady Sterling"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass-panel-subtle border border-white/10 text-xs font-sans-clean text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs font-tech text-neutral-300 uppercase tracking-wider mb-1.5">
                  CONFIRMATION EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="sterling@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass-panel-subtle border border-white/10 text-xs font-sans-clean text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>

              <div>
                <label className="block text-xs font-tech text-neutral-300 uppercase tracking-wider mb-1.5">
                  PHONE / WHATSAPP
                </label>
                <input
                  type="tel"
                  placeholder="+1 (555) 019-2834"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass-panel-subtle border border-white/10 text-xs font-sans-clean text-white focus:outline-none focus:border-[#C5A880]"
                />
              </div>
            </div>

            {/* Special Requests */}
            <div>
              <label className="block text-xs font-tech text-neutral-300 uppercase tracking-wider mb-1.5">
                CURATED REQUESTS & DIETARY PREFERENCES
              </label>
              <textarea
                rows={2}
                placeholder="Private anniversary champagne, dietary restrictions, preferred pillow firmness, seaplane arrival schedule..."
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl glass-panel-subtle border border-white/10 text-xs font-sans-clean text-white focus:outline-none focus:border-[#C5A880] resize-none"
              />
            </div>

            {/* Price Breakdown Calculation */}
            <div className="p-4 rounded-2xl glass-panel-luxury border border-[#C5A880]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-neutral-300">
                  <span className="font-semibold text-white">{selectedVilla.name}</span> × {nights} Night{nights > 1 ? 's' : ''}
                </div>
                <div className="text-[11px] font-tech text-[#C5A880] mt-0.5">
                  Includes Seaplane Transfers, Butler & Gourmet Breakfast
                </div>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] font-tech text-neutral-400 uppercase block">TOTAL INVESTMENT</span>
                <span className="font-cinzel text-2xl font-bold text-white">
                  {formatPrice(totalInvestmentUSD, currency)}
                </span>
              </div>
            </div>

            {/* Submit & WhatsApp Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
              
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-emerald-500/40 text-emerald-400 text-xs font-tech hover:bg-emerald-950/40 transition-colors"
              >
                <MessageSquare size={14} />
                <span>Book via WhatsApp VIP Concierge</span>
              </a>

              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#C5A880] text-[#08090C] text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#D9C19D] shadow-xl shadow-[#C5A880]/30 transition-all"
              >
                <span>Confirm Reservation</span>
                <ArrowRight size={15} />
              </button>

            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

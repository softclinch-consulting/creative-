import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle2, Sparkles, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEngine } from '../../utils/soundEngine';

export const ProjectEnquirySection: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('Modern Villa');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [refNumber, setRefNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    soundEngine.playHarmonicChime(640, 1.2);
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#D4AF37', '#E6C387', '#FFFFFF']
      });
    } catch {
      // safe fallback
    }

    const generatedRef = 'BT-' + Math.floor(100000 + Math.random() * 900000);
    setRefNumber(generatedRef);
    setIsSubmitted(true);
  };

  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hello Building Tomorrow team, my name is ${name || 'a prospective client'}. I am interested in a ${projectType} project in Chennai.`
  )}`;

  return (
    <section id="enquiry" className="relative py-28 md:py-36 bg-[#0A0C10]/60 backdrop-blur-sm text-[#EDE8DF] border-t border-white/5 overflow-hidden">
      
      {/* High-Resolution Architectural Backdrop Image */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <img
          src="/images/backgrounds/modern-villa-twilight-pool.jpg"
          alt="Architectural Villa Landscape"
          className="w-full h-full object-cover object-center opacity-45 filter contrast-115 brightness-90"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C10]/85 via-[#0A0C10]/50 to-[#06080B]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0C10]/80 via-transparent to-[#0A0C10]/70" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Section Header Indicator matching Box 11 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-[11px] font-tech text-[#D4AF37] tracking-[0.25em] uppercase mb-4">
            <span>11 // PROJECT ENQUIRY &bull; 42 – 48s</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column matching Storyboard Box 11 */}
          <div className="lg:col-span-5">
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-white mb-4 leading-tight">
              Let’s Build <br />
              <span className="italic font-light gold-text-gradient">Your Dream Home.</span>
            </h2>

            <p className="font-sans-clean text-neutral-300 text-sm md:text-base font-light leading-relaxed mb-8">
              Tell us about your project. We’ll get back to you with the best architectural solution, feasibility estimate, and timeline.
            </p>

            {/* Contact Details from Storyboard */}
            <div className="space-y-4 mb-8">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 p-3.5 rounded-xl glass-panel-subtle hover:border-[#D4AF37]/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                  <Phone size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-tech text-neutral-400 uppercase">DIRECT PHONE / WHATSAPP</div>
                  <div className="text-sm font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                    +91 98765 43210
                  </div>
                </div>
              </a>

              <a
                href="mailto:info@company.com"
                className="flex items-center gap-3 p-3.5 rounded-xl glass-panel-subtle hover:border-[#D4AF37]/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                  <Mail size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-tech text-neutral-400 uppercase">OFFICIAL EMAIL</div>
                  <div className="text-sm font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
                    info@company.com
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3.5 rounded-xl glass-panel-subtle">
                <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37]">
                  <MapPin size={18} />
                </div>
                <div>
                  <div className="text-[10px] font-tech text-neutral-400 uppercase">REGISTERED OFFICE</div>
                  <div className="text-sm font-semibold text-white">
                    Chennai, Tamil Nadu
                  </div>
                </div>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-tech text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageSquare size={14} />
              <span>Instant Chat on WhatsApp (+91 98765 43210)</span>
            </a>
          </div>

          {/* Right Column: Interactive Project Enquiry Form matching Storyboard Box 11 */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#FFFFFF] text-[#0A0C10] p-8 sm:p-12 shadow-2xl border border-white/20">
              
              {isSubmitted ? (
                <div className="text-center py-8 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={36} />
                  </div>
                  <span className="font-tech text-xs tracking-widest text-neutral-500 uppercase block mb-1">
                    ENQUIRY TRANSMITTED &bull; REF: {refNumber}
                  </span>
                  <h3 className="font-editorial text-3xl font-bold mb-2">
                    Thank You, {name}!
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6">
                    Our lead structural architect will review your project requirements and connect with you on {phone} within 2 business hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-2.5 rounded-full bg-[#0A0C10] text-white text-xs font-bold tracking-widest uppercase hover:bg-neutral-800 transition-all"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="font-cinzel text-2xl font-bold text-[#0A0C10] tracking-wide mb-1">
                      Project Enquiry
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Fill out the form below. A confirmation reference will be generated immediately.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                        Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                        Project Type
                      </label>
                      <select
                        value={projectType}
                        onChange={(e) => setProjectType(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all cursor-pointer bg-white"
                      >
                        <option value="Modern Villa">Modern Villa (Residential)</option>
                        <option value="Luxury Apartment">Luxury Apartment (Duplex / Penthouse)</option>
                        <option value="Commercial Complex">Office / Commercial Complex</option>
                        <option value="Interior Renovation">Luxury Interior Architecture</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                        Message *
                      </label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Tell us about your plot size, location, desired timeline, or custom requirements..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-sm focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-[#0A0C10] text-[#FFFFFF] text-xs font-bold tracking-[0.2em] uppercase hover:bg-neutral-800 active:scale-95 transition-all shadow-xl flex items-center justify-center gap-2"
                    >
                      <span>Send Enquiry</span>
                      <Send size={14} />
                    </button>
                  </form>
                </>
              )}

            </div>
          </div>

        </div>

        <div className="mt-12 text-center text-xs font-tech text-neutral-500">
          The user fills out the enquiry form. A confirmation message appears with dedicated reference code.
        </div>

      </div>
    </section>
  );
};

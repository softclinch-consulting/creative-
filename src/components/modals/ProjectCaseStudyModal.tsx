import React from 'react';
import { X, MapPin, Maximize2, Calendar, ArrowRight, Check } from 'lucide-react';
import type { FeaturedProject } from '../../types/building';
import { soundEngine } from '../../utils/soundEngine';

interface ProjectCaseStudyModalProps {
  project: FeaturedProject | null;
  onClose: () => void;
  onEnquire: () => void;
}

export const ProjectCaseStudyModal: React.FC<ProjectCaseStudyModalProps> = ({
  project,
  onClose,
  onEnquire
}) => {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#0E121A] border border-[#D4AF37]/40 shadow-2xl p-6 sm:p-10 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            soundEngine.playSubtleTick();
            onClose();
          }}
          className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-neutral-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div>
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden mb-8">
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E121A] via-transparent to-transparent" />
            <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-full glass-panel-luxury text-xs font-tech text-[#D4AF37] uppercase">
              {project.category} CASE STUDY
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6 pb-6 border-b border-white/10">
            <div>
              <h3 className="font-editorial text-3xl sm:text-4xl text-white font-normal mb-1">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 text-xs font-tech text-neutral-400">
                <MapPin size={13} className="text-[#D4AF37]" />
                <span>{project.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-xs font-tech">
              <div>
                <span className="text-neutral-500 block">BUILT-UP AREA</span>
                <span className="text-white font-semibold text-sm">{project.area}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">EXECUTION</span>
                <span className="text-white font-semibold text-sm">{project.duration}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-neutral-300 font-light leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag, i) => (
              <span key={i} className="px-3 py-1 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-xs font-tech text-[#D4AF37]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-tech text-neutral-400">
            Delivered on-time with zero cost overruns & 100% municipal approval compliance.
          </div>

          <button
            onClick={() => {
              onClose();
              onEnquire();
            }}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#D4AF37] text-[#0A0C10] text-xs font-bold tracking-widest uppercase hover:bg-[#E6C387] transition-all flex items-center justify-center gap-2"
          >
            <span>Enquire Similar Build</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { ArrowRight, MapPin, Maximize2, Calendar, Sparkles } from 'lucide-react';
import { FEATURED_PROJECTS } from '../../data/buildingData';
import type { FeaturedProject } from '../../types/building';
import { soundEngine } from '../../utils/soundEngine';

interface FeaturedProjectsSectionProps {
  onSelectProject: (proj: FeaturedProject) => void;
}

export const FeaturedProjectsSection: React.FC<FeaturedProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Residential', 'Commercial'];

  const filteredProjects = activeCategory === 'All'
    ? FEATURED_PROJECTS
    : FEATURED_PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-28 md:py-36 bg-[#0A0C10]/60 backdrop-blur-sm text-[#EDE8DF] border-t border-white/5 overflow-hidden">
      
      {/* High-Resolution Architectural Backdrop */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        <img
          src="/images/backgrounds/architectural-masterpiece-fullbody.jpg"
          alt="Featured Architecture Masterpiece Backdrop"
          className="w-full h-full object-cover object-center opacity-25 filter contrast-110 brightness-80"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C10]/85 via-[#0A0C10]/60 to-[#0A0C10]/85" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        
        {/* Section Header matching Storyboard Box 09 */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel-subtle text-[11px] font-tech text-[#D4AF37] tracking-[0.25em] uppercase mb-4">
              <span>09 // FEATURED PROJECTS &bull; 30 – 36s</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-white">
              Featured Projects
            </h2>
            <p className="font-editorial italic text-xl text-[#E6C387] mt-1">
              Real spaces. Real stories.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEngine.playSubtleTick();
                  setActiveCategory(cat);
                }}
                className={`px-5 py-2 rounded-full text-xs font-tech tracking-wider uppercase transition-all ${
                  activeCategory === cat
                    ? 'bg-[#D4AF37] text-[#0A0C10] font-bold'
                    : 'glass-panel-subtle text-neutral-300 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => {
                soundEngine.playSubtleTick();
                onSelectProject(proj);
              }}
              className="group rounded-3xl overflow-hidden glass-panel-luxury border border-white/5 cursor-pointer flex flex-col justify-between glass-panel-hover"
            >
              <div className="relative h-64 overflow-hidden bg-black/50">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E121A] via-transparent to-transparent" />
                
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full glass-panel-subtle text-[10px] font-tech text-[#D4AF37] tracking-wider uppercase">
                  {proj.category}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-editorial text-2xl text-white font-normal mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {proj.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs font-tech text-neutral-400 mb-4">
                    <MapPin size={12} className="text-[#D4AF37]" />
                    <span>{proj.location}</span>
                  </div>

                  <p className="text-xs text-neutral-300 font-light leading-relaxed mb-6">
                    {proj.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {proj.tags.map((t, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-tech text-neutral-400">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-tech">
                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <Maximize2 size={12} className="text-[#D4AF37]" />
                    <span>{proj.area}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[#D4AF37] group-hover:translate-x-1 transition-transform">
                    <span>Inspect Case Study</span>
                    <ArrowRight size={13} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-xs font-tech text-neutral-400">
          Showcase past projects with smooth image reveals and hover effects.
        </div>

      </div>
    </section>
  );
};

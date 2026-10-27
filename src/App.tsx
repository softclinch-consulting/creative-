import React, { useState, useEffect } from 'react';
import { BuildingNavbar } from './components/navigation/BuildingNavbar';
import { FrameSequenceScrolltelling } from './components/scrolltelling/FrameSequenceScrolltelling';
import { ServiceOverviewSection } from './components/sections/ServiceOverviewSection';
import { FeaturedProjectsSection } from './components/sections/FeaturedProjectsSection';
import { ConstructionProcessSection } from './components/sections/ConstructionProcessSection';
import { ProjectEnquirySection } from './components/sections/ProjectEnquirySection';
import { BottomCtaBar } from './components/sections/BottomCtaBar';
import { ProjectCaseStudyModal } from './components/modals/ProjectCaseStudyModal';
import { CustomArchitecturalCursor } from './components/cursor/CustomArchitecturalCursor';
import type { FeaturedProject } from './types/building';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('journey');
  const [selectedProject, setSelectedProject] = useState<FeaturedProject | null>(null);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['journey', 'services', 'projects', 'process', 'enquiry'];
      const scrollPos = window.scrollY + 300;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToEnquiry = () => {
    const el = document.getElementById('enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToProcess = () => {
    const el = document.getElementById('process');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0A0C10] text-[#EDE8DF] selection:bg-[#D4AF37]/30 selection:text-white">
      
      {/* High-Resolution Full-Body Architectural Canvas Backdrop (From Top to Down) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <img
          src="/images/backgrounds/architectural-masterpiece-fullbody.jpg"
          alt="Architectural Masterpiece"
          className="w-full h-full object-cover object-center opacity-35 filter contrast-115 brightness-90 scale-100"
        />
        {/* Deep luxury vignette gradient overlay so all text remains razor sharp */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0C10]/80 via-[#0A0C10]/50 to-[#06080B]/90" />
        {/* Subtle architectural texture grain overlay */}
        <div className="absolute inset-0 opacity-[0.03] cinema-grain" />
      </div>

      {/* Precision Architectural Custom Cursor with CAD Coordinates */}
      <CustomArchitecturalCursor />

      {/* Top Brand Navigation Header */}
      <BuildingNavbar
        onStartProject={handleScrollToEnquiry}
        activeSection={activeSection}
      />

      <main className="relative z-10">
        {/* Scroll-Driven Construction Frame Animation (150 Frames from ezgif-83b4b4e9a8dce43c-jpg) */}
        <FrameSequenceScrolltelling
          onExploreProcess={handleScrollToProcess}
          onStartProject={handleScrollToEnquiry}
        />

        {/* Stage 08: Service Overview */}
        <ServiceOverviewSection
          onSelectService={handleScrollToEnquiry}
        />

        {/* Stage 09: Featured Projects */}
        <FeaturedProjectsSection
          onSelectProject={(proj) => setSelectedProject(proj)}
        />

        {/* Stage 10: Our Construction Process */}
        <ConstructionProcessSection />

        {/* Stage 11: Project Enquiry Form (Chennai, Tamil Nadu) */}
        <ProjectEnquirySection />
      </main>

      {/* Stage 12 & Bottom Trust Banner */}
      <BottomCtaBar
        onStartProject={handleScrollToEnquiry}
      />

      {/* Project Case Study Lightbox Modal */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onEnquire={handleScrollToEnquiry}
      />

    </div>
  );
};

export default App;

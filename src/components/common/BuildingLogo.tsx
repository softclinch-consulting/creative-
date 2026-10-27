import React from 'react';

interface BuildingLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}

export const BuildingLogo: React.FC<BuildingLogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-lg md:text-xl',
    lg: 'text-2xl md:text-3xl'
  };

  const subTextSizes = {
    sm: 'text-[8px]',
    md: 'text-[9px]',
    lg: 'text-[11px]'
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Storyboard Architectural Triple-Pillar Arch Vector */}
      <div className={`${iconSizes[size]} flex-shrink-0 flex items-center justify-center`}>
        <svg
          viewBox="0 0 44 44"
          className="w-full h-full stroke-[#D4AF37] fill-none stroke-[2.75]"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Outer Gable / Arched Roof Line */}
          <path d="M 6 40 V 18 L 22 6 L 38 18 V 40" />
          {/* Center Tall Supporting Column */}
          <path d="M 22 13 V 40" strokeWidth="2.75" />
          {/* Left Vertical Shadow Column */}
          <path d="M 14 24 V 40" strokeWidth="2.25" strokeOpacity="0.85" />
          {/* Right Vertical Column */}
          <path d="M 30 24 V 40" strokeWidth="2.25" strokeOpacity="0.85" />
        </svg>
      </div>

      <div className="flex flex-col text-left">
        <span className={`font-cinzel ${textSizes[size]} font-bold tracking-[0.22em] text-white leading-tight`}>
          BUILDING TOMORROW
        </span>
        {showSubtitle && (
          <span className={`font-tech ${subTextSizes[size]} tracking-[0.25em] text-[#C5A059] uppercase mt-0.5`}>
            CONSTRUCTION &bull; ARCHITECTURE &bull; INTERIOR DESIGN
          </span>
        )}
      </div>
    </div>
  );
};

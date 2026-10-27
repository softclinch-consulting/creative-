import type {
  StoryboardStage,
  ServiceItem,
  FeaturedProject,
  ProcessStep
} from '../types/building';

export const STORYBOARD_STAGES: StoryboardStage[] = [
  {
    id: 'stage-01',
    number: '01',
    timeRange: '0 – 4s',
    tag: 'HERO – EMPTY LAND',
    title: 'From Empty Land to Your Dream Home',
    subtitle: 'Every great home begins with a vision.',
    description: 'The website opens with a cinematic view of an empty plot bathed in golden sunrise. A smooth scroll triggers the next stage as the transformation begins.',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=2400&q=88',
    stageName: 'Land',
    telemetry: {
      phase: 'Site Survey & Land Acquisition',
      progress: 5,
      elevation: 'Grade Level ±0.00m',
      keyMetric: '2,400 sq.ft',
      metricLabel: 'Prime Land Area'
    }
  },
  {
    id: 'stage-02',
    number: '02',
    timeRange: '4 – 8s',
    tag: 'PLANNING & ARCHITECTURE',
    title: 'Thoughtful Design. Functional Living.',
    subtitle: 'Precision architectural schematics taking form.',
    description: 'Blueprints appear and transform into an interactive 3D architectural model. The land gradually takes shape with structural calculations, orientation, and bioclimatic planning.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=88',
    stageName: 'Design',
    telemetry: {
      phase: 'BIM Modeling & Structural Design',
      progress: 20,
      elevation: 'Cad Datum +3.20m',
      keyMetric: '100% Custom',
      metricLabel: 'Vastu & Solar Aligned'
    }
  },
  {
    id: 'stage-03',
    number: '03',
    timeRange: '8 – 12s',
    tag: 'FOUNDATION',
    title: 'Strong Foundations for a Lasting Home.',
    subtitle: 'Engineered earthwork, seismic footings, and solid concrete.',
    description: 'The ground opens up to reveal excavation and deep reinforced foundation footings. Concrete pours, high-grade steel rebars, and subterranean waterproofing begin in real time.',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f8?auto=format&fit=crop&w=2400&q=88',
    stageName: 'Foundation',
    telemetry: {
      phase: 'Sub-structure & Raft Footing',
      progress: 35,
      elevation: 'Excavation -2.80m',
      keyMetric: 'Fe 550D Steel',
      metricLabel: 'Seismic Grade Rebar'
    }
  },
  {
    id: 'stage-04',
    number: '04',
    timeRange: '12 – 16s',
    tag: 'STRUCTURE',
    title: 'Built with Precision. Designed for Generations.',
    subtitle: 'Monolithic reinforced columns, slabs, and beam framing.',
    description: 'The structure rises section by section — robust vertical columns, load-bearing concrete slabs, and architectural shear walls come together with laser alignment.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2400&q=88',
    stageName: 'Structure',
    telemetry: {
      phase: 'Superstructure Framing',
      progress: 55,
      elevation: 'Structural Crown +10.50m',
      keyMetric: 'M35 Concrete',
      metricLabel: 'Compressive Strength'
    }
  },
  {
    id: 'stage-05',
    number: '05',
    timeRange: '16 – 20s',
    tag: 'ROOFING & EXTERIOR',
    title: 'More Than a House. A Lifestyle.',
    subtitle: 'Architectural envelopes, exterior cladding, and horizon glazing.',
    description: 'The roof, exterior natural stone finishes, weather-resistant louvers, and motorized double-glazed thermal windows are installed. The home takes its iconic contemporary form.',
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=2400&q=88',
    stageName: 'Exterior',
    telemetry: {
      phase: 'Facade Cladding & Fenestration',
      progress: 75,
      elevation: 'Parapet Level +12.00m',
      keyMetric: 'Thermal Glass',
      metricLabel: 'Acoustic Sound Barrier'
    }
  },
  {
    id: 'stage-06',
    number: '06',
    timeRange: '20 – 24s',
    tag: 'INTERIOR DESIGN',
    title: 'Beautiful Interiors. Better Living.',
    subtitle: 'Bespoke marble, warm indirect cove lighting, and tailored comfort.',
    description: 'The camera moves inside — showcasing the refined interior architecture, Italian marble flooring, custom modular millwork, and balanced natural ambient lighting.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=88',
    stageName: 'Interior',
    telemetry: {
      phase: 'Interior Joinery & Fine Finishes',
      progress: 90,
      elevation: 'Ground Floor Interior +0.45m',
      keyMetric: '3000K Warm',
      metricLabel: 'Architectural Lighting'
    }
  },
  {
    id: 'stage-07',
    number: '07',
    timeRange: '24 – 26s',
    tag: 'COMPLETED HOME',
    title: 'From Vision. to Reality.',
    subtitle: 'Your completed architectural masterpiece at twilight.',
    description: 'Lush landscaping, garden pathway lighting, a heated infinity plunge pool, and final turnkey touches complete the home. The metamorphosis from bare earth is complete.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2400&q=88',
    stageName: 'Complete',
    telemetry: {
      phase: 'Turnkey Handover & Commissioning',
      progress: 100,
      elevation: 'Full Estate Handover',
      keyMetric: '100% Complete',
      metricLabel: 'Occupancy Ready'
    }
  }
];

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'architecture',
    title: 'Architecture',
    tagline: 'Innovative designs for modern living.',
    description: 'Contemporary spatial planning, 3D parametric BIM modeling, structural stability certifications, and climate-responsive natural ventilation layouts.',
    iconName: 'Compass',
    deliverables: ['Conceptual 3D Visualizations', 'Structural Blueprint Package', 'Municipal Sanctions & Approvals', 'Vastu Shastra Alignment']
  },
  {
    id: 'construction',
    title: 'Construction',
    tagline: 'Quality build. On-time delivery.',
    description: 'Turnkey civil contracting engineered with certified Grade-A materials, stringent batch testing, anti-termite treatment, and rigorous daily QC tracking.',
    iconName: 'HardHat',
    deliverables: ['Civil & Structural Engineering', 'Rigorous Material QC Testing', 'Live Project CCTV Feed Access', 'Guaranteed Milestones Schedule']
  },
  {
    id: 'interior-design',
    title: 'Interior Design',
    tagline: 'Spaces that inspire.',
    description: 'Tailored luxury interiors featuring imported Italian marble, custom veneer joinery, automated architectural smart lighting, and curated furnishings.',
    iconName: 'Layout',
    deliverables: ['Custom Modular Kitchens', 'Architectural Acoustic Ceilings', 'Designer Walk-in Wardrobes', 'Curated Art & Furnishing Sourcing']
  },
  {
    id: 'project-management',
    title: 'Project Management',
    tagline: 'Seamless process. Total transparency.',
    description: 'End-to-end site management with zero hidden fees, weekly itemized audits, milestone tracking, and dedicated single-point project engineers.',
    iconName: 'ClipboardCheck',
    deliverables: ['Dedicated Senior Project Engineer', 'Weekly Progress Dashboard & Photos', 'Itemized Escrow Cost Tracking', 'Lifetime Structural Warranty Support']
  }
];

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'proj-01',
    title: 'Modern Villa',
    category: 'Residential',
    location: 'Boat Club Road, Chennai',
    area: '5,800 sq.ft',
    duration: '11 Months',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    description: 'A striking 3-level contemporary villa with cantilevered balconies, a private rooftop pool, and floor-to-ceiling panoramic glass facade.',
    tags: ['Turnkey Build', 'Private Pool', 'Solar Powered']
  },
  {
    id: 'proj-02',
    title: 'Luxury Apartment',
    category: 'Residential',
    location: 'Poes Garden, Chennai',
    area: '4,200 sq.ft Duplex',
    duration: '8 Months',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    description: 'Double-height luxury penthouse with imported Statuario marble, acoustic motorized drapery, and custom oak millwork throughout.',
    tags: ['Interior Architecture', 'Smart Home', 'Bespoke Joinery']
  },
  {
    id: 'proj-03',
    title: 'Office Complex',
    category: 'Commercial',
    location: 'OMR Tech Corridor, Chennai',
    area: '18,500 sq.ft',
    duration: '14 Months',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    description: 'State-of-the-art corporate headquarters featuring high-efficiency double glazing, biophilic interior atrium, and LEED Gold compliance.',
    tags: ['Commercial Civil', 'LEED Gold', 'Fast-Track Handover']
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: '01',
    title: 'Planning & Design',
    subtitle: 'From Concept to Detailed Blueprints',
    description: 'Soil testing, topographical survey, 3D architectural modeling, Vastu consultation, and complete municipal plan sanctioning.',
    milestones: ['Topographical & Soil Test', '3D Walkthrough & Renderings', 'Structural Engineering Stamp']
  },
  {
    step: '02',
    title: 'Foundation & Structure',
    subtitle: 'Groundwork & Robust Columns',
    description: 'Deep mechanical excavation, reinforced anti-crack raft footings, anti-termite chemical barrier, and casting of RCC columns and beams.',
    milestones: ['Deep Excavation & Compaction', 'Subterranean Waterproofing', 'RCC Framework Erection']
  },
  {
    step: '03',
    title: 'Construction & Finishing',
    subtitle: 'Brickwork, Glazing & Interiors',
    description: 'Solid autoclaved aerated concrete block masonry, concealed electrical plumbing conduits, Italian marble installation, and weathercoat painting.',
    milestones: ['AAC Block Masonry', 'Concealed MEP Systems', 'Premium Marble & Tile Laying']
  },
  {
    step: '04',
    title: 'Handover & Support',
    subtitle: 'Turnkey Walkthrough & Warranty',
    description: 'Comprehensive 120-point quality audit, deep cleaning, operational testing of all MEP systems, keys handover, and 10-year structural warranty documentation.',
    milestones: ['120-Point QC Certification', 'Turnkey Key Handover', '10-Year Structural Guarantee']
  }
];

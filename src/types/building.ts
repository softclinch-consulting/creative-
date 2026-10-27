export interface StoryboardStage {
  id: string;
  number: string;
  timeRange: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stageName: 'Land' | 'Design' | 'Foundation' | 'Structure' | 'Exterior' | 'Interior' | 'Complete';
  telemetry: {
    phase: string;
    progress: number;
    elevation: string;
    keyMetric: string;
    metricLabel: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  deliverables: string[];
}

export interface FeaturedProject {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Interior';
  location: string;
  area: string;
  duration: string;
  image: string;
  description: string;
  tags: string[];
}

export interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  milestones: string[];
}

export interface ProjectEnquiryData {
  name: string;
  phone: string;
  email?: string;
  projectType: 'Modern Villa' | 'Luxury Apartment' | 'Commercial Complex' | 'Interior Renovation';
  message: string;
  budgetRange?: string;
  location?: string;
}

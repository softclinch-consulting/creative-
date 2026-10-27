export interface ResortScene {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  stage: 'arrival' | 'approach' | 'property' | 'discovery' | 'reserve';
  ambientLabel: string;
  coordinates: string;
  altitude: string;
  description: string;
  highlightStat: {
    label: string;
    value: string;
  };
}

export interface VillaSuite {
  id: string;
  name: string;
  tagline: string;
  category: 'Overwater' | 'Cliffside' | 'Beachfront' | 'Presidential';
  pricePerNightUSD: number;
  sqm: number;
  sqft: number;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  heroImage: string;
  gallery: string[];
  features: string[];
  amenities: string[];
  view: string;
  poolType: string;
  floorPlanDetails: string;
}

export interface DiningVenue {
  id: string;
  name: string;
  chef: string;
  cuisine: string;
  accolade: string;
  description: string;
  image: string;
  timings: string;
  signatureDish: string;
  sommelierHighlight: string;
}

export interface WellnessExperience {
  id: string;
  name: string;
  duration: string;
  description: string;
  image: string;
  focus: string;
  signatureTreatment: string;
  benefit: string;
}

export interface CuratedExperience {
  id: string;
  title: string;
  type: 'Marine' | 'Aviation' | 'Gastronomic' | 'Mindfulness';
  description: string;
  image: string;
  duration: string;
  exclusive: boolean;
  highlight: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'All' | 'Villas' | 'Atoll & Aerial' | 'Gastronomy' | 'Wellness';
  image: string;
  caption: string;
  location: string;
}

export interface SanctuaryMapPoint {
  id: string;
  name: string;
  category: 'Villa' | 'Dining' | 'Wellness' | 'Arrival' | 'Recreation';
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  description: string;
  image: string;
  tag: string;
}

export interface ReservationQuery {
  checkIn: string;
  checkOut: string;
  villaId: string;
  guests: number;
  nights: number;
  guestName: string;
  email: string;
  phone: string;
  specialRequests: string;
  transfersRequired: boolean;
  currency: 'USD' | 'EUR' | 'GBP' | 'JPY';
}

export interface BookingConfirmation {
  referenceCode: string;
  booking: ReservationQuery;
  totalPrice: number;
  currency: string;
  timestamp: string;
  villaName: string;
}

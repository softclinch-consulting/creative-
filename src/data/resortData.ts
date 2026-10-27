import type {
  ResortScene,
  VillaSuite,
  DiningVenue,
  WellnessExperience,
  CuratedExperience,
  GalleryItem,
  SanctuaryMapPoint
} from '../types/resort';

export const RESORT_METRICS = {
  name: 'AURELIA SANCTUARY',
  subName: 'Private Ocean Atoll & Cliffside Villas',
  location: 'Outer Barrier Atoll, 4.1755° N, 73.5093° E',
  founded: '2022',
  stars: '5-Star Ultra-Luxury',
  villaCount: 24,
  privateAtollArea: '142 Hectares',
  waterClarity: '35m Visibility',
  butlerRatio: '1:1 Private Butler Per Villa'
};

export const RESORT_SCENES: ResortScene[] = [
  {
    id: 'scene-01',
    number: '01',
    title: 'The Art of Arrival',
    subtitle: 'Where untouched horizon meets architectural stillness',
    stage: 'arrival',
    ambientLabel: 'AERIAL REEF APPROACH',
    coordinates: 'LAT 4.1755° N • LON 73.5093° E',
    altitude: 'Altitude: 350m Descent',
    description: 'Your journey begins above the turquoise gradient of the outer barrier atoll. A secluded coral archipelago where time dissolves and true seclusion begins.',
    highlightStat: {
      label: 'ISLAND SECLUSION',
      value: '100% Private'
    }
  },
  {
    id: 'scene-02',
    number: '02',
    title: 'The Coral Gateway',
    subtitle: 'Gliding across crystal shallows to the teak arrival pavilion',
    stage: 'approach',
    ambientLabel: 'LAGOON THRESHOLD',
    coordinates: 'SEAPLANE JETTY // BASIN A',
    altitude: 'Water Level: +1.2m',
    description: 'Stepping from the twin-otter seaplane onto hand-carved teak docks. The scent of wild frangipani and warm ocean air welcomes your dedicated island butler.',
    highlightStat: {
      label: 'ARRIVAL TRANSIT',
      value: 'Direct Seaplane'
    }
  },
  {
    id: 'scene-03',
    number: '03',
    title: 'Architectural Sanctuaries',
    subtitle: 'Twenty-four private ocean villas cantilevered over living coral',
    stage: 'property',
    ambientLabel: 'VILLA OVERWATER STRATA',
    coordinates: 'NORTH REEF ARC • SUITES 01-14',
    altitude: 'Overwater Clearance: 2.8m',
    description: 'Designed in harmony with marine topography. Motorized glass walls open completely to uninterrupted sun horizons, private lap pools, and catamaran daybed nets.',
    highlightStat: {
      label: 'VILLAS & ESTATES',
      value: '24 Private Pavilions'
    }
  },
  {
    id: 'scene-04',
    number: '04',
    title: 'Sensory Immersion',
    subtitle: 'Sub-aquatic gastronomy, thalassotherapy, and ocean serenity',
    stage: 'discovery',
    ambientLabel: 'CULINARY & SPA BIOSPHERE',
    coordinates: 'REEF CAVERN // SPA ARC',
    altitude: 'Depth: -5.0m to +8.5m',
    description: 'Dine five meters below the tide in our sub-aquatic wine vault, or surrender to heated marine mineral currents in the open-air ocean spa pavilion.',
    highlightStat: {
      label: 'MICHELIN DINING',
      value: '3 Stars Atelier'
    }
  },
  {
    id: 'scene-05',
    number: '05',
    title: 'Reserve Your Seclusion',
    subtitle: 'Begin your bespoke retreat with dedicated private butler service',
    stage: 'reserve',
    ambientLabel: 'CONCIERGE & RESERVATION PORTAL',
    coordinates: 'AURELIA PRIVATE REGISTRATION',
    altitude: 'VIP Concierge Desk',
    description: 'Complimentary private seaplane transfers, bespoke dining menus curated to your palate, and unrestricted ocean freedom await.',
    highlightStat: {
      label: 'GUARANTEED BEST RATE',
      value: 'Direct Booking'
    }
  }
];

export const VILLA_SUITES: VillaSuite[] = [
  {
    id: 'ocean-horizon-estate',
    name: 'The Ocean Horizon Grand Estate',
    tagline: 'The pinnacle of overwater living with 360° lagoon vistas',
    category: 'Presidential',
    pricePerNightUSD: 5400,
    sqm: 850,
    sqft: 9150,
    maxGuests: 6,
    bedrooms: 3,
    bathrooms: 4,
    heroImage: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=85'
    ],
    features: [
      '25-meter private overwater infinity lap pool',
      'Glass-bottom salon with illuminated coral night reef',
      'Private sunset cocktail bar with dedicated mixologist',
      'Direct ocean staircase with private snorkeling reef launch'
    ],
    amenities: [
      '24/7 Dedicated Private Butler',
      'Complimentary Roundtrip Twin-Otter Seaplane Transfers',
      'Bespoke Daily Wine Tasting in Private Suite',
      'Dyson Supersonic & Diptyque Paris Bath Amenities',
      'Sonos Architectural Sub-bass Sound Environment',
      'Sub-zero Wine Cellar stocked with Grand Cru vintages'
    ],
    view: 'Panoramic Sunset Horizon & Outer Barrier Coral Reef',
    poolType: '25m Heated Overwater Infinity Pool',
    floorPlanDetails: 'Triple-pavilion configuration connected by teak water-walkways, primary master wing with private plunge and sun deck, guest wings with en-suite sea view soaking tubs.'
  },
  {
    id: 'cliffside-sanctuary',
    name: 'The Cliffside Sanctuary Residence',
    tagline: 'Perched upon volcanic basalt cliffs above crashing turquoise waves',
    category: 'Cliffside',
    pricePerNightUSD: 3800,
    sqm: 520,
    sqft: 5600,
    maxGuests: 4,
    bedrooms: 2,
    bathrooms: 3,
    heroImage: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85'
    ],
    features: [
      'Cantilevered cliff edge infinity pool suspended 20m above sea',
      'Open-air volcanic basalt outdoor rainfall shower',
      'Private cliff-top yoga deck with sunrise orientation',
      'Floor-to-ceiling motorized acoustic soundproof glass sliders'
    ],
    amenities: [
      'Dedicated Island Host',
      'Daily Sunrise Organic Matcha & Fresh Tropical Fruit Delivery',
      'Bang & Olufsen Bespoke Soundscape System',
      'Cashmere Daybed Linens & Pillow Menu with 12 choices',
      'Private Fire Pit with Ocean Driftwood'
    ],
    view: 'Dramatic 180° Open Ocean & Dramatic Coastal Cliffs',
    poolType: '18m Cantilevered Volcanic Basalt Pool',
    floorPlanDetails: 'Dual master suites with vaulted cedar ceilings, expansive indoor-outdoor living salon, dining terrace with integrated teppan grill.'
  },
  {
    id: 'azure-overwater-pavilion',
    name: 'The Azure Overwater Pavilion',
    tagline: 'Intimate seclusion directly above the glowing coral lagoon',
    category: 'Overwater',
    pricePerNightUSD: 2400,
    sqm: 310,
    sqft: 3340,
    maxGuests: 2,
    bedrooms: 1,
    bathrooms: 2,
    heroImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85'
    ],
    features: [
      'Suspended catamaran hammock net over crystal blue waters',
      'Freestanding Italian oval bathtub with sliding horizon windows',
      'Private freshwater plunge pool with in-water sun loungers',
      'Direct timber ladder to lagoon snorkeling'
    ],
    amenities: [
      'Personal Island Butler Service',
      'Curated Mini-bar with Artisanal Champagnes & Caviar',
      'Custom Fragrance Diffuser by Maison Francis Kurkdjian',
      'High-speed Satellite Starlink Connectivity',
      'Complimentary Snorkeling & Kayaking Equipment'
    ],
    view: 'Crystal Turquoise Lagoon & Pristine Coral Gardens',
    poolType: '12m Private Freshwater Lagoon Plunge Pool',
    floorPlanDetails: 'Open-concept architectural suite with central king daybed, dressing salon with illuminated wardrobes, cantilevered sun deck.'
  },
  {
    id: 'biophilic-beach-haven',
    name: 'The Biophilic Beach Sanctuary',
    tagline: 'Nestled between private jungle palms and powdery white sand',
    category: 'Beachfront',
    pricePerNightUSD: 2850,
    sqm: 390,
    sqft: 4200,
    maxGuests: 3,
    bedrooms: 1,
    bathrooms: 2,
    heroImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=85',
    gallery: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85'
    ],
    features: [
      'Private 40-meter secluded beachfront pathway',
      'Hidden garden plunge pool surrounded by tropical bougainvillea',
      'Outdoor terrazzo rain bath under swaying palm fronds',
      'Private beach cabana with bespoke cocktail service'
    ],
    amenities: [
      '24/7 Dedicated Butler Service',
      'Personal Bicycles with Custom Nameplates',
      'Organic Herbal Tea Garden & Fresh Coconut Service',
      'In-villa Spa Treatment Table & Aromatherapy Diffuser',
      'Nightly Stargazing Telescope & Sky Chart Guide'
    ],
    view: 'Private Beach Shoreline & Coconut Palm Canopy',
    poolType: '14m Freeform Slate Stone Plunge Pool',
    floorPlanDetails: 'Spacious stone pavilion opening to private botanical gardens, beachfront cabana, shaded dining veranda, and indoor garden atrium.'
  }
];

export const DINING_VENUES: DiningVenue[] = [
  {
    id: 'l-ephemere',
    name: 'L’Éphémère Atoll',
    chef: 'Chef Hélène Mercier (3-Michelin Stars)',
    cuisine: 'Modern Oceanic Haute Gastronomy',
    accolade: 'World’s 50 Best Discovery 2025 • 3 Michelin Stars',
    description: 'An open-air pavilion extending over the barrier reef. Every evening features an 8-course gastronomic odyssey crafted exclusively from line-caught deep sea seafood, sea botanicals, and island-grown heirloom produce.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85',
    timings: 'Dinner: 18:30 – 22:30 (Reservations Essential)',
    signatureDish: 'Slow-poached Langoustine with Sea Truffle Emulsion & Marine Caviar',
    sommelierHighlight: 'Vertical pairings from Domaine de la Romanée-Conti & Salon Champagne'
  },
  {
    id: 'terra-robata',
    name: 'Terra & Robata',
    chef: 'Master Kenji Takahashi',
    cuisine: 'Charcoal Robatayaki & Omakase Kaiseki',
    accolade: 'Culinary Master of East Asia Award',
    description: 'Binchotan white charcoal grilling meets pristine marine harvests. Perched on the southern cliff terrace where smoke aromas blend with salt air.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=85',
    timings: 'Lunch: 12:00 – 15:00 | Dinner: 19:00 – 23:00',
    signatureDish: 'A5 Miyazaki Wagyu wrapped in Shiso with Smoked Uni Butter',
    sommelierHighlight: 'Rare Junmai Daiginjo Sakes from Niigata & Yamagata'
  },
  {
    id: 'sub-aquatic-vault',
    name: 'The Sub-Aquatic Wine Vault',
    chef: 'Head Sommelier David Laurent',
    cuisine: 'Submerged Wine & Caviar Tasting Laboratory',
    accolade: 'Wine Spectator Grand Award of Excellence',
    description: 'Submerged five meters beneath the Indian Ocean surface. Glass walls reveal manta rays and illuminated coral while guests taste rare vintage champagnes and Petrossian caviar.',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85',
    timings: 'Tastings Daily: 16:30 & 21:30 (Max 8 Guests)',
    signatureDish: 'Imperial Oscietra Caviar on warm buckwheat blini with sour cream mousse',
    sommelierHighlight: 'Over 3,400 rare cellar bottles dating back to 1945'
  }
];

export const WELLNESS_EXPERIENCES: WellnessExperience[] = [
  {
    id: 'thalasso-circuit',
    name: 'The Ocean Thalassotherapy Journey',
    duration: '120 Minutes',
    description: 'Immerse in deep-sea mineral water pumped directly from oceanic currents. Alternating thermal pools, micronized sea-salt polish, and therapeutic algae wraps rejuvenate Cellular vitality.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85',
    focus: 'Cellular Detoxification & Muscular Regeneration',
    signatureTreatment: 'Dynamic Seawater Hydro-massage & Algae Cocoon',
    benefit: 'Restores vital electrolytes and releases deep structural tension'
  },
  {
    id: 'sound-immersion',
    name: 'Equatorial Sound & Ocean Meditation',
    duration: '90 Minutes',
    description: 'Suspended in an open pavilion above gentle lagoon waves. Hand-hammered Tibetan singing bowls resonate in harmony with the ocean’s alpha-wave rhythm to induce restorative sleep states.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=85',
    focus: 'Neurological Stillness & Deep Stress Relief',
    signatureTreatment: 'Sub-audible Acoustic Vibration & Pranayama Breathwork',
    benefit: 'Calms sympathetic nervous system and enhances cognitive clarity'
  },
  {
    id: 'midnight-starlight-spa',
    name: 'Celestial Midnight Spa Ritual',
    duration: '150 Minutes',
    description: 'An exclusive after-hours sanctuary ritual under the southern constellations. Warm coconut nectar massage followed by a private midnight float in the illuminated magnesium pool.',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1200&q=85',
    focus: 'Romantic Connection & Total Sensory Renewal',
    signatureTreatment: 'Warm Volcanic Stone & Star-infused Monoi Oil Massage',
    benefit: 'Complete spiritual alignment and tranquil emotional restoration'
  }
];

export const CURATED_EXPERIENCES: CuratedExperience[] = [
  {
    id: 'catamaran-expedition',
    title: 'Private Catamaran Outer Reef Expedition',
    type: 'Marine',
    description: 'Charter the resort’s 70-foot Sunreef luxury catamaran for a bespoke day voyage across the outer coral atolls. Private chef on board, secluded sandbank swim, and spinner dolphin sightings.',
    image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=1200&q=85',
    duration: 'Full Day or Sunset (4 to 8 Hours)',
    exclusive: true,
    highlight: 'Private marine biologist & bespoke champagne raw bar'
  },
  {
    id: 'seaplane-scenic',
    title: 'Aerial Atoll Photography & Sandbank Drop',
    type: 'Aviation',
    description: 'Board our private amphibious seaplane for a flight across uninhabited atolls, concluding with a landing on an untouched sand spit where a private canopy and chilled vintage Krug await.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    duration: '3.5 Hours',
    exclusive: true,
    highlight: 'Uninhabited coral sandbank with private butler service'
  },
  {
    id: 'coral-sanctuary-restoration',
    title: 'Adopt an Atoll Coral Nursery',
    type: 'Mindfulness',
    description: 'Join our resident marine conservationist team in planting micro-fragments of resilient coral onto our underwater biosphere sculpture, actively safeguarding our living reef ecosystem.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85',
    duration: '2 Hours',
    exclusive: false,
    highlight: 'GPS coordinates of your personal coral reef tag'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'The Sunset Overwater Arc',
    category: 'Villas',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=85',
    caption: 'Cantilevered overwater villas catching the golden twilight over the Indian Ocean.',
    location: 'North Reef Pavilion Arc'
  },
  {
    id: 'gal-02',
    title: 'Aerial View of Aurelia Atoll',
    category: 'Atoll & Aerial',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85',
    caption: 'Pristine turquoise shallows transitioning into the sapphire abyss of the outer reef.',
    location: 'Outer Barrier Atoll'
  },
  {
    id: 'gal-03',
    title: 'L’Éphémère Ocean Dining Terrace',
    category: 'Gastronomy',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85',
    caption: 'Fine dining under starlit skies with waves lapping against teak pilings.',
    location: 'Reef Edge Dining Deck'
  },
  {
    id: 'gal-04',
    title: 'Thalassotherapy Ocean Spa Basin',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=85',
    caption: 'Heated mineral seawater hydro-circuit framed by tranquil lagoon horizons.',
    location: 'Thalasso Wellness Arc'
  },
  {
    id: 'gal-05',
    title: 'Master Bedroom with Ocean Vista',
    category: 'Villas',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1400&q=85',
    caption: 'Waking to natural dawn light filtering through sheer ivory drapery.',
    location: 'Ocean Horizon Estate Master Wing'
  },
  {
    id: 'gal-06',
    title: 'Sub-Aquatic Wine Tasting Chamber',
    category: 'Gastronomy',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=85',
    caption: 'Five meters below the surface with rare vintages and ambient marine illumination.',
    location: 'Sub-Aquatic Reef Cavern'
  },
  {
    id: 'gal-07',
    title: 'Secluded Sandbank Sunset',
    category: 'Atoll & Aerial',
    image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=1400&q=85',
    caption: 'The ultimate castaway moment on private sands surrounded only by sea.',
    location: 'South Barrier Sand Spit'
  },
  {
    id: 'gal-08',
    title: 'Dawn Yoga Pavilion',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1400&q=85',
    caption: 'Mindful meditation synchronized with gentle equatorial breezes.',
    location: 'Eastern Lagoon Deck'
  }
];

export const SANCTUARY_MAP_POINTS: SanctuaryMapPoint[] = [
  {
    id: 'pt-arrival',
    name: 'Seaplane Arrival Jetty & Lounge',
    category: 'Arrival',
    x: 18,
    y: 65,
    description: 'Direct dock for private twin-otter seaplanes with champagne reception lounge.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=85',
    tag: 'ARRIVAL HUB'
  },
  {
    id: 'pt-overwater',
    name: 'North Overwater Villa Arc',
    category: 'Villa',
    x: 32,
    y: 28,
    description: 'Fourteen cantilevered ocean pavilions stretching along the tranquil barrier reef.',
    image: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=600&q=85',
    tag: 'OVERWATER SUITES'
  },
  {
    id: 'pt-estate',
    name: 'The Ocean Horizon Grand Estate',
    category: 'Villa',
    x: 48,
    y: 18,
    description: 'The premier 3-bedroom private estate at the apex of the overwater pier.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=85',
    tag: 'PRESIDENTIAL'
  },
  {
    id: 'pt-dining',
    name: 'L’Éphémère Atoll & Vault',
    category: 'Dining',
    x: 62,
    y: 42,
    description: '3-Michelin starred culinary atelier and submerged marine wine vault.',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=85',
    tag: 'GASTRONOMY'
  },
  {
    id: 'pt-spa',
    name: 'Thalassotherapy & Ocean Spa',
    category: 'Wellness',
    x: 75,
    y: 60,
    description: 'Heated mineral seawater circuits, open-air massage pavilions, and sound immersion.',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=85',
    tag: 'WELLNESS SANCTUARY'
  },
  {
    id: 'pt-marina',
    name: 'Sunreef Catamaran Marina',
    category: 'Recreation',
    x: 45,
    y: 82,
    description: 'Deep-water private yacht mooring, dive center, and marine expedition embarkation.',
    image: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?auto=format&fit=crop&w=600&q=85',
    tag: 'OCEANIC EXPEDITION'
  }
];

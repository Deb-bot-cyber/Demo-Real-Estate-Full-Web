export interface Property {
  id: string;
  title: string;
  category: 'Buy' | 'Rent' | 'Invest';
  propertyType: 'Glass House' | 'Villa' | 'Penthouse' | 'Waterfront Estate' | 'Modern Residence' | 'Architectural Sanctuary';
  location: string;
  address: string;
  price: number; // in INR Crores (e.g. 28.5)
  priceFormatted: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  sqftFormatted: string;
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  isFeatured: boolean;
  tag?: string;
  yearBuilt: number;
  garage: number;
}

export interface LocationInfo {
  id: string;
  name: string;
  stateOrCountry: string;
  propertyCount: number;
  image: string;
  tagline: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  image: string;
  propertyPurchased?: string;
}

export interface LeadInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  interestedIn: string;
  preferredLocation: string;
  message: string;
  submittedAt: string;
  status: 'New' | 'In Progress' | 'Contacted' | 'Closed';
}

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'worli-sea-villa-mumbai',
    title: 'The Worli Sea Villa',
    category: 'Buy',
    propertyType: 'Waterfront Estate',
    location: 'Mumbai',
    address: 'Worli Sea Face, South Mumbai, MH 400018',
    price: 28.5,
    priceFormatted: '₹28.5 Cr',
    bedrooms: 5,
    bathrooms: 6,
    sqft: 6500,
    sqftFormatted: '6,500 sq ft',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'An iconic sea-facing architectural marvel on Worli Sea Face. Features floor-to-ceiling panoramic Arabian Sea views, a private infinity pool overlooking the Bandra-Worli Sea Link, and bespoke Italian interiors.',
    features: ['Arabian Sea Panoramic Views', 'Private Infinity Edge Pool', 'Subterranean 4-Car Parking', 'Private Elevator Foyer', 'Custom Boffi Italian Kitchen', '24/7 Multi-Tiered Security'],
    isFeatured: true,
    tag: 'WORLI EXCLUSIVE',
    yearBuilt: 2024,
    garage: 4
  },
  {
    id: 'golf-course-sky-gurgaon',
    title: 'The Sky Residence at Golf Course',
    category: 'Buy',
    propertyType: 'Penthouse',
    location: 'Delhi NCR',
    address: 'Golf Course Road, Sector 54, Gurgaon, HR 122002',
    price: 18.2,
    priceFormatted: '₹18.2 Cr',
    bedrooms: 4,
    bathrooms: 5,
    sqft: 5200,
    sqftFormatted: '5,200 sq ft',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Ultra-luxurious duplex penthouse situated along Gurgaon’s prime Golf Course Road. Panoramic views of Aravalli hills and the golf greens, complete with private plunge pool, outdoor deck, and smart home automation.',
    features: ['Aravalli Hills & Golf Course Vistas', 'Private Deck Plunge Pool', 'Double Height Living Lounge', 'Private Cigar & Wine Room', 'Concierge & Valet Service'],
    isFeatured: true,
    tag: 'GOLF COURSE ROAD',
    yearBuilt: 2024,
    garage: 3
  },
  {
    id: 'assagao-heritage-villa-goa',
    title: 'Villa Assagao Sanctuary',
    category: 'Buy',
    propertyType: 'Villa',
    location: 'Goa',
    address: 'Assagao Valley, North Goa 403507',
    price: 9.5,
    priceFormatted: '₹9.5 Cr',
    bedrooms: 4,
    bathrooms: 4,
    sqft: 3800,
    sqftFormatted: '3,800 sq ft',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'A restored Indo-Portuguese luxury estate nestled in the tranquil boutique village of Assagao. Surrounded by tropical greenery, featuring an open courtyard, private swimming pool, and high ceilings with wooden rafters.',
    features: ['Tropical Private Pool', 'Indo-Portuguese Architecture', 'Private Wooded Courtyard', 'Solar Microgrid System', '10 mins to Ozran & Vagator Beaches'],
    isFeatured: true,
    tag: 'GOA LUXURY',
    yearBuilt: 2023,
    garage: 2
  },
  {
    id: 'jubilee-hills-mansion-hyd',
    title: 'The Jubilee Hills Estate',
    category: 'Invest',
    propertyType: 'Architectural Sanctuary',
    location: 'Hyderabad',
    address: 'Road No. 36, Jubilee Hills, Hyderabad, TS 500033',
    price: 32.0,
    priceFormatted: '₹32.0 Cr',
    bedrooms: 6,
    bathrooms: 7,
    sqft: 8500,
    sqftFormatted: '8,500 sq ft',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Palatial modernist estate located in Hyderabad’s most prestigious neighborhood. Features a private home theater, temperature-controlled indoor pool, subterranean car gallery, and smart security.',
    features: ['Private 4K Dolby Atmos Theater', 'Indoor Temperature-Controlled Pool', 'Subterranean Car Gallery', 'Private Banquet Pavilion', 'High Rental Yield Asset'],
    isFeatured: true,
    tag: 'HIGH YIELD ASSET',
    yearBuilt: 2024,
    garage: 6
  },
  {
    id: 'sadashivnagar-glass-house-blr',
    title: 'Sadashivnagar Glass House',
    category: 'Buy',
    propertyType: 'Glass House',
    location: 'Bengaluru',
    address: 'Sadashivnagar, Bengaluru, KA 560080',
    price: 15.8,
    priceFormatted: '₹15.8 Cr',
    bedrooms: 4,
    bathrooms: 5,
    sqft: 4600,
    sqftFormatted: '4,600 sq ft',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'An organic modern sanctuary located in old Bengaluru’s greenest diplomatic enclave. Surrounded by legacy trees, double-height glass walls, climate-controlled interiors, and Japanese garden atrium.',
    features: ['Japanese Zen Atrium', 'Double Height Glazed Lounge', 'Home Automation & Solar Rooftop', 'Private Rooftop Terrace Lounge'],
    isFeatured: true,
    tag: 'BENGALURU PRIME',
    yearBuilt: 2025,
    garage: 3
  },
  {
    id: 'koregaon-park-residence-pune',
    title: 'Koregaon Park Penthouse',
    category: 'Rent',
    propertyType: 'Penthouse',
    location: 'Pune',
    address: 'Lane 7, Koregaon Park, Pune, MH 411001',
    price: 6.5,
    priceFormatted: '₹6.5 Cr',
    bedrooms: 3,
    bathrooms: 4,
    sqft: 3400,
    sqftFormatted: '3,400 sq ft',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop'
    ],
    description: 'Sophisticated executive penthouse with expansive green canopy vistas over Koregaon Park. Features wrap-around balcony, private jacuzzi deck, and contemporary teakwood finishings.',
    features: ['Koregaon Park Tree Canopy Vistas', 'Private Jacuzzi & Sundeck', 'High-Speed Private Elevator', 'Subzero Kitchen Fittings'],
    isFeatured: true,
    tag: 'EXECUTIVE LEASE',
    yearBuilt: 2024,
    garage: 2
  }
];

export const PROPERTIES: Property[] = INITIAL_PROPERTIES;

export const INITIAL_LOCATIONS: LocationInfo[] = [
  {
    id: 'mumbai',
    name: 'Mumbai',
    stateOrCountry: 'Maharashtra',
    propertyCount: 28,
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Worli Sea Face, Bandra, and South Mumbai oceanfront landmarks.'
  },
  {
    id: 'delhi-ncr',
    name: 'Delhi NCR',
    stateOrCountry: 'Delhi / Haryana',
    propertyCount: 22,
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Golf Course Road, Lutyens’ Delhi & diplomatic enclaves.'
  },
  {
    id: 'bengaluru',
    name: 'Bengaluru',
    stateOrCountry: 'Karnataka',
    propertyCount: 19,
    image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Sadashivnagar & Indiranagar tech-executive havens.'
  },
  {
    id: 'goa',
    name: 'Goa',
    stateOrCountry: 'Goa',
    propertyCount: 16,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Boutique Assagao villas & beachfront sanctuaries.'
  },
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    stateOrCountry: 'Telangana',
    propertyCount: 14,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Jubilee Hills & Banjara Hills palatial estates.'
  },
  {
    id: 'pune',
    name: 'Pune',
    stateOrCountry: 'Maharashtra',
    propertyCount: 11,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop',
    tagline: 'Koregaon Park & Boat Club Road executive penthouses.'
  }
];

export const LOCATIONS: LocationInfo[] = INITIAL_LOCATIONS;

export const INITIAL_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: 'From our first consultation to receiving the keys to our Worli Sea Face residence, Shri Laxmi Property provided unmatched discretion and market clarity. They negotiated an off-market deal flawlessly.',
    name: 'Rajesh & Priya Sharma',
    role: 'Industrialist • Worli, Mumbai',
    location: 'Mumbai, MH',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    propertyPurchased: 'The Worli Sea Villa'
  },
  {
    id: '2',
    quote: 'Finding an authentic restored heritage villa in North Goa with clear titles can be daunting. Shri Laxmi Property’s advisory team handled legal due diligence and closing with complete transparency.',
    name: 'Vikramaditya Singhania',
    role: 'Tech Founder • Golf Course Rd',
    location: 'Gurgaon, HR',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    propertyPurchased: 'Villa Assagao Sanctuary'
  },
  {
    id: '3',
    quote: 'As an NRI managing real estate assets in India from Singapore, Shri Laxmi Property’s yield analytics and property management services give me complete peace of mind.',
    name: 'Ananya Reddy',
    role: 'Venture Capital Partner',
    location: 'Bengaluru, KA',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop',
    propertyPurchased: 'Sadashivnagar Glass House'
  },
  {
    id: '4',
    quote: 'Shri Laxmi Property secured our dream sky penthouse at DLF Camellias. Their market insight and white-glove negotiation saved us over ₹3.5 Cr on the transaction.',
    name: 'Rohan & Gayatri Malhotra',
    role: 'Managing Director • Private Equity',
    location: 'Gurgaon, HR',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    propertyPurchased: 'Camellias Sky Mansion'
  },
  {
    id: '5',
    quote: 'Selling our family estate in Alibaug required utmost confidentiality. The team handled private viewings discreetly and closed with a ultra-high net worth buyer within 3 weeks.',
    name: 'Sameer & Sunita Merchant',
    role: 'Group Chairman • Business Family',
    location: 'Mumbai, MH',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop',
    propertyPurchased: 'Alibaug Oceanfront Estate'
  }
];

export const TESTIMONIALS: Testimonial[] = INITIAL_TESTIMONIALS;

export const INITIAL_LEADS: LeadInquiry[] = [
  {
    id: 'lead-1',
    fullName: 'Arjun Kapoor',
    email: 'arjun.kapoor@example.com',
    phone: '+91 98200 45678',
    interestedIn: 'BUYING',
    preferredLocation: 'Mumbai',
    message: 'Looking for a sea-facing 4 BHK penthouse in Worli or Bandra West with private pool.',
    submittedAt: '2026-08-12 14:30 IST',
    status: 'New'
  },
  {
    id: 'lead-2',
    fullName: 'Meera Deshmukh',
    email: 'meera.d@example.com',
    phone: '+91 98111 22334',
    interestedIn: 'INVESTING',
    preferredLocation: 'Goa',
    message: 'Interested in luxury Assagao or Anjuna villas for high rental yield investment.',
    submittedAt: '2026-08-11 10:15 IST',
    status: 'Contacted'
  },
  {
    id: 'lead-3',
    fullName: 'Sanjay Malhotra',
    email: 'smalhotra@example.com',
    phone: '+91 99000 88776',
    interestedIn: 'BUYING',
    preferredLocation: 'Delhi NCR',
    message: 'Seeking a duplex penthouse on Golf Course Road, Gurgaon. Budget around 18-20 Cr.',
    submittedAt: '2026-08-10 18:45 IST',
    status: 'In Progress'
  }
];

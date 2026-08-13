'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  MessageSquare, 
  Users, 
  Plus, 
  Trash2, 
  Edit3, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Search, 
  TrendingUp, 
  MapPin,
  ArrowLeft, 
  Lock, 
  IndianRupee,
  Star,
  Bell,
  Calendar,
  LogOut,
  Sparkles,
  CheckCircle,
  LayoutDashboard,
  Upload,
  Image as ImageIcon,
  Check,
  Eye,
  X
} from 'lucide-react';
import { 
  INITIAL_PROPERTIES, 
  INITIAL_TESTIMONIALS, 
  INITIAL_LEADS, 
  INITIAL_LOCATIONS,
  Property, 
  Testimonial, 
  LeadInquiry,
  LocationInfo 
} from '@/data/properties';
import { exportToCSV, exportToExcel, exportToPDF } from '@/utils/exportUtils';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'cities' | 'leads' | 'reviews'>('overview');

  // State loaded from localStorage or initial defaults
  const [properties, setProperties] = useState<Property[]>([]);
  const [locations, setLocations] = useState<LocationInfo[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [leads, setLeads] = useState<LeadInquiry[]>([]);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [leadFilterStatus, setLeadFilterStatus] = useState<string>('All');

  // Full Page Property Editor Mode state
  const [isPropertyEditorFullPage, setIsPropertyEditorFullPage] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // Modals state for Cities, Reviews, Leads
  const [isAddCityOpen, setIsAddCityOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<LocationInfo | null>(null);
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);

  // Inline Quick Add Location toggle in Property Form
  const [isInlineAddLocation, setIsInlineAddLocation] = useState(false);
  const [newLocationName, setNewLocationName] = useState('');

  // Comprehensive Property Form state
  const [propertyForm, setPropertyForm] = useState({
    title: '',
    category: 'Buy' as 'Buy' | 'Rent' | 'Invest',
    propertyType: 'Villa' as Property['propertyType'],
    location: 'Mumbai',
    address: '',
    price: 15.0,
    bedrooms: 4,
    bathrooms: 4,
    sqft: 4200,
    garage: 3,
    yearBuilt: 2025,
    tag: 'NEW EXCLUSIVE',
    isFeatured: true,
    description: '',
    featuresText: 'Private Infinity Pool, Smart Automation, Italian Kitchen, 24/7 Security Concierge, Private Elevator',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
    gallery: [] as string[],
    newGalleryUrl: ''
  });

  // City Form state
  const [cityForm, setCityForm] = useState({
    name: '',
    stateOrCountry: '',
    propertyCount: 15,
    image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop',
    tagline: ''
  });

  // Review Form state
  const [reviewForm, setReviewForm] = useState({
    name: '',
    role: '',
    location: '',
    quote: '',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    propertyPurchased: ''
  });

  // Lead Form state
  const [leadForm, setLeadForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    interestedIn: 'BUYING',
    preferredLocation: 'Mumbai',
    message: ''
  });

  // Single Image Upload Helper Function (Converts File -> Data URL)
  const handleSingleFileUpload = (file: File, callback: (base64Url: string) => void) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        callback(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Multiple Image Upload Helper Function (Converts Multiple Files -> Data URLs)
  const handleMultipleFilesUpload = (files: FileList, callback: (urls: string[]) => void) => {
    if (!files || files.length === 0) return;
    const fileArray = Array.from(files);
    
    const promises = fileArray.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (reader.result) resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((urls) => {
      callback(urls);
    });
  };

  // Load state on mount
  useEffect(() => {
    try {
      const storedProps = localStorage.getItem('aura_properties');
      setProperties(storedProps ? JSON.parse(storedProps) : INITIAL_PROPERTIES);

      const storedLocs = localStorage.getItem('aura_locations');
      setLocations(storedLocs ? JSON.parse(storedLocs) : INITIAL_LOCATIONS);

      const storedReviews = localStorage.getItem('aura_testimonials');
      setTestimonials(storedReviews ? JSON.parse(storedReviews) : INITIAL_TESTIMONIALS);

      const storedLeads = localStorage.getItem('aura_leads');
      setLeads(storedLeads ? JSON.parse(storedLeads) : INITIAL_LEADS);
    } catch {
      setProperties(INITIAL_PROPERTIES);
      setLocations(INITIAL_LOCATIONS);
      setTestimonials(INITIAL_TESTIMONIALS);
      setLeads(INITIAL_LEADS);
    }

    if (localStorage.getItem('aura_admin_logged_in') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Sync to localStorage
  const saveProperties = (data: Property[]) => {
    setProperties(data);
    localStorage.setItem('aura_properties', JSON.stringify(data));
  };

  const saveLocations = (data: LocationInfo[]) => {
    setLocations(data);
    localStorage.setItem('aura_locations', JSON.stringify(data));
  };

  const saveTestimonials = (data: Testimonial[]) => {
    setTestimonials(data);
    localStorage.setItem('aura_testimonials', JSON.stringify(data));
  };

  const saveLeads = (data: LeadInquiry[]) => {
    setLeads(data);
    localStorage.setItem('aura_leads', JSON.stringify(data));
  };

  // Quick Add New Location Handler
  const handleAddNewLocationInline = () => {
    if (!newLocationName.trim()) return;
    const formattedName = newLocationName.trim();

    // Check if location already exists
    const exists = locations.some(l => l.name.toLowerCase() === formattedName.toLowerCase());
    if (!exists) {
      const newLoc: LocationInfo = {
        id: formattedName.toLowerCase().replace(/\s+/g, '-'),
        name: formattedName,
        stateOrCountry: 'India',
        propertyCount: 1,
        image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop',
        tagline: `Prime luxury real estate listings in ${formattedName}.`
      };
      saveLocations([...locations, newLoc]);
    }

    setPropertyForm({ ...propertyForm, location: formattedName });
    setNewLocationName('');
    setIsInlineAddLocation(false);
  };

  // Login handler strictly requiring admin123
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
      localStorage.setItem('aura_admin_logged_in', 'true');
    } else {
      setAuthError('Invalid password. Access denied (Password: admin123).');
    }
  };

  // Save Property Handler
  const handleSaveProperty = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Process features
    const featuresList = propertyForm.featuresText
      .split(',')
      .map(f => f.trim())
      .filter(f => f.length > 0);

    const finalGallery = propertyForm.gallery.length > 0 ? propertyForm.gallery : [propertyForm.image];

    if (editingProperty) {
      // Update property
      const updated = properties.map(p => p.id === editingProperty.id ? {
        ...p,
        title: propertyForm.title || p.title,
        category: propertyForm.category,
        propertyType: propertyForm.propertyType,
        location: propertyForm.location,
        address: propertyForm.address || `${propertyForm.location}, India`,
        price: propertyForm.price,
        priceFormatted: `₹${propertyForm.price} Cr`,
        bedrooms: propertyForm.bedrooms,
        bathrooms: propertyForm.bathrooms,
        sqft: propertyForm.sqft,
        sqftFormatted: `${propertyForm.sqft.toLocaleString()} sq ft`,
        garage: propertyForm.garage,
        yearBuilt: propertyForm.yearBuilt,
        tag: propertyForm.tag || 'EXCLUSIVE',
        isFeatured: propertyForm.isFeatured,
        description: propertyForm.description || 'Exclusive luxury real estate listing.',
        features: featuresList.length > 0 ? featuresList : p.features,
        image: propertyForm.image || p.image,
        gallery: finalGallery
      } : p);

      saveProperties(updated);
      setEditingProperty(null);
    } else {
      // Create new property
      const newProp: Property = {
        id: 'prop-' + Date.now(),
        title: propertyForm.title || 'Luxury Residence',
        category: propertyForm.category,
        propertyType: propertyForm.propertyType,
        location: propertyForm.location,
        address: propertyForm.address || `${propertyForm.location}, India`,
        price: propertyForm.price,
        priceFormatted: `₹${propertyForm.price} Cr`,
        bedrooms: propertyForm.bedrooms,
        bathrooms: propertyForm.bathrooms,
        sqft: propertyForm.sqft,
        sqftFormatted: `${propertyForm.sqft.toLocaleString()} sq ft`,
        garage: propertyForm.garage,
        yearBuilt: propertyForm.yearBuilt,
        tag: propertyForm.tag || 'NEW EXCLUSIVE',
        isFeatured: propertyForm.isFeatured,
        description: propertyForm.description || 'Exclusive luxury real estate listing.',
        features: featuresList.length > 0 ? featuresList : ['Private Pool', 'Smart Automation', 'Italian Kitchen', '24/7 Security'],
        image: propertyForm.image,
        gallery: finalGallery
      };
      saveProperties([newProp, ...properties]);
    }
    setIsPropertyEditorFullPage(false);
  };

  const handleEditProperty = (prop: Property) => {
    setEditingProperty(prop);
    setPropertyForm({
      title: prop.title,
      category: prop.category,
      propertyType: prop.propertyType,
      location: prop.location,
      address: prop.address,
      price: prop.price,
      bedrooms: prop.bedrooms,
      bathrooms: prop.bathrooms,
      sqft: prop.sqft,
      garage: prop.garage || 3,
      yearBuilt: prop.yearBuilt || 2025,
      tag: prop.tag || 'EXCLUSIVE',
      isFeatured: prop.isFeatured ?? true,
      description: prop.description,
      featuresText: (prop.features || []).join(', '),
      image: prop.image,
      gallery: prop.gallery || [prop.image],
      newGalleryUrl: ''
    });
    setIsPropertyEditorFullPage(true);
  };

  const handleDeleteProperty = (id: string) => {
    if (confirm('Are you sure you want to delete this property listing?')) {
      saveProperties(properties.filter(p => p.id !== id));
    }
  };

  // City Handlers (CRUD)
  const handleSaveCity = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCity) {
      const updated = locations.map(loc => loc.id === editingCity.id ? {
        ...loc,
        name: cityForm.name || loc.name,
        stateOrCountry: cityForm.stateOrCountry || loc.stateOrCountry,
        propertyCount: cityForm.propertyCount,
        image: cityForm.image || loc.image,
        tagline: cityForm.tagline || loc.tagline,
      } : loc);
      saveLocations(updated);
      setEditingCity(null);
    } else {
      const newCity: LocationInfo = {
        id: cityForm.name.toLowerCase().replace(/\s+/g, '-'),
        name: cityForm.name || 'New City',
        stateOrCountry: cityForm.stateOrCountry || 'India',
        propertyCount: cityForm.propertyCount || 10,
        image: cityForm.image,
        tagline: cityForm.tagline || 'Prime real estate developments and luxury residences.'
      };
      saveLocations([...locations, newCity]);
    }
    setIsAddCityOpen(false);
  };

  const handleEditCity = (city: LocationInfo) => {
    setEditingCity(city);
    setCityForm({
      name: city.name,
      stateOrCountry: city.stateOrCountry,
      propertyCount: city.propertyCount,
      image: city.image,
      tagline: city.tagline,
    });
    setIsAddCityOpen(true);
  };

  const handleDeleteCity = (id: string) => {
    if (confirm('Are you sure you want to delete this city/location?')) {
      saveLocations(locations.filter(l => l.id !== id));
    }
  };

  // Review Handlers
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newRev: Testimonial = {
      id: 'rev-' + Date.now(),
      name: reviewForm.name || 'Verified Client',
      role: reviewForm.role || 'Home Buyer',
      location: reviewForm.location || 'Mumbai, MH',
      quote: reviewForm.quote || 'Exceptional private real estate advisory.',
      rating: reviewForm.rating,
      image: reviewForm.image,
      propertyPurchased: reviewForm.propertyPurchased || 'Luxury Residence'
    };

    saveTestimonials([newRev, ...testimonials]);
    setIsAddReviewOpen(false);
  };

  const handleDeleteReview = (id: string) => {
    if (confirm('Are you sure you want to delete this client review?')) {
      saveTestimonials(testimonials.filter(t => t.id !== id));
    }
  };

  // Lead Handlers
  const handleAddLead = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: LeadInquiry = {
      id: 'lead-' + Date.now(),
      fullName: leadForm.fullName || 'New Prospect',
      email: leadForm.email || 'client@example.com',
      phone: leadForm.phone || '+91 98200 00000',
      interestedIn: leadForm.interestedIn,
      preferredLocation: leadForm.preferredLocation,
      message: leadForm.message || 'Direct lead record entered from admin dashboard.',
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      status: 'New'
    };

    saveLeads([newLead, ...leads]);
    setIsAddLeadOpen(false);
  };

  const handleUpdateLeadStatus = (id: string, newStatus: LeadInquiry['status']) => {
    const updated = leads.map(l => l.id === id ? { ...l, status: newStatus } : l);
    saveLeads(updated);
  };

  const handleDeleteLead = (id: string) => {
    if (confirm('Are you sure you want to delete this lead record?')) {
      saveLeads(leads.filter(l => l.id !== id));
    }
  };

  // Formatted exports
  const getFormattedLeadsForExport = () => {
    return leads.map(l => ({
      'Lead ID': l.id,
      'Full Name': l.fullName,
      'Email': l.email,
      'Phone': l.phone,
      'Interest Category': l.interestedIn,
      'Preferred Location': l.preferredLocation,
      'Status': l.status,
      'Submitted At': l.submittedAt,
      'Inquiry Notes': l.message,
    }));
  };

  const getFormattedPropertiesForExport = () => {
    return properties.map(p => ({
      'Property ID': p.id,
      'Title': p.title,
      'City': p.location,
      'Type': p.propertyType,
      'Category': p.category,
      'Price': p.priceFormatted,
      'Bedrooms': p.bedrooms,
      'Sqft': p.sqftFormatted,
      'Address': p.address,
    }));
  };

  const getFormattedCitiesForExport = () => {
    return locations.map(loc => ({
      'City ID': loc.id,
      'City Name': loc.name,
      'State / Country': loc.stateOrCountry,
      'Active Properties': loc.propertyCount,
      'Tagline': loc.tagline,
    }));
  };

  const getFormattedReviewsForExport = () => {
    return testimonials.map(t => ({
      'Review ID': t.id,
      'Client Name': t.name,
      'Role & City': t.role,
      'Rating': `${t.rating} Stars`,
      'Property': t.propertyPurchased || 'N/A',
      'Testimonial Quote': t.quote,
    }));
  };

  const totalValuation = properties.reduce((acc, p) => acc + p.price, 0).toFixed(1);

  // Authentication Login Screen (STRICT PASSWORD = admin123)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#F4F6FA] text-slate-800 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Lock className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">AURA Admin Portal</h1>
            <p className="text-xs text-slate-500">Enter administrator password to access management controls.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-600 font-semibold mb-2">
                Admin Password (admin123)
              </label>
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setAuthError('');
                }}
                placeholder="Enter admin123..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
              />
              {authError && (
                <p className="text-xs text-red-500 mt-2 font-medium">{authError}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-orange-500/25 cursor-pointer"
            >
              Sign In to Admin
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <Link href="/" className="text-xs text-slate-500 hover:text-orange-600 flex items-center justify-center gap-1.5 transition-colors font-medium">
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Website Homepage
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // FULL PAGE PROPERTY CREATION / EDITING INTERFACE
  if (isPropertyEditorFullPage) {
    return (
      <div className="min-h-screen bg-[#F4F6FA] text-slate-900 font-sans p-6 sm:p-10">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsPropertyEditorFullPage(false)} 
                className="p-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 block">Full Property Editor</span>
                <h1 className="text-2xl font-bold text-slate-900">{editingProperty ? 'Edit Property Listing' : 'Create New Property Listing'}</h1>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button 
                type="button" 
                onClick={() => setIsPropertyEditorFullPage(false)} 
                className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-600 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="button" 
                onClick={handleSaveProperty} 
                className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-xs text-white font-bold uppercase tracking-wider transition-colors shadow-lg shadow-orange-500/20 cursor-pointer"
              >
                {editingProperty ? 'Save & Publish Changes' : 'Create Property Listing'}
              </button>
            </div>
          </div>

          {/* Full Page Property Form */}
          <form onSubmit={handleSaveProperty} className="space-y-8">
            {/* Section 1: Basic Information */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-orange-500" />
                1. Basic Listing Details & Location
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase text-slate-600 font-bold mb-2">Property Title *</label>
                  <input
                    type="text"
                    required
                    value={propertyForm.title}
                    onChange={(e) => setPropertyForm({ ...propertyForm, title: e.target.value })}
                    placeholder="e.g. The Worli Ocean Residence & Penthouse"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-slate-600 font-bold mb-2">Category (Buy / Rent / Invest)</label>
                  <select
                    value={propertyForm.category}
                    onChange={(e) => setPropertyForm({ ...propertyForm, category: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Buy">BUY</option>
                    <option value="Rent">RENT</option>
                    <option value="Invest">INVEST</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase text-slate-600 font-bold mb-2">Property Architectural Type</label>
                  <select
                    value={propertyForm.propertyType}
                    onChange={(e) => setPropertyForm({ ...propertyForm, propertyType: e.target.value as any })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none cursor-pointer"
                  >
                    <option value="Villa">Villa</option>
                    <option value="Penthouse">Penthouse</option>
                    <option value="Glass House">Glass House</option>
                    <option value="Waterfront Estate">Waterfront Estate</option>
                    <option value="Modern Residence">Modern Residence</option>
                    <option value="Architectural Sanctuary">Architectural Sanctuary</option>
                  </select>
                </div>

                {/* LOCATION SELECTOR + INLINE NEW LOCATION CREATOR */}
                <div className="sm:col-span-2 space-y-3 p-4 bg-orange-50/50 rounded-2xl border border-orange-100">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs uppercase text-slate-700 font-bold">City / Location *</label>
                    <button
                      type="button"
                      onClick={() => setIsInlineAddLocation(!isInlineAddLocation)}
                      className="text-xs text-orange-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{isInlineAddLocation ? 'Choose Existing City' : 'Add New City Location'}</span>
                    </button>
                  </div>

                  {!isInlineAddLocation ? (
                    <select
                      value={propertyForm.location}
                      onChange={(e) => setPropertyForm({ ...propertyForm, location: e.target.value })}
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:border-orange-500 focus:outline-none cursor-pointer font-semibold"
                    >
                      {locations.map(loc => (
                        <option key={loc.id} value={loc.name}>{loc.name} ({loc.stateOrCountry})</option>
                      ))}
                    </select>
                  ) : (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newLocationName}
                        onChange={(e) => setNewLocationName(e.target.value)}
                        placeholder="Enter new city name (e.g. Chandigarh, Jaipur, Kochi)..."
                        className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:border-orange-500 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddNewLocationInline}
                        className="px-4 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase rounded-xl transition-colors cursor-pointer"
                      >
                        Add & Select
                      </button>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase text-slate-600 font-bold mb-2">Price (in ₹ Crores) *</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={propertyForm.price}
                    onChange={(e) => setPropertyForm({ ...propertyForm, price: parseFloat(e.target.value) })}
                    placeholder="15.5"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-slate-600 font-bold mb-2">Detailed Address *</label>
                  <input
                    type="text"
                    required
                    value={propertyForm.address}
                    onChange={(e) => setPropertyForm({ ...propertyForm, address: e.target.value })}
                    placeholder="e.g. Worli Sea Face, Mumbai 400018, India"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Specifications & Badges */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-orange-500" />
                2. Property Specifications & Badges
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <label className="block text-xs uppercase text-slate-600 font-bold mb-2">Bedrooms (BHK)</label>
                  <input
                    type="number"
                    value={propertyForm.bedrooms}
                    onChange={(e) => setPropertyForm({ ...propertyForm, bedrooms: parseInt(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-slate-600 font-bold mb-2">Bathrooms</label>
                  <input
                    type="number"
                    value={propertyForm.bathrooms}
                    onChange={(e) => setPropertyForm({ ...propertyForm, bathrooms: parseInt(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-slate-600 font-bold mb-2">Area (Sq Ft)</label>
                  <input
                    type="number"
                    value={propertyForm.sqft}
                    onChange={(e) => setPropertyForm({ ...propertyForm, sqft: parseInt(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-slate-600 font-bold mb-2">Garage Spaces</label>
                  <input
                    type="number"
                    value={propertyForm.garage}
                    onChange={(e) => setPropertyForm({ ...propertyForm, garage: parseInt(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                <div>
                  <label className="block text-xs uppercase text-slate-600 font-bold mb-2">Badge Tag Text</label>
                  <input
                    type="text"
                    value={propertyForm.tag}
                    onChange={(e) => setPropertyForm({ ...propertyForm, tag: e.target.value })}
                    placeholder="e.g. WORLI EXCLUSIVE"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-200 mt-6 sm:mt-0">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block uppercase">Featured Property</span>
                    <span className="text-[11px] text-slate-500">Showcase in website home page grid</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={propertyForm.isFeatured}
                    onChange={(e) => setPropertyForm({ ...propertyForm, isFeatured: e.target.checked })}
                    className="w-5 h-5 accent-orange-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Detailed Description & Amenities */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <FileText className="w-5 h-5 text-orange-500" />
                3. Full Description & Key Features
              </h2>

              <div>
                <label className="block text-xs uppercase text-slate-600 font-bold mb-2">Full Property Description *</label>
                <textarea
                  rows={6}
                  required
                  value={propertyForm.description}
                  onChange={(e) => setPropertyForm({ ...propertyForm, description: e.target.value })}
                  placeholder="Write a comprehensive description of the property architectural design, finishes, views, location advantages..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-slate-600 font-bold mb-2">Features & Amenities (Comma-separated list)</label>
                <textarea
                  rows={3}
                  value={propertyForm.featuresText}
                  onChange={(e) => setPropertyForm({ ...propertyForm, featuresText: e.target.value })}
                  placeholder="Private Infinity Pool, Smart Automation, Italian Kitchen, 24/7 Security Concierge, Private Elevator"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">Separate each feature with a comma. They will render as styled badges on the details page.</span>
              </div>
            </div>

            {/* Section 4: Cover Photo & Multiple Gallery Uploads */}
            <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-orange-500" />
                4. Cover Photo & Multiple Gallery Image Uploads
              </h2>

              {/* Cover Image Single Upload */}
              <div className="space-y-3">
                <label className="block text-xs uppercase text-slate-600 font-bold">Main Cover Photo *</label>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  {propertyForm.image && (
                    <img 
                      src={propertyForm.image} 
                      alt="Cover Preview" 
                      className="w-28 h-20 rounded-2xl object-cover border border-slate-200 shadow-sm flex-shrink-0"
                    />
                  )}

                  <label className="flex-1 w-full border-2 border-dashed border-slate-200 hover:border-orange-500 bg-slate-50 hover:bg-orange-50/50 rounded-2xl p-4 flex items-center justify-center gap-2 cursor-pointer transition-colors">
                    <Upload className="w-5 h-5 text-orange-500" />
                    <span className="text-xs font-bold text-slate-700">Upload Cover Photo File</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleSingleFileUpload(e.target.files[0], (url) => setPropertyForm({ ...propertyForm, image: url }));
                        }
                      }}
                      className="hidden" 
                    />
                  </label>
                </div>

                <input
                  type="text"
                  value={propertyForm.image}
                  onChange={(e) => setPropertyForm({ ...propertyForm, image: e.target.value })}
                  placeholder="Or paste cover image URL string..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              {/* Multiple Gallery Uploads */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <label className="block text-xs uppercase text-slate-600 font-bold">Gallery Photos ({propertyForm.gallery.length} Images)</label>
                </div>

                {/* Gallery Dropzone for MULTIPLE FILES */}
                <label className="w-full border-2 border-dashed border-orange-200 hover:border-orange-500 bg-orange-50/30 hover:bg-orange-50 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors text-center">
                  <Upload className="w-8 h-8 text-orange-500" />
                  <span className="text-sm font-bold text-slate-900">Upload Multiple Gallery Images</span>
                  <span className="text-xs text-slate-500">Select multiple image files at once from your device</span>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleMultipleFilesUpload(e.target.files, (newUrls) => {
                          setPropertyForm(prev => ({
                            ...prev,
                            gallery: [...prev.gallery, ...newUrls]
                          }));
                        });
                      }
                    }}
                    className="hidden" 
                  />
                </label>

                {/* OR Paste URL string */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={propertyForm.newGalleryUrl}
                    onChange={(e) => setPropertyForm({ ...propertyForm, newGalleryUrl: e.target.value })}
                    placeholder="Or paste external gallery photo URL..."
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (propertyForm.newGalleryUrl.trim()) {
                        setPropertyForm(prev => ({
                          ...prev,
                          gallery: [...prev.gallery, prev.newGalleryUrl.trim()],
                          newGalleryUrl: ''
                        }));
                      }
                    }}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Add URL
                  </button>
                </div>

                {/* Render Interactive Gallery Thumbnails */}
                {propertyForm.gallery.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 pt-2">
                    {propertyForm.gallery.map((imgUrl, idx) => (
                      <div key={idx} className="relative group aspect-square rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
                        <img src={imgUrl} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => {
                            setPropertyForm(prev => ({
                              ...prev,
                              gallery: prev.gallery.filter((_, i) => i !== idx)
                            }));
                          }}
                          className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-90 hover:opacity-100 transition-opacity cursor-pointer shadow-md"
                          title="Remove Photo"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-end space-x-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
              <button 
                type="button" 
                onClick={() => setIsPropertyEditorFullPage(false)} 
                className="px-6 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-600 cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-xs text-white font-bold uppercase tracking-wider transition-colors shadow-lg shadow-orange-500/20 cursor-pointer"
              >
                {editingProperty ? 'Save & Publish Changes' : 'Create Property Listing'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Dashboard Application Interface
  return (
    <div className="min-h-screen bg-[#F4F6FA] text-slate-800 flex font-sans">
      {/* LEFT SIDEBAR PANEL */}
      <aside className="w-64 bg-white border-r border-slate-200/80 p-6 flex flex-col justify-between flex-shrink-0 hidden lg:flex">
        <div className="space-y-8">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-slate-900 leading-none">
                untlip <span className="text-orange-600 text-xs font-semibold">AURA</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Real Estate Portal</span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center space-x-3.5 px-4 py-3 rounded-2xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('properties')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'properties'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <Building2 className="w-4 h-4" />
                <span>Properties</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'properties' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>{properties.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('cities')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'cities'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <MapPin className="w-4 h-4" />
                <span>Cities & Locations</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'cities' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>{locations.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'leads'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <Users className="w-4 h-4" />
                <span>Contacted Leads</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'leads' ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-600'
              }`}>{leads.length}</span>
            </button>

            <button
              onClick={() => setActiveTab('reviews')}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeTab === 'reviews'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25'
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-3.5">
                <MessageSquare className="w-4 h-4" />
                <span>Client Reviews</span>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                activeTab === 'reviews' ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}>{testimonials.length}</span>
            </button>
          </nav>
        </div>

        {/* Bottom Sidebar Logout Widget */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-100 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 block">AURA Partner Portal</span>
            <p className="text-xs text-slate-600 font-medium">Managing ₹{totalValuation} Cr in Indian Luxury Real Estate.</p>
          </div>

          <button
            onClick={() => {
              setIsAuthenticated(false);
              localStorage.removeItem('aura_admin_logged_in');
            }}
            className="w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* TOP HEADER BAR */}
        <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-slate-500 text-xs font-medium">
              <Calendar className="w-4 h-4 text-orange-500" />
              <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          {/* Search bar & Admin profile avatar */}
          <div className="flex items-center space-x-4">
            <div className="relative w-48 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search date, name or ID..."
                className="w-full bg-slate-50 text-xs text-slate-800 rounded-full pl-8 pr-4 py-2 border border-slate-200 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>

            <button className="p-2 text-slate-400 hover:text-slate-700 transition-colors relative cursor-pointer" title="Notifications">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500" />
            </button>

            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 font-bold text-xs flex items-center justify-center border border-orange-200">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* BODY CONTENT AREA */}
        <main className="p-6 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Header Title */}
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
                    Orders & Inquiries <span className="text-2xl">😍</span>
                  </h1>
                  <p className="text-xs text-slate-500 mt-1">Live real estate management overview & performance analytics</p>
                </div>

                <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium">
                  <button className="px-3 py-1.5 rounded-lg bg-white shadow-sm text-slate-900 font-bold">Daily</button>
                  <button className="px-3 py-1.5 text-slate-500 hover:text-slate-900">Monthly</button>
                </div>
              </div>

              {/* Pastel Metric Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: New Orders / Leads */}
                <div className="bg-[#EBF5FF] border border-[#BFDBFE]/60 rounded-3xl p-6 space-y-3">
                  <span className="text-xs font-semibold text-[#1E40AF] tracking-wide block">New Leads & Inquiries</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-4xl font-extrabold text-[#1E3A8A]">{leads.filter(l => l.status === 'New').length}</span>
                    <span className="text-xs font-semibold text-blue-700 bg-white/70 px-2.5 py-1 rounded-full">Active Inquiries</span>
                  </div>
                </div>

                {/* Card 2: Active Properties */}
                <div className="bg-[#F3E8FF] border border-[#E9D5FF]/60 rounded-3xl p-6 space-y-3">
                  <span className="text-xs font-semibold text-[#6B21A8] tracking-wide block">Listed Properties</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-4xl font-extrabold text-[#581C87]">{properties.length}</span>
                    <span className="text-xs font-semibold text-purple-700 bg-white/70 px-2.5 py-1 rounded-full">Across {locations.length} Cities</span>
                  </div>
                </div>

                {/* Card 3: Portfolio Value */}
                <div className="bg-[#FFEDD5] border border-[#FED7AA]/60 rounded-3xl p-6 space-y-3">
                  <span className="text-xs font-semibold text-[#C2410C] tracking-wide block">Portfolio Value</span>
                  <div className="flex items-baseline justify-between">
                    <span className="text-3xl font-extrabold text-[#9A3412]">₹{totalValuation} Cr</span>
                    <span className="text-xs font-semibold text-orange-700 bg-white/70 px-2.5 py-1 rounded-full">{locations.length} Cities</span>
                  </div>
                </div>
              </div>

              {/* Data Table Preview */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center space-x-6 text-xs font-semibold">
                    <button onClick={() => setLeadFilterStatus('All')} className={`pb-2 border-b-2 ${leadFilterStatus === 'All' ? 'border-orange-500 text-orange-600 font-bold' : 'border-transparent text-slate-400'}`}>
                      All Leads
                    </button>
                    <button onClick={() => setLeadFilterStatus('New')} className={`pb-2 border-b-2 ${leadFilterStatus === 'New' ? 'border-orange-500 text-orange-600 font-bold' : 'border-transparent text-slate-400'}`}>
                      New Inquiries
                    </button>
                    <button onClick={() => setLeadFilterStatus('In Progress')} className={`pb-2 border-b-2 ${leadFilterStatus === 'In Progress' ? 'border-orange-500 text-orange-600 font-bold' : 'border-transparent text-slate-400'}`}>
                      In Progress
                    </button>
                    <button onClick={() => setLeadFilterStatus('Closed')} className={`pb-2 border-b-2 ${leadFilterStatus === 'Closed' ? 'border-orange-500 text-orange-600 font-bold' : 'border-transparent text-slate-400'}`}>
                      Closed
                    </button>
                  </div>

                  <button onClick={() => setActiveTab('leads')} className="text-xs font-semibold text-orange-600 hover:underline">
                    Manage All
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-600">
                    <thead className="text-[11px] font-semibold uppercase text-slate-400 border-b border-slate-100">
                      <tr>
                        <th className="py-3 px-4">Lead ID</th>
                        <th className="py-3 px-4">Submitted Date</th>
                        <th className="py-3 px-4">Prospect Name</th>
                        <th className="py-3 px-4">Target City</th>
                        <th className="py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {leads
                        .filter(l => leadFilterStatus === 'All' || l.status === leadFilterStatus)
                        .slice(0, 5)
                        .map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-medium text-slate-800">#{lead.id.slice(-6)}</td>
                            <td className="py-3.5 px-4 text-slate-500">{lead.submittedAt}</td>
                            <td className="py-3.5 px-4 font-semibold text-slate-900">{lead.fullName}</td>
                            <td className="py-3.5 px-4 font-medium text-slate-700">{lead.preferredLocation}</td>
                            <td className="py-3.5 px-4">
                              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold ${
                                lead.status === 'New' ? 'bg-orange-50 text-orange-600 border border-orange-200' :
                                lead.status === 'In Progress' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                                'bg-slate-100 text-slate-600'
                              }`}>
                                <CheckCircle className="w-3 h-3" />
                                {lead.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PROPERTIES MANAGEMENT */}
          {activeTab === 'properties' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Properties Inventory</h2>
                  <p className="text-xs text-slate-500">Manage real estate listings, multiple gallery images, locations, and pricing</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={() => exportToCSV(getFormattedPropertiesForExport(), 'aura_properties_report')} className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
                    <Download className="w-3.5 h-3.5" /> CSV
                  </button>
                  <button onClick={() => exportToExcel(getFormattedPropertiesForExport(), 'aura_properties_excel')} className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" /> Excel
                  </button>
                  <button onClick={() => exportToPDF('Properties Portfolio Catalog', getFormattedPropertiesForExport())} className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
                    <FileText className="w-3.5 h-3.5 text-orange-600" /> PDF
                  </button>

                  <button
                    onClick={() => {
                      setEditingProperty(null);
                      setPropertyForm({
                        title: '',
                        category: 'Buy',
                        propertyType: 'Villa',
                        location: locations[0]?.name || 'Mumbai',
                        address: '',
                        price: 15.0,
                        bedrooms: 4,
                        bathrooms: 4,
                        sqft: 4200,
                        garage: 3,
                        yearBuilt: 2025,
                        tag: 'NEW EXCLUSIVE',
                        isFeatured: true,
                        description: '',
                        featuresText: 'Private Infinity Pool, Smart Automation, Italian Kitchen, 24/7 Security Concierge, Private Elevator',
                        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop',
                        gallery: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1600&auto=format&fit=crop'],
                        newGalleryUrl: ''
                      });
                      setIsPropertyEditorFullPage(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-md shadow-orange-500/20 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Full Property</span>
                  </button>
                </div>
              </div>

              {/* Properties Grid Table */}
              <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-4">Property</th>
                        <th className="p-4">City</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price</th>
                        <th className="p-4">Specs</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {properties.map((prop) => (
                        <tr key={prop.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 font-semibold text-slate-900">
                            <div className="flex items-center space-x-3">
                              <img src={prop.image} alt={prop.title} className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-slate-200" />
                              <div>
                                <span className="block text-sm font-bold text-slate-900">{prop.title}</span>
                                <span className="text-[11px] text-slate-500 font-normal">{prop.address}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 font-medium text-slate-800">{prop.location}</td>
                          <td className="p-4 text-slate-600">{prop.propertyType}</td>
                          <td className="p-4">
                            <span className="px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 font-bold uppercase text-[10px] border border-orange-100">
                              {prop.category}
                            </span>
                          </td>
                          <td className="p-4 font-bold text-slate-900">{prop.priceFormatted}</td>
                          <td className="p-4 text-slate-500">{prop.bedrooms} BHK • {prop.sqftFormatted}</td>
                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end space-x-1">
                              <Link
                                href={`/properties/${prop.id}`}
                                target="_blank"
                                className="p-2 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                                title="View Website Page"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                              <button
                                onClick={() => handleEditProperty(prop)}
                                className="p-2 text-slate-400 hover:text-orange-600 transition-colors cursor-pointer"
                                title="Edit Full Property"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProperty(prop.id)}
                                className="p-2 text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                                title="Delete Property"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CITIES / LOCATIONS MANAGEMENT */}
          {activeTab === 'cities' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Cities & Locations Directory</h2>
                  <p className="text-xs text-slate-500">Create, edit, and manage featured real estate cities across India</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={() => exportToCSV(getFormattedCitiesForExport(), 'aura_cities_report')} className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
                    <Download className="w-3.5 h-3.5" /> CSV
                  </button>
                  <button onClick={() => exportToExcel(getFormattedCitiesForExport(), 'aura_cities_excel')} className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" /> Excel
                  </button>
                  <button onClick={() => exportToPDF('Cities & Locations Catalog', getFormattedCitiesForExport())} className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
                    <FileText className="w-3.5 h-3.5 text-orange-600" /> PDF
                  </button>

                  <button
                    onClick={() => {
                      setEditingCity(null);
                      setCityForm({
                        name: '',
                        stateOrCountry: 'India',
                        propertyCount: 12,
                        image: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?q=80&w=1200&auto=format&fit=crop',
                        tagline: ''
                      });
                      setIsAddCityOpen(true);
                    }}
                    className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-md shadow-orange-500/20 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create City</span>
                  </button>
                </div>
              </div>

              {/* Cities Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {locations.map((city) => (
                  <div key={city.id} className="bg-white border border-slate-200/80 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div className="relative h-44 w-full">
                      <img src={city.image} alt={city.name} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                      <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold uppercase px-3 py-1 rounded-full border border-white/20">
                        {city.propertyCount} Properties
                      </span>
                      <div className="absolute bottom-3 left-4 text-white">
                        <span className="text-[10px] text-orange-400 font-bold uppercase tracking-wider block">{city.stateOrCountry}</span>
                        <h3 className="text-xl font-bold leading-tight">{city.name}</h3>
                      </div>
                    </div>

                    <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                      <p className="text-xs text-slate-600 line-clamp-2 font-normal">&quot;{city.tagline}&quot;</p>
                      
                      <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
                        <button
                          onClick={() => handleEditCity(city)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-600 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteCity(city.id)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: LEADS / CONTACTED DATA MANAGEMENT */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Contacted Leads & Client Inquiries</h2>
                  <p className="text-xs text-slate-500">Track and export all lead submissions captured from site contact forms</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={() => exportToCSV(getFormattedLeadsForExport(), 'aura_leads_export')} className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-orange-500/20 cursor-pointer">
                    <Download className="w-4 h-4" /> EXPORT CSV
                  </button>
                  <button onClick={() => exportToExcel(getFormattedLeadsForExport(), 'aura_leads_excel')} className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer">
                    <FileSpreadsheet className="w-4 h-4" /> EXPORT EXCEL
                  </button>
                  <button onClick={() => exportToPDF('Client Leads & Viewing Inquiries Report', getFormattedLeadsForExport())} className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs uppercase font-bold tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer">
                    <FileText className="w-4 h-4 text-orange-400" /> EXPORT PDF
                  </button>

                  <button onClick={() => setIsAddLeadOpen(true)} className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
                    <Plus className="w-4 h-4" /> Manual Lead
                  </button>
                </div>
              </div>

              {/* Leads Table */}
              <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-700">
                    <thead className="bg-slate-50 border-b border-slate-200/80 text-slate-500 font-semibold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-4">Prospect Name</th>
                        <th className="p-4">Contact Details</th>
                        <th className="p-4">Interest & City</th>
                        <th className="p-4">Requirements</th>
                        <th className="p-4">Date</th>
                        <th className="p-4">Status</th>
                        <th className="p-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {leads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-4 font-bold text-slate-900">{lead.fullName}</td>
                          <td className="p-4">
                            <div className="font-mono text-slate-800">{lead.phone}</div>
                            <div className="text-slate-500">{lead.email}</div>
                          </td>
                          <td className="p-4">
                            <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-600 font-bold uppercase text-[10px] block w-max mb-1 border border-orange-100">
                              {lead.interestedIn}
                            </span>
                            <span className="text-slate-600 font-medium">{lead.preferredLocation}</span>
                          </td>
                          <td className="p-4 max-w-xs text-slate-600 italic">
                            &quot;{lead.message}&quot;
                          </td>
                          <td className="p-4 text-slate-500 text-[11px]">{lead.submittedAt}</td>
                          <td className="p-4">
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                              className={`text-[10px] font-bold uppercase tracking-wider rounded-lg px-2.5 py-1.5 focus:outline-none cursor-pointer ${
                                lead.status === 'New' ? 'bg-orange-500 text-white' :
                                lead.status === 'Contacted' ? 'bg-blue-600 text-white' :
                                lead.status === 'In Progress' ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700'
                              }`}
                            >
                              <option value="New">NEW</option>
                              <option value="In Progress">IN PROGRESS</option>
                              <option value="Contacted">CONTACTED</option>
                              <option value="Closed">CLOSED</option>
                            </select>
                          </td>
                          <td className="p-4 text-right">
                            <button onClick={() => handleDeleteLead(lead.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors cursor-pointer" title="Delete Lead">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CLIENT REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Client Reviews Directory</h2>
                  <p className="text-xs text-slate-500">Manage client testimonials showcased on main portal</p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button onClick={() => exportToCSV(getFormattedReviewsForExport(), 'aura_reviews_report')} className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
                    <Download className="w-3.5 h-3.5" /> CSV
                  </button>
                  <button onClick={() => exportToExcel(getFormattedReviewsForExport(), 'aura_reviews_excel')} className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" /> Excel
                  </button>
                  <button onClick={() => exportToPDF('Client Testimonials & Ratings Report', getFormattedReviewsForExport())} className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer">
                    <FileText className="w-3.5 h-3.5 text-orange-600" /> PDF
                  </button>

                  <button onClick={() => setIsAddReviewOpen(true)} className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold uppercase tracking-wider flex items-center space-x-1.5 transition-all shadow-md shadow-orange-500/20 cursor-pointer">
                    <Plus className="w-4 h-4" /> Add Review
                  </button>
                </div>
              </div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {testimonials.map((test) => (
                  <div key={test.id} className="bg-white border border-slate-200/80 rounded-3xl p-6 space-y-4 shadow-sm relative">
                    <button onClick={() => handleDeleteReview(test.id)} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-red-600 transition-colors cursor-pointer" title="Delete Review">
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex items-center space-x-1 text-orange-500">
                      {[...Array(test.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-orange-500" />
                      ))}
                    </div>

                    <p className="text-slate-700 text-sm font-normal leading-relaxed italic">&quot;{test.quote}&quot;</p>

                    <div className="flex items-center space-x-3 pt-3 border-t border-slate-100">
                      <img src={test.image} alt={test.name} className="w-10 h-10 rounded-full object-cover border border-slate-200" />
                      <div>
                        <span className="block text-sm font-bold text-slate-900">{test.name}</span>
                        <span className="text-xs text-slate-500">{test.role}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD / EDIT CITY */}
      {isAddCityOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-slate-200 text-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 my-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">{editingCity ? 'Edit City / Location' : 'Create New City Location'}</h3>
              <button onClick={() => setIsAddCityOpen(false)} className="text-slate-400 hover:text-slate-700 p-2 cursor-pointer font-bold">✕</button>
            </div>

            <form onSubmit={handleSaveCity} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-slate-600 font-semibold mb-1">City Name *</label>
                <input
                  type="text"
                  required
                  value={cityForm.name}
                  onChange={(e) => setCityForm({ ...cityForm, name: e.target.value })}
                  placeholder="e.g. Mumbai, Goa, Kolkata..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-slate-600 font-semibold mb-1">State / Region *</label>
                  <input
                    type="text"
                    required
                    value={cityForm.stateOrCountry}
                    onChange={(e) => setCityForm({ ...cityForm, stateOrCountry: e.target.value })}
                    placeholder="e.g. Maharashtra, Goa..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-slate-600 font-semibold mb-1">Property Count</label>
                  <input
                    type="number"
                    value={cityForm.propertyCount}
                    onChange={(e) => setCityForm({ ...cityForm, propertyCount: parseInt(e.target.value) })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase text-slate-600 font-semibold">City Banner Image *</label>

                <div className="flex items-center gap-4">
                  {cityForm.image && (
                    <img 
                      src={cityForm.image} 
                      alt="City Preview" 
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shadow-sm flex-shrink-0"
                    />
                  )}

                  <label className="flex-1 border-2 border-dashed border-slate-200 hover:border-orange-500 bg-slate-50 hover:bg-orange-50/50 rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-semibold text-slate-700">Upload City Image</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleSingleFileUpload(e.target.files[0], (url) => setCityForm({ ...cityForm, image: url }));
                        }
                      }}
                      className="hidden" 
                    />
                  </label>
                </div>

                <input
                  type="text"
                  value={cityForm.image}
                  onChange={(e) => setCityForm({ ...cityForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:bg-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-slate-600 font-semibold mb-1">Tagline / Highlight</label>
                <textarea
                  rows={2}
                  value={cityForm.tagline}
                  onChange={(e) => setCityForm({ ...cityForm, tagline: e.target.value })}
                  placeholder="e.g. Oceanfront landmarks and luxury penthouses."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddCityOpen(false)} className="px-5 py-2.5 rounded-xl bg-slate-100 text-xs text-slate-600 font-semibold cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-xs text-white font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md shadow-orange-500/20">
                  {editingCity ? 'Update City' : 'Save City'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD REVIEW */}
      {isAddReviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-slate-200 text-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 my-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">Add Verified Client Review</h3>
              <button onClick={() => setIsAddReviewOpen(false)} className="text-slate-400 hover:text-slate-700 p-2 cursor-pointer font-bold">✕</button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-slate-600 font-semibold mb-1">Client Full Name *</label>
                <input
                  type="text"
                  required
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                  placeholder="e.g. Vikramaditya Singhania"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-slate-600 font-semibold mb-1">Role / Designation</label>
                  <input
                    type="text"
                    value={reviewForm.role}
                    onChange={(e) => setReviewForm({ ...reviewForm, role: e.target.value })}
                    placeholder="e.g. Tech Founder"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-slate-600 font-semibold mb-1">Location</label>
                  <input
                    type="text"
                    value={reviewForm.location}
                    onChange={(e) => setReviewForm({ ...reviewForm, location: e.target.value })}
                    placeholder="e.g. Mumbai, MH"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs uppercase text-slate-600 font-semibold">Client Profile Photo</label>

                <div className="flex items-center gap-4">
                  {reviewForm.image && (
                    <img 
                      src={reviewForm.image} 
                      alt="Avatar Preview" 
                      className="w-12 h-12 rounded-full object-cover border border-slate-200 shadow-sm flex-shrink-0"
                    />
                  )}

                  <label className="flex-1 border-2 border-dashed border-slate-200 hover:border-orange-500 bg-slate-50 hover:bg-orange-50/50 rounded-xl p-3 flex items-center justify-center gap-2 cursor-pointer transition-colors">
                    <Upload className="w-4 h-4 text-orange-500" />
                    <span className="text-xs font-semibold text-slate-700">Upload Photo File</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        if (e.target.files?.[0]) {
                          handleSingleFileUpload(e.target.files[0], (url) => setReviewForm({ ...reviewForm, image: url }));
                        }
                      }}
                      className="hidden" 
                    />
                  </label>
                </div>

                <input
                  type="text"
                  value={reviewForm.image}
                  onChange={(e) => setReviewForm({ ...reviewForm, image: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-800 focus:bg-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-slate-600 font-semibold mb-1">Testimonial Quote *</label>
                <textarea
                  rows={3}
                  required
                  value={reviewForm.quote}
                  onChange={(e) => setReviewForm({ ...reviewForm, quote: e.target.value })}
                  placeholder="Enter client review commentary..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddReviewOpen(false)} className="px-5 py-2.5 rounded-xl bg-slate-100 text-xs text-slate-600 font-semibold cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-xs text-white font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md shadow-orange-500/20">
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD MANUAL LEAD */}
      {isAddLeadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white border border-slate-200 text-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 my-auto shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-xl font-bold text-slate-900">Add Lead Record</h3>
              <button onClick={() => setIsAddLeadOpen(false)} className="text-slate-400 hover:text-slate-700 p-2 cursor-pointer font-bold">✕</button>
            </div>

            <form onSubmit={handleAddLead} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-slate-600 font-semibold mb-1">Prospect Full Name *</label>
                <input
                  type="text"
                  required
                  value={leadForm.fullName}
                  onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                  placeholder="e.g. Rahul Bajaj"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-slate-600 font-semibold mb-1">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={leadForm.phone}
                    onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                    placeholder="+91 98200 00000"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-slate-600 font-semibold mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={leadForm.email}
                    onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                    placeholder="rahul@example.com"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-slate-600 font-semibold mb-1">Interest Category</label>
                  <select
                    value={leadForm.interestedIn}
                    onChange={(e) => setLeadForm({ ...leadForm, interestedIn: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none cursor-pointer"
                  >
                    <option value="BUYING">BUYING</option>
                    <option value="RENTING">RENTING</option>
                    <option value="INVESTING">INVESTING</option>
                    <option value="SELLING">SELLING</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase text-slate-600 font-semibold mb-1">Preferred City</label>
                  <select
                    value={leadForm.preferredLocation}
                    onChange={(e) => setLeadForm({ ...leadForm, preferredLocation: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none cursor-pointer"
                  >
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.name}>{loc.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-slate-600 font-semibold mb-1">Inquiry / Requirements</label>
                <textarea
                  rows={3}
                  value={leadForm.message}
                  onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                  placeholder="Notes..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setIsAddLeadOpen(false)} className="px-5 py-2.5 rounded-xl bg-slate-100 text-xs text-slate-600 font-semibold cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-xs text-white font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-md shadow-orange-500/20">
                  Save Lead Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

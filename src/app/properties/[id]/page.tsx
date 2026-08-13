'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Bed, 
  Bath, 
  Move, 
  Calendar, 
  Car, 
  Heart, 
  Share2, 
  CheckCircle, 
  Phone, 
  Mail, 
  Send,
  Building2,
  Sparkles,
  ShieldCheck,
  Award,
  Check
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Property, INITIAL_PROPERTIES } from '@/data/properties';

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const propertyId = resolvedParams.id;

  const [property, setProperty] = useState<Property | null>(null);
  const [allProperties, setAllProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [linkCopied, setLinkCopied] = useState(false);

  // Lead Inquiry form state
  const [inquiryForm, setInquiryForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [inquirySubmitted, setInquirySubmitted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('aura_properties');
      const propertyList: Property[] = stored ? JSON.parse(stored) : INITIAL_PROPERTIES;
      setAllProperties(propertyList);

      const found = propertyList.find(p => p.id === propertyId || p.id === decodeURIComponent(propertyId));
      if (found) {
        setProperty(found);
      } else {
        // Fallback to first property if ID not found
        setProperty(propertyList[0]);
      }
    } catch {
      setProperty(INITIAL_PROPERTIES[0]);
    }
  }, [propertyId]);

  if (!property) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-orange-600" />
      </div>
    );
  }

  const galleryImages = property.gallery && property.gallery.length > 0 ? property.gallery : [property.image];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead = {
      id: 'lead-' + Date.now(),
      fullName: inquiryForm.fullName || 'Private Client',
      email: inquiryForm.email || 'client@example.com',
      phone: inquiryForm.phone || '+91 98200 00000',
      interestedIn: property.category.toUpperCase(),
      preferredLocation: property.location,
      message: `Inquiry regarding: ${property.title} (₹${property.price} Cr). Message: ${inquiryForm.message}`,
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      status: 'New'
    };

    try {
      const existingLeads = JSON.parse(localStorage.getItem('aura_leads') || '[]');
      localStorage.setItem('aura_leads', JSON.stringify([newLead, ...existingLeads]));
    } catch {
      // Fallback
    }

    setInquirySubmitted(true);
  };

  const handleCopyShareLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2500);
    }
  };

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-stone-900 font-sans">
      <Navbar onOpenScheduleModal={() => {}} favoritesCount={0} />

      {/* HERO GALLERY DISPLAY WITH INCREASED HEIGHT & REDUCED BORDER RADIUS */}
      <div className="pt-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="relative h-[520px] sm:h-[650px] lg:h-[720px] w-full rounded-xl overflow-hidden shadow-2xl bg-stone-900">
          <img 
            src={galleryImages[activeImageIndex] || property.image} 
            alt={property.title}
            className="w-full h-full object-cover transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />

          {/* Badges Overlay */}
          <div className="absolute top-6 left-6 flex items-center space-x-2">
            <span className="bg-orange-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-orange-500/30">
              {property.category}
            </span>
            <span className="bg-stone-900/80 backdrop-blur-md text-orange-400 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-orange-500/30">
              {property.tag || property.propertyType}
            </span>
          </div>

          {/* Title & Price overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4 text-white">
            <div>
              <div className="flex items-center gap-2 text-orange-400 text-xs font-semibold uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4" />
                <span>{property.address}</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-serif font-normal drop-shadow-md">{property.title}</h1>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20 text-right">
              <span className="text-stone-300 text-xs uppercase tracking-wider block font-semibold">Guide Price</span>
              <span className="text-3xl sm:text-4xl font-serif font-bold text-orange-400">{property.priceFormatted}</span>
            </div>
          </div>
        </div>

        {/* THUMBNAILS & SHARE / HEART ICONS BELOW THE IMAGE */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          {/* Gallery Thumbnails */}
          {galleryImages.length > 1 ? (
            <div className="flex items-center gap-3 overflow-x-auto pb-1 no-scrollbar w-full sm:w-auto">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                    activeImageIndex === idx ? 'border-orange-500 ring-2 ring-orange-500/30 scale-105' : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Gallery image ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          ) : (
            <div />
          )}

          {/* Share & Heart Action Buttons Placed BELOW the Image */}
          <div className="flex items-center space-x-3 self-end sm:self-auto">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-2 ${
                isFavorite 
                  ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/20' 
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-orange-50 hover:text-orange-600'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              <span>{isFavorite ? 'Saved to Wishlist' : 'Save Property'}</span>
            </button>

            <button 
              onClick={handleCopyShareLink}
              className="px-4 py-2.5 rounded-xl bg-white text-stone-700 border border-stone-200 hover:bg-orange-50 hover:text-orange-600 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center space-x-2"
            >
              {linkCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
              <span>{linkCopied ? 'Link Copied!' : 'Share Listing'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAIN SPECIFICATIONS & DETAILS GRID */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* LEFT 2-COLUMNS: DETAILS & FEATURES */}
        <div className="lg:col-span-2 space-y-10">
          {/* Key Specs Bar */}
          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm grid grid-cols-2 sm:grid-cols-4 gap-6 text-stone-700">
            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0 border border-orange-100">
                <Bed className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Bedrooms</span>
                <span className="text-lg font-bold text-stone-900">{property.bedrooms} BHK</span>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0 border border-orange-100">
                <Bath className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Bathrooms</span>
                <span className="text-lg font-bold text-stone-900">{property.bathrooms} Baths</span>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0 border border-orange-100">
                <Move className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Total Area</span>
                <span className="text-lg font-bold text-stone-900">{property.sqftFormatted}</span>
              </div>
            </div>

            <div className="flex items-center space-x-3.5">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center flex-shrink-0 border border-orange-100">
                <Car className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">Parking</span>
                <span className="text-lg font-bold text-stone-900">{property.garage || 3} Cars</span>
              </div>
            </div>
          </div>

          {/* Property Description */}
          <div className="bg-white border border-stone-200 rounded-xl p-8 shadow-sm space-y-4">
            <h2 className="text-2xl font-serif font-bold text-stone-900">About {property.title}</h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-light whitespace-pre-line">
              {property.description}
            </p>
          </div>

          {/* Luxury Features & Amenities */}
          <div className="bg-white border border-stone-200 rounded-xl p-8 shadow-sm space-y-6">
            <h2 className="text-2xl font-serif font-bold text-stone-900">Luxury Features & Amenities</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(property.features || [
                'Private Infinity Pool',
                'Smart Home Automation',
                'Italian Marble & Hardwood Flooring',
                '24/7 Security Concierge',
                'Private Elevator Access',
                'Landscaping & Private Garden',
                'Helipad & Valet Parking',
                'Integrated Climate Control'
              ]).map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-3 p-3.5 rounded-xl bg-stone-50 border border-stone-100 text-stone-800 text-xs font-semibold">
                  <CheckCircle className="w-4 h-4 text-orange-600 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Location Details Box */}
          <div className="bg-white border border-stone-200 rounded-xl p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-stone-900">Prime Location</h2>
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">{property.location}, INDIA</span>
            </div>

            <div className="h-56 w-full rounded-xl bg-stone-100 border border-stone-200 flex flex-col items-center justify-center p-6 text-center space-y-2 relative overflow-hidden">
              <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 z-10">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-stone-900 font-bold text-sm z-10">{property.address}</span>
              <p className="text-stone-500 text-xs z-10 max-w-sm">Situated in India's most coveted private enclave, close to financial districts and luxury lifestyle centers.</p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DIRECT LEAD / SCHEDULE FORM */}
        <div className="space-y-6">
          <div className="bg-white border border-stone-200 rounded-xl p-8 shadow-xl sticky top-28 space-y-6">
            <div className="border-b border-stone-100 pb-4 space-y-1">
              <span className="text-xs font-bold text-orange-600 uppercase tracking-widest block">Exclusive Agent Advisory</span>
              <h3 className="text-xl font-serif font-bold text-stone-900">Schedule a Private Viewing</h3>
              <p className="text-xs text-stone-500 font-light">Connect with our luxury real estate advisors for confidential viewings.</p>
            </div>

            {inquirySubmitted ? (
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 text-center space-y-3">
                <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-stone-900">Inquiry Submitted!</h4>
                <p className="text-xs text-stone-600">Our senior partner will contact you shortly to confirm your private showing of {property.title}.</p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-xs uppercase text-stone-600 font-semibold mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={inquiryForm.fullName}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, fullName: e.target.value })}
                    placeholder="e.g. Anand Mahindra"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-stone-600 font-semibold mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    placeholder="+91 98200 00000"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-stone-600 font-semibold mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    placeholder="anand@example.com"
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase text-stone-600 font-semibold mb-1">Special Requirements</label>
                  <textarea
                    rows={3}
                    value={inquiryForm.message}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                    placeholder="Preferred viewing date or questions..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-widest transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Private Viewing</span>
                </button>
              </form>
            )}

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-medium">
              <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Confidential</span>
              <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-orange-500" /> Certified Luxury Broker</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

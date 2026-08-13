'use client';

import { Search, MapPin, Home, IndianRupee, BedDouble } from 'lucide-react';

export interface SearchFilters {
  location: string;
  propertyType: string;
  priceRange: string;
  bedrooms: string;
}

interface PropertySearchPanelProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onSearchSubmit: () => void;
}

export default function PropertySearchPanel({
  filters,
  onFilterChange,
  onSearchSubmit,
}: PropertySearchPanelProps) {
  const handleSelectChange = (field: keyof SearchFilters, value: string) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-xl border border-stone-200/80 rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Location Select */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-bold tracking-wider text-orange-600 uppercase flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            Location
          </label>
          <select
            value={filters.location}
            onChange={(e) => handleSelectChange('location', e.target.value)}
            className="w-full bg-stone-50 text-stone-900 text-sm rounded-xl px-4 py-3 border border-stone-200 focus:border-orange-500 focus:bg-white focus:outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="All">All Indian Cities</option>
            <option value="Mumbai">Mumbai, MH</option>
            <option value="Delhi NCR">Delhi NCR (Gurgaon)</option>
            <option value="Bengaluru">Bengaluru, KA</option>
            <option value="Goa">Goa</option>
            <option value="Hyderabad">Hyderabad, TS</option>
            <option value="Pune">Pune, MH</option>
          </select>
        </div>

        {/* Property Type Select */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-bold tracking-wider text-orange-600 uppercase flex items-center gap-1.5">
            <Home className="w-3.5 h-3.5 text-orange-500" />
            Property Type
          </label>
          <select
            value={filters.propertyType}
            onChange={(e) => handleSelectChange('propertyType', e.target.value)}
            className="w-full bg-stone-50 text-stone-900 text-sm rounded-xl px-4 py-3 border border-stone-200 focus:border-orange-500 focus:bg-white focus:outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="All">All Types</option>
            <option value="Glass House">Glass House</option>
            <option value="Villa">Heritage & Modern Villa</option>
            <option value="Penthouse">Sky Penthouse</option>
            <option value="Waterfront Estate">Sea & Lakefront Estate</option>
            <option value="Modern Residence">Modern Residence</option>
          </select>
        </div>

        {/* Price Range Select */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-bold tracking-wider text-orange-600 uppercase flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-orange-500" />
            Price Range (INR)
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleSelectChange('priceRange', e.target.value)}
            className="w-full bg-stone-50 text-stone-900 text-sm rounded-xl px-4 py-3 border border-stone-200 focus:border-orange-500 focus:bg-white focus:outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="All">Any Price</option>
            <option value="under-10m">Under ₹10 Crore</option>
            <option value="10m-20m">₹10 Cr - ₹20 Crore</option>
            <option value="20m-30m">₹20 Cr - ₹30 Crore</option>
            <option value="above-30m">₹30 Crore+</option>
          </select>
        </div>

        {/* Bedrooms Select */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[11px] font-bold tracking-wider text-orange-600 uppercase flex items-center gap-1.5">
            <BedDouble className="w-3.5 h-3.5 text-orange-500" />
            Bedrooms
          </label>
          <select
            value={filters.bedrooms}
            onChange={(e) => handleSelectChange('bedrooms', e.target.value)}
            className="w-full bg-stone-50 text-stone-900 text-sm rounded-xl px-4 py-3 border border-stone-200 focus:border-orange-500 focus:bg-white focus:outline-none transition-colors appearance-none cursor-pointer"
          >
            <option value="All">Any BHK</option>
            <option value="3">3+ BHK</option>
            <option value="4">4+ BHK</option>
            <option value="5">5+ BHK</option>
            <option value="6">6+ BHK / Estates</option>
          </select>
        </div>
      </div>

      {/* Action Button: Compact & Centered */}
      <div className="flex justify-center pt-1">
        <button
          onClick={onSearchSubmit}
          className="w-full sm:w-auto px-10 py-3.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2.5 hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
        >
          <Search className="w-4 h-4" />
          <span>Search Properties</span>
        </button>
      </div>
    </div>
  );
}

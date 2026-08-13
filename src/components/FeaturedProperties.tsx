'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Property, INITIAL_PROPERTIES } from '@/data/properties';
import PropertyCard from './PropertyCard';
import { SearchFilters } from './PropertySearchPanel';

interface FeaturedPropertiesProps {
  searchFilters: SearchFilters;
  onResetFilters: () => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export default function FeaturedProperties({
  searchFilters,
  onResetFilters,
  favorites,
  onToggleFavorite,
  onSelectProperty,
}: FeaturedPropertiesProps) {
  const [activeCategoryTab, setActiveCategoryTab] = useState<string>('All');
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('aura_properties');
      if (stored) {
        setProperties(JSON.parse(stored));
      }
    } catch {
      setProperties(INITIAL_PROPERTIES);
    }
  }, []);

  // Filter properties based on active tab AND hero search filters
  const filteredProperties = properties.filter((prop) => {
    // Tab Filter
    if (activeCategoryTab !== 'All' && prop.category !== activeCategoryTab && prop.propertyType !== activeCategoryTab) {
      return false;
    }

    // Hero Location Filter
    if (searchFilters.location !== 'All' && prop.location !== searchFilters.location) {
      return false;
    }

    // Hero Property Type Filter
    if (searchFilters.propertyType !== 'All' && prop.propertyType !== searchFilters.propertyType) {
      return false;
    }

    // Hero Price Filter
    if (searchFilters.priceRange !== 'All') {
      if (searchFilters.priceRange === 'under-2m' && prop.price >= 2000000) return false;
      if (searchFilters.priceRange === '2m-5m' && (prop.price < 2000000 || prop.price > 5000000)) return false;
      if (searchFilters.priceRange === '5m-10m' && (prop.price < 5000000 || prop.price > 10000000)) return false;
      if (searchFilters.priceRange === 'above-10m' && prop.price <= 10000000) return false;
    }

    // Hero Bedrooms Filter
    if (searchFilters.bedrooms !== 'All') {
      const minBeds = parseInt(searchFilters.bedrooms, 10);
      if (prop.bedrooms < minBeds) return false;
    }

    return true;
  });

  const isSearchActive =
    searchFilters.location !== 'All' ||
    searchFilters.propertyType !== 'All' ||
    searchFilters.priceRange !== 'All' ||
    searchFilters.bedrooms !== 'All';

  return (
    <section id="properties" className="py-24 bg-[#FAF9F5] text-stone-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-stone-900 tracking-tight leading-[0.98]">
              Featured <br />
              <span className="font-normal text-orange-600">properties.</span>
            </h2>
            <p className="text-stone-500 text-sm sm:text-base font-light mt-4 max-w-xl">
              Explore a selection of exceptional homes chosen for their architecture, location, and lifestyle.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="mt-8 md:mt-0 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['All', 'Buy', 'Rent', 'Invest', 'Villa', 'Penthouse'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategoryTab(tab)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer whitespace-nowrap ${
                  activeCategoryTab === tab
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'bg-stone-200/60 text-stone-700 hover:bg-stone-300/60'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Notification Bar */}
        {isSearchActive && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-2xl bg-orange-50 border border-orange-200 text-stone-900 flex flex-wrap items-center justify-between gap-4"
          >
            <div className="flex items-center space-x-3 text-xs">
              <SlidersHorizontal className="w-4 h-4 text-orange-600" />
              <span className="font-semibold text-stone-800">Active Search Filters:</span>
              <div className="flex flex-wrap gap-2">
                {searchFilters.location !== 'All' && (
                  <span className="bg-white px-3 py-1 rounded-full text-orange-600 font-medium border border-orange-200">Location: {searchFilters.location}</span>
                )}
                {searchFilters.propertyType !== 'All' && (
                  <span className="bg-white px-3 py-1 rounded-full text-orange-600 font-medium border border-orange-200">Type: {searchFilters.propertyType}</span>
                )}
                {searchFilters.priceRange !== 'All' && (
                  <span className="bg-white px-3 py-1 rounded-full text-orange-600 font-medium border border-orange-200">Price Filter Active</span>
                )}
                {searchFilters.bedrooms !== 'All' && (
                  <span className="bg-white px-3 py-1 rounded-full text-orange-600 font-medium border border-orange-200">{searchFilters.bedrooms}+ Beds</span>
                )}
              </div>
            </div>

            <button
              onClick={onResetFilters}
              className="text-xs text-orange-600 hover:text-orange-700 hover:underline flex items-center gap-1.5 font-semibold cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          </motion.div>
        )}

        {/* Property Grid OR Empty State */}
        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isFavorite={favorites.includes(property.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectProperty={onSelectProperty}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-16 px-6 text-center bg-white border border-stone-200 rounded-3xl max-w-xl mx-auto shadow-sm"
          >
            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-200">
              <SlidersHorizontal className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-serif text-stone-900 mb-2">No Matching Properties</h3>
            <p className="text-stone-500 text-sm mb-6 leading-relaxed">
              No properties match your current search criteria. Try adjusting your filters to explore more luxury homes in our portfolio.
            </p>
            <button
              onClick={onResetFilters}
              className="px-6 py-3 rounded-full bg-orange-500 text-white text-xs font-semibold uppercase tracking-widest hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/20 cursor-pointer"
            >
              Reset Search Filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

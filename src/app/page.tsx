'use client';

import { useState } from 'react';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedProperties from '@/components/FeaturedProperties';
import PropertyCategories from '@/components/PropertyCategories';
import About from '@/components/About';
import Services from '@/components/Services';
import Locations from '@/components/Locations';
import WhyUs from '@/components/WhyUs';
import Testimonials from '@/components/Testimonials';
import CtaSection from '@/components/CtaSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import PropertyDetailModal from '@/components/PropertyDetailModal';
import ScheduleViewingModal from '@/components/ScheduleViewingModal';
import { Property } from '@/data/properties';
import { SearchFilters } from '@/components/PropertySearchPanel';

export default function Home() {
  // Favorites state
  const [favorites, setFavorites] = useState<string[]>(['glass-house-miami']);

  // Hero Search Filters state
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    location: 'All',
    propertyType: 'All',
    priceRange: 'All',
    bedrooms: 'All',
  });

  // Modal States
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [schedulePropertyTitle, setSchedulePropertyTitle] = useState<string>('');

  // Toggle favorite property
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Reset all hero search filters
  const handleResetFilters = () => {
    setSearchFilters({
      location: 'All',
      propertyType: 'All',
      priceRange: 'All',
      bedrooms: 'All',
    });
  };

  // When clicking "Search Properties" in hero search panel
  const handleSearchSubmit = () => {
    const propertiesSection = document.getElementById('properties');
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Select category from "Find Your Perfect Property" section
  const handleSelectCategory = (category: string) => {
    setSearchFilters((prev) => ({
      ...prev,
      propertyType: category === 'Buy' || category === 'Rent' || category === 'Invest' ? 'All' : category,
    }));
    const propertiesSection = document.getElementById('properties');
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Select location from Locations section
  const handleSelectLocation = (locationName: string) => {
    setSearchFilters((prev) => ({
      ...prev,
      location: locationName,
    }));
    const propertiesSection = document.getElementById('properties');
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Open inquiry from Property Detail Modal
  const handleInquireFromDetail = (propertyTitle: string) => {
    setSchedulePropertyTitle(propertyTitle);
    setIsScheduleModalOpen(true);
  };

  return (
    <main className="relative min-h-screen">
      {/* Luxury Preloader */}
      <Preloader />

      {/* Desktop Custom Smooth Cursor Follower */}
      <CustomCursor />

      {/* Sticky Header Navbar */}
      <Navbar
        onOpenScheduleModal={() => {
          setSchedulePropertyTitle('General Private Viewing');
          setIsScheduleModalOpen(true);
        }}
        favoritesCount={favorites.length}
      />

      {/* Hero Section with Floating Search Panel */}
      <Hero
        searchFilters={searchFilters}
        onFilterChange={setSearchFilters}
        onSearchSubmit={handleSearchSubmit}
        onOpenScheduleModal={() => {
          setSchedulePropertyTitle('General Private Viewing');
          setIsScheduleModalOpen(true);
        }}
      />

      {/* Featured Properties Grid Section */}
      <FeaturedProperties
        searchFilters={searchFilters}
        onResetFilters={handleResetFilters}
        favorites={favorites}
        onToggleFavorite={handleToggleFavorite}
        onSelectProperty={(property) => setSelectedProperty(property)}
      />

      {/* Property Categories (Buy, Rent, Invest) */}
      <PropertyCategories onSelectCategory={handleSelectCategory} />

      {/* About Section with Animated Statistics Counter */}
      <About />

      {/* Services Section */}
      <Services
        onOpenScheduleModal={() => {
          setSchedulePropertyTitle('Advisory & Services Consultation');
          setIsScheduleModalOpen(true);
        }}
      />

      {/* Desirable Locations Section */}
      <Locations onSelectLocation={handleSelectLocation} />

      {/* Why Choose Us Section (Dark Luxury Contrast) */}
      <WhyUs />

      {/* Testimonials Carousel Section */}
      <Testimonials />

      {/* Call to Action Section */}
      <CtaSection
        onOpenScheduleModal={() => {
          setSchedulePropertyTitle('Private Consultation');
          setIsScheduleModalOpen(true);
        }}
      />

      {/* Contact Section with Interactive Form & Styled Map Block */}
      <ContactSection prefilledPropertyTitle={schedulePropertyTitle} />

      {/* Footer */}
      <Footer />

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        onClose={() => setSelectedProperty(null)}
        isFavorite={selectedProperty ? favorites.includes(selectedProperty.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onInquire={handleInquireFromDetail}
      />

      {/* Schedule a Viewing Modal */}
      <ScheduleViewingModal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        defaultPropertyTitle={schedulePropertyTitle}
      />
    </main>
  );
}

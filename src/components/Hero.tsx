'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import PropertySearchPanel, { SearchFilters } from './PropertySearchPanel';

interface HeroProps {
  searchFilters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onSearchSubmit: () => void;
  onOpenScheduleModal: () => void;
}

const HERO_IMAGES = [
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop',
    alt: 'Luxury Architectural Estate with Infinity Pool'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop',
    alt: 'Contemporary Waterfront Residence'
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2000&auto=format&fit=crop',
    alt: 'High-rise Luxury Sky Penthouse'
  },
  {
    url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?q=80&w=2000&auto=format&fit=crop',
    alt: 'Palatial Private Villa & Gardens'
  },
  {
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop',
    alt: 'Sunlit Mediterranean Style Manor'
  }
];

export default function Hero({
  searchFilters,
  onFilterChange,
  onSearchSubmit,
  onOpenScheduleModal,
}: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Automatically cycle through background images 1 by 1 every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-stone-900">
      {/* Background Image Slideshow with Smooth Crossfade & Cinematic Zoom */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={HERO_IMAGES[currentImageIndex].url}
              alt={HERO_IMAGES[currentImageIndex].alt}
              fill
              priority={currentImageIndex === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Significantly Reduced Dark Overlay for Brighter & Clearer Visual Impact */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/30 to-stone-950/15" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/65 via-transparent to-stone-950/20" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center py-12">
        <div className="max-w-3xl">
          {/* Heading with drop shadow for legibility over lighter background */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif text-white font-light tracking-tight leading-[0.98] mb-6 drop-shadow-md"
          >
            Find a place <br />
            <span className="font-normal text-stone-100">worth calling home.</span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg text-stone-200 font-light leading-relaxed max-w-2xl mb-8 drop-shadow-sm"
          >
            Discover exceptional properties in India&apos;s most desirable locations, curated around the way you want to live.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-5"
          >
            <a
              href="#properties"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-orange-500 text-white font-semibold text-xs uppercase tracking-widest hover:bg-orange-600 transition-all duration-300 shadow-xl shadow-orange-500/25 group"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={onOpenScheduleModal}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-stone-900/60 backdrop-blur-md text-white border border-white/30 font-semibold text-xs uppercase tracking-widest hover:bg-stone-900/80 transition-all duration-300 cursor-pointer shadow-lg"
            >
              <span>Schedule a Viewing</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Property Search Panel */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4 sm:mt-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
        >
          <PropertySearchPanel
            filters={searchFilters}
            onFilterChange={onFilterChange}
            onSearchSubmit={onSearchSubmit}
          />
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="hidden md:flex justify-center mt-6 z-10 text-stone-300 text-xs tracking-widest uppercase items-center gap-2 font-medium drop-shadow-sm"
      >
        <span className="text-[10px]">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-orange-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight } from 'lucide-react';
import PropertySearchPanel, { SearchFilters } from './PropertySearchPanel';

interface HeroProps {
  searchFilters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  onSearchSubmit: () => void;
  onOpenScheduleModal: () => void;
}

export default function Hero({
  searchFilters,
  onFilterChange,
  onSearchSubmit,
  onOpenScheduleModal,
}: HeroProps) {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 overflow-hidden bg-stone-900">
      {/* Background Image with Cinematic Scale Animation */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Architecture Hero Background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Layered Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950/80 via-transparent to-stone-950/40" />
      </motion.div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center py-12">
        <div className="max-w-3xl">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif text-white font-light tracking-tight leading-[0.98] mb-6"
          >
            Find a place <br />
            <span className="font-normal text-stone-100">worth calling home.</span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-base sm:text-lg text-stone-300 font-light leading-relaxed max-w-2xl mb-8"
          >
            Discover exceptional properties in the world&apos;s most desirable locations, curated around the way you want to live.
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
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 font-semibold text-xs uppercase tracking-widest hover:bg-white/20 transition-all duration-300 cursor-pointer"
            >
              <span>Schedule a Viewing</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Floating Property Search Panel */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-8">
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
        className="hidden md:flex justify-center mt-6 z-10 text-stone-400 text-xs tracking-widest uppercase items-center gap-2"
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

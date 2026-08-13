'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { INITIAL_LOCATIONS, LocationInfo } from '@/data/properties';

interface LocationsProps {
  onSelectLocation: (locationName: string) => void;
}

export default function Locations({ onSelectLocation }: LocationsProps) {
  const [locationsList, setLocationsList] = useState<LocationInfo[]>(INITIAL_LOCATIONS);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('aura_locations');
      if (stored) {
        setLocationsList(JSON.parse(stored));
      }
    } catch {
      setLocationsList(INITIAL_LOCATIONS);
    }
  }, []);

  return (
    <section id="locations" className="py-24 bg-[#FAF9F5] text-stone-900 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-stone-900 leading-[0.98]">
            Live where it <br />
            <span className="font-normal text-orange-600">inspires you.</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light mt-4">
            From Mumbai oceanfront landmarks to Gurgaon sky residences, Goa villas, and Hyderabad estates.
          </p>
        </div>

        {/* Location Cards Grid with Horizontal Scroll on Mobile */}
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto pb-4 md:pb-0 no-scrollbar snap-x snap-mandatory">
          {locationsList.map((loc, index) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => onSelectLocation(loc.name)}
              className="group relative h-80 w-[85vw] sm:w-[360px] md:w-auto rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex-shrink-0 snap-center flex flex-col justify-between p-6 border border-stone-200"
            >
              {/* Background Image */}
              <Image
                src={loc.image}
                alt={loc.name}
                fill
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent opacity-75 group-hover:opacity-85 transition-opacity duration-300" />

              {/* Top Tag */}
              <div className="relative z-10 flex justify-between items-center">
                <span className="bg-black/50 backdrop-blur-md text-white text-[10px] font-semibold tracking-widest uppercase px-3 py-1 rounded-full border border-white/20">
                  {loc.propertyCount} Properties Available
                </span>

                <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Bottom Content */}
              <div className="relative z-10 text-white space-y-1">
                <span className="text-[11px] text-orange-400 uppercase font-bold tracking-widest block">
                  {loc.stateOrCountry}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-light">
                  {loc.name}
                </h3>
                <p className="text-xs text-stone-300 font-light line-clamp-1">
                  {loc.tagline}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

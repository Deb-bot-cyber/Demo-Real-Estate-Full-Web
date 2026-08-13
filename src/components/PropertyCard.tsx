'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, MapPin, Bed, Bath, Move, ArrowUpRight } from 'lucide-react';
import { Property } from '@/data/properties';

interface PropertyCardProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export default function PropertyCard({
  property,
  isFavorite,
  onToggleFavorite,
  onSelectProperty,
}: PropertyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Container */}
      <Link href={`/properties/${property.id}`} className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 cursor-pointer block">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Subtle Dark Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-40 group-hover:opacity-60 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
          <span className="bg-stone-900/90 backdrop-blur-md text-orange-400 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full border border-orange-500/30">
            {property.tag || property.propertyType}
          </span>

          {/* Favorite Heart Button */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleFavorite(property.id);
            }}
            className={`pointer-events-auto p-2.5 rounded-full backdrop-blur-md border transition-all duration-300 cursor-pointer ${
              isFavorite
                ? 'bg-orange-500 text-white border-orange-500 shadow-md shadow-orange-500/30'
                : 'bg-stone-900/60 text-white border-white/20 hover:bg-white hover:text-orange-500'
            }`}
            aria-label="Save to favorites"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-4 left-4 z-10">
          <span className="text-xl sm:text-2xl font-serif text-white font-semibold drop-shadow-md">
            {property.priceFormatted}
          </span>
        </div>
      </Link>

      {/* Content Body */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Category & Location */}
          <div className="flex items-center text-xs text-stone-500 font-medium space-x-2 mb-2">
            <span className="text-orange-600 font-semibold uppercase tracking-wider">{property.category}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-stone-600">
              <MapPin className="w-3.5 h-3.5 text-stone-400" />
              {property.location}
            </span>
          </div>

          {/* Property Title */}
          <h3 className="text-xl font-serif font-medium text-stone-900 group-hover:text-orange-600 transition-colors cursor-pointer mb-3 line-clamp-1">
            <Link href={`/properties/${property.id}`}>
              {property.title}
            </Link>
          </h3>

          <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed mb-6">
            {property.description}
          </p>
        </div>

        <div>
          {/* Property Spec Icons */}
          <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-stone-100 text-stone-600 text-xs mb-5">
            <div className="flex items-center space-x-1.5">
              <Bed className="w-4 h-4 text-stone-400" />
              <span><strong className="font-semibold text-stone-900">{property.bedrooms}</strong> Beds</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Bath className="w-4 h-4 text-stone-400" />
              <span><strong className="font-semibold text-stone-900">{property.bathrooms}</strong> Baths</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <Move className="w-4 h-4 text-stone-400" />
              <span className="truncate"><strong className="font-semibold text-stone-900">{property.sqft}</strong> sqft</span>
            </div>
          </div>

          {/* View Property CTA */}
          <Link
            href={`/properties/${property.id}`}
            className="w-full py-3 px-4 rounded-xl bg-stone-900 text-white font-semibold text-xs uppercase tracking-wider group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
          >
            <span>View Property</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}


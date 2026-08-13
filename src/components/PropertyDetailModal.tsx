'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Bed, Bath, Move, Calendar, Car, Check, Heart, ArrowRight } from 'lucide-react';
import { Property } from '@/data/properties';

interface PropertyDetailModalProps {
  property: Property | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onInquire: (propertyTitle: string) => void;
}

export default function PropertyDetailModal({
  property,
  onClose,
  isFavorite,
  onToggleFavorite,
  onInquire,
}: PropertyDetailModalProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!property) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 lg:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-stone-950/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 30 }}
          transition={{ type: 'spring', duration: 0.6, bounce: 0.05 }}
          className="relative w-full max-w-5xl bg-white border border-stone-200 text-stone-900 rounded-3xl overflow-hidden shadow-2xl z-10 max-h-[90vh] flex flex-col my-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 z-30 bg-white/90 text-stone-900 p-3 rounded-full hover:bg-orange-500 hover:text-white transition-colors border border-stone-200 shadow-md cursor-pointer"
            aria-label="Close detail modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Scrollable Modal Body */}
          <div className="overflow-y-auto p-6 sm:p-8 lg:p-10 space-y-8 no-scrollbar">
            {/* Gallery Section */}
            <div className="space-y-4">
              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                <Image
                  src={property.gallery[selectedImageIndex] || property.image}
                  alt={property.title}
                  fill
                  className="object-cover transition-all duration-500"
                  priority
                />
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <span className="bg-orange-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-md">
                    {property.category}
                  </span>
                  <span className="bg-stone-900/80 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/20">
                    {property.propertyType}
                  </span>
                </div>

                <button
                  onClick={() => onToggleFavorite(property.id)}
                  className={`absolute top-4 right-16 z-10 p-2.5 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                    isFavorite
                      ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                      : 'bg-stone-900/60 text-white border-white/20 hover:bg-white hover:text-orange-500'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Thumbnails */}
              {property.gallery.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {property.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-24 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                        selectedImageIndex === idx ? 'border-orange-500 scale-95' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <Image src={img} alt={`Gallery view ${idx + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Header Info */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-stone-200 pb-8">
              <div>
                <div className="flex items-center text-sm text-orange-600 space-x-2 mb-2 font-medium">
                  <MapPin className="w-4 h-4 text-orange-500" />
                  <span>{property.address}</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-serif font-light text-stone-900">
                  {property.title}
                </h2>
              </div>
              <div className="text-left md:text-right">
                <span className="text-xs text-stone-500 uppercase tracking-widest block mb-1 font-semibold">Asking Price</span>
                <span className="text-3xl sm:text-4xl font-serif font-semibold text-orange-600">
                  {property.priceFormatted}
                </span>
              </div>
            </div>

            {/* Core Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 bg-stone-50 border border-stone-200 rounded-2xl p-5">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Bed className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">Bedrooms</span>
                  <span className="text-sm font-semibold text-stone-900">{property.bedrooms} Beds</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Bath className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">Bathrooms</span>
                  <span className="text-sm font-semibold text-stone-900">{property.bathrooms} Baths</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Move className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">Total Area</span>
                  <span className="text-sm font-semibold text-stone-900">{property.sqftFormatted}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">Year Built</span>
                  <span className="text-sm font-semibold text-stone-900">{property.yearBuilt}</span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] text-stone-500 uppercase tracking-wider block font-semibold">Garage</span>
                  <span className="text-sm font-semibold text-stone-900">{property.garage} Vehicles</span>
                </div>
              </div>
            </div>

            {/* Description & Features Split */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Description */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-xl font-serif font-light text-stone-900">
                  Architectural Overview
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed font-light">
                  {property.description}
                </p>
                <p className="text-stone-500 text-sm leading-relaxed font-light">
                  Every square foot of this residence has been tailored with uncompromising craftsmanship. From custom floor-to-ceiling glass installations to acoustic thermal insulation and integrated smart lighting systems, it represents modern luxury at its highest pinnacle.
                </p>
              </div>

              {/* Right Features List */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-serif font-semibold text-orange-600">
                  Luxury Amenities
                </h3>
                <ul className="space-y-2.5">
                  {property.features.map((feat, i) => (
                    <li key={i} className="flex items-start space-x-2.5 text-xs text-stone-700 font-medium">
                      <div className="w-4 h-4 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-stone-500 font-medium">
                Interested in this residence? Contact our dedicated estate team for private arrangements.
              </div>

              <button
                onClick={() => {
                  onClose();
                  onInquire(property.title);
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold text-xs uppercase tracking-widest hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Inquire About This Property</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

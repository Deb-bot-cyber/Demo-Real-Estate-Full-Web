'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Testimonial, INITIAL_TESTIMONIALS } from '@/data/properties';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('aura_testimonials');
      if (stored) {
        setTestimonials(JSON.parse(stored));
      }
    } catch {
      setTestimonials(INITIAL_TESTIMONIALS);
    }
  }, []);

  // Auto advance every 6s unless interacted
  useEffect(() => {
    if (testimonials.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials]);

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const current = testimonials[currentIndex] || INITIAL_TESTIMONIALS[0];

  return (
    <section className="py-24 bg-[#FAF9F5] text-stone-900 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-stone-900 leading-[0.98]">
            Trusted by people <br />
            <span className="font-normal text-orange-600">who expect more.</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light mt-4">
            Read how we have assisted discerning clients in discovering their dream residences and investment assets.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-xl">
          <Quote className="absolute top-8 left-8 sm:top-12 sm:left-12 w-16 h-16 text-orange-500/15 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="relative z-10 space-y-8 text-center"
            >
              {/* Star Rating */}
              <div className="flex justify-center space-x-1">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-orange-500 text-orange-500" />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-serif font-light text-stone-900 leading-relaxed max-w-3xl mx-auto">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              {/* Client Info */}
              <div className="flex flex-col items-center justify-center space-y-3 pt-4 border-t border-stone-100">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-orange-500">
                  <Image
                    src={current.image}
                    alt={current.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="text-lg font-serif font-semibold text-stone-900">
                    {current.name}
                  </h4>
                  <p className="text-xs font-medium uppercase tracking-wider text-stone-500">
                    {current.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-stone-100">
            <div className="flex space-x-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === i ? 'w-8 bg-orange-500' : 'w-2 bg-stone-300 hover:bg-stone-400'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors cursor-pointer"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors cursor-pointer"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

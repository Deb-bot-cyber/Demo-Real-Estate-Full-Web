'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Star } from 'lucide-react';
import { Testimonial, INITIAL_TESTIMONIALS } from '@/data/properties';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('shri_laxmi_testimonials') || localStorage.getItem('aura_testimonials');
      if (stored) {
        setTestimonials(JSON.parse(stored));
      }
    } catch {
      setTestimonials(INITIAL_TESTIMONIALS);
    }
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="reviews" className="py-24 bg-[#F5F4F0] text-stone-900 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Arrow Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2 block">
              Client Stories
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-stone-900 leading-[1.05]">
              Trusted by people <br />
              <span className="font-normal text-stone-900">who expect more.</span>
            </h2>
          </div>

          {/* Carousel Arrow Controls */}
          <div className="flex items-center space-x-3 self-start sm:self-auto">
            <button
              onClick={() => handleScroll('left')}
              className="w-12 h-12 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all shadow-sm cursor-pointer"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-12 h-12 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-700 hover:bg-stone-900 hover:text-white hover:border-stone-900 transition-all shadow-sm cursor-pointer"
              aria-label="Next reviews"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Multi-Card Horizontal Scroll Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-6 overflow-x-auto no-scrollbar pb-6 snap-x snap-mandatory"
        >
          {testimonials.map((item, idx) => {
            const hasVideo = idx === 1; // Video trigger on second card

            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="w-[320px] sm:w-[380px] flex-shrink-0 snap-start bg-white rounded-[2rem] p-8 sm:p-10 flex flex-col justify-between border border-stone-200/80 shadow-sm hover:shadow-2xl transition-all duration-500 min-h-[460px] relative overflow-hidden group cursor-pointer"
              >
                {/* Background Image & Overlay - Appears ONLY on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out z-0 pointer-events-none">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 brightness-[0.75]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/85" />
                </div>

                {/* Top Avatar & Video Play Button */}
                <div className="relative z-10 flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-stone-200 group-hover:border-white/90 shadow-sm relative transition-colors duration-300">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>

                  {hasVideo && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsVideoModalOpen(true);
                      }}
                      className="w-10 h-10 rounded-full bg-orange-500/10 group-hover:bg-white/20 backdrop-blur-md border border-orange-500/30 group-hover:border-white/50 flex items-center justify-center text-orange-600 group-hover:text-white shadow-md hover:scale-110 transition-all duration-300 cursor-pointer"
                      aria-label="Play client video testimonial"
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </button>
                  )}
                </div>

                {/* Body Quote Text */}
                <p className="relative z-10 text-stone-700 group-hover:text-white text-sm sm:text-base leading-relaxed font-normal mb-8 my-auto transition-colors duration-300 drop-shadow-sm">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Bottom Signature Name & Role */}
                <div className="relative z-10 pt-4 border-t border-stone-100 group-hover:border-white/20 space-y-1 transition-colors duration-300">
                  <h3 className="font-signature text-3xl sm:text-4xl text-stone-900 group-hover:text-white font-bold tracking-wide transition-colors duration-300 drop-shadow-sm">
                    {item.name}
                  </h3>
                  <p className="text-xs text-stone-400 group-hover:text-stone-200 font-medium tracking-wide transition-colors duration-300">
                    {item.role}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Video Modal Placeholder */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 rounded-3xl p-6 max-w-2xl w-full text-white border border-stone-800 relative">
            <button
              onClick={() => setIsVideoModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white text-xl font-bold cursor-pointer"
            >
              ✕
            </button>
            <div className="aspect-video w-full rounded-2xl bg-stone-950 flex flex-col items-center justify-center space-y-3">
              <Play className="w-12 h-12 text-orange-500 animate-pulse" />
              <p className="text-sm font-medium text-stone-300">Shri Laxmi Property Client Experience Video</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface PropertyCategoriesProps {
  onSelectCategory: (category: string) => void;
}

export default function PropertyCategories({ onSelectCategory }: PropertyCategoriesProps) {
  const categories = [
    {
      id: 'Buy',
      title: 'Buy',
      subtitle: 'Find a home designed around your lifestyle.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
      count: '42 Active Listings',
    },
    {
      id: 'Rent',
      title: 'Rent',
      subtitle: 'Flexible living without compromise.',
      image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1200&auto=format&fit=crop',
      count: '18 Executive Rentals',
    },
    {
      id: 'Invest',
      title: 'Invest',
      subtitle: 'Discover opportunities with long-term potential.',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop',
      count: '12 Prime Portfolios',
    },
  ];

  return (
    <section id="categories" className="py-24 bg-[#EFECE6] text-stone-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-stone-900 leading-[0.98]">
            Find your perfect <br />
            <span className="font-normal text-orange-600">property.</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light mt-4">
            Whether acquiring a permanent legacy residence, arranging a seasonal lease, or expanding your investment portfolio.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat, index) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative h-[450px] rounded-3xl overflow-hidden shadow-lg cursor-pointer flex flex-col justify-end p-8 border border-white/40"
            >
              {/* Background Image */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                sizes="(max-width: 768px) 100vw, 33vw"
              />

              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Category Info */}
              <div className="relative z-10 text-white space-y-3">
                <span className="text-xs font-bold uppercase tracking-widest text-orange-400">
                  {cat.count}
                </span>

                <div className="flex items-center justify-between">
                  <h3 className="text-3xl sm:text-4xl font-serif font-light">
                    {cat.title}
                  </h3>
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                <p className="text-sm text-stone-300 font-light leading-relaxed">
                  {cat.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

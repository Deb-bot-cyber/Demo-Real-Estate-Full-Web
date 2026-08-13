'use client';

import { motion } from 'framer-motion';
import { Compass, Sparkles, UserCheck, BarChart3 } from 'lucide-react';

export default function WhyUs() {
  const benefits = [
    {
      icon: Compass,
      title: 'Local Expertise',
      description: 'Deep, insider knowledge of local zoning, neighborhood trends, and off-market opportunities across our core cities.',
    },
    {
      icon: Sparkles,
      title: 'Curated Properties',
      description: 'Every residence undergoes rigorous architectural evaluation. We only list properties that meet our strict luxury standards.',
    },
    {
      icon: UserCheck,
      title: 'Personal Guidance',
      description: 'A single, dedicated senior advisor manages your entire portfolio journey with complete discretion and care.',
    },
    {
      icon: BarChart3,
      title: 'Better Decisions',
      description: 'Proprietary market intelligence and real-time transaction analytics empower you to move with total confidence.',
    },
  ];

  return (
    <section id="why-us" className="py-24 bg-[#F5F3ED] text-stone-900 border-y border-stone-200 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-stone-900 leading-[0.98]">
            A better way to <br />
            <span className="font-normal text-orange-600">move forward.</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light mt-4">
            Built on principles of architectural appreciation, market data analytics, and dedicated personal advisory.
          </p>
        </div>

        {/* 4 Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                className="p-8 rounded-3xl bg-white border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all">
                  <IconComponent className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-serif font-medium text-stone-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {benefit.title}
                </h3>

                <p className="text-stone-600 text-xs sm:text-sm font-light leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

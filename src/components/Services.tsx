'use client';

import { motion } from 'framer-motion';
import { Key, TrendingUp, Building, LineChart, ArrowRight } from 'lucide-react';

interface ServicesProps {
  onOpenScheduleModal: () => void;
}

export default function Services({ onOpenScheduleModal }: ServicesProps) {
  const services = [
    {
      icon: Key,
      title: 'Buying',
      description: 'Expert guidance from initial property discovery and off-market sourcing through negotiation and seamless closing.',
    },
    {
      icon: TrendingUp,
      title: 'Selling',
      description: 'Strategic positioning, editorial videography, and global target marketing designed to maximize your property’s valuation.',
    },
    {
      icon: Building,
      title: 'Property Management',
      description: 'Comprehensive, white-glove management for physical maintenance, tenant relations, and stress-free ownership.',
    },
    {
      icon: LineChart,
      title: 'Investment Advisory',
      description: 'Data-driven yield analytics, market forecasting, and tax-efficient structuring for smarter real estate allocations.',
    },
  ];

  return (
    <section id="services" className="py-24 bg-[#EFECE6] text-stone-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <h2 className="text-3xl sm:text-5xl font-serif font-light text-stone-900 leading-[0.98]">
              Everything you need, <br />
              <span className="font-normal text-orange-600">under one roof.</span>
            </h2>
            <p className="text-stone-600 text-sm sm:text-base font-light mt-3 max-w-xl">
              Comprehensive advisory, acquisition, management, and investment solutions tailored for modern living.
            </p>
          </div>

          <button
            onClick={onOpenScheduleModal}
            className="mt-6 md:mt-0 inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-stone-900 hover:text-orange-600 transition-colors cursor-pointer group"
          >
            <span>Consult With An Advisor</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-orange-500" />
          </button>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-8 rounded-3xl bg-white border border-stone-200 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-200 text-orange-600 flex items-center justify-center mb-6 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-colors duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-serif font-medium text-stone-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-stone-100 flex items-center text-xs font-semibold uppercase tracking-wider text-stone-400 group-hover:text-stone-900 transition-colors">
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

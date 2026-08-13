'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import StatsCounter from './StatsCounter';
import { Award, ShieldCheck, Sparkles } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-24 bg-[#FAF9F5] text-stone-900 overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image Framing */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl border border-stone-200">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop"
                alt="Luxury Real Estate Architectural Interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/50 via-transparent to-transparent" />
            </div>

            {/* Overlay Floating Card (Light Theme) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute -bottom-8 -right-4 sm:right-6 bg-white text-stone-900 p-6 rounded-2xl shadow-2xl border border-orange-200 max-w-xs hidden sm:block z-10"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-serif font-semibold text-stone-900">Global Excellence</h4>
                  <span className="text-[10px] text-orange-600 font-semibold uppercase tracking-widest">Ranked #1 Agency</span>
                </div>
              </div>
              <p className="text-xs text-stone-600 font-light leading-relaxed">
                Awarded top luxury boutique estate firm for international high-net-worth acquisitions.
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column: Editorial Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8"
          >
              <h2 className="text-3xl sm:text-5xl font-serif font-light text-stone-900 leading-[0.98]">
                Real estate, <br />
                <span className="font-normal text-orange-600">reimagined.</span>
              </h2>

            <p className="text-stone-600 text-base sm:text-lg font-light leading-relaxed">
              We believe finding a property should be more than a transaction. It&apos;s about discovering a place that fits your ambitions, your lifestyle, and the life you want to build.
            </p>

            <p className="text-stone-500 text-sm font-light leading-relaxed">
              Founded on principles of discretion, architectural appreciation, and data-backed market intelligence, AURA Estates serves as a trusted partner for discerning buyers and sellers worldwide.
            </p>

            {/* Key Value Badges */}
            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="flex items-center space-x-2.5 text-xs font-semibold uppercase tracking-wider text-stone-800">
                <ShieldCheck className="w-4 h-4 text-orange-500" />
                <span>Strict Confidentiality</span>
              </div>
              <div className="flex items-center space-x-2.5 text-xs font-semibold uppercase tracking-wider text-stone-800">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>Bespoke Portfolios</span>
              </div>
            </div>

            {/* Animated Stats Component */}
            <StatsCounter />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

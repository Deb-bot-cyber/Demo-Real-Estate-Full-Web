'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, PhoneCall } from 'lucide-react';

interface CtaSectionProps {
  onOpenScheduleModal: () => void;
}

export default function CtaSection({ onOpenScheduleModal }: CtaSectionProps) {
  return (
    <section className="relative py-28 w-full bg-[#FAF9F5] text-stone-900 overflow-hidden border-t border-stone-200">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Architecture CTA Background"
          fill
          className="object-cover object-center opacity-15"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F5] via-[#FAF9F5]/90 to-[#FAF9F5]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-6xl font-serif font-light text-stone-900 leading-[0.98]">
            Your next chapter <br />
            <span className="font-normal text-orange-600">starts here.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-base sm:text-xl text-stone-600 font-light max-w-2xl mx-auto leading-relaxed"
        >
          Tell us what you&apos;re looking for and we&apos;ll help you find a property that feels right.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4"
        >
          <a
            href="#properties"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-orange-500 text-white font-semibold text-xs uppercase tracking-widest hover:bg-orange-600 transition-all duration-300 shadow-xl shadow-orange-500/25 flex items-center justify-center space-x-2 group"
          >
            <span>Explore Properties</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <button
            onClick={onOpenScheduleModal}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border border-stone-300 text-stone-900 font-semibold text-xs uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Talk to an Advisor</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

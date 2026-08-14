'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF9F5] text-stone-900"
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center space-x-3 mb-4">
              <span className="h-[2px] w-8 bg-orange-500" />
              <span className="tracking-[0.35em] text-xs font-semibold text-orange-600 uppercase">
                Property
              </span>
              <span className="h-[2px] w-8 bg-orange-500" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif tracking-[0.18em] uppercase font-light text-stone-900 text-center">
              SHRI LAXMI
            </h1>
            <motion.div
              className="mt-6 h-[1px] bg-stone-200 w-32 overflow-hidden relative"
            >
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                className="h-full w-full bg-orange-500"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

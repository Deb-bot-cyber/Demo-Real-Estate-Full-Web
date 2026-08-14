'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenScheduleModal: () => void;
  favoritesCount?: number;
}

export default function Navbar({ onOpenScheduleModal, favoritesCount = 0 }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Properties', href: '/#properties' },
    { name: 'Categories', href: '/#categories' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Locations', href: '/#locations' },
    { name: 'Why Us', href: '/#why-us' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-stone-200 py-4 shadow-md text-stone-900'
            : 'bg-gradient-to-b from-stone-900/60 via-stone-900/20 to-transparent py-6 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 group focus:outline-none"
            aria-label="Shri Laxmi Property Homepage"
          >
            <div className="w-9 h-9 border border-orange-500 flex items-center justify-center relative transition-transform duration-300 group-hover:rotate-45">
              <div className="w-4 h-4 bg-orange-500" />
            </div>
            <div className="flex flex-col">
              <span className={`text-lg sm:text-xl font-serif tracking-[0.18em] font-light uppercase leading-none ${scrolled ? 'text-stone-900' : 'text-white'}`}>
                SHRI LAXMI
              </span>
              <span className="text-[9px] tracking-[0.3em] text-orange-500 uppercase font-semibold mt-1">
                Property
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs tracking-wider uppercase transition-colors relative py-1 group ${
                  scrolled ? 'text-stone-700 hover:text-orange-600' : 'text-stone-200 hover:text-orange-400'
                }`}
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-orange-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Saved Favorites Indicator */}
            <Link
              href="/#properties"
              className={`relative p-2 transition-colors ${
                scrolled ? 'text-stone-700 hover:text-orange-600' : 'text-stone-200 hover:text-orange-400'
              }`}
              title="Saved Favorite Properties"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-orange-500 text-orange-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 text-white font-bold text-[10px] flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </Link>

            {/* Schedule Viewing CTA Button */}
            <button
              onClick={onOpenScheduleModal}
              className="relative inline-flex items-center justify-center px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-orange-500 hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-0.5 shadow-lg shadow-orange-500/25 cursor-pointer"
            >
              <span>Schedule a Viewing</span>
            </button>
          </div>

          {/* Mobile Hamburger Trigger */}
          <div className="flex md:hidden items-center space-x-3">
            {favoritesCount > 0 && (
              <Link href="/#properties" className="relative p-2 text-orange-500">
                <Heart className="w-5 h-5 fill-orange-500" />
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 text-white font-bold text-[9px] flex items-center justify-center">
                  {favoritesCount}
                </span>
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 focus:outline-none ${scrolled ? 'text-stone-900' : 'text-white'}`}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Animated Mobile Menu (Light Theme) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#FAF9F5] text-stone-900 flex flex-col justify-between p-8 pt-28 lg:hidden"
          >
            <div className="flex flex-col space-y-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + idx * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-serif tracking-wide text-stone-800 hover:text-orange-600 flex items-center justify-between border-b border-stone-200 pb-3"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-5 h-5 text-orange-500" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="space-y-4 pt-6">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenScheduleModal();
                }}
                className="w-full py-4 rounded-full bg-orange-500 text-white font-semibold text-sm uppercase tracking-wider text-center block shadow-xl shadow-orange-500/20 cursor-pointer"
              >
                Schedule a Viewing
              </button>
              <div className="text-center text-xs text-stone-500 pt-2">
                © 2026 Shri Laxmi Property. All rights reserved.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

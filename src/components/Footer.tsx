'use client';

import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedinIcon, YoutubeIcon } from './SocialIcons';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 text-white border-t border-stone-800 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-stone-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 border border-orange-500 flex items-center justify-center">
                <div className="w-3.5 h-3.5 bg-orange-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-serif tracking-[0.25em] font-light text-white uppercase leading-none">
                  A U R A
                </span>
                <span className="text-[8px] tracking-[0.3em] text-orange-500 uppercase font-semibold mt-1">
                  Luxury Real Estate
                </span>
              </div>
            </Link>

            <p className="text-stone-400 text-sm font-light max-w-sm leading-relaxed">
              Exceptional properties. Thoughtful guidance. Better living. Curating architectural landmarks across India&apos;s most desirable destinations.
            </p>
          </div>

          {/* Col 1: Explore */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li><Link href="/#properties" className="hover:text-white transition-colors">Properties</Link></li>
              <li><Link href="/#locations" className="hover:text-white transition-colors">Locations</Link></li>
              <li><Link href="/#categories" className="hover:text-white transition-colors">Buy Collection</Link></li>
              <li><Link href="/#categories" className="hover:text-white transition-colors">Executive Rentals</Link></li>
              <li><Link href="/#categories" className="hover:text-white transition-colors">Investment Portfolios</Link></li>
            </ul>
          </div>

          {/* Col 2: Company */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li><Link href="/#about" className="hover:text-white transition-colors">About Agency</Link></li>
              <li><Link href="/#services" className="hover:text-white transition-colors">Advisory Services</Link></li>
              <li><Link href="/#why-us" className="hover:text-white transition-colors">The AURA Advantage</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="/#contact" className="hover:text-white transition-colors">Contact Advisor</Link></li>
            </ul>
          </div>

          {/* Col 3: Connect */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-orange-500">
              Connect
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400 font-light">
              <li><a href="/#contact" className="flex items-center gap-2 hover:text-white transition-colors"><InstagramIcon className="w-3.5 h-3.5 text-orange-500" /> Instagram</a></li>
              <li><a href="/#contact" className="flex items-center gap-2 hover:text-white transition-colors"><FacebookIcon className="w-3.5 h-3.5 text-orange-500" /> Facebook</a></li>
              <li><a href="/#contact" className="flex items-center gap-2 hover:text-white transition-colors"><LinkedinIcon className="w-3.5 h-3.5 text-orange-500" /> LinkedIn</a></li>
              <li><a href="/#contact" className="flex items-center gap-2 hover:text-white transition-colors"><YoutubeIcon className="w-3.5 h-3.5 text-orange-500" /> YouTube</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div>
            © 2026 AURA Luxury Real Estate. All rights reserved.
          </div>

          <div className="flex items-center space-x-6">
            <Link href="/#contact" className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
            <Link href="/#contact" className="hover:text-stone-300 transition-colors">Terms & Conditions</Link>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-stone-900 border border-stone-800 hover:bg-orange-500 hover:text-white hover:border-orange-500 text-stone-300 transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

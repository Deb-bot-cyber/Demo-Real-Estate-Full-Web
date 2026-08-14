'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';
import { InstagramIcon, FacebookIcon, LinkedinIcon, YoutubeIcon } from './SocialIcons';
import confetti from 'canvas-confetti';
import { INITIAL_LEADS, LeadInquiry } from '@/data/properties';

interface ContactSectionProps {
  prefilledPropertyTitle?: string;
}

export default function ContactSection({ prefilledPropertyTitle }: ContactSectionProps) {
  const [interest, setInterest] = useState<'Buying' | 'Renting' | 'Selling' | 'Investing'>('Buying');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: 'Mumbai',
    message: prefilledPropertyTitle ? `I would like to inquire about ${prefilledPropertyTitle}.` : '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Save lead to localStorage for Admin Panel
    const newLead: LeadInquiry = {
      id: 'lead-' + Date.now(),
      fullName: formData.name || 'Anonymous Client',
      email: formData.email || 'n/a',
      phone: formData.phone || 'n/a',
      interestedIn: interest.toUpperCase(),
      preferredLocation: formData.location,
      message: formData.message || 'No additional notes provided.',
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      status: 'New'
    };

    try {
      const stored = localStorage.getItem('shri_laxmi_leads') || localStorage.getItem('aura_leads');
      const leads = stored ? JSON.parse(stored) : INITIAL_LEADS;
      localStorage.setItem('shri_laxmi_leads', JSON.stringify([newLead, ...leads]));
    } catch {
      // fallback if SSR or restricted
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#F97316', '#EA580C', '#FFD8A8'],
      });
    }, 800);
  };

  return (
    <section id="contact" className="py-24 bg-[#FAF9F5] text-stone-900 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-serif font-light text-stone-900 leading-[0.98]">
            Let&apos;s find <br />
            <span className="font-normal text-orange-600">your place.</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base font-light mt-4">
            Connect with a senior estate advisor for private viewings, valuation reports, or general inquiries.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-3xl p-8 sm:p-10 shadow-xl">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto border border-orange-200">
                  <CheckCircle2 className="w-8 h-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-serif font-light text-stone-900">
                  Inquiry Received
                </h3>
                <p className="text-stone-600 text-sm max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold text-stone-900">{formData.name}</span>. A senior partner will contact you within 2 business hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Interest Segmented Control */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
                    I&apos;m Interested In:
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-stone-100 p-1.5 rounded-2xl">
                    {(['Buying', 'Renting', 'Selling', 'Investing'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setInterest(type)}
                        className={`py-2.5 rounded-xl text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                          interest === type
                            ? 'bg-orange-500 text-white shadow-md'
                            : 'text-stone-600 hover:text-stone-900'
                        }`}
                      >
                        {type.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alexander Vance"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alexander@example.com"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Phone & Preferred Location */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98200 00000"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                      Preferred Location
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="Mumbai">Mumbai, MH</option>
                      <option value="Delhi NCR">Delhi NCR (Gurgaon)</option>
                      <option value="Bengaluru">Bengaluru, KA</option>
                      <option value="Goa">Goa</option>
                      <option value="Hyderabad">Hyderabad, TS</option>
                      <option value="Pune">Pune, MH</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
                    Your Inquiry / Requirements
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about desired amenities, budget, target move dates..."
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-3 text-sm text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs uppercase tracking-widest hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg shadow-orange-500/25 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Processing Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Contact Info */}
          <div className="lg:col-span-5 space-y-8">
            {/* Contact Details Card */}
            <div className="bg-white text-stone-900 rounded-3xl p-8 space-y-6 border border-stone-200 shadow-xl">
              <h3 className="text-2xl font-serif font-light text-stone-900 border-b border-stone-100 pb-4">
                India Headquarters
              </h3>

              <div className="space-y-4 text-sm font-light">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-semibold">Address</span>
                    <span className="text-stone-700">Level 15, One BKC, Bandra Kurla Complex, Mumbai, MH 400051</span>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-semibold">Direct Phone</span>
                    <a href="tel:+919820012345" className="text-stone-700 hover:text-orange-600 transition-colors">+91 (022) 6988 1200 / +91 98200 12345</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-semibold">Private Advisory Email</span>
                    <a href="mailto:advisors@shrilaxmiproperty.com" className="text-stone-700 hover:text-orange-600 transition-colors">advisors@shrilaxmiproperty.com</a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-semibold">Private Concierge Hours</span>
                    <span className="text-stone-700">Mon - Sat: 9:30 AM - 7:00 PM IST</span>
                  </div>
                </div>
              </div>

              {/* Social Media Links */}
              <div className="pt-4 border-t border-stone-100 flex items-center space-x-4 text-stone-600">
                <span className="text-xs uppercase tracking-widest text-stone-400 font-semibold">Connect:</span>
                <a href="#" className="p-2 hover:text-orange-600 transition-colors" aria-label="Instagram"><InstagramIcon className="w-4 h-4" /></a>
                <a href="#" className="p-2 hover:text-orange-600 transition-colors" aria-label="LinkedIn"><LinkedinIcon className="w-4 h-4" /></a>
                <a href="#" className="p-2 hover:text-orange-600 transition-colors" aria-label="Facebook"><FacebookIcon className="w-4 h-4" /></a>
                <a href="#" className="p-2 hover:text-orange-600 transition-colors" aria-label="YouTube"><YoutubeIcon className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ScheduleViewingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultPropertyTitle?: string;
}

export default function ScheduleViewingModal({
  isOpen,
  onClose,
  defaultPropertyTitle,
}: ScheduleViewingModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    property: defaultPropertyTitle || 'General Private Tour',
    preferredDate: '',
    timeSlot: 'Morning (9 AM - 12 PM)',
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save lead to localStorage for Admin Panel
    const newLead = {
      id: 'lead-' + Date.now(),
      fullName: formData.name || 'Viewing Guest',
      email: formData.email || 'n/a',
      phone: formData.phone || 'n/a',
      interestedIn: 'VIEWING TOUR',
      preferredLocation: formData.property,
      message: `Requested Private Tour for ${formData.property}. Date: ${formData.preferredDate || 'Flexible'} (${formData.timeSlot}).`,
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + ' IST',
      status: 'New' as const
    };

    try {
      const stored = localStorage.getItem('shri_laxmi_leads') || localStorage.getItem('aura_leads');
      const leads = stored ? JSON.parse(stored) : [];
      localStorage.setItem('shri_laxmi_leads', JSON.stringify([newLead, ...leads]));
    } catch {
      // fallback
    }

    setSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#F97316', '#EA580C', '#FFD8A8'],
    });
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-950/70 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.1 }}
            className="relative w-full max-w-lg bg-white border border-stone-200 text-stone-900 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 my-auto"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-900 p-2 rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-200"
                >
                  <CheckCircle2 className="w-10 h-10" />
                </motion.div>
                <h3 className="text-2xl font-serif font-light tracking-wide mb-2 text-stone-900">
                  Viewing Confirmed
                </h3>
                <p className="text-stone-600 text-sm mb-6 max-w-md mx-auto">
                  Thank you, <span className="text-stone-900 font-semibold">{formData.name}</span>. A senior real estate advisor will contact you shortly to finalize details for your private viewing.
                </p>
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 text-left text-xs text-stone-700 space-y-2 mb-6 font-medium">
                  <div><span className="text-stone-500 font-semibold">Property:</span> {formData.property}</div>
                  <div><span className="text-stone-500 font-semibold">Date & Slot:</span> {formData.preferredDate || 'To be scheduled'} ({formData.timeSlot})</div>
                </div>
                <button
                  onClick={handleResetAndClose}
                  className="w-full py-3 rounded-full bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20 cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-orange-600 text-xs font-semibold uppercase tracking-widest block mb-1">
                    Private Consultation
                  </span>
                  <h3 className="text-2xl font-serif font-light text-stone-900">
                    Schedule a Viewing
                  </h3>
                  <p className="text-stone-500 text-xs mt-1">
                    Experience luxury architecture with a dedicated estate advisor.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Property Title */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                      Target Property / Inquiry Focus
                    </label>
                    <input
                      type="text"
                      value={formData.property}
                      onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="e.g., The Glass House or General Advisory"
                      required
                    />
                  </div>

                  {/* Name & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
                        placeholder="+1 (555) 000-0000"
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
                        Time Slot
                      </label>
                      <select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        className="w-full bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-sm text-stone-900 focus:bg-white focus:border-orange-500 focus:outline-none transition-colors cursor-pointer"
                      >
                        <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                        <option value="Afternoon (12 PM - 4 PM)">Afternoon (12 PM - 4 PM)</option>
                        <option value="Sunset / Evening (4 PM - 7 PM)">Sunset (4 PM - 7 PM)</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold text-xs uppercase tracking-widest hover:from-orange-600 hover:to-amber-600 shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
                  >
                    Confirm Viewing Request
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

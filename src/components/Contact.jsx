import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  MapPin,
  Mail,
  Clock,
  PhoneCall,
  MessageCircle,
  ArrowRight,
  CheckCircle2,
  Navigation,
  X,
} from 'lucide-react';

const serviceOptions = [
  { value: 'DSC', label: 'Class 3 Digital Signature (DSC)' },
  { value: 'PAN', label: 'PAN Card Services' },
  { value: 'TDS', label: 'TDS Filing (24Q / 26Q)' },
  { value: 'ITR', label: 'Income Tax Return (ITR)' },
  { value: 'Tally', label: 'TallyPrime Software' },
  { value: 'BUSY', label: 'BUSY Accounting Software' },
  { value: 'Other', label: 'Other Inquiry' },
];

export default function Contact({ selectedService }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: 'DSC',
    message: '',
  });
  const [submittedData, setSubmittedData] = useState(null);

  useEffect(() => {
    if (selectedService) {
      const valid = ['PAN', 'TDS', 'ITR', 'DSC', 'Tally', 'BUSY', 'Other'];
      setFormData((prev) => ({
        ...prev,
        service: valid.includes(selectedService) ? selectedService : 'Other',
      }));
    }
  }, [selectedService]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({
      ...formData,
      referenceId: `QM-${Math.floor(1000 + Math.random() * 9000)}`,
    });
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      service: formData.service,
      message: '',
    });
  };

  const whatsappDirectUrl =
    'https://wa.me/919845242565?text=' +
    encodeURIComponent(
      'Hello Quality Media.com Pvt Ltd, I would like to inquire about your services.'
    );

  const googleMapsDirectionsUrl =
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent(
      'Sai Radha Residency Behind Hotel Kidiyoor Shiribeedu Udupi Karnataka 576101'
    );

  return (
    <section id="contact" className="relative py-16 md:py-24 z-10">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="max-w-xl mb-12">
          <p className="text-sm font-semibold text-white/75 theme-subtext">
            Get in touch
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white theme-heading">
            Visit our Udupi desk or message us.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Glass Form */}
          <div className="lg:col-span-7 rounded-[32px] glass-panel p-7 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-white/80 theme-subtext mb-2">
                    Full name *
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm placeholder-white/40 focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 theme-subtext mb-2">
                    Phone / WhatsApp *
                  </label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98452 XXXXX"
                    className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm placeholder-white/40 focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-white/80 theme-subtext mb-2">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm placeholder-white/40 focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 theme-subtext mb-2">
                    Service needed
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm focus:outline-none focus:border-white"
                  >
                    {serviceOptions.map((opt) => (
                      <option
                        key={opt.value}
                        value={opt.value}
                        className="bg-[#0B1536] text-white"
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-white/80 theme-subtext mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full rounded-2xl border border-white/20 px-4 py-3 text-sm placeholder-white/40 focus:outline-none focus:border-white"
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center gap-3 rounded-2xl bg-white hover:bg-white/95 px-7 py-4 text-sm font-semibold text-[#1637B8] shadow-md transition theme-primary-btn"
              >
                <span>Send request</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          </div>

          {/* Right: Location Card */}
          <div className="lg:col-span-5 rounded-[32px] glass-panel p-7 sm:p-10 flex flex-col justify-between">
            <div className="space-y-5">
              <h3 className="font-display text-2xl font-bold text-white theme-heading">
                Shiribeedu, Udupi
              </h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3.5 rounded-2xl glass-pill p-4">
                  <MapPin className="h-5 w-5 text-white theme-heading shrink-0 mt-0.5" />
                  <p className="text-white/85 theme-subtext leading-relaxed">
                    Shop No. 1, Ground Floor, Sai Radha Residency, Behind Hotel
                    Kidiyoor, Shiribeedu, Udupi – 576101.
                  </p>
                </div>

                <div className="flex items-center gap-3.5 rounded-2xl glass-pill p-4">
                  <Mail className="h-5 w-5 text-white theme-heading shrink-0" />
                  <a
                    href="mailto:qualitymediaudupi@gmail.com"
                    className="text-white theme-heading font-medium hover:underline"
                  >
                    qualitymediaudupi@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-3.5 rounded-2xl glass-pill p-4">
                  <Clock className="h-5 w-5 text-white theme-heading shrink-0" />
                  <p className="text-white/85 theme-subtext">
                    Mon – Sat: 9:30 AM – 7:30 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="tel:+918202529365"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl glass-pill py-3.5 text-xs sm:text-sm font-semibold text-white theme-secondary-btn"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>Call desk</span>
                </a>

                <a
                  href={whatsappDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white py-3.5 text-xs sm:text-sm font-semibold text-[#1637B8] theme-primary-btn"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 rounded-2xl glass-pill py-3 text-xs font-semibold text-white/90 theme-subtext hover:underline"
              >
                <Navigation className="h-3.5 w-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {submittedData && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSubmittedData(null)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-3xl glass-panel p-7 text-center"
            >
              <button
                type="button"
                onClick={() => setSubmittedData(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <CheckCircle2 className="mx-auto h-10 w-10 text-white" />
              <h4 className="mt-3 font-display text-xl font-bold text-white theme-heading">
                Request received
              </h4>
              <p className="mt-1 text-xs text-white/80 theme-subtext">
                Ref: {submittedData.referenceId} • {submittedData.service}
              </p>
              <button
                type="button"
                onClick={() => setSubmittedData(null)}
                className="mt-5 w-full rounded-2xl bg-white py-3 text-xs font-semibold text-[#1637B8] theme-primary-btn"
              >
                Done
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

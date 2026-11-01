import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Send, ThumbsUp, CheckCircle2, UploadCloud } from 'lucide-react';

const chatPresets = {
  dsc: {
    userName: 'Ramesh P.',
    userMsg:
      'Hi, I uploaded my PAN & Aadhaar on the portal for a Class 3 DSC token. Do I need to visit the office?',
    botReply:
      'No office visit needed, Ramesh! Your paperless eKYC is verified and your Class 3 USB Crypto Token is ready.',
    userFollowup: 'Oh wow, that was effortless. Thank you!',
  },
  tax: {
    userName: 'ca_udupi',
    userMsg:
      'Just uploaded our Q3 Form 26Q sheet & Form 16 docs through the customer login.',
    botReply:
      'Received at our Udupi desk! We have matched your Challan CSI with Form 26AS and uploaded your acknowledgment receipt to your portal.',
    userFollowup: 'Perfect, zero defaults. Thanks!',
  },
  erp: {
    userName: 'Karavali Traders',
    userMsg:
      'We want to upgrade to TallyPrime Gold or BUSY with GST e-Invoicing and barcode billing.',
    botReply:
      'We are Authorized Partners for both TallyPrime & BUSY in Udupi. Our engineer can configure it remotely or on-site today!',
    userFollowup: 'Amazing support. Let’s proceed!',
  },
};

export default function Hero({ onTalkToExpert, onOpenPortal }) {
  const [activePreview, setActivePreview] = useState('dsc');
  const activeChat = chatPresets[activePreview];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-28 pb-24 lg:pt-32 lg:pb-28 flex flex-col justify-between overflow-hidden"
    >
      <div className="mx-auto max-w-7xl w-full px-6 sm:px-10 lg:px-12 relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT COLUMN: Editorial Left-Aligned Headline & Dual Buttons */}
          <div className="lg:col-span-7 text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="mb-5 inline-flex items-center gap-2.5 rounded-full glass-pill px-4 py-1.5"
            >
              <span className="h-2 w-2 rounded-full bg-[#FACC15] shadow-[0_0_8px_#FACC15]" />
              <p className="text-xs sm:text-sm font-semibold tracking-wide text-white/95 theme-heading">
                Quality Media.com Pvt Ltd &amp; Silicon Technologies • Udupi
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="font-display text-4xl sm:text-6xl lg:text-[64px] font-bold tracking-[-0.03em] text-white theme-heading leading-[1.06]"
            >
              You didn’t start
              <br />a business to
              <br />
              wrestle with tax
              <br />
              <span className="underline decoration-[#FACC15]/80 decoration-4 underline-offset-8">
                filings all day.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-7 max-w-xl text-base sm:text-lg text-white/80 theme-subtext leading-relaxed font-normal"
            >
              Upload your forms directly from home or office. Quality Media &amp;
              Silicon Technologies handles your PAN, TDS, ITR, Class 3 DSC, and
              TallyPrime &amp; BUSY software in Udupi.
            </motion.p>

            {/* Dual Pill CTAs matching the reference layout with a subtle yellow accent */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <button
                type="button"
                onClick={() => onOpenPortal('customer')}
                className="group inline-flex items-center gap-3 rounded-2xl bg-white hover:bg-white/95 px-7 py-4 text-sm sm:text-base font-semibold text-[#1637B8] shadow-lg transition theme-primary-btn"
              >
                <UploadCloud className="h-4 w-4" />
                <span>Upload forms online</span>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#FACC15] text-[#0B1536] group-hover:translate-x-0.5 transition-transform">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </button>

              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-2xl glass-pill hover:border-[#FACC15]/50 px-7 py-4 text-sm sm:text-base font-semibold text-white theme-secondary-btn transition"
              >
                Explore services
              </a>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Glassmorphic Smartphone Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col items-center lg:items-end"
          >
            <div className="w-full max-w-[360px] rounded-[44px] p-3 bg-white/[0.18] backdrop-blur-3xl border border-white/35 shadow-[0_25px_70px_rgba(12,30,115,0.35)]">
              <div className="rounded-[34px] bg-white/95 backdrop-blur-2xl border border-white/40 p-4 flex flex-col justify-between min-h-[520px] text-slate-900">
                <div>
                  <div className="mx-auto w-24 h-5 rounded-full bg-black/90 mb-4" />

                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
                    <div className="flex items-center gap-2">
                      <div className="relative h-6 w-6 rounded-md bg-[#234DF2] flex items-center justify-center text-white text-[11px] font-bold">
                        QM
                        <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#FACC15]" />
                      </div>
                      <span className="text-xs font-semibold text-slate-800">
                        portal.qualitymedia
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                      Zero Office Visit
                    </span>
                  </div>

                  {/* Interactive Topic Switcher Pills Inside Phone */}
                  <div className="mt-3 flex gap-1.5">
                    {[
                      { id: 'dsc', label: 'Class 3 DSC' },
                      { id: 'tax', label: 'TDS & ITR' },
                      { id: 'erp', label: 'Tally & BUSY' },
                    ].map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => setActivePreview(t.id)}
                        className={`flex-1 rounded-lg py-1.5 text-[11px] font-semibold transition ${
                          activePreview === t.id
                            ? 'bg-[#234DF2] text-white border-b-2 border-[#FACC15] shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>

                  {/* Conversation Flow */}
                  <div className="mt-4 space-y-3 text-xs">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="h-4 w-4 rounded bg-[#234DF2] text-[#FACC15] flex items-center justify-center text-[9px] font-bold">
                          Q
                        </span>
                        <span className="font-semibold text-[11px] text-slate-700">
                          Quality Media Portal
                        </span>
                      </div>
                      <div className="inline-block rounded-2xl rounded-tl-sm bg-slate-100 px-3.5 py-2 text-slate-700">
                        Hey! Upload your forms directly here.
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-[10px] font-semibold text-slate-500 mb-1">
                        {activeChat.userName}
                      </p>
                      <div className="inline-block text-left rounded-2xl rounded-tr-sm bg-[#2552F5] px-3.5 py-2.5 text-white leading-relaxed">
                        {activeChat.userMsg}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="h-4 w-4 rounded bg-[#234DF2] text-[#FACC15] flex items-center justify-center text-[9px] font-bold">
                          Q
                        </span>
                        <span className="font-semibold text-[11px] text-slate-700">
                          Quality Media &amp; Silicon
                        </span>
                      </div>
                      <div className="rounded-2xl rounded-tl-sm bg-slate-100 px-3.5 py-2.5 text-slate-700 leading-relaxed">
                        {activeChat.botReply}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-slate-400 pl-1">
                        <ThumbsUp className="h-3 w-3 text-[#EAB308]" />
                        <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="inline-block rounded-2xl rounded-tr-sm bg-[#2552F5] px-3.5 py-2 text-white">
                        {activeChat.userFollowup}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Input Bar Inside Phone -> Opens Customer Upload Portal */}
                <div className="mt-4 pt-2">
                  <button
                    type="button"
                    onClick={() => onOpenPortal('customer')}
                    className="w-full flex items-center justify-between rounded-full bg-slate-100 border border-slate-200 px-3.5 py-2 text-xs text-slate-600 hover:border-[#234DF2] transition"
                  >
                    <span>Click to upload your forms...</span>
                    <span className="h-6 w-6 rounded-full bg-[#FACC15] text-[#0B1536] flex items-center justify-center">
                      <Send className="h-3 w-3" />
                    </span>
                  </button>
                  <p className="mt-2 text-center text-[10px] font-medium text-slate-400">
                    Shiribeedu, Udupi • Customer &amp; Admin Portal
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Rhythmic Glass Geometric Pattern Strip with subtle Yellow accent tiles */}
      <div className="relative z-10 mt-14 overflow-hidden opacity-40 pointer-events-none">
        <div className="flex items-end justify-center gap-3 px-2">
          {Array.from({ length: 18 }).map((_, idx) => (
            <div
              key={idx}
              className={`h-10 w-16 shrink-0 rounded-tl-2xl rounded-br-2xl backdrop-blur-md border -skew-x-12 ${
                idx % 5 === 2
                  ? 'bg-[#FACC15]/30 border-[#FACC15]/45'
                  : 'bg-white/25 border-white/20'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

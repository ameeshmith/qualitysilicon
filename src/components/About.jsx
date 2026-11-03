import React from 'react';

const trustStats = [
  { value: '25+', label: 'Years in Udupi' },
  { value: '15,000+', label: 'Filings & DSCs' },
  { value: '1,000+', label: 'Tally & BUSY Installs' },
  { value: '100%', label: 'Local Support' },
];

export default function About() {
  return (
    <section id="about" className="relative py-16 md:py-24 z-10">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="rounded-[32px] glass-panel p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#FACC15]" />
                <p className="text-sm font-semibold text-white/80 theme-subtext">
                  Established October 2000 • ROC Bangalore
                </p>
              </div>
              <h2 className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white theme-heading leading-tight">
                Two decades of trust in Coastal Karnataka.
              </h2>
              <p className="mt-4 text-base text-white/80 theme-subtext leading-relaxed max-w-xl">
                Quality Media.com Pvt. Ltd. partner
                with businesses, CAs, and traders across Udupi for zero-hassle
                tax compliance, Class 3 DSC tokens, and TallyPrime &amp; BUSY
                software support.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {trustStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-3xl glass-pill p-6 text-left border-t-2 border-t-[#FACC15]/50"
                >
                  <p className="font-display text-3xl sm:text-4xl font-bold text-white theme-heading">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-white/75 theme-subtext">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

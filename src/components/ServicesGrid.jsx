import React from 'react';
import {
  CreditCard,
  FileSpreadsheet,
  Calculator,
  KeyRound,
  Layers,
  Boxes,
  ArrowUpRight,
} from 'lucide-react';

const services = [
  {
    id: 'PAN',
    title: 'PAN Services',
    desc: 'New applications, corrections, minor-to-major updates, and enterprise PAN.',
    icon: CreditCard,
  },
  {
    id: 'TDS',
    title: 'TDS Filing & 26AS',
    desc: 'Quarterly Form 24Q, 26Q, 27Q returns, TRACES matching, and Form 16/16A.',
    icon: FileSpreadsheet,
  },
  {
    id: 'ITR',
    title: 'Income Tax Returns',
    desc: 'Accurate computation and e-filing for salaried, professionals, and firms.',
    icon: Calculator,
  },
  {
    id: 'DSC',
    title: 'Class 3 Digital Signatures',
    desc: 'Instant paperless USB crypto tokens for GST, MCA, e-Tenders, and ICEGATE.',
    icon: KeyRound,
  },
  {
    id: 'Tally',
    title: 'TallyPrime Dealership',
    desc: 'Authorized Silver/Gold licenses, TSS renewals, migration, and local support.',
    icon: Layers,
  },
  {
    id: 'BUSY',
    title: 'BUSY Accounting Software',
    desc: 'Authorized dealer for GST billing, multi-godown inventory, and barcode POS.',
    icon: Boxes,
  },
];

export default function ServicesGrid({ onSelectService }) {
  return (
    <section id="services" className="relative py-20 md:py-28 z-10">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#FACC15]" />
            <p className="text-sm font-semibold text-white/80 theme-subtext">
              Core capabilities
            </p>
          </div>
          <h2 className="mt-2 font-display text-3xl sm:text-5xl font-bold tracking-tight text-white theme-heading leading-tight">
            Everything your business needs to stay compliant.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                onClick={() => onSelectService(service.id)}
                className="group cursor-pointer rounded-3xl glass-panel-hover hover:border-[#FACC15]/40 p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl glass-pill text-[#FACC15] group-hover:bg-[#FACC15] group-hover:text-[#0B1536] transition-colors">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-white/50 group-hover:text-[#FACC15] theme-subtext group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>

                  <h3 className="mt-6 font-display text-xl font-bold text-white theme-heading">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/75 theme-subtext leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-xs font-semibold text-white/90 theme-heading group-hover:underline">
                    Select {service.title} →
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]/70 group-hover:bg-[#FACC15]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

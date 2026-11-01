import React, { useState } from 'react';
import { KeyRound, Cpu, FileCheck2, MessageCircle, Check, ArrowRight } from 'lucide-react';

const tabs = [
  { id: 'dsc', label: 'Digital Signature (DSC)', icon: KeyRound },
  { id: 'software', label: 'TallyPrime vs. BUSY', icon: Cpu },
  { id: 'tax', label: 'Tax Checklist', icon: FileCheck2 },
];

export default function ServiceFinder({ onRequestQuote }) {
  const [activeTab, setActiveTab] = useState('dsc');

  return (
    <section id="software" className="relative py-16 md:py-24 z-10">
      <div id="finder" className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12">
        <div className="rounded-[32px] glass-panel p-7 sm:p-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/15">
            <div>
              <p className="text-sm font-semibold text-white/75 theme-subtext">
                Quick selector
              </p>
              <h2 className="mt-1 font-display text-2xl sm:text-4xl font-bold tracking-tight text-white theme-heading">
                Pick what you need today.
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs sm:text-sm font-semibold transition ${
                      active
                        ? 'bg-white text-[#1637B8] shadow-sm theme-primary-btn'
                        : 'glass-pill text-white/85 hover:text-white theme-secondary-btn'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab 1: DSC */}
          {activeTab === 'dsc' && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Individual Class 3 DSC',
                  sub: 'For Income Tax, GST, MCA Director KYC & Audit.',
                  docs: 'PAN • Aadhaar • Photo',
                  msg: 'Hello, I want to order an Individual Class 3 DSC Token.',
                },
                {
                  title: 'Organization / Tender Combo DSC',
                  sub: 'Signing + Encryption for e-Procurement, GeM & ICEGATE.',
                  docs: 'Firm PAN • GST Proof • Signatory ID',
                  msg: 'Hello, I want to order an Organization Class 3 Combo DSC Token.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl glass-pill p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-display text-xl font-bold text-white theme-heading">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/80 theme-subtext">
                      {item.sub}
                    </p>
                    <p className="mt-4 text-xs font-medium text-white/70 theme-muted">
                      Required: {item.docs}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={`https://wa.me/919845242565?text=${encodeURIComponent(
                        item.msg
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#1637B8] theme-primary-btn"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Order on WhatsApp</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => onRequestQuote('DSC')}
                      className="rounded-xl glass-pill px-5 py-2.5 text-xs sm:text-sm font-semibold text-white theme-secondary-btn"
                    >
                      Request callback
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab 2: Software */}
          {activeTab === 'software' && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  key: 'Tally',
                  title: 'TallyPrime (Silver / Gold)',
                  points: [
                    'Connected GST, e-Invoicing & e-Way Bill',
                    'TSS Renewals, Multi-User Upgrades & Migration',
                  ],
                },
                {
                  key: 'BUSY',
                  title: 'BUSY Accounting Software',
                  points: [
                    'Multi-Godown Inventory & Barcode Billing',
                    'Auto GST Reconciliation & Custom Invoices',
                  ],
                },
              ].map((erp) => (
                <div
                  key={erp.key}
                  className="rounded-3xl glass-pill p-6 sm:p-7 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-display text-xl font-bold text-white theme-heading">
                      {erp.title}
                    </h3>
                    <ul className="mt-4 space-y-2.5 text-sm text-white/80 theme-subtext">
                      {erp.points.map((pt) => (
                        <li key={pt} className="flex items-center gap-2.5">
                          <Check className="h-4 w-4 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRequestQuote(erp.key)}
                    className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs sm:text-sm font-semibold text-[#1637B8] theme-primary-btn"
                  >
                    <span>Book {erp.key} Demo / Quote</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Tab 3: Tax Checklist */}
          {activeTab === 'tax' && (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  key: 'ITR',
                  title: 'Income Tax (ITR)',
                  list: ['PAN & Aadhaar', 'Form 16 / Bank Statement', 'Tax Saving Proofs'],
                },
                {
                  key: 'TDS',
                  title: 'TDS Returns (24Q/26Q)',
                  list: ['TAN & TRACES Login', 'Challan CSI Details', 'Deductee PAN List'],
                },
                {
                  key: 'PAN',
                  title: 'PAN Application',
                  list: ['Aadhaar Card', '2 Passport Photos', 'Firm Deed (For Entities)'],
                },
              ].map((box) => (
                <div
                  key={box.key}
                  className="rounded-3xl glass-pill p-6 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-display text-lg font-bold text-white theme-heading">
                      {box.title}
                    </h3>
                    <ul className="mt-4 space-y-2 text-xs sm:text-sm text-white/80 theme-subtext">
                      {box.list.map((i) => (
                        <li key={i} className="flex items-center gap-2">
                          <Check className="h-4 w-4 shrink-0" />
                          <span>{i}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRequestQuote(box.key)}
                    className="mt-6 w-full rounded-xl bg-white py-2.5 text-xs font-semibold text-[#1637B8] theme-primary-btn"
                  >
                    Start {box.key} Filing →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

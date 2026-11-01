import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/15 py-10">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-display text-sm font-bold text-white theme-heading">
            Quality Media.com Pvt. Ltd. &amp; Silicon Technologies
          </p>
          <p className="text-xs text-white/70 theme-subtext mt-0.5">
            © {new Date().getFullYear()} All rights reserved • Shiribeedu, Udupi – 576101
          </p>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1.5 rounded-xl glass-pill px-4 py-2 text-xs font-semibold text-white theme-heading"
        >
          <span>Back to top</span>
          <ArrowUp className="h-3.5 w-3.5" />
        </button>
      </div>
    </footer>
  );
}

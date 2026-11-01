import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, User, Shield } from 'lucide-react';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Software', href: '#software' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({
  onQuickConsult,
  onOpenPortal,
  activeView = 'home',
  theme = 'dark',
  onToggleTheme,
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[#122C91]/80 dark:bg-[#122C91]/80 backdrop-blur-2xl border-b border-white/15 py-3.5 shadow-sm'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-12 flex items-center justify-between">
          {/* Left: Woven Geometric Icon (with Yellow Accents ready for your Logo) + Brand Wordmark */}
          <a
            href="#home"
            onClick={() => onOpenPortal(null)}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <svg
              className="h-7 w-7 text-white theme-heading shrink-0"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="6" width="6" height="4" rx="1.5" transform="rotate(-25 2 6)" fill="#FACC15" />
              <rect x="10" y="6" width="6" height="4" rx="1.5" transform="rotate(-25 10 6)" fill="currentColor" />
              <rect x="18" y="6" width="6" height="4" rx="1.5" transform="rotate(-25 18 6)" fill="currentColor" />
              <rect x="2" y="13" width="6" height="4" rx="1.5" transform="rotate(-25 2 13)" fill="currentColor" opacity="0.85" />
              <rect x="10" y="13" width="6" height="4" rx="1.5" transform="rotate(-25 10 13)" fill="#FACC15" />
              <rect x="18" y="13" width="6" height="4" rx="1.5" transform="rotate(-25 18 13)" fill="currentColor" opacity="0.85" />
              <rect x="2" y="20" width="6" height="4" rx="1.5" transform="rotate(-25 2 20)" fill="currentColor" opacity="0.65" />
              <rect x="10" y="20" width="6" height="4" rx="1.5" transform="rotate(-25 10 20)" fill="currentColor" opacity="0.65" />
              <rect x="18" y="20" width="6" height="4" rx="1.5" transform="rotate(-25 18 20)" fill="#FACC15" />
            </svg>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-white theme-heading leading-none">
                  Quality Media
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#FACC15]" />
              </div>
              <span className="text-[11px] font-medium text-white/75 theme-subtext tracking-wide mt-0.5">
                &amp; Silicon Technologies
              </span>
            </div>
          </a>

          {/* Center: Clean Minimal Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => onOpenPortal(null)}
                className="text-sm font-medium text-white/85 hover:text-[#FACC15] theme-subtext transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: Theme Toggle + Admin Login + Customer Login Pill */}
          <div className="hidden md:flex items-center gap-4">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-white theme-subtext transition"
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-[#FACC15]" />
              ) : (
                <Moon className="h-4 w-4 text-[#1637B8]" />
              )}
              <span>{isDark ? 'Light' : 'Dark'}</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenPortal('admin')}
              className={`inline-flex items-center gap-1.5 text-sm font-medium transition ${
                activeView === 'admin'
                  ? 'text-[#FACC15] font-semibold'
                  : 'text-white/85 hover:text-[#FACC15] theme-subtext'
              }`}
            >
              <Shield className="h-3.5 w-3.5 text-[#FACC15]" />
              <span>Admin</span>
            </button>

            <button
              type="button"
              onClick={() => onOpenPortal('customer')}
              className="inline-flex items-center gap-2 rounded-xl bg-white/95 hover:bg-white px-5 py-2.5 text-sm font-semibold text-[#1637B8] border-b-2 border-[#FACC15] shadow-sm transition theme-primary-btn"
            >
              <User className="h-4 w-4" />
              <span>Customer Login</span>
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-lg glass-pill text-white theme-heading"
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-[#FACC15]" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="p-2 rounded-lg glass-pill text-white theme-heading"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 240 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs glass-panel p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-white/15">
                  <div className="flex items-center gap-2">
                    <span className="font-display text-lg font-bold text-white theme-heading">
                      Quality Media
                    </span>
                    <span className="h-2 w-2 rounded-full bg-[#FACC15]" />
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="p-2 text-white/70 hover:text-white theme-heading"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="mt-6 flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => {
                        setMobileOpen(false);
                        onOpenPortal(null);
                      }}
                      className="py-2 text-base font-medium text-white theme-heading"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/15">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenPortal('customer');
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-white py-3 text-sm font-semibold text-[#1637B8] theme-primary-btn"
                >
                  <User className="h-4 w-4" />
                  <span>Customer Login / Upload</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenPortal('admin');
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl glass-pill py-3 text-sm font-semibold text-white theme-heading"
                >
                  <Shield className="h-4 w-4 text-[#FACC15]" />
                  <span>Office Admin Login</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

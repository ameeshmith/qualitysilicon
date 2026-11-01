import React, { useState, useEffect } from 'react';
import AmbientBackground from './components/AmbientBackground.jsx';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import ServicesGrid from './components/ServicesGrid.jsx';
import ServiceFinder from './components/ServiceFinder.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import PortalView from './components/PortalView.jsx';

export default function App() {
  const [selectedService, setSelectedService] = useState('DSC');
  // null = main website, 'customer' = customer portal, 'admin' = office admin portal
  const [portalMode, setPortalMode] = useState(null);
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('qm_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
      root.setAttribute('data-theme', 'light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    }
    try {
      localStorage.setItem('qm_theme', theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleNavigateToContact = (serviceKey = 'Other') => {
    setPortalMode(null);
    setSelectedService(serviceKey);
    setTimeout(() => {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleOpenPortal = (role) => {
    setPortalMode(role);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen selection:bg-white selection:text-[#1637B8] transition-colors duration-300">
      {/* Ambient Cobalt Glassmorphism Background */}
      <AmbientBackground theme={theme} />

      {/* Top Navigation */}
      <Navbar
        onQuickConsult={() => handleNavigateToContact('Other')}
        onOpenPortal={handleOpenPortal}
        activeView={portalMode || 'home'}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content or Customer/Admin Portal */}
      <main className="relative z-10">
        {portalMode ? (
          <PortalView
            key={portalMode}
            initialRole={portalMode}
            onBackToHome={() => setPortalMode(null)}
          />
        ) : (
          <>
            <Hero
              onTalkToExpert={handleNavigateToContact}
              onOpenPortal={handleOpenPortal}
            />
            <ServicesGrid onSelectService={handleNavigateToContact} />
            <ServiceFinder onRequestQuote={handleNavigateToContact} />
            <About />
            <Contact selectedService={selectedService} />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

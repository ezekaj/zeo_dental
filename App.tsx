import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Treatments } from './components/Treatments';
import { Philosophy } from './components/Philosophy';
import { Team } from './components/Team';
import { ClinicalCases } from './components/ClinicalCases';
import { Booking } from './components/Booking';
import { ChatWidget } from './components/ChatWidget';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LanguageProvider } from './contexts/LanguageContext';
import { ReceptionistApp } from './components/receptionist/ReceptionistApp';

// Simple router based on pathname
const useRoute = () => {
  const [route, setRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return route;
};

// Main website component
const MainSite: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Skip link for accessibility */}
      <a
        href="#main-content"
        className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-studio-gold focus:text-white focus:rounded"
      >
        Skip to main content
      </a>

      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Treatments />
        <Philosophy />
        <Team />
        <ClinicalCases />
        <Booking />
      </main>
      <ChatWidget />
      <WhatsAppButton />
    </div>
  );
};

const App: React.FC = () => {
  const route = useRoute();

  return (
    <LanguageProvider>
      <ErrorBoundary>
        {route === '/receptionist' ? <ReceptionistApp /> : <MainSite />}
      </ErrorBoundary>
    </LanguageProvider>
  );
};

export default App;

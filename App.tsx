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
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { TreatmentPage } from './components/TreatmentPage';
import { TreatmentsOverview } from './components/TreatmentsOverview';
import { PhilosophyPage } from './components/PhilosophyPage';
import { TeamPage } from './components/TeamPage';
import { ClinicalCasesPage } from './components/ClinicalCasesPage';

// Treatment page configurations with hero images
const treatmentConfigs: Record<string, { key: string; heroImage: string }> = {
  '/treatments/implantology': {
    key: 'implantology',
    heroImage: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=2670&auto=format&fit=crop',
  },
  '/treatments/prosthetics': {
    key: 'prosthetics',
    heroImage: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=2574&auto=format&fit=crop',
  },
  '/treatments/aligners': {
    key: 'aligners',
    heroImage: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?q=80&w=2670&auto=format&fit=crop',
  },
  '/treatments/orthodontics': {
    key: 'orthodontics',
    heroImage: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2670&auto=format&fit=crop',
  },
  '/treatments/crowns': {
    key: 'crowns',
    heroImage: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2668&auto=format&fit=crop',
  },
  '/treatments/endodontics': {
    key: 'aesthetics',
    heroImage: '/images/treatments/endodontics.jpg',
  },
};

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

  const renderRoute = () => {
    // Check for treatment pages
    if (treatmentConfigs[route]) {
      const { key, heroImage } = treatmentConfigs[route];
      return <TreatmentPage treatmentKey={key} heroImage={heroImage} />;
    }

    switch (route) {
      case '/receptionist':
        return <ReceptionistApp />;
      case '/privacy-policy':
        return <PrivacyPolicy />;
      case '/terms-of-service':
        return <TermsOfService />;
      case '/treatments':
        return <TreatmentsOverview />;
      case '/philosophy':
        return <PhilosophyPage />;
      case '/team':
        return <TeamPage />;
      case '/cases':
        return <ClinicalCasesPage />;
      default:
        return <MainSite />;
    }
  };

  return (
    <LanguageProvider>
      <ErrorBoundary>{renderRoute()}</ErrorBoundary>
    </LanguageProvider>
  );
};

export default App;

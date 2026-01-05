import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Team } from './components/Team';
import { GoogleReviews } from './components/GoogleReviews';
import { BookingSection } from './components/BookingSection';
import { ServiceDetail } from './components/ServiceDetail';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  const [view, setView] = useState<'home' | 'booking' | 'service-detail'>('home');
  const [scrolled, setScrolled] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic document title based on current view
  useEffect(() => {
    const titles: Record<string, string> = {
      'home': 'Zeo Dental Clinic | Premium Dental Care in Beverly Hills',
      'booking': 'Book Appointment | Zeo Dental Clinic',
      'service-detail': 'Our Services | Zeo Dental Clinic'
    };
    document.title = titles[view] || titles.home;
  }, [view]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/book-appointment') {
        setView('booking');
      } else if (path.startsWith('/services/')) {
        setView('service-detail');
        const id = path.split('/').pop();
        if (id) setSelectedServiceId(id);
      } else {
        setView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (newView: 'home' | 'booking' | 'service-detail', sectionId?: string, serviceParam?: string) => {
    setView(newView);
    
    // Logic for passing service context
    if (newView === 'booking' && serviceParam) {
      setPreselectedService(serviceParam);
    } else if (newView === 'service-detail' && serviceParam) {
      setSelectedServiceId(serviceParam);
    }

    // Update URL history for better UX
    if (newView === 'booking') {
      window.history.pushState(null, '', '/book-appointment');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (newView === 'service-detail') {
      window.history.pushState(null, '', `/services/${serviceParam}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const path = sectionId ? `/#${sectionId}` : '/';
      // Only push state if we are actually changing the "page" context or it's a significant section jump
      if (view !== 'home') {
        window.history.pushState(null, '', path);
      }
      
      // Navigation handling to Home sections
      if (sectionId) {
        if (view === 'home') {
            const element = document.getElementById(sectionId);
            if (element) {
              const navbarHeight = 80;
              const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
              window.scrollTo({
                top: elementPosition - navbarHeight,
                behavior: 'smooth'
              });
            }
        } else {
            // If switching view back to home, wait a tick for render then scroll
            setTimeout(() => {
              const element = document.getElementById(sectionId);
              if (element) {
                const navbarHeight = 80; 
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                  top: elementPosition - navbarHeight,
                  behavior: 'smooth'
                });
              }
            }, 100);
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <LanguageProvider>
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-primary-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
          Skip to main content
        </a>
        <Navbar
          scrolled={scrolled}
          currentView={view}
          onNavigate={handleNavigate}
        />

        <main id="main-content" className="flex-grow" role="main">
          {view === 'home' && (
            <div className="animate-fade-in-up">
              <section id="home" aria-label="Welcome">
                <Hero onNavigate={handleNavigate} />
              </section>
              <section id="services" aria-label="Our Services">
                <Services onNavigate={handleNavigate} />
              </section>
              <section id="experience" aria-label="Why Choose Us">
                <WhyChooseUs />
              </section>
              <section id="team" aria-label="Our Team">
                <Team />
              </section>
              <section id="reviews" aria-label="Patient Reviews">
                <GoogleReviews />
              </section>
            </div>
          )}

          {view === 'booking' && (
            <div className="animate-fade-in-up">
              <BookingSection onNavigate={handleNavigate} initialService={preselectedService} />
            </div>
          )}

          {view === 'service-detail' && (
            <div className="animate-fade-in-up">
              <ServiceDetail serviceId={selectedServiceId} onNavigate={handleNavigate} />
            </div>
          )}
        </main>

          <Footer onNavigate={handleNavigate} />
          <ChatWidget />
        </div>
      </ErrorBoundary>
    </LanguageProvider>
  );
};

export default App;
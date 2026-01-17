import React, { useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Treatments } from './components/Treatments';
import { ServicesGrid } from './components/ServicesGrid';
import { Philosophy } from './components/Philosophy';
import { Team } from './components/Team';
import { ClinicalCases } from './components/ClinicalCases';
import { Booking } from './components/Booking';
import { Footer } from './components/Footer';
import { ChatWidget } from './components/ChatWidget';
import { ErrorBoundary } from './components/ErrorBoundary';
import { LanguageProvider } from './contexts/LanguageContext';

const App: React.FC = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorOutlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const posX = e.clientX;
      const posY = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = `${posX}px`;
        cursorDotRef.current.style.top = `${posY}px`;
      }

      if (cursorOutlineRef.current) {
        cursorOutlineRef.current.animate(
          {
            left: `${posX}px`,
            top: `${posY}px`,
          },
          { duration: 500, fill: 'forwards' }
        );
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.dataset.cursor === 'hover'
      ) {
        document.body.classList.add('hovering');
      } else {
        document.body.classList.remove('hovering');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <LanguageProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-white">
          {/* Custom Cursor Elements */}
          <div ref={cursorDotRef} className="cursor-dot"></div>
          <div ref={cursorOutlineRef} className="cursor-outline"></div>

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
            <ServicesGrid />
            <Philosophy />
            <Team />
            <ClinicalCases />
            <Booking />
          </main>
          <Footer />
          <ChatWidget />
        </div>
      </ErrorBoundary>
    </LanguageProvider>
  );
};

export default App;

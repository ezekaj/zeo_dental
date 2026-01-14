import React, { useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesGrid } from './components/ServicesGrid';
import { Philosophy } from './components/Philosophy';
import { Team } from './components/Team';
import { ClinicalCases } from './components/ClinicalCases';
import { Booking } from './components/Booking';
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
        cursorOutlineRef.current.animate({
          left: `${posX}px`,
          top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button') || target.dataset.cursor === 'hover') {
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

          <Header />
          <main>
            <Hero />
            <ServicesGrid />
            <Philosophy />
            <Team />
            <ClinicalCases />
            <Booking />
          </main>
          <ChatWidget />
        </div>
      </ErrorBoundary>
    </LanguageProvider>
  );
};

export default App;

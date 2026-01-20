import React, { useState, useEffect, useCallback } from 'react';
import { X, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from '../hooks/useTranslation';

const NAV_ITEMS = [
  { labelKey: 'nav.clinic', href: '#home' },
  { labelKey: 'nav.treatments', href: '#treatments' },
  { labelKey: 'nav.philosophy', href: '#philosophy' },
  { labelKey: 'nav.team', href: '#team' },
  { labelKey: 'nav.cases', href: '#cases' },
  { labelKey: 'nav.contact', href: '#contact' },
];

// Header height offset for smooth scrolling
const HEADER_OFFSET = 100;

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section with header offset
  const scrollToSection = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - HEADER_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }

    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[0.16,1,0.3,1] border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md py-4 border-gray-100 text-studio-black'
            : 'bg-transparent py-8 border-transparent text-white'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-12 grid grid-cols-3 items-center">
          {/* Left: Menu */}
          <div className="flex items-center justify-start gap-2 sm:gap-4">
            <button
              className="group flex items-center gap-2 sm:gap-3 p-2 -ml-2 focus:outline-none"
              onClick={() => setIsMobileMenuOpen(true)}
              data-cursor="hover"
              aria-label="Open menu"
            >
              <div className="flex flex-col items-end gap-[5px] w-6 group-hover:gap-[7px] transition-all">
                <span className="w-full h-[1px] bg-current"></span>
                <span className="w-2/3 h-[1px] bg-current group-hover:w-full transition-all"></span>
              </div>
              <span className="hidden md:inline-block text-[10px] uppercase tracking-ultra font-medium">
                {t('nav.menu')}
              </span>
            </button>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'sq' : 'en')}
              className="flex items-center gap-1 sm:gap-2 p-2 text-[11px] sm:text-[10px] uppercase tracking-wide sm:tracking-ultra font-medium hover:text-studio-gold transition-colors"
              data-cursor="hover"
              aria-label="Switch language"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'SQ' : 'EN'}</span>
            </button>
          </div>

          {/* Center: Brand */}
          <div className="flex justify-center">
            <a
              href="#"
              className="font-serif text-xl sm:text-2xl tracking-widest relative group"
              data-cursor="hover"
            >
              ZEO<span className="text-studio-gold">.</span>
            </a>
          </div>

          {/* Right: CTA */}
          <div className="flex justify-end">
            <a
              href="#contact"
              onClick={e => scrollToSection(e, '#contact')}
              className={`text-[10px] sm:text-[10px] uppercase tracking-wide sm:tracking-ultra font-medium border px-3 sm:px-6 py-2.5 sm:py-3 transition-all duration-500 ${
                isScrolled
                  ? 'border-studio-black text-studio-black hover:bg-studio-black hover:text-white'
                  : 'border-white text-white hover:bg-white hover:text-studio-black'
              }`}
              data-cursor="hover"
            >
              {t('nav.book')}
            </a>
          </div>
        </div>
      </header>

      {/* Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-[60] transition-transform duration-[800ms] ease-[0.83, 0, 0.17, 1] ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 h-full relative">
          <div className="absolute top-8 right-6 md:top-10 md:right-12">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="group p-4 flex items-center gap-4 text-studio-black"
              data-cursor="hover"
            >
              <span className="text-[10px] uppercase tracking-ultra">{t('nav.close')}</span>
              <X
                className="w-5 h-5 transition-transform group-hover:rotate-90 duration-500"
                strokeWidth={1}
              />
            </button>
          </div>

          <div className="h-full flex flex-col justify-center items-center">
            <nav className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-8">
              {NAV_ITEMS.map((item, idx) => (
                <div key={item.labelKey} className="overflow-hidden">
                  <a
                    href={item.href}
                    onClick={e => scrollToSection(e, item.href)}
                    className={`block font-serif text-3xl sm:text-4xl md:text-7xl lg:text-8xl text-studio-black hover:text-studio-gold hover:italic transition-all duration-500 transform py-1 ${
                      isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
                    }`}
                    style={{ transitionDelay: `${300 + idx * 100}ms` }}
                    data-cursor="hover"
                  >
                    {t(item.labelKey)}
                  </a>
                </div>
              ))}
            </nav>
          </div>

          <div className="absolute bottom-8 sm:bottom-12 left-0 w-full text-center">
            <p className="text-[11px] sm:text-[10px] uppercase tracking-wide sm:tracking-ultra text-studio-gray">
              {t('nav.location')}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

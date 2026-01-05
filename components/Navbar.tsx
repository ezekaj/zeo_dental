import React, { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useTranslation } from '../hooks/useTranslation';

interface NavbarProps {
  scrolled: boolean;
  currentView: 'home' | 'booking' | 'service-detail';
  onNavigate: (view: 'home' | 'booking' | 'service-detail', sectionId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ scrolled, currentView, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { t } = useTranslation();

  // Scroll Spy Logic
  useEffect(() => {
    if (currentView !== 'home') return;

    const handleScroll = () => {
      const sections = ['home', 'services', 'experience', 'team', 'reviews'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const isSolidNav = scrolled || isOpen || currentView !== 'home';

  const navClasses = `fixed w-full z-50 transition-all duration-300 ${
    isSolidNav ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
  }`;

  const textClasses = isSolidNav ? 'text-slate-900' : 'text-slate-900 md:text-white';
  const buttonClasses = isSolidNav
    ? 'bg-primary-600 text-white hover:bg-primary-700' 
    : 'bg-white text-primary-900 hover:bg-slate-100 md:bg-white/20 md:backdrop-blur-sm md:text-white md:hover:bg-white/30';

  const navLinks = [
    { name: t('nav.home'), id: 'home' },
    { name: t('nav.services'), id: 'services' },
    { name: t('nav.experience'), id: 'experience' },
    { name: t('nav.team'), id: 'team' },
    { name: t('nav.testimonials'), id: 'reviews' },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate('home', id);
  };

  return (
    <nav className={navClasses} role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button
            className="flex-shrink-0 flex items-center cursor-pointer bg-transparent border-none"
            onClick={() => handleLinkClick('home')}
            aria-label="Zeo Dental Clinic - Go to homepage"
          >
            <span className={`text-2xl font-serif font-bold tracking-widest ${textClasses}`}>
              ZEO<span className="text-primary-500">.</span>
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.id)}
                className={`text-sm font-medium tracking-wide transition-colors duration-200 hover:text-primary-500 ${textClasses} ${
                  currentView === 'home' && activeSection === link.id ? 'text-primary-500 font-semibold' : ''
                }`}
              >
                {link.name}
              </button>
            ))}
            <LanguageSwitcher variant={isSolidNav ? 'dark' : 'light'} />
            <button
              onClick={() => {
                setIsOpen(false);
                onNavigate('booking');
              }}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-xl ${buttonClasses} ${
                currentView === 'booking' ? 'bg-primary-700 ring-2 ring-primary-500 ring-offset-2' : ''
              }`}
            >
              {t('nav.booking')}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${textClasses} focus:outline-none focus:ring-2 focus:ring-primary-500`}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white border-t border-slate-100 absolute w-full h-screen top-full left-0 animate-fade-in-up"
          role="menu"
          aria-label="Mobile navigation"
        >
          <div className="px-4 pt-8 pb-3 space-y-6 flex flex-col items-center">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleLinkClick(link.id)}
                className={`block text-2xl font-serif hover:text-primary-600 ${
                  currentView === 'home' && activeSection === link.id ? 'text-primary-600 font-medium' : 'text-slate-800'
                }`}
              >
                {link.name}
              </button>
            ))}
            <div className="mt-4">
              <LanguageSwitcher variant="dark" />
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                onNavigate('booking');
              }}
              className="mt-4 w-full text-center px-6 py-4 rounded-full bg-primary-600 text-white font-semibold text-lg shadow-md"
            >
              {t('nav.booking')}
            </button>
            <div className="mt-8 flex flex-col items-center text-slate-500">
               <span className="flex items-center gap-2 mb-2"><Phone size={18}/> {t('contact.phone')}</span>
               <span className="text-sm">{t('contact.addressShort')}</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
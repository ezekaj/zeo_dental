import React, { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

interface HeroProps {
  onNavigate: (view: 'home' | 'booking', sectionId?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [scrollY, setScrollY] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 z-0 will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <img 
          src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1920" 
          alt="Modern Dental Clinic Interior" 
          className="w-full h-[120%] object-cover object-center"
          loading="eager"
          fetchpriority="high"
          decoding="async"
          width="1920"
          height="1280"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/50 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="max-w-2xl">
          <h2 
            className="text-primary-400 font-medium tracking-widest text-sm uppercase mb-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            {t('hero.welcome')}
          </h2>
          <h1 className="text-5xl md:text-7xl font-serif text-white font-bold leading-tight mb-6 drop-shadow-lg">
            <span 
              className="block opacity-0 animate-slide-in-left" 
              style={{ animationDelay: '0.3s' }}
            >
              {t('hero.redefining')}
            </span>
            <span 
              className="block italic font-light text-primary-200 opacity-0 animate-fade-in-scale"
              style={{ animationDelay: '0.5s' }}
            >
              {t('hero.artOfSmiles')}
            </span>
          </h1>
          <p 
            className="text-lg md:text-xl text-slate-300 mb-8 font-light leading-relaxed max-w-lg opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.7s' }}
          >
            {t('hero.subtitle')}
          </p>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: '0.9s' }}
          >
            <button 
              onClick={() => onNavigate('booking')}
              className="group bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] flex items-center justify-center gap-2"
            >
              {t('hero.bookConsultation')}
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('home', 'services')}
              className="px-8 py-4 rounded-full font-semibold text-white border border-white/30 hover:bg-white/10 transition-all backdrop-blur-sm flex items-center justify-center"
            >
              {t('hero.exploreServices')}
            </button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 right-0 p-12 hidden md:block z-10 opacity-0 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
        <div className="flex gap-8 text-white/60">
           <div>
              <p className="text-2xl font-serif text-white">15+</p>
              <p className="text-xs uppercase tracking-wider">{t('hero.yearsExp')}</p>
           </div>
           <div>
              <p className="text-2xl font-serif text-white">2k+</p>
              <p className="text-xs uppercase tracking-wider">{t('hero.smiles')}</p>
           </div>
        </div>
      </div>
    </div>
  );
};
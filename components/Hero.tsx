import React, { useEffect, useState } from 'react';
import { Reveal } from './ui/Reveal';
import { useTranslation } from '../hooks/useTranslation';

export const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden bg-studio-black">
      {/* Parallax Image Background */}
      <div
        className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]"
        style={{ transform: `translateY(${offset * 0.15}px)` }}
      >
        <img
          src="/team-hero.jpg"
          alt="Zeo Dental Clinic Team"
          className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700 hero-image"
        />
        {/* Grain Overlay */}
        <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay"></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/50" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full min-h-screen flex flex-col justify-center items-center text-center px-6 py-20">
        <Reveal>
          <h1 className="flex flex-col items-center justify-center text-white leading-[0.95] px-6">
            <span className="font-serif italic font-light text-[clamp(2rem,8vw,min(8vw,12vh))] md:text-[min(8vw,12vh)] tracking-tight opacity-90 px-[0.15em]">
              {t('hero.artOf')}
            </span>
            <span className="font-serif font-normal text-[clamp(2.5rem,11vw,min(12vw,18vh))] md:text-[min(12vw,18vh)] tracking-tighter mt-2">
              {t('hero.dentistry')}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-8 md:mt-12 flex items-center gap-4 md:gap-6">
            <span className="h-[1px] w-8 md:w-12 bg-white/50"></span>
            <p className="text-white text-[11px] md:text-xs uppercase tracking-wide md:tracking-ultra font-light">
              {t('hero.subtitle')}
            </p>
            <span className="h-[1px] w-8 md:w-12 bg-white/50"></span>
          </div>
        </Reveal>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-20 mix-blend-difference text-white">
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] md:text-[9px] uppercase tracking-wide md:tracking-ultra opacity-70">
            {t('hero.explore')}
          </span>
          <div className="w-[1px] h-10 md:h-12 bg-white/30 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-white animate-pulldown"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulldown {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(100%); }
        }
        .animate-pulldown {
            animation: pulldown 2s cubic-bezier(0.8, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
};

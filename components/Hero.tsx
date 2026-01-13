import React, { useEffect, useRef, useState } from 'react';
import { Reveal } from './ui/Reveal';
import { useTranslation } from '../hooks/useTranslation';

export const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [offset, setOffset] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden bg-studio-black">
      {/* Parallax Video Background */}
      <div
        className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]"
        style={{ transform: `translateY(${offset * 0.3}px)` }}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50 grayscale contrast-125"
          poster="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=2574&auto=format&fit=crop"
        >
          <source src="https://cdn.pixabay.com/video/2021/07/13/81806-574739932_large.mp4" type="video/mp4" />
        </video>
        {/* Grain Overlay */}
        <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay"></div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-4">
        <Reveal>
            <h1 className="flex flex-col items-center justify-center text-white leading-[0.85]">
                <span className="font-serif italic font-light text-[12vw] md:text-[8vw] tracking-tight opacity-90">{t('hero.artOf')}</span>
                <span className="font-serif font-normal text-[15vw] md:text-[12vw] tracking-tighter mt-2">{t('hero.dentistry')}</span>
            </h1>
        </Reveal>

        <Reveal delay={300}>
            <div className="mt-12 flex items-center gap-6">
                <span className="h-[1px] w-12 bg-white/50"></span>
                <p className="text-white text-[10px] md:text-xs uppercase tracking-ultra font-light">
                    {t('hero.subtitle')}
                </p>
                <span className="h-[1px] w-12 bg-white/50"></span>
            </div>
        </Reveal>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 mix-blend-difference text-white">
        <div className="flex flex-col items-center gap-2">
            <span className="text-[9px] uppercase tracking-ultra opacity-70">{t('hero.explore')}</span>
            <div className="w-[1px] h-12 bg-white/30 overflow-hidden relative">
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

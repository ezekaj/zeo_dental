import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useLocalePath } from '../hooks/useLocalePath';

export const CtScanCTA: React.FC = () => {
  const { t } = useTranslation();
  const lp = useLocalePath();

  return (
    <section className="relative py-20 sm:py-24 md:py-32 bg-gradient-to-br from-studio-black via-studio-black to-neutral-900 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-studio-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-studio-gold/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-4 sm:px-6 md:px-12 relative z-10 text-center">
        <span className="inline-block text-studio-gold text-[10px] uppercase tracking-ultra mb-6 border border-studio-gold/30 px-4 py-1.5 rounded-full">
          {t('ctScan.label')}
        </span>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 sm:mb-6">
          {t('ctScan.title')}
        </h2>
        <p className="text-white/50 font-light text-base sm:text-lg max-w-2xl mx-auto mb-10 sm:mb-14">
          {t('ctScan.description')}
        </p>
        <a
          href={lp('/book')}
          className="inline-block bg-studio-gold text-white text-[10px] sm:text-xs uppercase tracking-ultra px-8 sm:px-12 py-4 hover:bg-studio-gold/90 transition-colors duration-300"
          data-cursor="hover"
        >
          {t('ctScan.cta')}
        </a>
      </div>
    </section>
  );
};

import React from 'react';
import { useTranslation } from '../hooks/useTranslation';

const NAV_ITEMS = [
  { labelKey: 'nav.clinic', href: '#home' },
  { labelKey: 'nav.treatments', href: '#services' },
  { labelKey: 'nav.philosophy', href: '#philosophy' },
  { labelKey: 'nav.team', href: '#team' },
  { labelKey: 'nav.cases', href: '#cases' },
  { labelKey: 'nav.contact', href: '#contact' },
];

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white pt-32 pb-8 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32 items-end">
            <div>
                 <ul className="space-y-2">
                    {NAV_ITEMS.map(item => (
                        <li key={item.labelKey} className="overflow-hidden">
                            <a
                                href={item.href}
                                className="block text-4xl md:text-5xl font-serif text-studio-black hover:italic hover:translate-x-4 transition-all duration-500"
                                data-cursor="hover"
                            >
                                {t(item.labelKey)}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex flex-col justify-end items-start md:items-end">
                <div className="flex gap-8 mb-8">
                     <a
                       href="https://www.instagram.com/zeodentalclinic/"
                       target="_blank"
                       rel="noopener noreferrer"
                       className="text-[10px] uppercase tracking-ultra text-studio-black hover:text-studio-gold transition-colors"
                     >
                       Instagram
                     </a>
                     <a href="#" className="text-[10px] uppercase tracking-ultra text-studio-black hover:text-studio-gold transition-colors">LinkedIn</a>
                </div>
                <p className="text-right text-studio-gray font-light text-sm max-w-xs">
                    {t('footer.tagline')}
                </p>
            </div>
        </div>

        {/* Massive Brand Name */}
        <div className="border-t border-gray-100 pt-8 relative">
             <h1 className="font-serif text-[18vw] leading-none text-center text-studio-black opacity-[0.03] select-none pointer-events-none translate-y-4">
                ZEO.STUDIO
            </h1>

            <div className="absolute bottom-4 w-full flex flex-col md:flex-row justify-between items-center md:items-end text-[10px] uppercase tracking-ultra text-gray-400 gap-2">
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
                  <span>&copy; {currentYear} {t('footer.rights')}</span>
                  <span className="hidden md:inline">•</span>
                  <a
                    href="/privacy-policy"
                    className="hover:text-studio-gold transition-colors"
                  >
                    Privacy Policy
                  </a>
                  <span className="hidden md:inline">•</span>
                  <a
                    href="/terms-of-service"
                    className="hover:text-studio-gold transition-colors"
                  >
                    Terms of Service
                  </a>
                  <span className="hidden md:inline">•</span>
                  <a
                    href="https://zedigital.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-studio-gold transition-colors"
                  >
                    Made by Z.E Digital Tech
                  </a>
                </div>
                <span>{t('footer.location')}</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

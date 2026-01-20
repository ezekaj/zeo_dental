import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { useTranslation } from '../hooks/useTranslation';

// WhatsApp number for Zeo Dental Clinic (without + sign for wa.me link)
const WHATSAPP_NUMBER = '355684004840';

export const WhatsAppButton: React.FC = () => {
  const { t } = useTranslation();
  const [isOverDark, setIsOverDark] = useState(true);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Detect if button is over a dark section
  useEffect(() => {
    const checkBackground = () => {
      if (!buttonRef.current) return;

      const buttonRect = buttonRef.current.getBoundingClientRect();
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;

      // Get all sections and check which one the button is over
      const sections = document.querySelectorAll('section');
      let isDark = false;

      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (buttonCenterY >= rect.top && buttonCenterY <= rect.bottom) {
          // Check if this section has dark background
          const bgClass = section.className;
          isDark =
            bgClass.includes('bg-studio-black') ||
            bgClass.includes('bg-black') ||
            section.id === 'home' ||
            section.id === 'contact';
        }
      });

      setIsOverDark(isDark);
    };

    checkBackground();
    window.addEventListener('scroll', checkBackground);
    window.addEventListener('resize', checkBackground);

    return () => {
      window.removeEventListener('scroll', checkBackground);
      window.removeEventListener('resize', checkBackground);
    };
  }, []);

  // Generate WhatsApp link with pre-filled message
  const getWhatsAppLink = () => {
    const message = encodeURIComponent(t('whatsapp.defaultMessage'));
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  };

  return (
    <a
      ref={buttonRef}
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 left-6 z-50 p-3 rounded-full transition-all duration-300 transform hover:scale-110 focus:outline-none bg-transparent group ${
        isOverDark ? 'text-white hover:text-[#25D366]' : 'text-studio-black hover:text-[#25D366]'
      }`}
      aria-label={t('whatsapp.ariaLabel')}
    >
      {/* WhatsApp Icon - Outline style */}
      <svg
        viewBox="0 0 24 24"
        width="32"
        height="32"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="transition-transform group-hover:scale-110"
      >
        {/* WhatsApp logo outline */}
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.82.49 3.53 1.34 5L2 22l5.12-1.34A9.96 9.96 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" strokeLinecap="round" strokeLinejoin="round" />
        {/* Phone icon inside */}
        <path d="M16.5 14.5c-.3.9-1.5 1.6-2.4 1.8-.6.1-1.4.2-4-1.2-3.3-1.8-5.4-5.3-5.6-5.5-.2-.3-1.3-1.8-1.3-3.4 0-1.6.8-2.4 1.1-2.7.3-.3.6-.4.8-.4h.6c.2 0 .5 0 .7.5.3.6.9 2.2 1 2.4.1.2.1.4 0 .6-.1.2-.2.3-.3.5-.2.2-.3.3-.5.5-.2.2-.4.4-.2.8.2.4 1 1.6 2.1 2.6 1.4 1.3 2.6 1.7 3 1.9.4.2.6.1.8-.1.2-.2.9-1 1.1-1.4.2-.4.5-.3.8-.2.3.1 1.8.9 2.2 1 .4.2.6.3.7.4.1.2.1 1-.2 1.9z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      {/* Tooltip */}
      <span className="absolute left-full ml-3 px-3 py-2 bg-studio-black text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
        {t('whatsapp.tooltip')}
      </span>
    </a>
  );
};

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
        isOverDark
          ? 'text-white hover:text-[#25D366]'
          : 'text-studio-black hover:text-[#25D366]'
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
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform group-hover:scale-110"
      >
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>

      {/* Tooltip */}
      <span className="absolute left-full ml-3 px-3 py-2 bg-studio-black text-white text-sm rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
        {t('whatsapp.tooltip')}
      </span>
    </a>
  );
};

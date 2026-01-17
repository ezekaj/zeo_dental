import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage, Language } from '../contexts/LanguageContext';
import { Check } from 'lucide-react';

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'sq', name: 'Shqip', flag: '🇦🇱' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
];

// Animated Globe Icon Component
const GlobeIcon: React.FC<{ className?: string; isHovered: boolean }> = ({
  className = '',
  isHovered,
}) => {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      animate={{ rotate: isHovered ? 360 : 0 }}
      transition={{ duration: isHovered ? 0.6 : 0, ease: 'easeInOut' }}
    >
      {/* Main circle */}
      <circle cx="12" cy="12" r="10" />
      {/* Horizontal line */}
      <path d="M2 12h20" />
      {/* Vertical ellipse */}
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      {/* Additional longitude lines for depth */}
      <motion.path
        d="M12 2a10 10 0 0 1 0 20"
        strokeDasharray="4 2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
      />
    </motion.svg>
  );
};

interface LanguageSwitcherProps {
  variant?: 'light' | 'dark';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'dark' }) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case 'Escape':
        setIsOpen(false);
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!isOpen) setIsOpen(true);
        break;
    }
  };

  const handleSelectLanguage = (code: Language) => {
    setLanguage(code);
    setIsOpen(false);
  };

  const currentLang = languages.find(l => l.code === language) || languages[0];

  // Dropdown animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.15 },
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
  };

  // Item animation variants
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.2,
        ease: 'easeOut',
      },
    }),
  };

  // Check animation variants
  const checkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 500,
        damping: 25,
      },
    },
  };

  const buttonTextColor =
    variant === 'light'
      ? 'text-white hover:text-white/80'
      : 'text-slate-700 hover:text-primary-600';

  return (
    <div ref={dropdownRef} className="relative">
      {/* Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onKeyDown={handleKeyDown}
        className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg transition-colors duration-200 ${buttonTextColor} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1`}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
        whileTap={{ scale: 0.97 }}
      >
        <GlobeIcon className="w-5 h-5" isHovered={isHovered} />
        <span className="text-sm font-medium hidden sm:inline">
          {currentLang.code.toUpperCase()}
        </span>
        <motion.svg
          className="w-3 h-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="absolute right-0 mt-2 w-40 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50"
            role="listbox"
            aria-label="Available languages"
          >
            <div className="py-1">
              {languages.map((lang, index) => (
                <motion.button
                  key={lang.code}
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 text-left transition-colors duration-150 ${
                    language === lang.code
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                  role="option"
                  aria-selected={language === lang.code}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg" role="img" aria-label={lang.name}>
                      {lang.flag}
                    </span>
                    <span className="font-medium">{lang.name}</span>
                  </div>
                  <AnimatePresence>
                    {language === lang.code && (
                      <motion.div
                        variants={checkVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <Check className="w-4 h-4 text-primary-600" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

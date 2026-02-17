import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'sq' | 'en' | 'it' | 'de' | 'fr' | 'tr' | 'el' | 'es';

const SUPPORTED_LANGUAGES: Language[] = ['sq', 'en', 'it', 'de', 'fr', 'tr', 'el', 'es'];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isAlbanian: boolean;
  isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'zeo-dental-language';

interface LanguageProviderProps {
  children: ReactNode;
}

const COUNTRY_TO_LANGUAGE: Record<string, Language> = {
  AL: 'sq', XK: 'sq',
  IT: 'it', SM: 'it', VA: 'it',
  DE: 'de', AT: 'de', CH: 'de', LI: 'de',
  FR: 'fr', BE: 'fr', MC: 'fr', LU: 'fr',
  TR: 'tr',
  GR: 'el', CY: 'el',
  ES: 'es', MX: 'es', AR: 'es', CO: 'es', CL: 'es',
};

async function detectLanguageFromIP(): Promise<Language> {
  try {
    const response = await fetch('https://ipapi.co/json/', {
      signal: AbortSignal.timeout(3000),
    });
    if (!response.ok) throw new Error('IP detection failed');
    const data = await response.json();
    return COUNTRY_TO_LANGUAGE[data.country_code] || 'en';
  } catch {
    return 'en';
  }
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED_LANGUAGES.includes(saved as Language)) {
        return saved as Language;
      }
    }
    return 'en';
  });

  // Detect language from IP on first visit (no saved preference)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved || !SUPPORTED_LANGUAGES.includes(saved as Language)) {
      detectLanguageFromIP().then(detected => {
        setLanguageState(detected);
        localStorage.setItem(STORAGE_KEY, detected);
      });
    }
  }, []);

  // Update document lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    isAlbanian: language === 'sq',
    isEnglish: language === 'en',
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

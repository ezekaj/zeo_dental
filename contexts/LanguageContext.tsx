import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SUPPORTED_LANGUAGES, getLangFromPath, stripLangPrefix, localePath } from '../utils/i18n';
import type { Language } from '../utils/i18n';

export type { Language };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isAlbanian: boolean;
  isEnglish: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'zeo-lang-v2';

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // URL is the source of truth
    if (typeof window !== 'undefined') {
      const urlLang = getLangFromPath(window.location.pathname);
      if (urlLang) return urlLang;

      // Fallback to localStorage (shouldn't happen if server redirects)
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && (SUPPORTED_LANGUAGES as readonly string[]).includes(saved)) {
        return saved as Language;
      }
    }
    return 'en';
  });

  // Update document lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (newLang: Language) => {
    // Save preference
    localStorage.setItem(STORAGE_KEY, newLang);
    document.cookie = `zeo-lang=${newLang};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;

    // Navigate to same page in new language
    const barePath = stripLangPrefix(window.location.pathname);
    const hash = window.location.hash;
    window.location.href = localePath(barePath, newLang) + hash;
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

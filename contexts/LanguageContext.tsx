import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'sq' | 'en';

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

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  // Default to Albanian ('sq') - primary language for Albanian dental clinic
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'sq') {
        return saved;
      }
    }
    return 'sq'; // Albanian as default
  });

  // Persist language choice to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    // Update document lang attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
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

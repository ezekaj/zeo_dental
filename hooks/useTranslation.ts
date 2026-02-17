import { useLanguage, Language } from '../contexts/LanguageContext';
import sqTranslations from '../translations/sq.json';
import enTranslations from '../translations/en.json';
import itTranslations from '../translations/it.json';
import deTranslations from '../translations/de.json';
import frTranslations from '../translations/fr.json';
import trTranslations from '../translations/tr.json';
import elTranslations from '../translations/el.json';
import esTranslations from '../translations/es.json';

type TranslationValue = string | TranslationValue[] | { [key: string]: TranslationValue };
type Translations = { [key: string]: TranslationValue };

const translations: Record<Language, Translations> = {
  sq: sqTranslations,
  en: enTranslations,
  it: itTranslations,
  de: deTranslations,
  fr: frTranslations,
  tr: trTranslations,
  el: elTranslations,
  es: esTranslations,
};

/**
 * Hook for accessing translations based on current language
 * @returns Object with t() function for translations
 */
export const useTranslation = () => {
  const { language, setLanguage } = useLanguage();

  /**
   * Get translation for a key path (e.g., 'nav.home', 'hero.title')
   * @param key Dot-notation path to translation
   * @param fallback Optional fallback if key not found
   * @returns Translated string
   */
  const t = (key: string, fallback?: string): string => {
    const keys = key.split('.');
    let value: TranslationValue | undefined = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && !Array.isArray(value) && k in value) {
        value = (value as { [key: string]: TranslationValue })[k];
      } else {
        // Key not found, try fallback language (English)
        let fallbackValue: TranslationValue | undefined = translations.en;
        for (const fk of keys) {
          if (
            fallbackValue &&
            typeof fallbackValue === 'object' &&
            !Array.isArray(fallbackValue) &&
            fk in fallbackValue
          ) {
            fallbackValue = (fallbackValue as { [key: string]: TranslationValue })[fk];
          } else {
            fallbackValue = undefined;
            break;
          }
        }
        if (typeof fallbackValue === 'string') {
          return fallbackValue;
        }
        return fallback || key;
      }
    }

    if (typeof value === 'string') {
      return value;
    }

    return fallback || key;
  };

  /**
   * Get raw translation value (arrays, objects) for a key path
   * @param key Dot-notation path to translation
   * @returns Raw translation value (string, array, or object)
   */
  const tRaw = <T = TranslationValue>(key: string): T | undefined => {
    const keys = key.split('.');
    let value: TranslationValue | undefined = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && !Array.isArray(value) && k in value) {
        value = (value as { [key: string]: TranslationValue })[k];
      } else {
        // Key not found, try fallback language (English)
        let fallbackValue: TranslationValue | undefined = translations.en;
        for (const fk of keys) {
          if (
            fallbackValue &&
            typeof fallbackValue === 'object' &&
            !Array.isArray(fallbackValue) &&
            fk in fallbackValue
          ) {
            fallbackValue = (fallbackValue as { [key: string]: TranslationValue })[fk];
          } else {
            fallbackValue = undefined;
            break;
          }
        }
        return fallbackValue as T | undefined;
      }
    }

    return value as T | undefined;
  };

  return { t, tRaw, language, setLanguage };
};

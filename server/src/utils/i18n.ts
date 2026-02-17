export const SUPPORTED_LANGUAGES = ['sq', 'en', 'it', 'de', 'fr', 'tr', 'el', 'es'] as const;
export type Language = (typeof SUPPORTED_LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = 'en';

export const LANG_TO_LOCALE: Record<Language, string> = {
  sq: 'sq_AL',
  en: 'en_US',
  it: 'it_IT',
  de: 'de_DE',
  fr: 'fr_FR',
  tr: 'tr_TR',
  el: 'el_GR',
  es: 'es_ES',
};

export function getLangFromPath(pathname: string): Language | null {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (first && (SUPPORTED_LANGUAGES as readonly string[]).includes(first)) {
    return first as Language;
  }
  return null;
}

export function stripLangPrefix(pathname: string): string {
  const lang = getLangFromPath(pathname);
  if (lang) {
    const rest = pathname.slice(`/${lang}`.length);
    return rest || '/';
  }
  return pathname;
}

export function localePath(path: string, lang: Language): string {
  const clean = stripLangPrefix(path);
  if (clean === '/') return `/${lang}/`;
  return `/${lang}${clean}`;
}

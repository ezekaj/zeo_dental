import { useLanguage } from '../contexts/LanguageContext';
import { localePath } from '../utils/i18n';

export const useLocalePath = () => {
  const { language } = useLanguage();
  return (path: string) => localePath(path, language);
};

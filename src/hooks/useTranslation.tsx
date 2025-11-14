import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';

export const useTranslation = () => {
  const languageCode = useSelector((state: RootState) => state.language.languageCode);
  const translations = useSelector((state: RootState) => state.language.translations);

  const t = (key: keyof typeof translations) => {
    return translations[key][languageCode];
  };

  return { t };
};

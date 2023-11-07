import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { languageDetectionPlugin } from '../utils/locale';

// translations sources
import { en, he, ua, ru } from './translations';

const resources = {
  en,
  he,
  ua,
  ru,
};

i18n
  .use(initReactI18next)
  .use(languageDetectionPlugin)
  .init({
    resources,
    compatibilityJSON: 'v3',
    //language to use if translations in user language are not available
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react
    },
    react: {
      useSuspense: false, // need to disable UI suspense callback
    },
  });

export default i18n;

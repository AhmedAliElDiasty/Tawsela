import { I18nManager, Text } from 'react-native';
import I18n from 'react-native-i18n';

import ar from './src/translations/ar.json';
import en from './src/translations/en.json';

import { startApp } from './src/App';

I18nManager.allowRTL(false);

I18n.translations = {
  ar: Object.assign(ar),
  en: Object.assign(en),
};

startApp();

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import en from './locales/en.json';
import de from './locales/de.json';
import es from './locales/es.json';
import nds from './locales/nds.json';

import { createI18n } from 'vue-i18n';
import './assets/style.css';


export const SUPPORT_LOCALES = ['en', 'de', 'es', 'nds'];

const i18n = createI18n({
  // @ts-ignore
  locale: navigator.language || navigator.userLanguage || 'de',
  fallbackLocale: 'en',
  messages: {
    en: en,
    de: de,
    es: es,
    nds: nds
  },
});

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')

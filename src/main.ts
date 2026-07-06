import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { watch } from 'vue'

import en from './locales/en.json';
import de from './locales/de.json';
import es from './locales/es.json';
import nds from './locales/nds.json';

import { createI18n } from 'vue-i18n';


export const SUPPORT_LOCALES = ['en', 'de', 'es', 'nds'];

const i18n = createI18n({

  legacy: false,
  // @ts-ignore
  locale: navigator.language || navigator.userLanguage || 'de',
  fallbackLocale: 'de',
  seo: true,
  messages: {
    en: en,
    de: de,
    es: es,
    nds: nds
  },
});
document.documentElement.setAttribute('lang', i18n.global.locale.value)

watch(() => i18n.global.locale, (newLocale) => {
  document.documentElement.setAttribute('lang', newLocale.value)
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from './locales.js'
import site from '../site.config.json'

// Priorità: lingua nell'URL (/it, /en) > scelta salvata > lingua del browser
function detectLang() {
  const fromUrl = location.pathname.split('/')[1]
  if (site.langs.includes(fromUrl)) return fromUrl
  const saved = localStorage.getItem('lang')
  if (site.langs.includes(saved)) return saved
  return navigator.language.startsWith('en') ? 'en' : site.defaultLang
}

i18n.use(initReactI18next).init({
  resources,
  lng: detectLang(),
  fallbackLng: site.defaultLang,
  interpolation: { escapeValue: false }, // React già protegge da XSS
})

// Tiene <html lang> allineato (utile per SEO e accessibilità) e ricorda la scelta
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng
  localStorage.setItem('lang', lng)
})
document.documentElement.lang = i18n.language

export default i18n

import { useEffect } from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import site from '../../site.config.json'

// Legge la lingua dall'URL (/:lang/...) e la applica a i18n
export default function LangLayout() {
  const { lang } = useParams()
  const { i18n } = useTranslation()
  const valid = site.langs.includes(lang)

  useEffect(() => {
    if (valid && i18n.language !== lang) i18n.changeLanguage(lang)
  }, [valid, lang, i18n])

  if (!valid) return <Navigate to={`/${site.defaultLang}`} replace />
  return <Outlet />
}

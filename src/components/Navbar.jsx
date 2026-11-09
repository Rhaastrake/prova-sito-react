import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import site from '../../site.config.json'

export default function Navbar() {
  const { t, i18n } = useTranslation()
  const { pathname } = useLocation()
  const lang = i18n.language
  // Percorso senza il prefisso lingua: "/it/contatti" -> "/contatti"
  const rest = pathname.split('/').slice(2).join('/')

  return (
    <nav>
      <NavLink to={`/${lang}`} end>{t('nav.home')}</NavLink>
      <NavLink to={`/${lang}/contatore`}>{t('nav.counter')}</NavLink>
      <NavLink to={`/${lang}/contatti`}>{t('nav.contact')}</NavLink>
      <span className="langs">
        {site.langs.map((l) => (
          // Cambiare lingua = andare a un altro URL
          <Link key={l} to={`/${l}${rest ? `/${rest}` : ''}`} hrefLang={l}>
            {l.toUpperCase()}
          </Link>
        ))}
      </span>
    </nav>
  )
}

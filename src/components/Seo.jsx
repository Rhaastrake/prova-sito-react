import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import site from '../../site.config.json'

// React 19 sposta <title> e <meta> scritti nel componente dentro <head>
export default function Seo({ title, description }) {
  const { pathname } = useLocation()
  const rest = pathname.split('/').slice(2).join('/')
  const url = (l) => `${site.url}/${l}${rest ? `/${rest}` : ''}`
  const lang = pathname.split('/')[1]

  // Tolgo i tag inseriti dal prerender, altrimenti resterebbero doppi/obsoleti
  useEffect(() => {
    document.head.querySelectorAll('[data-prerender]').forEach((n) => n.remove())
  }, [])

  return (
    <>
      <title>{`${title} | Prova React`}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <link rel="canonical" href={url(lang)} />
      {site.langs.map((l) => (
        <link key={l} rel="alternate" hrefLang={l} href={url(l)} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={url(site.defaultLang)} />
    </>
  )
}

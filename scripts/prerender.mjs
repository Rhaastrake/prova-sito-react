// Dopo `vite build`: crea un index.html per ogni lingua e pagina (dist/en/contatti/index.html, ...)
// con lang, title, description, canonical e hreflang già nell'HTML, e genera la sitemap.
// Il contenuto della pagina resta renderizzato da React nel browser.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resources } from '../src/locales.js'

const site = JSON.parse(readFileSync('site.config.json', 'utf8'))
const template = readFileSync('dist/index.html', 'utf8')
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const urlOf = (lang, path) => `${site.url}/${lang}${path ? `/${path}` : ''}`

for (const lang ofHello site.langs) {
  for (const { path, key } of site.routes) {
    const { title, description } = resources[lang].translation[key === 'home' ? 'home' : key]
    const fullTitle = `${title} | Prova React`
    const head = [
      `<link rel="canonical" href="${urlOf(lang, path)}" data-prerender />`,
      ...site.langs.map((l) => `<link rel="alternate" hreflang="${l}" href="${urlOf(l, path)}" data-prerender />`),
      `<link rel="alternate" hreflang="x-default" href="${urlOf(site.defaultLang, path)}" data-prerender />`,
    ].join('\n    ')

    const html = template
      .replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
      .replace(/<title>.*?<\/title>/, `<title data-prerender>${esc(fullTitle)}</title>`)
      .replace(/<meta name="description"[^>]*>/, `<meta name="description" content="${esc(description)}" data-prerender />`)
      .replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(title)}" data-prerender />`)
      .replace(/<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(description)}" data-prerender />`)
      .replace('</head>', `  ${head}\n  </head>`)

    const dir = `dist/${lang}${path ? `/${path}` : ''}`
    mkdirSync(dir, { recursive: true })
    writeFileSync(`${dir}/index.html`, html)
  }
}

// Sitemap: un <url> per pagina e lingua, con i link alle traduzioni
const entries = site.langs.flatMap((lang) =>
  site.routes.map(({ path }) => {
    const alts = site.langs
      .map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${urlOf(l, path)}"/>`)
      .join('\n')
    return `  <url>\n    <loc>${urlOf(lang, path)}</loc>\n${alts}\n  </url>`
  }),
)
writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${entries.join('\n')}\n</urlset>\n`,
)
console.log(`Prerender: ${site.langs.length * site.routes.length} pagine + sitemap.xml`)

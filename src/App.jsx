import { Routes, Route, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Navbar from './components/Navbar.jsx'
import LangLayout from './components/LangLayout.jsx'
import Home from './pages/Home.jsx'
import Contatore from './pages/Contatore.jsx'
import Contatti from './pages/Contatti.jsx'

// URL: /it, /it/contatore, /en, /en/contatti ... ogni lingua ha i suoi indirizzi
export default function App() {
  const { i18n } = useTranslation()
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Navigate to={`/${i18n.language}`} replace />} />
          <Route path="/:lang" element={<LangLayout />}>
            <Route index element={<Home />} />
            <Route path="contatore" element={<Contatore />} />
            <Route path="contatti" element={<Contatti />} />
          </Route>
        </Routes>
      </main>
    </>
  )
}

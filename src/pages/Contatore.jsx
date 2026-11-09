import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo.jsx'

export default function Contatore() {
  const { t } = useTranslation()
  // useState: valore che, quando cambia, ridisegna il componente
  const [n, setN] = useState(0)
  return (
    <>
      <Seo title={t('counter.title')} description={t('counter.description')} />
      <h1>{t('counter.heading')}</h1>
      <p>{t('counter.clicks', { count: n })}</p>
      <button onClick={() => setN(n + 1)}>+1</button>
      <button onClick={() => setN(0)}>{t('counter.reset')}</button>
    </>
  )
}

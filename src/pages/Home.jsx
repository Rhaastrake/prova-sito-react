import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo.jsx'

export default function Home() {
  const { t } = useTranslation()
  return (
    <>
      <Seo title={t('home.title')} description={t('home.description')} />
      <h1>{t('home.heading', { name: 'mondo' })}</h1>
      <p>{t('home.text')}</p>
    </>
  )
}

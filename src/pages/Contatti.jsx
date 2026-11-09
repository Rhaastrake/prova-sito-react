import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Seo from '../components/Seo.jsx'

const ENDPOINT = 'https://example.com/api/culo'

export default function Contatti() {
  const { t } = useTranslation()
  const [status, setStatus] = useState('idle') // idle | sending | ok | error

  async function onSubmit(e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.target))
    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error(res.status)
      setStatus('ok')
      e.target.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Seo title={t('contact.title')} description={t('contact.description')} />
      <h1>{t('contact.heading')}</h1>
      <form onSubmit={onSubmit}>
        <label>
          {t('contact.name')}
          <input name="name" required />
        </label>
        <label>
          {t('contact.email')}
          <input name="email" type="email" required />
        </label>
        <label>
          {t('contact.message')}
          <textarea name="message" rows="4" required />
        </label>
        <button disabled={status === 'sending'}>
          {status === 'sending' ? t('contact.sending') : t('contact.send')}
        </button>
      </form>
      {status === 'ok' && <p>{t('contact.ok')}</p>}
      {status === 'error' && <p>{t('contact.error')}</p>}
    </>
  )
}

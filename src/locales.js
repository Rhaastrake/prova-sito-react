// Solo dati (niente codice browser): usato sia da i18n.js sia dallo script di prerender
export const resources = {
  it: {
    translation: {
      nav: { home: 'Home', counter: 'Contatore', contact: 'Contatti' },
      home: {
        title: 'Home',
        description: 'Pagina iniziale del sito di prova in React',
        heading: 'Ciao {{name}}!',
        text: 'Questa è la pagina Home di una finta app React.',
      },
      counter: {
        title: 'Contatore',
        description: 'Un semplice contatore con useState',
        heading: 'Contatore',
        clicks_one: 'Hai cliccato {{count}} volta',
        clicks_other: 'Hai cliccato {{count}} volte',
        reset: 'Reset',
      },
      contact: {
        title: 'Contatti',
        description: 'Scrivici con il form di contatto',
        heading: 'Contattaci',
        name: 'Nome',
        email: 'Email',
        message: 'Messaggio',
        send: 'Invia',
        sending: 'Invio in corso...',
        ok: 'Messaggio inviato!',
        error: 'Invio fallito, riprova.',
      },
    },
  },
  en: {
    translation: {
      nav: { home: 'Home', counter: 'Counter', contact: 'Contact' },
      home: {
        title: 'Home',
        description: 'Home page of the React test website',
        heading: 'Hello {{name}}!',
        text: 'This is the Home page of a fake React app.',
      },
      counter: {
        title: 'Counter',
        description: 'A simple counter built with useState',
        heading: 'Counter',
        clicks_one: 'You clicked {{count}} time',
        clicks_other: 'You clicked {{count}} times',
        reset: 'Reset',
      },
      contact: {
        title: 'Contact',
        description: 'Write to us with the contact form',
        heading: 'Contact us',
        name: 'Name',
        email: 'Email',
        message: 'Message',
        send: 'Send',
        sending: 'Sending...',
        ok: 'Message sent!',
        error: 'Sending failed, try again.',
      },
    },
  },
}

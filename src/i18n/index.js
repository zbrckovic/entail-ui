import { environment } from 'environment'
import { namespaces as en } from 'i18n/en'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const initI18n = async () =>
  await i18n.use(initReactI18next).init({
    resources: { en },
    debug: environment.development,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

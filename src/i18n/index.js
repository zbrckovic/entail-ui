import { environment } from 'environment'
import en from './en.json'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { defer } from 'rxjs'

export const initI18n = () => {
  return defer(() => {
    return i18n.use(initReactI18next).init({
      resources: {
        en: {
          translation: en
        }
      },
      debug: environment.development,
      lng: 'en',
      interpolation: {
        escapeValue: false
      }
    })
  })
}

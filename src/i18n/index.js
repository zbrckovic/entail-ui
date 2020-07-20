import { environment } from 'environment'
import { namespaces as en } from 'i18n/en'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { defer } from 'rxjs'

export const initI18n = defer(() =>
  i18n.use(initReactI18next).init({
    resources: { en },
    debug: environment.development,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  })
)

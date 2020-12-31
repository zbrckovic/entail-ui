import { useTranslation } from 'react-i18next'
import { Intent } from '@blueprintjs/core'

// Wraps formik and exposes some useful methods.
export const useFormikUtil = formik => {
  const { t } = useTranslation()

  const hasError = field => formik.touched[field] && formik.errors[field] !== undefined
  const getError = field => hasError(field) ? t(formik.errors[field]) : undefined
  const getIntent = field => hasError(field) ? Intent.DANGER : undefined

  return { hasError, getError, getIntent }
}

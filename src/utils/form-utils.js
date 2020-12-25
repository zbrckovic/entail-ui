import { Intent } from '@blueprintjs/core'

export const shouldShowErrorForField = (formik, field) =>
  formik.touched[field] && formik.errors[field] !== undefined

export const getErrorForField = (formik, field) =>
  shouldShowErrorForField(formik, field) ? formik.errors[field] : undefined

export const getIntentForField = (formik, field) =>
  shouldShowErrorForField(formik, field) ? Intent.DANGER : undefined

import { useFormik } from 'formik'
import validator from 'validator'
import { useTranslation } from 'react-i18next'
import style from './forgot-password-page-form.m.scss'
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { getErrorForField, getIntentForField } from 'utils/form-utils'
import { Link } from 'react-router-dom'
import { IconNames } from '@blueprintjs/icons'
import React from 'react'

export const ForgotPasswordPageForm = ({ isLoading, onSubmit }) => {
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: { email: '' },
    validate: ({ email }) => {
      const errors = {}

      if (!validator.isEmail(email)) {
        errors.email = t('forgotPasswordPage.emailNotValidMsg')
      }

      return errors
    },
    onSubmit: ({ email }) => { onSubmit(email) }
  })

  return <form
    className={style.root}
    onSubmit={formik.handleSubmit}
  >
    <FormGroup
      label={t('forgotPasswordPage.emailLbl')}
      labelFor='email'
      helperText={getErrorForField(formik, 'email')}
      disabled={isLoading}
      intent={getIntentForField(formik, 'email')}
    >
      <InputGroup
        id='email'
        name='email'
        type='text'
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        intent={getIntentForField(formik, 'email')}
      />
    </FormGroup>
    <Button
      loading={isLoading}
      type="submit"
      intent={Intent.PRIMARY}
      icon={IconNames.SEND_MESSAGE}
    >
      {t('forgotPasswordPage.sendRecoveryLinkLbl')}
    </Button>
    <div className={style.backToLoginContainer}>
      <Link to={'/login'}>
        {t('forgotPasswordPage.backToLoginLbl')}
      </Link>
    </div>
  </form>
}
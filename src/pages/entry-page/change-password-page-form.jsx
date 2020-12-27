import React from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import validator from 'validator'
import style from './change-password-page-form.m.scss'
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { getErrorForField, getIntentForField } from 'utils/form-utils'
import { Link } from 'react-router-dom'
import { IconNames } from '@blueprintjs/icons'

export const ChangePasswordPageForm = ({ isLoading, onSubmit }) => {
  const { t } = useTranslation('ChangePasswordPage')

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: ({ password }) => {
      const errors = {}

      if (validator.isEmpty(password)) {
        errors.password = t('message.passwordIsNotProvided')
      }

      return errors
    },
    onSubmit: ({ password }) => { onSubmit(password) }
  })

  return (
    <form
      className={style.root}
      onSubmit={formik.handleSubmit}
    >
      <FormGroup
        label={t('label.password')}
        labelFor='password'
        helperText={getErrorForField(formik, 'password')}
        intent={getIntentForField(formik, 'password')}
        disabled={isLoading}
      >
        <InputGroup
          id='password'
          name='password'
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          intent={getIntentForField(formik, 'password')}
        />
      </FormGroup>
      <Button
        loading={isLoading}
        type="submit"
        icon={IconNames.TICK_CIRCLE}
        intent={Intent.PRIMARY}
      >
        {t('button.submit')}
      </Button>
      <div className={style.backToLoginContainer}>
        <Link to={'/login'}>
          {t('link.backToLogin')}
        </Link>
      </div>
    </form>
  )
}

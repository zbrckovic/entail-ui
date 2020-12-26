import React from 'react'
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Link } from 'react-router-dom'
import style from './login-page-form.m.scss'
import { useTranslation } from 'react-i18next'
import validator from 'validator'
import { useFormik } from 'formik'
import { getErrorForField, getIntentForField } from 'utils/form-utils'

export const LoginPageForm = ({ onSubmit, isLoading }) => {
  const { t } = useTranslation('LoginPage')

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: ({ email, password }) => {
      const errors = {}

      if (!validator.isEmail(email)) {
        errors.email = t('message.emailIsNotValid')
      }

      if (validator.isEmpty(password)) {
        errors.password = t('message.passwordIsNotProvided')
      }

      return errors
    },
    onSubmit
  })

  return (
    <form
      className={style.root}
      onSubmit={formik.handleSubmit}
    >
      <FormGroup
        label={t('label.email')}
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
      <FormGroup
        className={style.passwordFormGroup}
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
      <div className={style.forgotPasswordContainer}>
        <Link to='/forgot-password'>
          {t('link.forgotPassword')}
        </Link>
      </div>
      <Button
        loading={isLoading}
        type="submit"
        icon={IconNames.LOG_IN}
        intent={Intent.PRIMARY}
      >
        {t('button.login')}
      </Button>
      <div className={style.dontHaveAnAccountYetContainer}>
        <Link to={'/register'}>
          {t('link.dontHaveAnAccountYet')}
        </Link>
      </div>
    </form>
  )
}

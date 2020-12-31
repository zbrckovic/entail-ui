import React from 'react'
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Link } from 'react-router-dom'
import style from './login-page-form.m.scss'
import { useTranslation } from 'react-i18next'
import validator from 'validator'
import { useFormik } from 'formik'
import { useFormikUtil } from '../../../utils/use-formik-util'

export const LoginPageForm = ({ onSubmit, isLoading }) => {
  const { t } = useTranslation()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validate: ({ email, password }) => {
      const errors = {}

      if (!validator.isEmail(email)) {
        errors.email = t('loginPage.emailNotValidMsg')
      }

      if (validator.isEmpty(password)) {
        errors.password = t('loginPage.passwordNotProvidedMsg')
      }

      return errors
    },
    onSubmit
  })

  const formikUtil = useFormikUtil(formik)

  return (
    <form
      className={style.root}
      onSubmit={formik.handleSubmit}
    >
      <FormGroup
        label={t('loginPage.emailLbl')}
        labelFor='email'
        helperText={formikUtil.getError('email')}
        disabled={isLoading}
        intent={formikUtil.getIntent('email')}
      >
        <InputGroup
          id='email'
          name='email'
          type='text'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          intent={formikUtil.getIntent('email')}
        />
      </FormGroup>
      <FormGroup
        className={style.passwordFormGroup}
        label={t('loginPage.passwordLbl')}
        labelFor='password'
        helperText={formikUtil.getError('password')}
        intent={formikUtil.getIntent('password')}
        disabled={isLoading}
      >
        <InputGroup
          id='password'
          name='password'
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          intent={formikUtil.getIntent('password')}
        />
      </FormGroup>
      <div className={style.forgotPasswordContainer}>
        <Link to='/forgot-password'>
          {t('loginPage.forgotPasswordLbl')}
        </Link>
      </div>
      <Button
        loading={isLoading}
        type="submit"
        icon={IconNames.LOG_IN}
        intent={Intent.PRIMARY}
      >
        {t('loginPage.loginLbl')}
      </Button>
      <div className={style.dontHaveAnAccountYetContainer}>
        <Link to={'/register'}>
          {t('loginPage.dontHaveAnAccountYet')}
        </Link>
      </div>
    </form>
  )
}

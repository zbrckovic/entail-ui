import React, { useRef } from 'react'
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Link } from 'react-router-dom'
import style from './register-page-form.m.scss'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import validator from 'validator'
import { PasswordStrengthIndicator } from 'components/password-strength-indicator'
import {
  calculatePasswordStrength,
  PASSWORD_STRENGTH_THRESHOLD_STRONG,
  PASSWORD_STRENGTH_THRESHOLD_WEAK
} from 'validators'
import { getErrorForField, getIntentForField } from 'utils/form-utils'

export const RegisterPageForm = ({ onSubmit, isLoading }) => {
  const { t } = useTranslation()

  const passwordStrength = useRef()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeatedPassword: ''
    },
    validate: ({ email, password, repeatedPassword }) => {
      const errors = {}

      if (!validator.isEmail(email)) {
        errors.email = t('registerPage.emailNotValidMsg')
      }

      if (validator.isEmpty(password)) {
        errors.password = t('registerPage.passwordNotProvidedMsg')
        passwordStrength.current = undefined
      } else {
        passwordStrength.current = calculatePasswordStrength(password)

        if (passwordStrength.current < PASSWORD_STRENGTH_THRESHOLD_WEAK) {
          errors.password = t('registerPage.passwordNotStrongEnoughMsg')
        } else {
          if (password !== repeatedPassword) {
            errors.repeatedPassword = t('registerPage.passwordsDontMatch')
          }
        }
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
        label={t('registerPage.emailLbl')}
        labelFor='email'
        intent={getIntentForField(formik, 'email')}
        helperText={getErrorForField(formik, 'email')}
        disabled={isLoading}
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
        className={style.passwordFormControl}
        label={t('registerPage.passwordLbl')}
        labelFor='password'
        intent={getIntentForField(formik, 'password')}
        helperText={getErrorForField(formik, 'password')}
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
      <FormGroup
        labelFor='repeatedPassword'
        intent={getIntentForField(formik, 'repeatedPassword')}
        helperText={getErrorForField(formik, 'repeatedPassword')}
        disabled={isLoading}
      >
        <InputGroup
          id='repeatedPassword'
          name='repeatedPassword'
          type='password'
          value={formik.values.repeatedPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={t('registerPage.repeatThePasswordMsg')}
          intent={getErrorForField(formik, 'repeatedPassword')}
        />
      </FormGroup>
      {passwordStrength.current !== undefined && (
        <PasswordStrengthIndicator
          className={style.passwordStrengthIndicator}
          strength={passwordStrength.current}
          weakThreshold={PASSWORD_STRENGTH_THRESHOLD_WEAK}
          strongThreshold={PASSWORD_STRENGTH_THRESHOLD_STRONG}
        />
      )}
      <Button
        loading={isLoading}
        type="submit"
        icon={IconNames.MANUALLY_ENTERED_DATA}
        intent={Intent.PRIMARY}
      >
        {t('registerPage.registerLbl')}
      </Button>
      <div className={style.alreadyHaveAnAccountContainer}>
        <Link to={'/login'}>
          {t('registerPage.alreadyHaveAnAccountMsg')}
        </Link>
      </div>
    </form>
  )
}

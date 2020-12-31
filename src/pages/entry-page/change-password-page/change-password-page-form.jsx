import React, { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import validator from 'validator'
import style from './change-password-page-form.m.scss'
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { Link } from 'react-router-dom'
import { IconNames } from '@blueprintjs/icons'
import {
  calculatePasswordStrength,
  PASSWORD_STRENGTH_THRESHOLD_STRONG,
  PASSWORD_STRENGTH_THRESHOLD_WEAK
} from 'validators'
import { PasswordStrengthIndicator } from '../../../components/password-strength-indicator'
import { useFormikUtil } from '../../../utils/use-formik-util'

export const ChangePasswordPageForm = ({ isLoading, onSubmit }) => {
  const { t } = useTranslation()

  const passwordStrength = useRef()

  const formik = useFormik({
    initialValues: {
      password: '',
      repeatedPassword: ''
    },
    validate: ({ password, repeatedPassword }) => {
      const errors = {}

      if (validator.isEmpty(password)) {
        errors.password = t('changePasswordPage.passwordNotProvidedMsg')
        passwordStrength.current = undefined
      } else {
        passwordStrength.current = calculatePasswordStrength(password)

        if (passwordStrength.current < PASSWORD_STRENGTH_THRESHOLD_WEAK) {
          errors.password = t('changePasswordPage.passwordNotStrongEnoughMsg')
        } else {
          if (password !== repeatedPassword) {
            errors.repeatedPassword = t('changePasswordPage.passwordsDontMatch')
          }
        }
      }

      return errors
    },
    onSubmit: ({ password }) => { onSubmit(password) }
  })

  const formikUtil = useFormikUtil(formik)

  return (
    <form
      className={style.root}
      onSubmit={formik.handleSubmit}
    >
      <FormGroup
        className={style.passwordFormControl}
        label={t('changePasswordPage.passwordLbl')}
        labelFor='password'
        intent={formikUtil.getIntent('password')}
        helperText={formikUtil.getError('password')}
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
      <FormGroup
        labelFor='repeatedPassword'
        intent={formikUtil.getIntent('repeatedPassword')}
        helperText={formikUtil.getError('repeatedPassword')}
        disabled={isLoading}
      >
        <InputGroup
          id='repeatedPassword'
          name='repeatedPassword'
          type='password'
          value={formik.values.repeatedPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={t('changePasswordPage.repeatThePasswordMsg')}
          intent={formikUtil.getIntent('repeatedPassword')}
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
        icon={IconNames.TICK_CIRCLE}
        intent={Intent.PRIMARY}
      >
        {t('submitLbl')}
      </Button>
      <div className={style.backToLoginContainer}>
        <Link to={'/login'}>
          {t('changePasswordPage.backToLoginLbl')}
        </Link>
      </div>
    </form>
  )
}

import React from 'react'
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Link } from 'react-router-dom'
import style from './register-page-form.m.scss'
import { useTranslation } from 'react-i18next'
import { useFormik } from 'formik'
import validator from 'validator'

export const RegisterPageForm = ({ onSubmit, isLoading }) => {
  const { t } = useTranslation('entryPage')

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeatedPassword: ''
    },
    validate: ({ email, password, repeatedPassword }) => {
      const errors = {}

      if (!validator.isEmail(email)) {
        errors.email = t('registerPage.message.emailIsNotValid')
      }

      if (validator.isEmpty(password)) {
        errors.password = t('registerPage.message.passwordIsNotProvided')
      } else {
        if (password !== repeatedPassword) {
          errors.repeatedPassword = t('registerPage.message.passwordsDontMatch')
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
        label={t('registerPage.label.email')}
        labelFor='email'
        helperText={formik.errors.email}
        disabled={isLoading}
        intent={formik.errors.email !== undefined ? Intent.DANGER : undefined}
      >
        <InputGroup
          id='email'
          name='email'
          type='text'
          value={formik.values.email}
          onChange={formik.handleChange}
          intent={formik.errors.email !== undefined ? Intent.DANGER : undefined}
        />
      </FormGroup>
      <FormGroup
        label={t('registerPage.label.password')}
        labelFor='password'
        helperText={formik.errors.password || formik.errors.repeatedPassword}
        disabled={isLoading}
        intent={
          formik.errors.password !== undefined || formik.errors.repeatedPassword !== undefined
            ? Intent.DANGER
            : undefined}
      >
        <InputGroup
          className={style.passwordInputGroup}
          id='password'
          name='password'
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          intent={formik.errors.password !== undefined ? Intent.DANGER : undefined}
        />
        <InputGroup
          id='repeatedPassword'
          name='repeatedPassword'
          type='password'
          value={formik.values.repeatedPassword}
          onChange={formik.handleChange}
          intent={formik.errors.repeatedPassword !== undefined ? Intent.DANGER : undefined}
        />
      </FormGroup>
      <Button
        loading={isLoading}
        type="submit"
        icon={IconNames.MANUALLY_ENTERED_DATA}
        intent={Intent.PRIMARY}
      >
        {t('registerPage.button.register')}
      </Button>
      <div className={style.alreadyHaveAnAccountContainer}>
        <Link to={'/login'}>
          {t('registerPage.link.alreadyHaveAnAccount')}
        </Link>
      </div>
    </form>
  )
}

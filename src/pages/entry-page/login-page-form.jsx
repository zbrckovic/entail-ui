import React, { useState } from 'react'
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Link } from 'react-router-dom'
import style from './login-page-form.m.scss'
import { useTranslation } from 'react-i18next'

export const LoginPageForm = ({ onSubmit, isLoading }) => {
  const [state, setState] = useState({ email: undefined, password: undefined })
  const { t } = useTranslation('entryPage')

  return (
    <form
      className={style.root}
      onSubmit={event => {
        event.preventDefault()
        onSubmit(state)
      }}
    >
      <FormGroup
        label={t('loginPage.label.email')}
        disabled={isLoading}
      >
        <InputGroup
          onChange={({ target: { value } }) => {
            setState({ ...state, email: value })
          }}
        />
      </FormGroup>
      <FormGroup
        className={style.passwordFormGroup}
        label={t('loginPage.label.password')}
        disabled={isLoading}
      >
        <InputGroup
          type="password"
          onChange={({ target: { value } }) => {
            setState({ ...state, password: value })
          }}
        />
      </FormGroup>
      <div className={style.forgotPasswordContainer}>
        <Link to='/forgot-password'>
          {t('loginPage.link.forgotPassword')}
        </Link>
      </div>
      <Button
        loading={isLoading}
        type="submit"
        icon={IconNames.LOG_IN}
        intent={Intent.PRIMARY}
      >
        {t('loginPage.button.login')}
      </Button>
      <div className={style.dontHaveAnAccountYetContainer}>
        <Link to={'/register'}>
          {t('loginPage.link.dontHaveAnAccountYet')}
        </Link>
      </div>
    </form>
  )
}

import React, { useState } from 'react'
import { Button, FormGroup, InputGroup, Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { Link } from 'react-router-dom'
import style from './register-page-form.m.scss'
import { useTranslation } from 'react-i18next'

export const RegisterPageForm = ({ onSubmit, isLoading }) => {
  const [state, setState] = useState({
    email: undefined,
    password: undefined,
    repeatedPassword: undefined
  })
  const { t } = useTranslation('entryPage')

  return (
    <form
      className={style.root}
      onSubmit={event => {
        event.preventDefault()
        const { email, password } = state
        onSubmit({ email, password })
      }}
    >
      <FormGroup
        label={t('registerPage.label.email')}
        disabled={isLoading}
      >
        <InputGroup
          onChange={({ target: { value } }) => {
            setState({ ...state, email: value })
          }}
        />
      </FormGroup>
      <FormGroup
        label={t('registerPage.label.password')}
        disabled={isLoading}
      >
        <InputGroup
          type="password"
          className={style.passwordInputGroup}
          onChange={({ target: { value } }) => {
            setState({ ...state, password: value })
          }}
        />
        <InputGroup
          type="password"
          placeholder={t('registerPage.placeholder.repeatYourPassword')}
          onChange={({ target: { value } }) => {
            setState({ ...state, password: value })
          }}
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

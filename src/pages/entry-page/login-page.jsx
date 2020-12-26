import React, { useContext, useEffect, useState } from 'react'
import { LoginPageForm } from './login-page-form'
import { withCancel } from 'utils/with-cancel'
import { Card, Intent } from '@blueprintjs/core'
import style from './login-page.m.scss'
import { useTranslation } from 'react-i18next'
import { ErrorName } from 'error'
import { toaster } from 'toaster'
import { IconNames } from '@blueprintjs/icons'
import { RootCtx } from 'contexts'
import { Redirect } from 'react-router-dom'

export const LoginPage = () => {
  const { t } = useTranslation('LoginPage')
  const { isLoggedIn, setIsLoggedIn, authenticationService } = useContext(RootCtx)
  const [loginParams, setLoginParams] = useState()
  const [isLoginInProgress, setIsLoginInProgress] = useState(false)

  useEffect(() => {
    if (loginParams === undefined) return

    setIsLoginInProgress(true)
    const [login, cancel] = withCancel(authenticationService.login(...loginParams))

    login.then(
      () => {
        setIsLoggedIn(true)
        setIsLoginInProgress(false)
      },
      ({ name }) => {
        if (name === ErrorName.INVALID_CREDENTIALS) {
          toaster.show({
            message: t('message.invalidCredentials'),
            intent: Intent.DANGER,
            icon: IconNames.WARNING_SIGN
          })
        }
        setIsLoginInProgress(false)
      }
    )

    return cancel
  }, [loginParams, t, setIsLoggedIn, authenticationService])

  if (isLoggedIn) return <Redirect to='/' />

  return <div className={style.root}>
    <Card className={style.card}>
      <h2 className={style.title}>{t('title')}</h2>
      <LoginPageForm
        onSubmit={payload => { setLoginParams([payload]) }}
        isLoading={isLoginInProgress}
      />
    </Card>
  </div>
}

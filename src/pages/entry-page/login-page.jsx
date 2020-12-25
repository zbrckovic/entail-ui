import React, { useContext, useEffect, useState } from 'react'
import { LoginPageForm } from './login-page-form'
import { withCancel } from 'utils/with-cancel'
import { authenticationService } from 'services/authentication-service'
import { Card, Intent } from '@blueprintjs/core'
import style from './login-page.m.scss'
import { useTranslation } from 'react-i18next'
import { ErrorName } from '../../error'
import { toaster } from '../../toaster'
import { IconNames } from '@blueprintjs/icons'
import { RootCtx } from '../../contexts'

export const LoginPage = () => {
  const { t } = useTranslation('entryPage')
  const { setIsLoggedIn } = useContext(RootCtx)

  const [loginParams, setLoginParams] = useState(undefined)
  const [isLoginInProgress, setIsLoginInProgress] = useState(false)

  useEffect(() => {
    if (loginParams === undefined) return

    setIsLoginInProgress(true)
    const [login, cancel] = withCancel(authenticationService.login(loginParams))

    login
      .then(
        () => { setIsLoggedIn(true) },
        ({ name }) => {
          if (name === ErrorName.INVALID_CREDENTIALS) {
            toaster.show({
              message: t('loginPage.message.invalidCredentials'),
              intent: Intent.DANGER,
              icon: IconNames.WARNING_SIGN
            })
          }
        }
      )
      .finally(() => { setIsLoginInProgress(false) })

    return cancel
  }, [loginParams, t, setIsLoggedIn])

  return <Card className={style.root}>
    <h2 className={style.title}>{t('loginPage.title')}</h2>
    <LoginPageForm onSubmit={setLoginParams} isLoading={isLoginInProgress} />
  </Card>
}

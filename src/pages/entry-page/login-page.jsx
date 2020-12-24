import React, { useEffect, useState } from 'react'
import { LoginPageForm } from './login-page-form'
import { withCancel } from 'utils/with-cancel'
import { authenticationService } from 'services/authentication-service'
import { Card } from '@blueprintjs/core'
import style from './login-page.m.scss'
import { useTranslation } from 'react-i18next'

export const LoginPage = () => {
  const { t } = useTranslation('entryPage')

  const [loginParams, setLoginParams] = useState(undefined)
  const [isLoginInProgress, setIsLoginInProgress] = useState(false)

  useEffect(() => {
    if (loginParams === undefined) return

    setIsLoginInProgress(true)
    const [login, cancel] = withCancel(authenticationService.login(loginParams))

    login
      .then(
        () => { console.log('success') },
        error => { console.log('error') }
      )
      .finally(() => { setIsLoginInProgress(false) })

    return cancel
  }, [loginParams])

  return <Card className={style.root}>
    <h2 className={style.title}>{t('loginPage.title')}</h2>
    <LoginPageForm onSubmit={setLoginParams} isLoading={isLoginInProgress} />
  </Card>
}

import React, { useContext, useEffect, useReducer, useState } from 'react'
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
  const { t } = useTranslation()
  const { isLoggedIn, setIsLoggedIn, authenticationService } = useContext(RootCtx)
  const [loginState, loginDispatch] = useReducer(loginStateReducer, loginStateInit)

  useEffect(() => {
    if (loginState.params === undefined) return

    loginDispatch({ type: 'start' })

    const [login, cancel] = withCancel(authenticationService.login(...loginState.params))

    login.then(
      () => {
        loginDispatch({ type: 'stop' })
        setIsLoggedIn(true)
      },
      ({ name }) => {
        if (name === ErrorName.INVALID_CREDENTIALS) {
          toaster.show({
            message: t('loginPage.invalidCredentialsMsg'),
            intent: Intent.DANGER,
            icon: IconNames.WARNING_SIGN
          })
        }
        loginDispatch({ type: 'stop' })
      }
    )

    return cancel
  }, [loginState.params, t, setIsLoggedIn, authenticationService])

  if (isLoggedIn) return <Redirect to='/' />

  return <div className={style.root}>
    <Card className={style.card}>
      <h2 className={style.title}>{t('loginPage.title')}</h2>
      <LoginPageForm
        onSubmit={credentials => {
          loginDispatch({ type: 'request', params: [credentials] })
        }}
        isLoading={loginState.inProgress}
      />
    </Card>
  </div>
}

const loginStateInit = {
  params: undefined,
  inProgress: false
}

const loginStateReducer = (state, action) => {
  switch (action.type) {
    case 'request':
      return { ...state, params: action.params }
    case 'start':
      return { ...state, inProgress: true }
    case 'stop':
      return { ...state, inProgress: false }
  }
}

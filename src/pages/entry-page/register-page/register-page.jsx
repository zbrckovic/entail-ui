import React, { useContext, useEffect, useReducer, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { withCancel } from 'utils/with-cancel'
import { Card, Intent } from '@blueprintjs/core'
import style from './register-page.m.scss'
import { RegisterPageForm } from './register-page-form'
import { ErrorName } from 'error'
import { toaster } from 'toaster'
import { IconNames } from '@blueprintjs/icons'
import { RootCtx } from 'contexts'
import { Redirect } from 'react-router-dom'

export const RegisterPage = () => {
  const { t } = useTranslation()
  const { isLoggedIn, setIsLoggedIn, authenticationService } = useContext(RootCtx)

  const [registerState, registerDispatch] = useReducer(registerStateReducer, registerStateInit)

  useEffect(() => {
    if (registerState.params === undefined) return

    registerDispatch({ type: 'start' })

    const [
      register,
      cancel
    ] = withCancel(authenticationService.register(...registerState.params))

    register.then(
      () => {
        registerDispatch({ type: 'stop' })
        setIsLoggedIn(true)
      },
      ({ name }) => {
        if (name === ErrorName.EMAIL_ALREADY_USED) {
          toaster.show({
            message: t('registerPage.emailAlreadyBeingUsedMsg'),
            intent: Intent.DANGER,
            icon: IconNames.WARNING_SIGN
          })
        }
        registerDispatch({ type: 'stop' })
      }
    )

    return cancel
  }, [registerDispatch, registerState.params, t, setIsLoggedIn, authenticationService])

  if (isLoggedIn) return <Redirect to='/' />

  return <div className={style.root}>
    <Card className={style.card}>
      <h2 className={style.title}>{t('registerPage.title')}</h2>
      <RegisterPageForm
        onSubmit={credentials => {
          registerDispatch({ type: 'request', params: [credentials] })
        }}
        isLoading={registerState.inProgress}
      />
    </Card>
  </div>
}

const registerStateInit = {
  params: undefined,
  inProgress: false
}

const registerStateReducer = (state, action) => {
  switch (action.type) {
    case 'request':
      return { ...state, params: action.params }
    case 'start':
      return { ...state, inProgress: true }
    case 'stop':
      return { ...state, inProgress: false }
  }
}

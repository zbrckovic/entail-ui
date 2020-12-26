import React, { useContext, useEffect, useState } from 'react'
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
  const { t } = useTranslation('RegisterPage')
  const { isLoggedIn, setIsLoggedIn, authenticationService } = useContext(RootCtx)
  const [registerParams, setRegisterParams] = useState()
  const [isRegisterInProgress, setIsRegisterInProgress] = useState(false)

  useEffect(() => {
    if (registerParams === undefined) return

    setIsRegisterInProgress(true)
    const [register, cancel] = withCancel(authenticationService.register(...registerParams))
    register.then(
      () => { setIsLoggedIn(true) },
      ({ name }) => {
        if (name === ErrorName.EMAIL_ALREADY_USED) {
          toaster.show({
            message: t('message.thisEmailIsAlreadyBeingUsed'),
            intent: Intent.DANGER,
            icon: IconNames.WARNING_SIGN
          })
        }
        setIsRegisterInProgress(false)
      },
      () => { setIsRegisterInProgress(false) }
    )

    return cancel
  }, [registerParams, t, setIsLoggedIn, authenticationService])

  if (isLoggedIn) return <Redirect to='/' />

  return <div className={style.root}>
    <Card className={style.card}>
      <h2 className={style.title}>{t('title')}</h2>
      <RegisterPageForm
        onSubmit={credentials => { setRegisterParams([credentials]) }}
        isLoading={isRegisterInProgress}
      />
    </Card>
  </div>
}

import React, { useContext, useEffect, useState } from 'react'
import { RootCtx } from 'contexts'
import { Redirect, useHistory } from 'react-router-dom'
import style from './forgot-password-page.m.scss'
import { Card, Intent } from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'
import { withCancel } from 'utils/with-cancel'
import { ForgotPasswordPageForm } from './forgot-password-page-form'
import { toaster } from '../../toaster'
import { IconNames } from '@blueprintjs/icons'

export const ForgotPasswordPage = () => {
  const { t } = useTranslation('ForgotPasswordPage')
  const { isLoggedIn, authenticationService } = useContext(RootCtx)
  const history = useHistory()

  const [requestPasswordChangeParams, setRequestPasswordChangeParams] = useState()
  const [isRequestPasswordChangeInProgress, setIsRequestPasswordChangeInProgress] = useState(false)

  useEffect(() => {
    if (requestPasswordChangeParams === undefined) return

    setIsRequestPasswordChangeInProgress(true)

    const [
      requestPasswordChange,
      cancel
    ] = withCancel(
      authenticationService.requestPasswordChange(...requestPasswordChangeParams)
    )

    requestPasswordChange.then(
      () => {
        toaster.show({
          icon: IconNames.INFO_SIGN,
          intent: Intent.PRIMARY,
          message: t('message.passwordChangeText')
        })
        history.replace('/login')
      },
      () => { setIsRequestPasswordChangeInProgress(false) }
    )

    return cancel
  }, [requestPasswordChangeParams, authenticationService, history, t])

  if (isLoggedIn) return <Redirect to='/' />

  return <div className={style.root}>
    <Card className={style.card}>
      <h2 className={style.title}>{t('title')}</h2>
      <p className={style.text}>{t('text')}</p>
      <ForgotPasswordPageForm
        onSubmit={email => setRequestPasswordChangeParams([email])}
        onBackToLogin={() => {
          history.replace('/login')
        }}
        isLoading={isRequestPasswordChangeInProgress}
      />
    </Card>
  </div>
}

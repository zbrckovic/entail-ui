import React, { useContext, useEffect, useState } from 'react'
import { RootCtx } from 'contexts'
import { Redirect, useHistory } from 'react-router-dom'
import style from './forgot-password-page.m.scss'
import { Card } from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'
import { authenticationService } from 'services/authentication-service'
import { withCancel } from 'utils/with-cancel'
import { ForgotPasswordPageForm } from './forgot-password-page-form'

export const ForgotPasswordPage = () => {
  const { isLoggedIn } = useContext(RootCtx)
  const { t } = useTranslation('ForgotPasswordPage')
  const [requestRecoveryParams, setRequestRecoveryParams] = useState()
  const [isSendingRecoveryLink, setIsSendingRecoveryLink] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (requestRecoveryParams === undefined) return

    const [
      requestPasswordChange,
      cancel
    ] = withCancel(authenticationService.requestPasswordChange(requestRecoveryParams.email))

    setIsSendingRecoveryLink(true)
    requestPasswordChange
      .then(() => { history.replace('/login') })
      .finally(() => { setIsSendingRecoveryLink(false) })

    return cancel
  }, [requestRecoveryParams, history])

  if (isLoggedIn) return <Redirect to='/' />

  return <div className={style.root}>
    <Card className={style.card}>
      <h2 className={style.title}>{t('title')}</h2>
      <p className={style.text}>{t('text')}</p>
      <ForgotPasswordPageForm
        onSubmit={setRequestRecoveryParams}
        onBackToLogin={() => {
          history.replace('/login')
        }}
        isLoading={isSendingRecoveryLink}
      />
    </Card>
  </div>
}

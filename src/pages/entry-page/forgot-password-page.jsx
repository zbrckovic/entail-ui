import React, { useContext, useEffect, useState } from 'react'
import { RootCtx } from 'contexts'
import { Redirect, useHistory } from 'react-router-dom'
import style from './forgot-password-page.m.scss'
import { Button, Card, Intent } from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'
import { IconNames } from '@blueprintjs/icons'
import { authenticationService } from 'services/authentication-service'
import { withCancel } from '../../utils/with-cancel'

export const ForgotPasswordPage = () => {
  const { isLoggedIn } = useContext(RootCtx)
  const { t } = useTranslation('ForgotPasswordPage')
  const [requestedRecoveryLink, setRequestedRecoveryLink] = useState(false)
  const [isSendingRecoveryLink, setIsSendingRecoveryLink] = useState(false)
  const history = useHistory()

  useEffect(() => {
    if (!requestedRecoveryLink) return

    const [
      requestPasswordChange,
      cancel
    ] = withCancel(authenticationService.requestPasswordChange())

    setIsSendingRecoveryLink(true)
    requestPasswordChange
      .then(() => { history.replace('/login') })
      .finally(() => { setIsSendingRecoveryLink(false) })

    return cancel
  }, [requestedRecoveryLink, history])

  if (isLoggedIn) return <Redirect to='/' />

  return <div className={style.root}>
    <Card className={style.card}>
      <h2 className={style.title}>{t('title')}</h2>
      <p>{t('text')}</p>
      <Button
        loading={isSendingRecoveryLink}
        intent={Intent.PRIMARY}
        icon={IconNames.SEND_MESSAGE}
        onClick={() => { setRequestedRecoveryLink(true) }}
      >
        {t('button.sendRecoveryLink')}
      </Button>
    </Card>
  </div>
}

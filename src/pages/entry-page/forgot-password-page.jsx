import React, { useContext } from 'react'
import { RootCtx } from '../../contexts'
import { Redirect } from 'react-router-dom'
import style from './forgot-password-page.m.scss'
import { Card } from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'

export const ForgotPasswordPage = () => {
  const { isLoggedIn } = useContext(RootCtx)
  const { t } = useTranslation('entryPage')

  if (isLoggedIn) return <Redirect to='/' />

  return <div className={style.root}>
    <Card className={style.card}>
      <h2 className={style.title}>{t('passwordRecovery')}</h2>
    </Card>
  </div>
}

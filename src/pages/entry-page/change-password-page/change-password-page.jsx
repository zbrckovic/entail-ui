import React, { useContext, useEffect, useState } from 'react'
import style from './change-password-page.m.scss'
import { useHistory, useParams } from 'react-router-dom'
import { toaster } from 'toaster'
import { IconNames } from '@blueprintjs/icons'
import { Card, Intent } from '@blueprintjs/core'
import { useTranslation } from 'react-i18next'
import { RootCtx } from 'contexts'
import { ChangePasswordPageForm } from './change-password-page-form'
import { ErrorName } from 'error'

export const ChangePasswordPage = () => {
  const { t } = useTranslation()
  const { token } = useParams()
  const { authenticationService } = useContext(RootCtx)
  const history = useHistory()

  const [changePasswordParams, setChangePasswordParams] = useState()
  const [isChangePasswordInProgress, setIsChangePasswordInProgress] = useState(false)

  useEffect(() => {
    if (changePasswordParams === undefined) return

    setIsChangePasswordInProgress(true)

    const subscription = authenticationService
      .changePasswordWithToken(...changePasswordParams)
      .subscribe({
        complete () {
          toaster.show({
            icon: IconNames.TICK_CIRCLE,
            intent: Intent.SUCCESS,
            message: t('changePasswordPage.successMsg')
          })
          history.replace('/login')
        },
        error ({ name }) {
          if (name === ErrorName.INVALID_CREDENTIALS) {
            toaster.show({
              message: t('changePasswordPage.emailNotValidMsg'),
              intent: Intent.DANGER,
              icon: IconNames.WARNING_SIGN
            })
            history.replace('/register')
          } else if (name === ErrorName.TOKEN_EXPIRED) {
            toaster.show({
              message: t('changePasswordPage.expiredLinkMsg'),
              intent: Intent.DANGER,
              icon: IconNames.WARNING_SIGN
            })
            history.replace('/login')
          } else {
            setIsChangePasswordInProgress(false)
          }
        }
      })

    return () => { subscription.unsubscribe() }
  }, [changePasswordParams, authenticationService, history, t])

  return <div className={style.root}>
    <Card className={style.card}>
      <h2 className={style.title}>{t('changePasswordPage.title')}</h2>
      <ChangePasswordPageForm
        isLoading={isChangePasswordInProgress}
        onSubmit={password => { setChangePasswordParams([{ password, token }]) }}
      />
    </Card>
  </div>
}

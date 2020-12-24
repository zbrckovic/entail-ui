import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { withCancel } from '../../misc'
import { authenticationService } from '../../infrastructure/authentication-service'
import { Card } from '@blueprintjs/core'
import style from './register-page.m.scss'
import { RegisterPageForm } from './register-page-form'

export const RegisterPage = () => {
  const { t } = useTranslation('entryPage')

  const [registerParams, setRegisterParams] = useState(undefined)
  const [isRegisterInProgress, setIsRegisterInProgress] = useState(false)

  useEffect(() => {
    if (registerParams === undefined) return

    setIsRegisterInProgress(true)
    const [register, cancel] = withCancel(authenticationService.register(registerParams))
    register.finally(() => { setIsRegisterInProgress(false) })

    return cancel
  }, [registerParams])

  return <Card className={style.root}>
    <h2 className={style.title}>{t('registerPage.title')}</h2>
    <RegisterPageForm onSubmit={setRegisterParams} isLoading={isRegisterInProgress} />
  </Card>
}

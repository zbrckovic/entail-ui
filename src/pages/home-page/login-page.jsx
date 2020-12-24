import React, { useEffect, useState } from 'react'
import { useRouteMatch } from 'react-router-dom'
import { LoginPageForm } from './login-page-form'
import { withCancel } from '../../misc'
import { authenticationService } from '../../infrastructure/authentication-service'
import { Card } from '@blueprintjs/core'
import style from './login-page.m.scss'

export const LoginPage = () => {
  const { path, url } = useRouteMatch()
  const [loginParams, setLoginParams] = useState(undefined)
  const [isLoginInProgress, setIsLoginInProgress] = useState(false)

  useEffect(() => {
    if (loginParams === undefined) return

    setIsLoginInProgress(true)
    const [login, cancel] = withCancel(authenticationService.login(loginParams))
    login.finally(() => { setIsLoginInProgress(false) })

    return cancel
  }, [loginParams])

  return <Card className={style.root}>
    <h2 className={style.title}>Login</h2>
    <LoginPageForm onSubmit={setLoginParams} isLoading={isLoginInProgress} />
  </Card>
}

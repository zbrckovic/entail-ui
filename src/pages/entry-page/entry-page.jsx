import { RegisterPage } from './register-page'
import React from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import { LoginPage } from './login-page'
import { HomePage } from 'pages/home-page'
import { ForgotPasswordPage } from './forgot-password-page'
import { ChangePasswordPage } from './change-password-page'

export const EntryPage = () => {
  let { path } = useRouteMatch()
  if (path.endsWith('/')) { path = path.slice(0, -1) }

  return <Switch>
    <Route exact path={`${path}/login`}>
      <LoginPage />
    </Route>
    <Route exact path={`${path}/register`}>
      <RegisterPage />
    </Route>
    <Route exact path={`${path}/forgot-password`}>
      <ForgotPasswordPage />
    </Route>
    <Route exact path={`${path}/change-password/:token`}>
      <ChangePasswordPage />
    </Route>
    <Route exact path={`${path}/`}>
      <HomePage />
    </Route>
    <Redirect to={`${path}/`} />
  </Switch>
}

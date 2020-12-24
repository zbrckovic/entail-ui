import { RegisterPage } from './register-page'
import React from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import { LoginPage } from './login-page'
import style from './entry-page.m.scss'

export const EntryPage = () => {
  let { path } = useRouteMatch()
  if (path.endsWith('/')) { path = path.slice(0, -1) }

  return <div className={style.root}>
    <Switch>
      <Route exact path={`${path}/login`}>
        <LoginPage />
      </Route>
      <Route exact path={`${path}/register`}>
        <RegisterPage />
      </Route>
      <Redirect to={`${path}/login`} />
    </Switch>
  </div>
}

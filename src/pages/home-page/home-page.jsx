import { RegisterPage } from './register-page'
import React from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import { LoginPage } from './login-page'
import style from './home-page.m.scss'

export const HomePage = () => {
  let { path, url } = useRouteMatch()
  if (url.endsWith('/')) { url = url.slice(0, -1) }
  if (path.endsWith('/')) { path = path.slice(0, -1) }

  return <div className={style.root}>
    <Switch>
      <Route path={`${path}/login`}>
        <LoginPage />
      </Route>
      <Route path={`${path}/register`}>
        <RegisterPage />
      </Route>
      <Redirect to={`${path}/login`} />
    </Switch>
  </div>
}

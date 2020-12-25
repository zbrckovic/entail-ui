import { RegisterPage } from './register-page'
import React, { useContext } from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'
import { LoginPage } from './login-page'
import style from './entry-page.m.scss'
import { RootCtx } from '../../contexts'

export const EntryPage = () => {
  const { isLoggedIn } = useContext(RootCtx)
  let { path } = useRouteMatch()
  if (path.endsWith('/')) { path = path.slice(0, -1) }

  console.log(isLoggedIn)

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

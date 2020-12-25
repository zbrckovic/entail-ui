import { RegisterPage } from './register-page'
import React, { useContext, useEffect } from 'react'
import { Redirect, Route, Switch, useRouteMatch, useHistory } from 'react-router-dom'
import { LoginPage } from './login-page'
import style from './entry-page.m.scss'
import { RootCtx } from '../../contexts'
import { HomePage } from '../home-page'

export const EntryPage = () => {
  const { isLoggedIn } = useContext(RootCtx)
  let { path } = useRouteMatch()
  if (path.endsWith('/')) { path = path.slice(0, -1) }
  const history = useHistory()

  useEffect(() => {
    if (isLoggedIn) {
      history.replace('/')
    } else {
      history.replace('/login')
    }
  }, [history, isLoggedIn])

  return <div className={style.root}>
    <Switch>
      <Route exact path={`${path}/login`}>
        <LoginPage />
      </Route>
      <Route exact path={`${path}/register`}>
        <RegisterPage />
      </Route>
      <Route>
        <HomePage />
      </Route>
      <Redirect to={`${path}/`} />
    </Switch>
  </div>
}

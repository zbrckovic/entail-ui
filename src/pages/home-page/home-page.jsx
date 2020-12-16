import { Login } from './login'
import { Register } from './register'
import React, { useContext, useEffect, useState } from 'react'
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom'
import { RootCtx } from '../../contexts'
import { ActivityStatus } from '../../misc/activity-status'

export const HomePage = () => {
  const { authenticationService } = useContext(RootCtx)

  const { path, url } = useRouteMatch()

  const [loginState, setLoginState] = useState({
    credentials: undefined,
    status: undefined
  })

  useEffect(() => {
    if (loginState.status !== ActivityStatus.InProgress) return

    const { username, password } = loginState.credentials

    const subscription = authenticationService
      .login(username, password)
      .subscribe({
        complete() {
          setLoginState({ status: ActivityStatus.Succeeded })
        },
        error() {
          setLoginState({ status: ActivityStatus.Failed })
        }
      })

    return () => { subscription.unsubscribe() }
  }, [loginState, authenticationService])

  console.log(loginState)

  return <>
    <Link to={`${url}login`}>Login</Link>
    <Link to={`${url}register`}>Register</Link>
    <Switch>
      <Route path={`${path}login`}>
        <Login
          onSubmit={credentials => {
            setLoginState({ credentials, status: ActivityStatus.InProgress })
          }}
        />
      </Route>
      <Route path={`${path}register`}>
        <Register />
      </Route>
    </Switch>
  </>
}

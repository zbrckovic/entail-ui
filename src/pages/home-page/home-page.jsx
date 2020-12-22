import { Login } from './login'
import { Register } from './register'
import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import { ActivityStatus } from '../../misc/activity-status'
import { authenticationService } from '../../infrastructure/authentication-service'

export const HomePage = () => {
  const { path, url } = useRouteMatch()

  const [loginState, setLoginState] = useState({
    credentials: undefined,
    status: undefined
  })

  useEffect(() => {
    if (loginState.status !== ActivityStatus.InProgress) return

    const { email, password } = loginState.credentials

    const subscription = authenticationService
      .login(email, password)
      .subscribe({
        complete () {
          setLoginState({ credentials: undefined, status: ActivityStatus.Succeeded })
        },
        error () {
          setLoginState({ credentials: undefined, status: ActivityStatus.Failed })
        }
      })

    return () => { subscription.unsubscribe() }
  }, [loginState])

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

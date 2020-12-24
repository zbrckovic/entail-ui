import { Login } from './login'
import { Register } from './register'
import React, { useEffect, useState } from 'react'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import { authenticationService } from '../../infrastructure/authentication-service'

export const HomePage = () => {
  const { path, url } = useRouteMatch()

  const [loginParams, setLoginParams] = useState(undefined)
  const [loginInProgress, setLoginInProgress] = useState(false)

  useEffect(() => {
    if (loginParams === undefined) return
    let isActive = true

    ;(async () => {
      try {
        setLoginInProgress(true)
        await authenticationService.login(loginParams)
      } finally {
        if (isActive) {
          setLoginInProgress(false)
        }
      }
    })()

    return () => { isActive = false }
  }, [loginParams])

  return <>
    <Link to={`${url}login`}>Login</Link>
    <Link to={`${url}register`}>Register</Link>
    <Switch>
      <Route path={`${path}login`}>
        <Login onSubmit={setLoginParams} isLoading={loginInProgress} />
      </Route>
      <Route path={`${path}register`}>
        <Register />
      </Route>
    </Switch>
  </>
}

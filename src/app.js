import { RootCtx } from 'contexts'
import React, { useContext } from 'react'
import style from './app.m.scss'
import classNames from 'classnames'
import { Spinner } from '@blueprintjs/core'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { HomePage } from './pages/home-page'

export const App = ({ className }) => {
  const { isInitializing } = useContext(RootCtx)

  if (isInitializing) {
    return <div className={classNames(style.loadingContainer, className)}>
      <Spinner />
    </div>
  }

  return <BrowserRouter>
    <Switch>
      <Route path="/">
        <HomePage />
      </Route>
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
}

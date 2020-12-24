import { RootCtx } from 'contexts'
import { ActivityStatus } from 'misc/activity-status'
import React, { useContext } from 'react'
import { Routes } from 'Routes'
import style from './app.m.scss'
import classNames from 'classnames'
import { Spinner } from '@blueprintjs/core'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { HomePage } from './pages/home-page'

export const App = ({ className }) => {
  const { initializationStatus } = useContext(RootCtx)
  const loading = initializationStatus === ActivityStatus.InProgress

  if (loading) {
    return (
      <div className={classNames(style.root, className)}>
        <Spinner />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <HomePage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

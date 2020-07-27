import { Classes, Spinner } from '@blueprintjs/core'
import React, { useContext } from 'react'
import { RootCtx } from 'contexts'
import { Routes } from 'routes'
import { ActivityStatus } from 'misc'
import classNames from 'classnames'
import 'common-style.scss'
import style from './app.module.scss'

export const App = () => {
  const { initializationStatus, themeDark } = useContext(RootCtx)
  const loading = initializationStatus === ActivityStatus.InProgress

  return (
    <div className={
      classNames(style.main, {
        [style.loading]: loading,
        [Classes.DARK]: themeDark,
        [style.dark]: themeDark,
      })
    }>
      {loading ? <Spinner/> : <Routes/>}
    </div>
  )
}

import { Spinner } from '@blueprintjs/core'
import classNames from 'classnames'
import 'common-style.scss'
import { RootCtx } from 'contexts'
import { ActivityStatus } from 'misc'
import React, { useContext } from 'react'
import { Routes } from 'routes'
import style from './app.module.scss'

export const App = () => {
  const { initializationStatus } = useContext(RootCtx)
  const loading = initializationStatus === ActivityStatus.InProgress

  return (
    <div className={classNames(style.main, { [style.loading]: loading })}>
      {loading ? <Spinner/> : <Routes/>}
    </div>
  )
}

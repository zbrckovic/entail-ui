import classNames from 'classnames'
import { RootCtx } from 'contexts'
import { environment } from 'environment'
import { initI18n } from 'i18n'
import { ActivityStatus } from 'misc'
import React, { useEffect, useState } from 'react'
import 'styles/main/index.scss'
import style from './root-wrapper.module.scss'

export const RootWrapper = ({ children }) => {
  const [initializationStatus, setInitializationStatus] = useState(ActivityStatus.InProgress)
  const [themeDark, setThemeDark] = useState(false)

  useEffect(() => {
    const subscription = initI18n.subscribe({
      complete () { setInitializationStatus(ActivityStatus.Succeeded) }
    })

    return () => { subscription.unsubscribe() }
  }, [])

  return (
    <RootCtx.Provider value={{ environment, initializationStatus, themeDark, setThemeDark }}>
      <div className={classNames(
        style.container,
        { [style.dark]: themeDark }
      )}
      >
        {children}
      </div>
    </RootCtx.Provider>
  )
}

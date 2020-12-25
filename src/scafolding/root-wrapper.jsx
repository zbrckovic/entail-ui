import { RootCtx } from 'contexts'
import cytoscape from 'cytoscape'
import klay from 'cytoscape-klay'
import { environment } from 'environment'
import { initI18n } from 'i18n'
import React, { useEffect, useState } from 'react'
import 'style/main.scss'
import { Classes, Spinner } from '@blueprintjs/core'
import style from './root-wrapper.m.scss'
import { withCancel } from 'utils/with-cancel'
import { ApiTokenRefreshService } from '../services/api-token-refresh-service'
import classNames from 'classnames'

// Add layout algorithm to cytoscape.
cytoscape.use(klay)

// Provides context necessary for both application and stories
export const RootWrapper = ({ children, className, ...props }) => {
  const [i18nIsInitializing, setI18nIsInitializing] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState()
  const [isThemeDark, setIsThemeDark] = useState(false)
  const [apiTokenRefreshService] = useState(() => {
    if (environment.storybook) return undefined

    return ApiTokenRefreshService(
      () => {
        if (isLoggedIn === undefined || !isLoggedIn) {
          setIsLoggedIn(true)
        }
      },
      () => { setIsLoggedIn(false) }
    )
  })

  useEffect(() => {
    const [init, cancel] = withCancel(initI18n())
    init.finally(() => { setI18nIsInitializing(false) })
    return cancel
  }, [])

  useEffect(() => {
    if (apiTokenRefreshService === undefined) return
    if (isLoggedIn === true) return
    apiTokenRefreshService.start()
    return () => { apiTokenRefreshService.stop() }
  }, [apiTokenRefreshService, isLoggedIn])

  const isInitializing = i18nIsInitializing || (!environment.storybook && isLoggedIn === undefined)

  if (isInitializing) {
    return <div className={classNames(style.loadingContainer, className)}>
      <Spinner />
    </div>
  }

  return <>
    <RootCtx.Provider value={{
      environment,
      theme: {
        isDark: isThemeDark,
        setIsDark: setIsThemeDark
      },
      isLoggedIn,
      setIsLoggedIn: isLoggedIn => { setIsLoggedIn(isLoggedIn) }
    }}>
      <div
        className={classNames(
          style.root,
          { [Classes.DARK]: isThemeDark, [style.dark]: isThemeDark },
          className
        )}
        {...props}
      >
        {children}
      </div>
    </RootCtx.Provider>
  </>
}

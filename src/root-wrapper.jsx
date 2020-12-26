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
import { startRefreshingToken } from './services/api-token-refresh'
import classNames from 'classnames'
import { ApiService } from './services/api-service'
import { AuthenticationService } from './services/authentication-service'

// Add layout algorithm to cytoscape.
cytoscape.use(klay)

// Provides context necessary for both application and stories
export const RootWrapper = ({ children, className, ...props }) => {
  const [i18nIsInitializing, setI18nIsInitializing] = useState(true)
  const [isThemeDark, setIsThemeDark] = useState(false)
  const [authenticationService, setAuthenticationService] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(undefined)

  // Initialize i18n on start
  useEffect(() => {
    const [init, cancel] = withCancel(initI18n())
    init
      .then(t => {
        const apiService = ApiService({ t })
        const authenticationService = AuthenticationService({ apiService })
        setAuthenticationService(authenticationService)
      })
      .finally(() => {
        setI18nIsInitializing(false)
      })
    return cancel
  }, [])

  // Refresh api token on start (if not storybook)
  useEffect(() => {
    if (authenticationService === undefined) return
    const [refreshApiToken, cancel] = withCancel(authenticationService.refreshApiToken())
    refreshApiToken.then(
      () => {
        setIsLoggedIn(true)
      },
      () => {
        setIsLoggedIn(false)
      }
    )

    return cancel
  }, [authenticationService])

  useEffect(() => {
    if (isLoggedIn) {
      return startRefreshingToken(authenticationService, () => { setIsLoggedIn(false) })
    }
  }, [authenticationService, isLoggedIn])

  const isInitializing = i18nIsInitializing || isLoggedIn === undefined

  if (isInitializing) {
    return <div className={classNames(style.root, style.loading, className)}>
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
      authenticationService,
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

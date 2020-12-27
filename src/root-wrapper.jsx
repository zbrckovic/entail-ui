import { RootCtx } from 'contexts'
import cytoscape from 'cytoscape'
import klay from 'cytoscape-klay'
import { environment } from 'environment'
import { initI18n } from 'i18n'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
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
  const [accountState, accountStateDispatch] = useReducer(accountStateReducer, accountStateInit)
  const login = useCallback(user => { accountStateDispatch({ type: 'login', user }) }, [])
  const logout = useCallback(() => { accountStateDispatch({ type: 'logout' }) }, [])

  // Initialize i18n on start
  useEffect(() => {
    const [init, cancel] = withCancel(initI18n())
    init
      .then(
        t => {
          const apiService = ApiService({ t })
          const authenticationService = AuthenticationService({ apiService })
          setAuthenticationService(authenticationService)
          setI18nIsInitializing(false)
        },
        () => { setI18nIsInitializing(false) }
      )
    return cancel
  }, [])

  // Refresh api token on start (if not storybook)
  useEffect(() => {
    if (authenticationService === undefined) return
    const [refreshApiToken, cancel] = withCancel(authenticationService.refreshApiToken())
    refreshApiToken.then(login, logout)
    return cancel
  }, [login, logout, authenticationService])

  useEffect(() => {
    if (accountState.loggedIn) {
      return startRefreshingToken(authenticationService, logout)
    }
  }, [authenticationService, accountState.loggedIn, logout])

  const initializing = i18nIsInitializing || accountState.loggedIn === undefined

  if (initializing) {
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
      loggedIn: accountState.loggedIn,
      login,
      logout,
      user: accountState.user
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

const accountStateInit = {
  loggedIn: undefined,
  user: undefined
}
const accountStateReducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { loggedIn: true, user: action.user }
    case 'logout':
      return { loggedIn: false, user: undefined }
  }
}

import { RootCtx } from 'contexts'
import cytoscape from 'cytoscape'
import klay from 'cytoscape-klay'
import { environment } from 'environment'
import { initI18n } from 'i18n'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import 'style/main.scss'
import { Classes, Spinner } from '@blueprintjs/core'
import style from './root-wrapper.m.scss'
import { startRefreshingToken } from './services/api-token-refresh'
import classNames from 'classnames'
import { ApiService } from './services/api-service'
import { AuthenticationService } from './services/authentication-service'
import { UsersService } from './services/users-service'
import { ProjectsService } from './services/projects-service'

// Add layout algorithm to cytoscape.
cytoscape.use(klay)

// Provides context necessary for both application and stories
export const RootWrapper = ({ children, className, ...props }) => {
  const [i18nIsInitializing, setI18nIsInitializing] = useState(true)
  const [isThemeDark, setIsThemeDark] = useState(false)

  const [services, setServices] = useState()

  const [accountState, accountStateDispatch] = useReducer(accountStateReducer, accountStateInit)
  const login = useCallback(user => { accountStateDispatch({ type: 'login', user }) }, [])
  const logout = useCallback(() => { accountStateDispatch({ type: 'logout' }) }, [])

  // Initialize i18n on start
  useEffect(() => {
    const subscription = initI18n().subscribe({
      next (t) {
        const apiService = ApiService({ t })
        const authenticationService = AuthenticationService({ apiService })
        const usersService = UsersService({ apiService })
        const projectsService = ProjectsService({ apiService })

        setServices({ authenticationService, usersService, projectsService })

        setI18nIsInitializing(false)
      },
      error () {
        setI18nIsInitializing(false)
      }
    })

    return () => { subscription.unsubscribe() }
  }, [])

  // Get user and api token on start (when authentication service is available)
  useEffect(() => {
    if (services === undefined) return

    const subscription = services.authenticationService.getUserAndApiToken().subscribe({
      next (user) { login(user) },
      error () { logout() }
    })

    return () => { subscription.unsubscribe() }
  }, [login, logout, services])

  // Start refreshing api token when logged in
  useEffect(() => {
    if (accountState.loggedIn) {
      return startRefreshingToken(services.authenticationService, logout)
    }
  }, [services, accountState.loggedIn, logout])

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
      loggedIn: accountState.loggedIn,
      login,
      logout,
      user: accountState.user,
      ...services
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

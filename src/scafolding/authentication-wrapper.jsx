import React, { useContext, useEffect, useState } from 'react'
import { RootCtx } from 'contexts'
import { ApiTokenRefreshService } from '../services/api-token-refresh-service'

export const AuthenticationWrapper = ({ children }) => {
  const rootCtx = useContext(RootCtx)
  const [isLoggedIn, setIsLoggedIn] = useState()

  const [apiTokenRefreshService] = useState(() =>
    ApiTokenRefreshService(
      () => {
        if (isLoggedIn === undefined || !isLoggedIn) {
          setIsLoggedIn(true)
        }
      },
      () => { setIsLoggedIn(false) }
    )
  )

  useEffect(() => {
    if (isLoggedIn === undefined || isLoggedIn) {
      apiTokenRefreshService.start()
    }
    return () => { apiTokenRefreshService.stop() }
  }, [apiTokenRefreshService, isLoggedIn])

  return <RootCtx.Provider
    value={{
      ...rootCtx,
      isInitializing: rootCtx.isInitializing || isLoggedIn === undefined,
      isLoggedIn,
      setIsLoggedIn: isLoggedIn => { setIsLoggedIn(isLoggedIn) }
    }}
  >
    {children}
  </RootCtx.Provider>
}

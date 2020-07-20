import { environment } from 'environment'
import React, { useEffect, useState } from 'react'
import { RootCtx } from 'contexts/root-ctx'
import { initI18n } from 'i18n'

export const RootWrapper = ({ children }) => {
  const [{ initialized, initializing }, setState] = useState({
    initialized: false,
    initializing: false
  })

  useEffect(() => {
    setState({ initialized: false, initializing: true })

    const subscription = initI18n.subscribe({
      complete() { setState({ initialized: true, initializing: false }) }
    })

    return () => { subscription.unsubscribe() }
  }, [])

  const showLoading = !initialized || initializing

  return (
    showLoading
      ? <label>Loading...</label>
      : (
        <RootCtx.Provider value={{ environment }}>
          {children}
        </RootCtx.Provider>
      )
  )
}

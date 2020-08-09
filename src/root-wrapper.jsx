import { RootCtx } from 'contexts'
import { environment } from 'environment'
import { initI18n } from 'i18n'
import { ActivityStatus } from 'misc'
import React, { useEffect, useState } from 'react'
import { GlobalStyle } from 'style/global-style'

export const RootWrapper = ({ children }) => {
  const [initializationStatus, setInitializationStatus] = useState(ActivityStatus.InProgress)

  useEffect(() => {
    const subscription = initI18n.subscribe({
      complete () { setInitializationStatus(ActivityStatus.Succeeded) }
    })

    return () => { subscription.unsubscribe() }
  }, [])

  return <>
    <GlobalStyle/>
    <RootCtx.Provider value={{ environment, initializationStatus }}>
      {children}
    </RootCtx.Provider>
  </>
}

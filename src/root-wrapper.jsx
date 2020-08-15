import { RootCtx } from 'contexts'
import { environment } from 'environment'
import { initI18n } from 'i18n'
import { ActivityStatus } from 'misc'
import React, { useEffect, useState } from 'react'
import { theme } from 'style/theme'
import { ThemeProvider } from 'emotion-theming'
import { Global } from '@emotion/core'
import { globalStyle } from './style/global-style'

export const RootWrapper = ({ children }) => {
  const [initializationStatus, setInitializationStatus] = useState(ActivityStatus.InProgress)

  useEffect(() => {
    const subscription = initI18n.subscribe({
      complete () { setInitializationStatus(ActivityStatus.Succeeded) }
    })

    return () => { subscription.unsubscribe() }
  }, [])

  return <>
    <Global styles={globalStyle}/>
    <RootCtx.Provider value={{ environment, initializationStatus }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </RootCtx.Provider>
  </>
}

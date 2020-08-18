import { Global } from '@emotion/core'
import { RootCtx } from 'contexts'
import { ThemeProvider } from 'emotion-theming'
import { environment } from 'environment'
import { initI18n } from 'i18n'
import { ActivityStatus } from 'misc/activity-status'
import React, { useEffect, useState } from 'react'
import { globalStyle } from 'style/global-style'
import { theme } from 'style/theme'
import { Box } from 'rebass'

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
    <RootCtx.Provider
      value={{
        environment,
        initializationStatus
      }}
    >
      <ThemeProvider theme={theme}>
        <Box fontSize='normal'>
          {children}
        </Box>
      </ThemeProvider>
    </RootCtx.Provider>
  </>
}

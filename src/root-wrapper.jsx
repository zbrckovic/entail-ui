import { Global } from '@emotion/core'
import { RootCtx } from 'contexts'
import cytoscape from 'cytoscape'
import klay from 'cytoscape-klay'
import { ThemeProvider } from 'emotion-theming'
import { environment } from 'environment'
import { initI18n } from 'i18n'
import { ActivityStatus } from 'misc/activity-status'
import React, { useEffect, useState } from 'react'
import { Box } from 'rebass'
import { globalStyle } from 'style/global-style'
import { theme } from 'style/theme'

cytoscape.use(klay)

export const RootWrapper = ({ children }) => {
  const [initializationStatus, setInitializationStatus] = useState(ActivityStatus.InProgress)

  useEffect(() => {
    const subscription = initI18n.subscribe({
      complete () { setInitializationStatus(ActivityStatus.Succeeded) }
    })

    return () => { subscription.unsubscribe() }
  }, [])

  return <>
    <Global styles={globalStyle} />
    <RootCtx.Provider
      value={{
        environment,
        initializationStatus
      }}
    >
      <ThemeProvider theme={theme}>
        <Box fontSize='normal' height='100%' width='100%'>
          {children}
        </Box>
      </ThemeProvider>
    </RootCtx.Provider>
  </>
}

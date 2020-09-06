import { ThemeProvider } from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { RootCtx } from 'contexts'
import cytoscape from 'cytoscape'
import klay from 'cytoscape-klay'
import { environment } from 'environment'
import { initI18n } from 'i18n'
import { ActivityStatus } from 'misc/activity-status'
import React, { useEffect, useState } from 'react'
import { theme } from 'style/theme'
import Box from '@material-ui/core/Box'

// add layout algorithm to cytoscape
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
    <RootCtx.Provider value={{ environment, initializationStatus }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box>
          {children}
        </Box>
      </ThemeProvider>
    </RootCtx.Provider>
  </>
}

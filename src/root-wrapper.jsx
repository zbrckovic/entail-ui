import { RootCtx } from 'contexts'
import { environment } from 'environment'
import { Grommet } from 'grommet'
import { initI18n } from 'i18n'
import { ActivityStatus } from 'misc'
import React, { useEffect, useState } from 'react'
import 'styles/main/index.scss'

const theme = {
  global: {
    font: {
      family: 'Overpass',
      size: '14px',
      height: '20px'
    }
  }
}

export const RootWrapper = ({ children }) => {
  const [initializationStatus, setInitializationStatus] = useState(ActivityStatus.InProgress)

  useEffect(() => {
    const subscription = initI18n.subscribe({
      complete () { setInitializationStatus(ActivityStatus.Succeeded) }
    })

    return () => { subscription.unsubscribe() }
  }, [])

  return (
    <Grommet theme={theme} full>
      <RootCtx.Provider value={{ environment, initializationStatus }}>
        {children}
      </RootCtx.Provider>
    </Grommet>
  )
}

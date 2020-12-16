import { RootCtx } from 'contexts'
import cytoscape from 'cytoscape'
import klay from 'cytoscape-klay'
import { environment } from 'environment'
import { initI18n } from 'i18n'
import { ActivityStatus } from 'misc/activity-status'
import React, { useEffect, useState } from 'react'
import 'style/main.scss'
import { Classes } from '@blueprintjs/core'
import style from './root-wrapper.m.scss'
import classnames from 'classnames'
import { ApiService } from './infrastructure/api-service'
import { AuthenticationService } from './services/authentication-service'

const apiService = ApiService({ apiUrl: environment.apiUrl })
const authenticationService = AuthenticationService({ apiService })

// Add layout algorithm to cytoscape.
cytoscape.use(klay)

export const RootWrapper = ({ children, className, ...props }) => {
  const [initializationStatus, setInitializationStatus] = useState(ActivityStatus.InProgress)

  const [isThemeDark, setIsThemeDark] = useState(false)

  useEffect(() => {
    const subscription = initI18n.subscribe({
      complete() { setInitializationStatus(ActivityStatus.Succeeded) }
    })

    return () => { subscription.unsubscribe() }
  }, [])

  return <>
    <RootCtx.Provider value={{
      environment,
      initializationStatus,
      theme: {
        isDark: isThemeDark,
        setIsDark: setIsThemeDark
      },
      authenticationService
    }}>
      <div
        className={classnames(
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

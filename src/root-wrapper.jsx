import { Classes, Spinner } from '@blueprintjs/core'
import classNames from 'classnames'
import { RootCtx } from 'contexts'
import cytoscape from 'cytoscape'
import klay from 'cytoscape-klay'
import { environment } from 'environment'
import { initI18n } from 'i18n'
import React, { useEffect, useState } from 'react'
import { ApiService } from 'services/api-service'
import { ProjectsService } from 'services/projects-service'
import 'style/main.scss'
import style from './root-wrapper.m.scss'

// Add layout algorithm to cytoscape.
cytoscape.use(klay)

export const RootWrapper = ({ children, className, ...props }) => {
  const [initializing, setInitializing] = useState(true)
  const [isThemeDark, setIsThemeDark] = useState(false)
  const [services, setServices] = useState()

  // Initialize i18n on start
  useEffect(() => {
    const subscription = initI18n().subscribe(() => {
      const apiService = ApiService()
      const projectsService = ProjectsService({ apiService })

      setServices({ projectsService })

      setInitializing(false)
    })

    return () => { subscription.unsubscribe() }
  }, [])

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

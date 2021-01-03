import { RootCtx } from 'contexts'
import cytoscape from 'cytoscape'
import klay from 'cytoscape-klay'
import { environment } from 'environment'
import { initI18n } from 'i18n'
import React, { useEffect, useState } from 'react'
import 'style/main.scss'
import { Classes } from '@blueprintjs/core'
import style from './storybook-root-wrapper.m.scss'
import classNames from 'classnames'

// Add layout algorithm to cytoscape.
cytoscape.use(klay)

// Provides context necessary for both application and stories
export const StorybookRootWrapper = ({ children, className, ...props }) => {
  const [i18nIsInitializing, setI18nIsInitializing] = useState(true)
  const [isThemeDark, setIsThemeDark] = useState(false)

  // Initialize i18n on start
  useEffect(() => {
    console.log('start')
    const subscription = initI18n().subscribe({
      complete () { setI18nIsInitializing(false) },
      error () { setI18nIsInitializing(false) }
    })

    return () => { subscription.unsubscribe() }
  }, [])

  if (i18nIsInitializing) return null

  return <>
    <RootCtx.Provider value={{
      environment,
      theme: {
        isDark: isThemeDark,
        setIsDark: setIsThemeDark
      }
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

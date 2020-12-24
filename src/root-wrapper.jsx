import { RootCtx } from 'contexts'
import cytoscape from 'cytoscape'
import klay from 'cytoscape-klay'
import { environment } from 'environment'
import { initI18n } from 'i18n'
import React, { useEffect, useState } from 'react'
import 'style/main.scss'
import { Classes } from '@blueprintjs/core'
import style from './root-wrapper.m.scss'
import classnames from 'classnames'
import { withCancel } from 'utils/with-cancel'

// Add layout algorithm to cytoscape.
cytoscape.use(klay)

export const RootWrapper = ({ children, className, ...props }) => {
  const [isInitializing, setIsInitializing] = useState(true)
  const [isThemeDark, setIsThemeDark] = useState(false)

  useEffect(() => {
    setIsInitializing(true)

    const [init, cancel] = withCancel(initI18n())
    init.finally(() => { setIsInitializing(false) })

    return cancel
  }, [])

  return <>
    <RootCtx.Provider value={{
      environment,
      isInitializing,
      theme: {
        isDark: isThemeDark,
        setIsDark: setIsThemeDark
      }
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

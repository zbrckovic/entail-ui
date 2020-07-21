import { FocusStyleManager } from '@blueprintjs/core/lib/esnext/accessibility/focusStyleManager'
import { RootCtx } from 'contexts'
import { environment } from 'environment'
import { initI18n } from 'i18n'
import { ActivityStatus } from 'misc'
import React, { useEffect, useState } from 'react'
import './common-style.scss'

FocusStyleManager.onlyShowFocusOnTabs()

/** Code necessary for both main application and storybook to function properly. */
export const CommonWrapper = ({ children }) => {
  const [initializationStatus, setInitializationStatus] = useState(ActivityStatus.InProgress)
  const [themeDark, setThemeDark] = useState(false)

  useEffect(() => {
    const subscription = initI18n.subscribe({
      complete() { setInitializationStatus(ActivityStatus.Succeeded) }
    })

    return () => { subscription.unsubscribe() }
  }, [])

  return (
    <RootCtx.Provider value={{ environment, initializationStatus, themeDark, setThemeDark }}>
      {children}
    </RootCtx.Provider>
  )
}

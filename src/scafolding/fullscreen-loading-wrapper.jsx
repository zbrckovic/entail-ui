import { RootCtx } from 'contexts'
import React, { useContext } from 'react'
import style from './fullscreen-loading-wrapper.m.scss'
import classNames from 'classnames'
import { Spinner } from '@blueprintjs/core'

// Shows fullscreen loading if root context is still initializing.
export const FullscreenLoadingWrapper = ({ className, children }) => {
  const { isInitializing } = useContext(RootCtx)

  if (isInitializing) {
    return <div className={classNames(style.loadingContainer, className)}>
      <Spinner />
    </div>
  }

  return children
}

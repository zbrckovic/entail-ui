import { RootCtx } from 'contexts'
import { ActivityStatus } from 'misc'
import React, { useContext } from 'react'
import { RootWrapper } from 'root-wrapper'
import style from './global-decorator.module.scss'
import './global-decorator.scss'

const GlobalWrapper = ({ children }) => {
  const { initializationStatus } = useContext(RootCtx)
  const loading = initializationStatus === ActivityStatus.InProgress

  return <div className={style.container}>
    {loading || children}
  </div>
}

export const globalDecorator = storyFn =>
  <RootWrapper>
    <GlobalWrapper>{storyFn()}</GlobalWrapper>
  </RootWrapper>

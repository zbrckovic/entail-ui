import { RootCtx } from 'contexts'
import { ActivityStatus } from 'misc'
import React, { useContext } from 'react'
import { RootWrapper } from '../../root-wrapper'
import './global-decorator.scss'
import style from './global-decorator.module.scss'

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

import { RootCtx } from 'contexts'
import { ActivityStatus } from 'misc/activity-status'
import React, { useContext } from 'react'
import { RootWrapper } from 'root-wrapper'

export const globalDecorator = Story =>
  <RootWrapper>
    <GlobalWrapper>
      <Story/>
    </GlobalWrapper>
  </RootWrapper>

const GlobalWrapper = ({ children }) => {
  const { initializationStatus } = useContext(RootCtx)
  const loading = initializationStatus === ActivityStatus.InProgress

  return loading || children
}

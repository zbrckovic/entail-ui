import { RootCtx } from 'contexts'
import { ActivityStatus } from 'misc'
import React, { useContext } from 'react'
import { CommonWrapper } from 'common-wrapper'

export const globalDecorator = storyFn =>
  <CommonWrapper>
    <StorybookWrapper>
      {storyFn()}
    </StorybookWrapper>
  </CommonWrapper>

const StorybookWrapper = ({ children }) => {
  const { initializationStatus } = useContext(RootCtx)
  const loading = initializationStatus === ActivityStatus.InProgress

  return loading || children
}

import { RootCtx } from 'contexts'
import React, { useContext } from 'react'
import { StorybookRootWrapper } from './storybook-root-wrapper'

export const globalDecorator = Story =>
  <StorybookRootWrapper>
    <GlobalWrapper>
      <Story />
    </GlobalWrapper>
  </StorybookRootWrapper>

const GlobalWrapper = ({ children }) => {
  const { isInitializing } = useContext(RootCtx)
  return isInitializing || children
}

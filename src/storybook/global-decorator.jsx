import { RootCtx } from 'contexts'
import React, { useContext } from 'react'
import { RootWrapper } from 'root-wrapper'

export const globalDecorator = Story =>
  <RootWrapper>
    <GlobalWrapper>
      <Story />
    </GlobalWrapper>
  </RootWrapper>

const GlobalWrapper = ({ children }) => {
  const { isInitializing } = useContext(RootCtx)
  return isInitializing || children
}

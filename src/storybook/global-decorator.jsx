import { RootCtx } from 'contexts'
import { ActivityStatus } from 'misc'
import React, { useContext } from 'react'
import { RootWrapper } from 'root-wrapper'
import styled from 'styled-components'

export const globalDecorator = storyFn =>
  <RootWrapper>
    <StyledGlobalWrapper>{storyFn()}</StyledGlobalWrapper>
  </RootWrapper>

const GlobalWrapper = ({ children }) => {
  const { initializationStatus } = useContext(RootCtx)
  const loading = initializationStatus === ActivityStatus.InProgress

  return loading || children
}

const StyledGlobalWrapper = styled(GlobalWrapper)`
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
`

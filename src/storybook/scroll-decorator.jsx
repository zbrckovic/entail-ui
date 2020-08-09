import React from 'react'
import styled from 'styled-components'

export const scrollDecorator = storyFn =>
  <StyledScrollContainer>
    <StyledScrollableContent>{storyFn()}</StyledScrollableContent>
  </StyledScrollContainer>

const StyledScrollContainer = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
`

const StyledScrollableContent = styled.div`
  width: 100%;
  padding: 8px;
  display: flex;
  flex-direction: column;
`

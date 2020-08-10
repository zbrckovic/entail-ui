import React from 'react'
import styled from 'styled-components'

export const Code = ({ className, children }) =>
  <StyledDiv className={className}>{children}</StyledDiv>

const StyledDiv = styled.div`
  font-family: ${({ theme: { fonts: { monoFamily } } }) => monoFamily};
  display: inline-block;
  white-space: pre;
`

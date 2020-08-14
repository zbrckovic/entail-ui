import React from 'react'
import styled from 'styled-components'
import { typography } from 'styled-system'

export const Code = ({ className, children }) =>
  <StyledDiv
    className={className}
    fontFamily='mono'
  >
    {children ?? <wbr/>}
  </StyledDiv>

const StyledDiv = styled('div')({
  display: 'inline-block',
  whiteSpace: 'pre'
}, typography)

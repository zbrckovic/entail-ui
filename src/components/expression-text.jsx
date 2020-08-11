import { Code } from 'components/code'
import React from 'react'
import { getColorForKind } from 'style/theme'
import styled from 'styled-components'

/** This is used whenever we need to show some text which is a part of `EEL`. */
export const ExpressionText = ({ className, text, kind }) => {
  return <StyledCode className={className} kind={kind}>{text}</StyledCode>
}

const StyledCode = styled(Code)`
  cursor: pointer;
    ${({ theme, kind }) => {
    const color = getColorForKind(theme, kind)
    return color && `color: ${color}`
  }}; 
`

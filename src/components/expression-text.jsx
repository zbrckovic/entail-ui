import { Code } from 'components/code'
import React from 'react'
import { getColorForKind } from 'style/theme'
import styled from 'styled-components'
import { pipe } from 'utils'

/** This is used whenever we need to show some text which is a part of `EEL`. */
export const ExpressionText = ({ className, text, kind }) =>
  <StyledCode
    className={className}
    kind={kind}
  >
    {text}
  </StyledCode>

const StyledCode = styled(Code)`
  cursor: pointer;
  color: ${pipe(({ kind }) => kind, getColorForKind)}
`

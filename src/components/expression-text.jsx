import { Kind } from '@zbrckovic/entail-core/lib/abstract-structures/sym/kind'
import { Code } from 'components/code'
import React from 'react'
import styled, { css } from 'styled-components'

/** This is used whenever we need to show some text which is a part of `EEL`. */
export const ExpressionText = ({ className, text, kind }) => {
  return <StyledCode className={className} kind={kind}>{text}</StyledCode>
}

const StyledCode = styled(Code)`
  cursor: pointer;
  ${({ theme, kind }) => cssWithKind(theme, kind)}
`

const cssWithKind = ({ colors: { formula, term } }, kind) => {
  switch (kind) {
    case Kind.Formula:
      return css`color: ${formula}`
    case Kind.Term:
      return css`color: ${term}`
  }
}


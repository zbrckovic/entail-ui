import { Kind } from '@zbrckovic/entail-core/lib/abstract-structures/sym'
import { Code } from 'components/code'
import React from 'react'
import styled from 'styled-components'
import { variant } from 'styled-system'

/** This is used whenever we need to show some text which is a part of `EEL`. */
export const ExpressionText = ({ className, text, kind }) =>
  <StyledCode
    className={className}
    kind={kindToVariantKey[kind]}
  >
    {text}
  </StyledCode>

const kindToVariantKey = {
  [Kind.Formula]: 'formula',
  [Kind.Term]: 'term'
}

const StyledCode = styled(Code)(
  {
    cursor: 'pointer'
  },
  variant({
    prop: 'kind',
    variants: {
      normal: {
        color: 'text'
      },
      formula: {
        color: 'formula'
      },
      term: {
        color: 'term'
      }
    }
  })
)

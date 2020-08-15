import { Kind } from '@zbrckovic/entail-core/lib/abstract-structures/sym'
import { Code } from 'components/code'
import React from 'react'
import { css } from '@emotion/core'

/** This is used whenever we need to show some text which is a part of `EEL`. */
export const ExpressionText = ({ className, text, kind }) =>
  <Code
    className={className}
    kind={kindToVariantKey[kind]}
    variant={kindToVariantKey[kind] ?? 'normal'}
    css={css`cursor: pointer;`}
  >
    {text}
  </Code>

const kindToVariantKey = {
  [Kind.Formula]: 'formula',
  [Kind.Term]: 'term'
}

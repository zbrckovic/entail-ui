import { Kind } from '@zbrckovic/entail-core/lib/abstract-structures/sym'
import { Code } from 'components/code'
import React from 'react'

export const ExpressionText = ({ className, text, kind, ...props }) =>
  <Code
    className={className}
    variant={kindToVariant[kind] ?? 'eel.normal'}
    css={{ cursor: 'pointer' }}
    {...props}
  >
    {text}
  </Code>

const kindToVariant = {
  [Kind.Formula]: 'eel.formula',
  [Kind.Term]: 'eel.term'
}

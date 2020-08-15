import { Kind } from '@zbrckovic/entail-core/lib/abstract-structures/sym'
import Code from 'components/Code'
import React from 'react'

const ExpressionText = ({ className, text, kind, ...props }) =>
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

export default ExpressionText

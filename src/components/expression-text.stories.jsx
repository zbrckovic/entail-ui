import { Kind } from '@zbrckovic/entail-core/lib/abstract-structures/sym/kind'
import { ExpressionText } from 'components/expression-text'
import React from 'react'

export default {
  title: 'ExpressionText',
  component: ExpressionText
}

export const Tweak = () =>
  <ExpressionText
    text={'Text'}
    kind={Kind.Formula}
  />

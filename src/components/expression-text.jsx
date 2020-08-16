import { css } from '@emotion/core'
import { Kind } from '@zbrckovic/entail-core/lib/abstract-structures/sym'
import React from 'react'
import { Text } from 'rebass'

export const ExpressionText = ({ className, text, kind, ...props }) =>
  <Text
    as="pre"
    className={className}
    variant={kindToVariant[kind] ?? 'eel.normal'}
    fontFamily='mono'
    css={css({
      display: 'inline-block',
      whiteSpace: 'pre',
      cursor: 'pointer'
    })}
    {...props}
  >
    {text ?? <wbr/>}
  </Text>

const kindToVariant = {
  [Kind.Formula]: 'eel.formula',
  [Kind.Term]: 'eel.term'
}

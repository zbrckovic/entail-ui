import { select, text, withKnobs } from '@storybook/addon-knobs'
import { Kind } from '@zbrckovic/entail-core/lib/abstract-structures/sym/kind'
import { ExpressionText } from 'components/expression-text'
import React from 'react'
import { scrollDecorator } from 'storybook/scroll-decorator'
import { exampleMixin } from 'style/storybook'

export default {
  title: 'ExpressionText',
  component: ExpressionText,
  decorators: [
    withKnobs({ escapeHTML: false }),
    scrollDecorator
  ]
}

export const Tweak = () =>
  <ExpressionText
    css={`
      align-self: flex-start; 
      ${exampleMixin}
    `}
    text={text('Text', 'Write some text...')}
    kind={select('Type', { ' ': undefined, ...Kind }, undefined)}
  />

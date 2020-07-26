import { select, text, withKnobs } from '@storybook/addon-knobs'
import { Kind } from '@zbrckovic/entail-core/lib/abstract-structures/sym/kind'
import React from 'react'
import { ExpressionText } from './expression-text'

export default {
  title: 'ExpressionText',
  component: ExpressionText,
  decorators: [withKnobs({ escapeHTML: false })]
}

export const Tweak = () =>
  <ExpressionText
    text={text('Text', 'Write some text...')}
    kind={select('Type', { ' ': undefined, ...Kind }, undefined)}
  />

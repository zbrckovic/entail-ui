import { select, text, withKnobs } from '@storybook/addon-knobs'
import { Kind } from '@zbrckovic/entail-core/lib/abstract-structures/sym/kind'
import classNames from 'classnames'
import { ThemeSwitch } from 'components/theme-switch'
import React from 'react'
import { scrollDecorator } from 'storybook/scroll-decorator'
import { ExpressionText } from './expression-text'
import style from './expression-text.stories.module.scss'

export default {
  title: 'ExpressionText',
  component: ExpressionText,
  decorators: [
    withKnobs({ escapeHTML: false }),
    scrollDecorator
  ]
}

export const Tweak = () => <>
  <ExpressionText
    className={classNames('storybook-frame', style['min-width'])}
    text={text('Text', 'Write some text...')}
    kind={select('Type', { ' ': undefined, ...Kind }, undefined)}
    background
  />
  <ThemeSwitch/>
</>

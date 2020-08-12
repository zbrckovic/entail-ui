import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs'
import { Button } from 'components/button'
import { Intent } from 'components/intent'
import React from 'react'
import { scrollDecorator } from 'storybook/scroll-decorator'

export default {
  title: 'Button',
  component: Button,
  decorators: [
    withKnobs({ escapeHTML: false }),
    scrollDecorator
  ]
}

export const Default = () =>
  <div>
    <Button
      intent={select('Intent', { ' ': undefined, ...Intent }, undefined) || undefined}
      disabled={boolean('Disabled', false)}
      icon={boolean('Icon', false) && faCheckCircle}
    >{text('Button title', 'Example')}</Button>
  </div>

import { withKnobs } from '@storybook/addon-knobs'
import { ExpressionView } from 'components/expression-view/expression-view'
import React from 'react'

export default {
  title: 'ExpressionView',
  component: ExpressionView,
  decorators: [withKnobs()]
}

export const Tweak = () =>
  <ExpressionView/>

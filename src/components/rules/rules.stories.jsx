import React from 'react'
import { scrollDecorator } from 'storybook/scroll-decorator'
import { Rules } from './rules'

export default {
  title: 'Rules',
  component: Rules,
  decorators: [scrollDecorator]
}

export const Default = () =>
  <Rules className="storybook-frame"/>

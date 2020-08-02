import { ThemeSwitch } from 'components/theme-switch/theme-switch'
import React from 'react'
import { scrollDecorator } from 'storybook/scroll-decorator'

export default {
  title: 'ThemeSwitch',
  component: ThemeSwitch,
  decorators: [scrollDecorator]
}

export const Default = () => <>
  <ThemeSwitch className="storybook-frame"/>
</>

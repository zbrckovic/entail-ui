import { DevInfo } from 'components/dev-info'
import { ThemeSwitch } from 'components/theme-switch'
import React from 'react'
import { scrollDecorator } from 'storybook/scroll-decorator'
import { exampleMixin } from 'style/storybook'

export default {
  title: 'DevInfo',
  component: DevInfo,
  decorators: [scrollDecorator]
}

export const MinWidth = () => <>
  <DevInfo css={`
    align-self: flex-start; 
    ${exampleMixin}
  `}
  />
  <ThemeSwitch/>
</>

export const FullWidth = () => <>
  <DevInfo css={`${exampleMixin}`}/>
  <ThemeSwitch/>
</>

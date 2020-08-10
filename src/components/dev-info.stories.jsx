import { DevInfo } from 'components/dev-info'
import React from 'react'
import { scrollDecorator } from 'storybook/scroll-decorator'
import { exampleMixin } from 'style/storybook'

export default {
  title: 'DevInfo',
  component: DevInfo,
  decorators: [scrollDecorator]
}

export const MinWidth = () => <DevInfo css={`
  align-self: flex-start; 
  ${exampleMixin}
`}/>

export const FullWidth = () => <DevInfo css={`${exampleMixin}`}/>


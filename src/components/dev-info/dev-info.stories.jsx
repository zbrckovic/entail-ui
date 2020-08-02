import classNames from 'classnames'
import { ThemeSwitch } from 'components/theme-switch'
import React from 'react'
import { scrollDecorator } from 'storybook/scroll-decorator'
import { DevInfo } from './dev-info'
import style from './dev-info.stories.module.scss'

export default {
  title: 'DevInfo',
  component: DevInfo,
  decorators: [scrollDecorator]
}

export const MinWidth = () => <>
  <DevInfo className={classNames('storybook-frame', style['min-width'])}/>
  <ThemeSwitch/>
</>

export const FullWidth = () => <>
  <DevInfo className={'storybook-frame'}/>
  <ThemeSwitch/>
</>

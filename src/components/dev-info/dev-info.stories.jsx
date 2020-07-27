import React from 'react'
import { scrollDecorator } from 'storybook/scroll-decorator'
import { DevInfo } from './dev-info'
import classNames from 'classnames'
import style from './dev-info.stories.module.scss'

export default {
  title: 'DevInfo',
  component: DevInfo,
  decorators: [scrollDecorator]
}

export const MinWidth = () =>
  <DevInfo className={classNames('storybook-frame', style['min-width'])}/>

export const FullWidth = () =>
  <DevInfo className={'storybook-frame'}/>

import React from 'react'
import { scrollDecorator } from 'storybook/scroll-decorator'
import { DeductionEditor } from './deduction-editor'

export default {
  title: 'DeductionEditor',
  component: DeductionEditor,
  decorators: [scrollDecorator]
}

export const Default = () =>
  <DeductionEditor className="storybook-frame"/>

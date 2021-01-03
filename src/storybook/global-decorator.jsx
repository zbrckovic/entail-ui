import React from 'react'
import { StorybookRootWrapper } from './storybook-root-wrapper'

export const globalDecorator = Story =>
  <StorybookRootWrapper>
    <Story />
  </StorybookRootWrapper>

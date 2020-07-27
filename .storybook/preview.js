import { configure, addDecorator } from '@storybook/react'
import { globalDecorator } from '../src/storybook/global-decorator'

configure(
  require.context('../src/components', true, /\.stories\.jsx?$/),
  module
)

addDecorator(globalDecorator)

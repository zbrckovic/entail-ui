import { globalDecorator } from 'storybook/global-decorator'

export const decorators = [globalDecorator]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' }
}

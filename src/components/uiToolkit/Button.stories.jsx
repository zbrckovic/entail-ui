import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import Button from 'components/uiToolkit/Button'
import React from 'react'

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    icon: {
      control: 'boolean',
      defaultValue: true
    },
    children: {
      control: 'text',
      defaultValue: 'Button'
    },
    variant: {
      control: {
        type: 'inline-radio',
        options: ['normal', 'primary', 'danger']
      },
      defaultValue: 'normal'
    }
  }
}

const Template = ({ icon, children, ...args }) =>
  <Button
    icon={icon ? faCheckCircle : undefined}
    {...args}
  >
    {children}
  </Button>

export const Default = Template.bind({})

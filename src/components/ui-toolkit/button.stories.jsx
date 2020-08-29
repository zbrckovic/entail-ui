import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Button, ButtonVariants } from 'components/ui-toolkit/button'
import React from 'react'

export default {
  title: 'toolkit/Button',
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
        options: Object.keys(ButtonVariants)
      },
      defaultValue: ButtonVariants.NEUTRAL
    },
    disabled: {
      control: 'boolean',
      defaultValue: true
    }
  }
}

export const Default = ({ icon, children, ...args }) =>
  <Button
    icon={icon ? faCheckCircle : undefined}
    {...args}
  >
    {children}
  </Button>

import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Kind } from '@zbrckovic/entail-core/lib/abstract-structures/sym'
import { Button } from 'components/button'
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
    appearance: {
      control: {
        type: 'inline-radio',
        options: ['normal', 'primary', 'danger']
      },
      defaultValue: 'normal'
    }
  }
}

const Template = ({ icon, children, ...args }) =>
  <Button icon={icon ? faCheckCircle : undefined} {...args}>
    {children}
  </Button>

export const Default = Template.bind({})

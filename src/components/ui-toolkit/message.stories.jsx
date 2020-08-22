import { Message } from 'components/ui-toolkit/message'
import React from 'react'

export default {
  title: 'toolkit/Message',
  component: Message,
  argTypes: {
    variant: {
      control: {
        type: 'inline-radio',
        options: ['neutral', 'primary', 'secondary', 'success', 'warning', 'danger']
      },
      defaultValue: 'neutral'
    },
    text: {
      control: 'text',
      defaultValue:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
        'incididunt ut labore et dolore magna aliqua.'
    }
  }
}

export const Default = ({ ...args }) => <Message {...args}/>

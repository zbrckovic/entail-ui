import { Message, MessageVariant } from 'components/ui-toolkit/message'
import React from 'react'

export default {
  title: 'toolkit/Message',
  component: Message,
  argTypes: {
    variant: {
      control: {
        type: 'inline-radio',
        options: Object.keys(MessageVariant)
      },
      defaultValue: MessageVariant.NEUTRAL
    },
    text: {
      control: 'text',
      defaultValue:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
        'incididunt ut labore et dolore magna aliqua.'
    }
  }
}

export const Default = ({ ...args }) => <Message {...args} />

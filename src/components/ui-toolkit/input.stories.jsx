import { Input } from 'components/ui-toolkit/input'
import React, { useState } from 'react'

export default {
  title: 'toolkit/Input',
  component: Input,
  argTypes: {
    disabled: {
      control: 'boolean',
      defaultValue: true
    }
  }
}

export const Default = ({ disabled, ...args }) => {
  const [text, setText] = useState('')

  return <Input
    type="text"
    disabled={disabled}
    value={text}
    onChange={({ target: { value } }) => { setText(value) }}
    {...args} />
}

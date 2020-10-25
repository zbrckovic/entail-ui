import { IndividualVariableEditor } from 'components/individual-variable-editor'
import React, { useContext, useEffect } from 'react'
import { RootCtx } from 'contexts'

export default {
  title: 'IndividualVariableEditor',
  component: IndividualVariableEditor,
  argTypes: {
    label: {
      control: 'text',
      defaultValue: 'Title'
    },
    onSubmit: {
      action: 'submit'
    },
    onCancel: {
      action: 'cancel'
    },
    isDark: {
      control: 'boolean'
    }
  }
}

export const Default = ({ isDark, ...args }) => {
  const { theme: { setIsDark } } = useContext(RootCtx)
  useEffect(() => { setIsDark(isDark) }, [isDark, setIsDark])

  return <IndividualVariableEditor {...args} />
}

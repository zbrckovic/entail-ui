import { IndividualVariableEditor } from 'components/individual-variable-editor'
import React from 'react'

export default {
  title: 'IndividualVariableEditor',
  component: IndividualVariableEditor,
  argTypes: {
    onSubmit: {
      action: 'submit'
    },
    onCancel: {
      action: 'cancel'
    }
  }
}

export const Default = args => <IndividualVariableEditor {...args} />

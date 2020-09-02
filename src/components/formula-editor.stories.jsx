import { primitivePresentationCtx } from '@zbrckovic/entail-core'
import { FormulaEditor } from 'components/formula-editor'
import { SymPresentationCtx } from 'contexts'
import React from 'react'

export default {
  title: 'FormulaEditor',
  component: FormulaEditor,
  argTypes: {
    onSubmit: {
      action: 'submit'
    },
    onCancel: {
      action: 'cancel'
    }
  }
}

export const Default = args =>
  <SymPresentationCtx.Provider value={primitivePresentationCtx}>
    <FormulaEditor height={500} {...args}/>
  </SymPresentationCtx.Provider>

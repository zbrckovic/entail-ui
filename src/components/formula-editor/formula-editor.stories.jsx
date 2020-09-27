import { primitivePresentations, primitiveSyms } from '@zbrckovic/entail-core'
import { FormulaEditor } from './formula-editor'
import { SymCtx } from 'contexts'
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
    },
    label: {
      control: 'text',
      defaultValue: 'Default label'
    }
  }
}

export const Default = args =>
  <SymCtx.Provider value={symCtx}>
    <FormulaEditor {...args} />
  </SymCtx.Provider>

const symCtx = { syms: primitiveSyms, presentations: primitivePresentations }

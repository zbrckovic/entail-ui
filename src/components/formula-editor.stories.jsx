import { primitivePresentations, primitiveSyms } from '@zbrckovic/entail-core'
import { FormulaEditor } from 'components/formula-editor'
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
    }
  }
}

export const Default = args =>
  <SymCtx.Provider value={{ syms: primitiveSyms, presentations: primitivePresentations }}>
    <FormulaEditor height={500} {...args} />
  </SymCtx.Provider>

import { primitivePresentationCtx } from '@zbrckovic/entail-core/lib/presentation/sym-presentation/primitive-presentation-ctx'
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

export const FullWidth = args =>
  <SymPresentationCtx.Provider value={primitivePresentationCtx}>
    <FormulaEditor {...args}/>
  </SymPresentationCtx.Provider>

export const MinWidth = args =>
  <SymPresentationCtx.Provider value={primitivePresentationCtx}>
    <FormulaEditor {...args}/>
  </SymPresentationCtx.Provider>

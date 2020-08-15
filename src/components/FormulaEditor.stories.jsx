import { primitivePresentationCtx } from '@zbrckovic/entail-core/lib/presentation/sym-presentation/primitive-presentation-ctx'
import FormulaEditor from 'components/FormulaEditor'
import { SymPresentationCtx } from 'contexts'
import React from 'react'

export default {
  title: 'FormulaEditor',
  component: FormulaEditor
}

export const FullWidth = () => {
  return (
    <SymPresentationCtx.Provider value={primitivePresentationCtx}>
      <FormulaEditor
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    </SymPresentationCtx.Provider>
  )
}

export const MinWidth = () => {
  return (
    <SymPresentationCtx.Provider value={primitivePresentationCtx}>
      <FormulaEditor
        onSubmit={() => {}}
        onCancel={() => {}}
      />
    </SymPresentationCtx.Provider>
  )
}

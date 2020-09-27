import { primitivePresentations, primitiveSyms } from '@zbrckovic/entail-core'
import { DeductionEditor } from 'components/deduction-editor/deduction-editor'
import { SymCtx } from 'contexts'
import React from 'react'

export default {
  title: 'DeductionEditor',
  component: DeductionEditor
}

export const Default = () =>
  <SymCtx.Provider value={symCtx}>
    <DeductionEditor width='100%' height='100%' />
  </SymCtx.Provider>

const symCtx = {
  syms: primitiveSyms,
  presentations: primitivePresentations
}

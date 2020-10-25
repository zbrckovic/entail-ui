import React from 'react'
import { TermPicker } from './term-picker'
import { SymCtx } from '../../../contexts'
import {
  primitivePresentations,
  primitiveSyms,
  Sym,
  SymPresentation,
  SyntacticInfo
} from '@zbrckovic/entail-core'
import { getMaxSymId } from '@zbrckovic/entail-core/lib/presentation/sym-presentation'

export default {
  title: 'DeductionEditor/TermPicker',
  component: TermPicker
}

const maxSymId = getMaxSymId(primitiveSyms)

const terms = [
  Sym.tt({ id: maxSymId + 1 }),
  Sym.tt({ id: maxSymId + 2 }),
  Sym.tt({ id: maxSymId + 3 }),
  Sym.tt({ id: maxSymId + 4 })
]

const termPresentations = [
  SymPresentation({ ascii: SyntacticInfo.prefix('a') }),
  SymPresentation({ ascii: SyntacticInfo.prefix('b') }),
  SymPresentation({ ascii: SyntacticInfo.prefix('c') }),
  SymPresentation({ ascii: SyntacticInfo.prefix('d') })
]

const symCtx = {
  syms: {
    ...primitiveSyms,
    ...terms.reduce((acc, term) => ({ ...acc, [term.id]: term }), {})
  },
  presentations: {
    ...primitivePresentations,
    ...terms.reduce((acc, term, i) => ({ ...acc, [term.id]: termPresentations[i] }), {})
  }
}

export const Default = () => (
  <SymCtx.Provider value={symCtx}>
    <TermPicker terms={terms} />
  </SymCtx.Provider>
)

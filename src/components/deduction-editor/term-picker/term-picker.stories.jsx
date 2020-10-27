import React, { useState } from 'react'
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
  Sym.tt({ id: maxSymId + 4 }),
  Sym.tt({ id: maxSymId + 5 }),
  Sym.tt({ id: maxSymId + 6 })
]

const termPresentations = [
  SymPresentation({ ascii: SyntacticInfo.prefix('x') }),
  SymPresentation({ ascii: SyntacticInfo.prefix('y') }),
  SymPresentation({ ascii: SyntacticInfo.prefix('z') }),
  SymPresentation({ ascii: SyntacticInfo.prefix('x1') }),
  SymPresentation({ ascii: SyntacticInfo.prefix('y1') }),
  SymPresentation({ ascii: SyntacticInfo.prefix('z1') })
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

export const Default = () => {
  const [selectedTerm, setSelectedTerm] = useState()

  return (
    <SymCtx.Provider value={symCtx}>
      <TermPicker
        terms={terms}
        selectedTerm={selectedTerm}
        onSelectTerm={term => {
          setSelectedTerm(term.id === selectedTerm?.id ? undefined : term)
        }}
      />
    </SymCtx.Provider>
  )
}

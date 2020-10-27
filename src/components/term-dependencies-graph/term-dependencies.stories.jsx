import {
  getMaxSymId,
  primitivePresentations,
  SymPresentation,
  SyntacticInfo
} from '@zbrckovic/entail-core/lib/presentation/sym-presentation'
import { TermDependenciesGraph } from './term-dependencies-graph'
import { RootCtx, SymCtx } from 'contexts'
import {
  primitiveSyms,
  Sym,
  TermDependencyGraph as TermDependencyGraphModel
} from '@zbrckovic/entail-core'
import React, { useContext, useEffect, useState } from 'react'

export default {
  title: 'TermDependenciesGraph',
  component: TermDependenciesGraph,
  argTypes: {
    isDark: {
      control: 'boolean'
    }
  }
}

export const Default = ({ isDark }) => {
  const { theme: { setIsDark } } = useContext(RootCtx)
  useEffect(() => { setIsDark(isDark) }, [isDark, setIsDark])

  const [graph] = useState(() => (
    TermDependencyGraphModel({
      [termA.id]: new Set([termB.id, termD.id]),
      [termB.id]: new Set([termC.id]),
      [termC.id]: new Set([termE.id]),
      [termD.id]: new Set([termE.id]),
      [termF.id]: new Set([termG.id]),
      [termH.id]: new Set()
    })
  ))

  return (
    <SymCtx.Provider value={symCtx}>
      <TermDependenciesGraph graph={graph} />
    </SymCtx.Provider>
  )
}

const maxSymId = getMaxSymId(primitiveSyms)

const termA = Sym.tt({ id: maxSymId + 1 })
const termB = Sym.tt({ id: maxSymId + 2 })
const termC = Sym.tt({ id: maxSymId + 3 })
const termD = Sym.tt({ id: maxSymId + 4 })
const termE = Sym.tt({ id: maxSymId + 5 })
const termF = Sym.tt({ id: maxSymId + 6 })
const termG = Sym.tt({ id: maxSymId + 7 })
const termH = Sym.tt({ id: maxSymId + 8 })
const termI = Sym.tt({ id: maxSymId + 9 })
const termJ = Sym.tt({ id: maxSymId + 10 })

const termAPresentation = SymPresentation({ ascii: SyntacticInfo.prefix('a') })
const termBPresentation = SymPresentation({ ascii: SyntacticInfo.prefix('b') })
const termCPresentation = SymPresentation({ ascii: SyntacticInfo.prefix('c') })
const termDPresentation = SymPresentation({ ascii: SyntacticInfo.prefix('d') })
const termEPresentation = SymPresentation({ ascii: SyntacticInfo.prefix('e') })
const termFPresentation = SymPresentation({ ascii: SyntacticInfo.prefix('f') })
const termGPresentation = SymPresentation({ ascii: SyntacticInfo.prefix('g') })
const termHPresentation = SymPresentation({ ascii: SyntacticInfo.prefix('h') })
const termIPresentation = SymPresentation({ ascii: SyntacticInfo.prefix('i') })
const termJPresentation = SymPresentation({ ascii: SyntacticInfo.prefix('j') })

const presentations = {
  ...primitivePresentations,
  [termA.id]: termAPresentation,
  [termB.id]: termBPresentation,
  [termC.id]: termCPresentation,
  [termD.id]: termDPresentation,
  [termE.id]: termEPresentation,
  [termF.id]: termFPresentation,
  [termG.id]: termGPresentation,
  [termH.id]: termHPresentation,
  [termI.id]: termIPresentation,
  [termJ.id]: termJPresentation
}

const syms = {
  ...primitiveSyms,
  [termA.id]: termA,
  [termB.id]: termB,
  [termC.id]: termC,
  [termD.id]: termD,
  [termE.id]: termE,
  [termF.id]: termF,
  [termG.id]: termG,
  [termH.id]: termH,
  [termI.id]: termI,
  [termJ.id]: termJ
}

const symCtx = { syms, presentations }

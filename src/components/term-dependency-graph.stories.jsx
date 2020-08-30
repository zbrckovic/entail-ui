import { useState } from '@storybook/addons'
import {
  getMaxSymId,
  SymPresentation, SyntacticInfo
} from '@zbrckovic/entail-core/lib/presentation/sym-presentation'
import { SymPresentationCtx } from 'contexts'
import { Map, Set } from 'immutable'
import { TermDependencyGraph } from './term-dependency-graph'
import {
  primitivePresentationCtx, Sym,
  TermDependencyGraph as TermDependencyGraphModel
} from '@zbrckovic/entail-core'
import React from 'react'

export default {
  title: 'TermDependencyGraph',
  component: TermDependencyGraph
}

let presentationCtx = primitivePresentationCtx
const maxSymId = getMaxSymId(presentationCtx)

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

const termAPresentation = new SymPresentation({ ascii: SyntacticInfo.prefix('a') })
const termBPresentation = new SymPresentation({ ascii: SyntacticInfo.prefix('b') })
const termCPresentation = new SymPresentation({ ascii: SyntacticInfo.prefix('c') })
const termDPresentation = new SymPresentation({ ascii: SyntacticInfo.prefix('d') })
const termEPresentation = new SymPresentation({ ascii: SyntacticInfo.prefix('e') })
const termFPresentation = new SymPresentation({ ascii: SyntacticInfo.prefix('f') })
const termGPresentation = new SymPresentation({ ascii: SyntacticInfo.prefix('g') })
const termHPresentation = new SymPresentation({ ascii: SyntacticInfo.prefix('h') })
const termIPresentation = new SymPresentation({ ascii: SyntacticInfo.prefix('i') })
const termJPresentation = new SymPresentation({ ascii: SyntacticInfo.prefix('j') })

presentationCtx = primitivePresentationCtx.withMutations(mutable => {
  mutable.set(termA, termAPresentation)
  mutable.set(termB, termBPresentation)
  mutable.set(termC, termCPresentation)
  mutable.set(termD, termDPresentation)
  mutable.set(termE, termEPresentation)
  mutable.set(termF, termFPresentation)
  mutable.set(termG, termGPresentation)
  mutable.set(termH, termHPresentation)
  mutable.set(termI, termIPresentation)
  mutable.set(termJ, termJPresentation)
})

export const Default = () => {
  const [graph] = useState(() => (
    new TermDependencyGraphModel({
      dependencies: Map([
        [termA, Set.of(termB, termD)],
        [termB, Set.of(termC)],
        [termC, Set.of(termE)],
        [termD, Set.of(termE)],
        [termF, Set.of(termG)],
        [termH, Set()]
      ])
    })
  ))

  return <SymPresentationCtx.Provider value={presentationCtx}>
    <TermDependencyGraph height={300} graph={graph} />
  </SymPresentationCtx.Provider>
}

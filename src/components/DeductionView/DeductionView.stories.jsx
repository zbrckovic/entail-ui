import { DeductionParser } from '@zbrckovic/entail-core/lib/parsers/deduction-parser/deduction-parser'
import { primitivePresentationCtx } from '@zbrckovic/entail-core/lib/presentation/sym-presentation/primitive-presentation-ctx'
import { SymPresentationCtx } from 'contexts'
import React, { useState } from 'react'
import DeductionView from './DeductionView'

export default {
  title: 'DeductionView',
  component: DeductionView
}

export const Example1 = () => {
  const { deduction, presentationCtx } = useDeduction(`
      (1) E[y] A[x] F(x, y)                           / P;
  1   (2) A[x] F(x, a)                                / EI 1;
  1   (3) F(b, a)                                     / UI 2;
  1   (4) E[y] F(b, y)                                / EG 3;
  1   (5) A[x] E[y] F(x, y)                           / UG 4;
      (6) E[y] A[x] F(x, y) -> A[x] E[y] F(x, y)      / D 1, 5;
  `)
  return (
    <SymPresentationCtx.Provider value={presentationCtx}>
      <DeductionView className="storybook-frame" deduction={deduction}/>
    </SymPresentationCtx.Provider>
  )
}

export const Example2 = () => {
  const { deduction, presentationCtx } = useDeduction(`
        (1)  A[x] (F(x) -> G(x))                                                      / P;
        (2)  A[x] (G(x) -> H(x))                                                      / P;
        (3)  E[x] F(x)                                                                / P;
      3 (4)  F(a)                                                                     / EI 3;
      1 (5)  F(a) -> G(a)                                                             / UI 1;
      2 (6)  G(a) -> H(a)                                                             / UI 2;
  1,2,3 (7)  H(a)                                                                     / TI 4,5,6;
  1,2,3 (8)  E[x] H(x)                                                                / EG 7;
    1,2 (9)  E[x] F(x) -> E[x] H(x)                                                   / D 3, 8;
      1 (10) A[x] (G(x) -> H(x)) -> (E[x] F(x) -> E[x] H(x))                          / D 2, 9;
        (11) A[x] (F(x) -> G(x)) -> (A[x] (G(x) -> H(x)) -> (E[x] F(x) -> E[x] H(x))) / D 1, 10; 
  `)
  return (
    <SymPresentationCtx.Provider value={presentationCtx}>
      <DeductionView className="storybook-frame" deduction={deduction}/>
    </SymPresentationCtx.Provider>
  )
}

export const Example3 = () => {
  const { deduction, presentationCtx } = useDeduction(`
       (1) p     / P;
       (2) q     / P;
  1, 2 (3) p & q / TI 1, 2;
  `)
  return (
    <SymPresentationCtx.Provider value={presentationCtx}>
      <DeductionView className="storybook-frame" deduction={deduction}/>
    </SymPresentationCtx.Provider>
  )
}

const useDeduction = deductionText => {
  const [state] = useState(() => {
    const parser = new DeductionParser(primitivePresentationCtx)
    const deduction = parser.parse(deductionText)
    const presentationCtx = parser.presentationCtx
    return {
      deduction,
      presentationCtx
    }
  })

  return state
}

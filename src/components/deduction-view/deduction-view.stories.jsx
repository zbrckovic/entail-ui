import { withKnobs } from '@storybook/addon-knobs'
import { DeductionParser } from '@zbrckovic/entail-core/lib/parsers/deduction-parser/deduction-parser'
import { primitivePresentationCtx } from '@zbrckovic/entail-core/lib/presentation/sym-presentation/primitive-presentation-ctx'
import { SymPresentationCtx } from 'contexts'
import React, { useState } from 'react'
import { scrollDecorator } from 'storybook/scroll-decorator'
import { ThemeSwitch } from '../theme-switch'
import { DeductionView } from './deduction-view'

export default {
  title: 'DeductionView',
  component: DeductionView,
  decorators: [
    withKnobs({ escapeHTML: false }),
    scrollDecorator
  ]
}

export const Example1 = () => {
  const { deduction, presentationCtx } = useDeduction(`
        (1) E[y] A[x] F(x, y)                           / P;
    1   (2) A[x] F(x, a)                                / EI 1;
    1   (3) F(b, a)                                     / UI 2;
    1   (4) E[y] F(b, y)                                / EG 3;
    1   (5) A[x] E[y] F(x, y)                           / UG 4;
        (6) E[y] A[x] F(x, y) -> A[x] E[y] F(x, y)      / D 1, 5;
    `
  )
  return (
    <SymPresentationCtx.Provider value={presentationCtx}>
      <DeductionView className="storybook-frame" deduction={deduction}/>
      <ThemeSwitch/>
    </SymPresentationCtx.Provider>
  )
}

export const Example2 = () => {
  const { deduction, presentationCtx } = useDeduction(`
        (1) A[x] F(x) -> G(x)           / P;
        (2) A[x] G(x) -> H(x)           / P;
        (3) E[x] F(x)                   / P;
      1 (4) F(a)                        / EI 3;
    `
  )
  return (
    <SymPresentationCtx.Provider value={presentationCtx}>
      <DeductionView className="storybook-frame" deduction={deduction}/>
      <ThemeSwitch/>
    </SymPresentationCtx.Provider>
  )
}

const useDeduction = deductionText => {
  const [state] = useState(() => {
    const parser = new DeductionParser(primitivePresentationCtx)
    const deduction = parser.parse(deductionText)
    const presentationCtx = parser.presentationCtx
    return { deduction, presentationCtx }
  })

  return state
}

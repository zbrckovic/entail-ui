import React, { useState } from 'react'
import { scrollDecorator } from 'storybook/scroll-decorator'
import { DeductionView } from './deduction-view'
import { primitivePresentationCtx } from '@zbrckovic/entail-core/lib/presentation/sym-presentation/primitive-presentation-ctx'
import { DeductionParser } from '@zbrckovic/entail-core/lib/parsers/deduction-parser/deduction-parser'
import { SymPresentationCtx } from '../../contexts'

export default {
  title: 'DeductionView',
  component: DeductionView,
  decorators: [scrollDecorator]
}

export const Default = () => {
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
      <DeductionView deduction={deduction}/>
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

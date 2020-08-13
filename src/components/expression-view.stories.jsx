import { FormulaParser } from '@zbrckovic/entail-core/lib/parsers/formula-parser'
import { primitivePresentationCtx } from '@zbrckovic/entail-core/lib/presentation/sym-presentation/primitive-presentation-ctx'
import { ExpressionView } from 'components/expression-view'
import { SymPresentationCtx } from 'contexts'
import React, { useState } from 'react'
import { useEnteredFormula } from 'storybook/use-entered-formula'

export default {
  title: 'ExpressionView',
  component: ExpressionView
}

export const Tweak = () => {
  const state = useEnteredFormula('p')

  if (state === undefined) return <div>Enter formula</div>

  const { success, error } = state
  if (error !== undefined) return <div>{error.message}</div>

  const { formula, presentationCtx } = success
  return (
    <SymPresentationCtx.Provider value={presentationCtx}>
      <ExpressionView expression={formula}/>
    </SymPresentationCtx.Provider>
  )
}

export const MinWidth = () => {
  const { formula, presentationCtx } = useFormula('E[y] A[x] F(x, y) -> A[x] E[y] F(x, y)')
  return (
    <SymPresentationCtx.Provider value={presentationCtx}>
      <ExpressionView
        css={`
          align-self: flex-start;
        `}
        expression={formula}
      />
    </SymPresentationCtx.Provider>
  )
}

export const FullWidthTooLong = () => {
  const { formula, presentationCtx } = useFormula('E[y] A[x] F(x, y) -> A[x] E[y] F(x, y)')
  return (
    <SymPresentationCtx.Provider value={presentationCtx}>
      <ExpressionView expression={formula}/>
    </SymPresentationCtx.Provider>
  )
}

const useFormula = formulaText => {
  const [state] = useState(() => {
    const parser = new FormulaParser(primitivePresentationCtx)
    const formula = parser.parse(formulaText)
    const presentationCtx = parser.presentationCtx
    return {
      formula,
      presentationCtx
    }
  })

  return state
}

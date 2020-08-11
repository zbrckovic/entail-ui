import { withKnobs } from '@storybook/addon-knobs'
import { FormulaParser } from '@zbrckovic/entail-core/lib/parsers/formula-parser'
import { primitivePresentationCtx } from '@zbrckovic/entail-core/lib/presentation/sym-presentation/primitive-presentation-ctx'
import { ExpressionView } from 'components/expression-view'
import { SymPresentationCtx } from 'contexts'
import React, { useState } from 'react'
import { scrollDecorator } from 'storybook/scroll-decorator'
import { useEnteredFormula } from 'storybook/use-entered-formula'
import { exampleMixin } from 'style/storybook'

export default {
  title: 'ExpressionView',
  component: ExpressionView,
  decorators: [
    withKnobs({ escapeHTML: false }),
    scrollDecorator
  ]
}

export const Tweak = () => {
  const state = useEnteredFormula('p')

  if (state === undefined) return <div>Enter formula</div>

  const { success, error } = state
  if (error !== undefined) return <div>{error.message}</div>

  const { formula, presentationCtx } = success
  return (
    <SymPresentationCtx.Provider value={presentationCtx}>
      <ExpressionView css={`${exampleMixin}`} expression={formula}/>
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
          ${exampleMixin}
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
      <ExpressionView
        className={'storybook-frame'}
        expression={formula}
      />
    </SymPresentationCtx.Provider>
  )
}

const useFormula = formulaText => {
  const [state] = useState(() => {
    const parser = new FormulaParser(primitivePresentationCtx)
    const formula = parser.parse(formulaText)
    const presentationCtx = parser.presentationCtx
    return { formula, presentationCtx }
  })

  return state
}

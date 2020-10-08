import { ExpressionView } from 'components/expression-view'
import { SymCtx } from 'contexts'
import React, { useState } from 'react'
import { useEnteredFormulaText } from 'storybook/use-entered-formula-text'

export default {
  title: 'ExpressionView',
  component: ExpressionView,
  argTypes: {
    formula: {
      control: 'text',
      defaultValue: 'E[y] A[x] F(x, y) -> A[x] E[y] F(x, y)'
    }
  }
}

export const Default = ({ formula: formulaText }) => {
  const [selectionTarget, setSelectionTarget] = useState()

  const parseResult = useEnteredFormulaText(formulaText)

  if (parseResult === undefined) return <div>Enter formula</div>

  const { success, error } = parseResult
  if (error !== undefined) return <div>{error.message}</div>

  const { formula, symCtx } = success

  return (
    <SymCtx.Provider value={symCtx}>
      <ExpressionView
        expression={formula}
        selectionTarget={selectionTarget}
        onSelectionTargetChange={setSelectionTarget}
      />
    </SymCtx.Provider>
  )
}

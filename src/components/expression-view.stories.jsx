import { ExpressionView } from 'components/expression-view'
import { RootCtx, SymCtx } from 'contexts'
import React, { useContext, useEffect, useState } from 'react'
import { useEnteredFormulaText } from 'storybook/use-entered-formula-text'

export default {
  title: 'ExpressionView',
  component: ExpressionView,
  argTypes: {
    formula: {
      control: 'text',
      defaultValue: 'E[y] A[x] F(x, y) -> A[x] E[y] F(x, y)'
    },
    isDark: {
      control: 'boolean'
    }
  }
}

export const Default = ({ formula: formulaText, isDark }) => {
  const { theme: { setIsDark } } = useContext(RootCtx)
  useEffect(() => { setIsDark(isDark) }, [isDark, setIsDark])

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

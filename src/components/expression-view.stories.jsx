import { ExpressionView } from 'components/expression-view'
import { SymPresentationCtx } from 'contexts'
import React from 'react'
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
  const parseResult = useEnteredFormulaText(formulaText)

  if (parseResult === undefined) return <div>Enter formula</div>

  const { success, error } = parseResult
  if (error !== undefined) return <div>{error.message}</div>

  const { formula, presentationCtx } = success
  return (
    <SymPresentationCtx.Provider value={presentationCtx}>
      <ExpressionView expression={formula}/>
    </SymPresentationCtx.Provider>
  )
}

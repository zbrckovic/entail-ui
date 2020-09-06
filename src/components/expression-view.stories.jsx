import { ExpressionView } from 'components/expression-view'
import { SymPresentationCtx } from 'contexts'
import React from 'react'
import { useEnteredFormulaText } from 'storybook/use-entered-formula-text'
import Box from '@material-ui/core/Box'

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

  if (parseResult === undefined) return <Box>Enter formula</Box>

  const { success, error } = parseResult
  if (error !== undefined) return <Box>{error.message}</Box>

  const { formula, presentationCtx } = success
  return (
    <SymPresentationCtx.Provider value={presentationCtx}>
      <ExpressionView expression={formula} />
    </SymPresentationCtx.Provider>
  )
}

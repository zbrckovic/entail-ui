import { Callout } from '@blueprintjs/core'
import { withKnobs } from '@storybook/addon-knobs'
import { ExpressionView } from 'components/expression-view/expression-view'
import { SymPresentationCtx } from 'contexts'
import React from 'react'
import { useEnteredFormula } from 'storybook-common/use-entered-formula'

export default {
  title: 'ExpressionView',
  component: ExpressionView,
  decorators: [withKnobs({ escapeHTML: false })]
}

export const Tweak = () => {
  const state = useEnteredFormula('p')

  if (state === undefined) return <div>Enter formula</div>

  const { formula, presentationCtx, error } = state

  return (
    <SymPresentationCtx.Provider value={presentationCtx}>
      {
        error !== undefined
          ? <Callout intent="danger">{error.message}</Callout>
          : <ExpressionView expression={formula}/>
      }
    </SymPresentationCtx.Provider>
  )
}

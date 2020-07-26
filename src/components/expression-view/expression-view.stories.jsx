import { Callout } from '@blueprintjs/core'
import { withKnobs } from '@storybook/addon-knobs'
import { primitivePresentationCtx } from '@zbrckovic/entail-core/lib/presentation/sym-presentation/primitive-presentation-ctx'
import { ExpressionView } from 'components/expression-view/expression-view'
import { SymPresentationCtx } from 'contexts'
import React from 'react'
import { useEnteredFormula } from 'storybook-common/use-entered-formula'

export default {
  title: 'ExpressionView',
  component: ExpressionView,
  decorators: [withKnobs()]
}

export const Tweak = () => {
  const { formula, presentationCtx, error } = useEnteredFormula('p')

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

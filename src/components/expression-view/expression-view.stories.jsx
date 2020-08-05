import { Callout } from '@blueprintjs/core'
import { withKnobs } from '@storybook/addon-knobs'
import { FormulaParser } from '@zbrckovic/entail-core/lib/parsers/formula-parser'
import { primitivePresentationCtx } from '@zbrckovic/entail-core/lib/presentation/sym-presentation/primitive-presentation-ctx'
import classNames from 'classnames'
import { ExpressionView } from 'components/expression-view/expression-view'
import { ThemeSwitch } from 'components/theme-switch'
import { SymPresentationCtx } from 'contexts'
import React, { useState } from 'react'
import { scrollDecorator } from 'storybook/scroll-decorator'
import { useEnteredFormula } from 'storybook/use-entered-formula'
import style from './expression-view.stories.module.scss'

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

  if (error !== undefined) return <Callout intent="danger">{error.message}</Callout>

  const { formula, presentationCtx } = success
  return (
    <SymPresentationCtx.Provider value={presentationCtx}>
      <ExpressionView
        className={'storybook-frame'}
        expression={formula}
        background
      />
      <ThemeSwitch/>
    </SymPresentationCtx.Provider>
  )
}

export const MinWidth = () => {
  const { formula, presentationCtx } = useFormula('E[y] A[x] F(x, y) -> A[x] E[y] F(x, y)')
  return (
    <SymPresentationCtx.Provider value={presentationCtx}>
      <ExpressionView
        className={classNames('storybook-frame', style['min-width'])}
        expression={formula}
        background
      />
      <ThemeSwitch/>
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
        background
      />
      <ThemeSwitch/>
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

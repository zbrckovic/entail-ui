import { action, decorate } from '@storybook/addon-actions'
import { primitivePresentationCtx } from '@zbrckovic/entail-core/lib/presentation/sym-presentation/primitive-presentation-ctx'
import { FormulaEditor } from 'components/formula-editor'
import { SymPresentationCtx } from 'contexts'
import React from 'react'
import { jsonDecorator } from 'storybook/action-decorators'
import { exampleMixin } from 'style/storybook'

export default {
  title: 'FormulaEditor',
  component: FormulaEditor
}

const actionJson = decorate([jsonDecorator])

export const FullWidth = () => {
  return (
    <SymPresentationCtx.Provider value={primitivePresentationCtx}>
      <FormulaEditor
        css={`${exampleMixin}`}
        onSubmit={actionJson.action('submit')}
        onCancel={action('cancel')}
      />
    </SymPresentationCtx.Provider>
  )
}

export const MinWidth = () => {
  return (
    <SymPresentationCtx.Provider value={primitivePresentationCtx}>
      <FormulaEditor
        css={`
          align-self: flex-start; 
          ${exampleMixin}
        `}
        onSubmit={actionJson.action('submit')}
        onCancel={action('cancel')}
      />
    </SymPresentationCtx.Provider>
  )
}

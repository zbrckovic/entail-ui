import { action, decorate } from '@storybook/addon-actions'
import { primitivePresentationCtx } from '@zbrckovic/entail-core/lib/presentation/sym-presentation/primitive-presentation-ctx'
import { FormulaEditor } from 'components/formula-editor'
import { SymPresentationCtx } from 'contexts'
import React from 'react'
import { jsonDecorator } from 'storybook-common/action-decorators'

export default {
  title: 'FormulaEditor',
  component: FormulaEditor
}

const actionJson = decorate([jsonDecorator])

export const Default = () => {
  return (
    <SymPresentationCtx.Provider value={primitivePresentationCtx}>
      <FormulaEditor
        onSubmit={actionJson.action('submit')}
        onCancel={action('cancel')}
      />
    </SymPresentationCtx.Provider>
  )
}

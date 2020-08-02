import { action, decorate } from '@storybook/addon-actions'
import { primitivePresentationCtx } from '@zbrckovic/entail-core/lib/presentation/sym-presentation/primitive-presentation-ctx'
import classNames from 'classnames'
import { FormulaEditor } from 'components/formula-editor'
import { ThemeSwitch } from 'components/theme-switch'
import { SymPresentationCtx } from 'contexts'
import React from 'react'
import { jsonDecorator } from 'storybook/action-decorators'
import style from './formula-editor.stories.module.scss'

export default {
  title: 'FormulaEditor',
  component: FormulaEditor
}

const actionJson = decorate([jsonDecorator])

export const FullWidth = () => {
  return (
    <SymPresentationCtx.Provider value={primitivePresentationCtx}>
      <FormulaEditor
        className={classNames('storybook-frame')}
        onSubmit={actionJson.action('submit')}
        onCancel={action('cancel')}
      />
      <ThemeSwitch/>
    </SymPresentationCtx.Provider>
  )
}

export const MinWidth = () => {
  return (
    <SymPresentationCtx.Provider value={primitivePresentationCtx}>
      <FormulaEditor
        className={classNames('storybook-frame', style['min-width'])}
        onSubmit={actionJson.action('submit')}
        onCancel={action('cancel')}
      />
      <ThemeSwitch/>
    </SymPresentationCtx.Provider>
  )
}

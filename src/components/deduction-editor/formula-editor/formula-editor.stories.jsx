import { primitivePresentations, primitiveSyms } from '@zbrckovic/entail-core'
import { FormulaEditor } from './formula-editor'
import { RootCtx, SymCtx } from 'contexts'
import React, { useContext, useEffect } from 'react'

export default {
  title: 'FormulaEditor',
  component: FormulaEditor,
  argTypes: {
    isDark: {
      control: 'boolean'
    },
    onSubmit: {
      action: 'submit'
    },
    onCancel: {
      action: 'cancel'
    },
    label: {
      control: 'text',
      defaultValue: 'Default label'
    }
  }
}

export const Default = ({ isDark, ...args }) => {
  const { theme: { setIsDark } } = useContext(RootCtx)
  useEffect(() => { setIsDark(isDark) }, [isDark, setIsDark])

  return (
    <SymCtx.Provider value={symCtx}>
      <FormulaEditor {...args} />
    </SymCtx.Provider>
  )
}

const symCtx = { syms: primitiveSyms, presentations: primitivePresentations }

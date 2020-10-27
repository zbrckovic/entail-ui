import { primitivePresentations, primitiveSyms } from '@zbrckovic/entail-core'
import { DeductionEditor } from './deduction-editor'
import { RootCtx, SymCtx } from 'contexts'
import React, { useContext, useEffect } from 'react'

export default {
  title: 'DeductionEditor',
  component: DeductionEditor,
  argTypes: {
    isDark: {
      control: 'boolean'
    }
  }
}

export const Default = ({ isDark }) => {
  const { theme: { setIsDark } } = useContext(RootCtx)
  useEffect(() => { setIsDark(isDark) }, [isDark, setIsDark])

  return (
    <SymCtx.Provider value={symCtx}>
      <DeductionEditor width='100%' height='100%' />
    </SymCtx.Provider>
  )
}

const symCtx = {
  syms: primitiveSyms,
  presentations: primitivePresentations
}

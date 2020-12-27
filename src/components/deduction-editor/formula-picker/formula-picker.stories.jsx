import { FormulaParser, primitivePresentations, primitiveSyms } from '@zbrckovic/entail-core'
import React, { useContext, useEffect } from 'react'
import { RootCtx, SymCtx } from 'contexts'
import { FormulaPicker } from './formula-picker'

export default {
  title: 'FormulaPicker',
  component: FormulaPicker,
  argTypes: {
    isDark: {
      control: 'boolean'
    },
    hasLabels: {
      control: 'boolean'
    },
    onSelect: {
      action: 'select'
    }
  }
}

export const Default = ({ isDark, hasLabels, onSelect }) => {
  const { theme: { setIsDark } } = useContext(RootCtx)
  useEffect(() => { setIsDark(isDark) }, [isDark, setIsDark])

  return (
    <SymCtx.Provider value={symCtx}>
      <FormulaPicker
        formulas={formulas}
        onSelect={onSelect}
        labels={hasLabels ? formulaTexts : undefined}
      />
    </SymCtx.Provider>
  )
}

const parser = FormulaParser({ syms: primitiveSyms, presentations: primitivePresentations })
const formulaTexts = ['~p', 'q']
const formulas = formulaTexts.map(formulaText => parser.parse(formulaText))
const symCtx = {
  syms: parser.getSyms(),
  presentations: parser.getPresentations()
}

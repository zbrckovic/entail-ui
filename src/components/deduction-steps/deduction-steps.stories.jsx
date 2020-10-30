import { DeductionParser, primitivePresentations, primitiveSyms } from '@zbrckovic/entail-core'
import { DeductionSteps } from './deduction-steps'
import { RootCtx, SymCtx } from 'contexts'
import React, { useContext, useEffect, useState } from 'react'

export default {
  title: 'DeductionSteps',
  component: DeductionSteps,
  argTypes: {
    isDark: {
      control: 'boolean'
    },
    isStepSelectionEnabled: {
      control: 'boolean'
    },
    text: {
      table: { disable: true },
      control: { disable: true }
    },
    onSelectedStepsChange: {
      action: 'selectedSteps',
      table: { disable: true },
      control: { disable: true }
    }
  }
}

const Template = ({
  text,
  isStepSelectionEnabled,
  onSelectedStepsChange,
  isDark
}) => {
  const { theme: { setIsDark } } = useContext(RootCtx)
  useEffect(() => { setIsDark(isDark) }, [isDark, setIsDark])

  const [{ deduction, symCtx }] = useState(() => {
    const parser = DeductionParser(primitiveSymCtx)
    const deduction = parser.parse(text)
    const syms = parser.getSyms()
    const presentations = parser.getPresentations()
    return {
      deduction,
      symCtx: { syms, presentations }
    }
  })

  const [selectionTarget, setSelectionTarget] = useState()
  const [selectedSteps, setSelectedSteps] = useState(() => new Set())

  return (
    <SymCtx.Provider value={symCtx}>
      <DeductionSteps
        steps={deduction.steps}
        selectedSteps={isStepSelectionEnabled ? selectedSteps : undefined}
        onSelectedStepsChange={isStepSelectionEnabled
          ? newSelectedSteps => {
            onSelectedStepsChange(newSelectedSteps)
            setSelectedSteps(newSelectedSteps)
          }
          : undefined
        }
        selectionTarget={selectionTarget}
        onSelectionTargetChange={setSelectionTarget}
      />
    </SymCtx.Provider>
  )
}

export const Example1 = Template.bind({})
Example1.args = {
  text: `
      (1) Ey Ax Fxy              / P;
  1   (2) Ax Fxa                 / EI 1;
  1   (3) Fba                    / UI 2;
  1   (4) Ey Fby                 / EG 3;
  1   (5) Ax Ey Fxy              / UG 4;
      (6) Ey Ax Fxy -> Ax Ey Fxy / D 1, 5;
  `
}

export const Example2 = Template.bind({})
Example2.args = {
  text: `
        (1)  Ax (Fx -> Gx)                                        / P;
        (2)  Ax (Gx -> Hx)                                        / P;
        (3)  Ex Fx                                                / P;
      3 (4)  Fa                                                   / EI 3;
      1 (5)  Fa -> Ga                                             / UI 1;
      2 (6)  Ga -> Ha                                             / UI 2;
  1,2,3 (7)  Ha                                                   / TI 4,5,6;
  1,2,3 (8)  Ex Hx                                                / EG 7;
    1,2 (9)  Ex Fx -> Ex Hx                                       / D 3, 8;
      1 (10) Ax (Gx -> Hx) -> (Ex Fx -> Ex Hx)                    / D 2, 9;
        (11) Ax (Fx -> Gx) -> (Ax (Gx -> Hx) -> (Ex Fx -> Ex Hx)) / D 1, 10; 
  `
}

export const Example3 = Template.bind({})
Example3.args = {
  text: `
       (1) p     / P;
       (2) q     / P;
  1, 2 (3) p & q / TI 1, 2;
  `
}

export const Example4 = Template.bind({})
Example4.args = {
  text: `
      (1) Ax Ey Ez Fxyz / P;
  1   (2) Ey Ez Fayz    / UI 1;
  1   (3) Ez Fabz       / EI 2;
  1   (4) Fabc          / EI 3;
  `
}

const primitiveSymCtx = {
  syms: primitiveSyms,
  presentations: primitivePresentations
}

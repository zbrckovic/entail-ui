import { DeductionParser, primitivePresentationCtx } from '@zbrckovic/entail-core'
import { DeductionSteps } from './deduction-steps'
import { SymCtx } from 'contexts'
import React, { useState } from 'react'

export default {
  title: 'DeductionSteps',
  component: DeductionSteps,
  argTypes: {
    isStepSelectionEnabled: {
      control: 'boolean'
    },
    hasLastStepAccessory: {
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
  hasLastStepAccessory
}) => {
  const [{ deduction, presentationCtx }] = useState(() => {
    const parser = new DeductionParser(primitivePresentationCtx)
    const deduction = parser.parse(text)
    const presentationCtx = parser.presentationCtx
    return {
      deduction,
      presentationCtx
    }
  })

  const [selectedSteps, setSelectedSteps] = useState(() => new Set())

  return (
    <SymCtx.Provider value={presentationCtx}>
      <DeductionSteps
        steps={deduction.steps}
        selectedSteps={isStepSelectionEnabled ? selectedSteps : undefined}
        onSelectedStepsChange={isStepSelectionEnabled
          ? newSelectedSteps => {
            onSelectedStepsChange([...newSelectedSteps.keys()])
            setSelectedSteps(newSelectedSteps)
          }
          : undefined
        }
        lastStepAccessory={hasLastStepAccessory ? <LastStepAccessory /> : undefined}
      />
    </SymCtx.Provider>
  )
}

const LastStepAccessory = () => <div>Last Step Accessory Example</div>

export const Example1 = Template.bind({})
Example1.args = {
  text: `
      (1) E[y] A[x] F(x, y)                           / P;
  1   (2) A[x] F(x, a)                                / EI 1;
  1   (3) F(b, a)                                     / UI 2;
  1   (4) E[y] F(b, y)                                / EG 3;
  1   (5) A[x] E[y] F(x, y)                           / UG 4;
      (6) E[y] A[x] F(x, y) -> A[x] E[y] F(x, y)      / D 1, 5;
  `
}

export const Example2 = Template.bind({})
Example2.args = {
  text: `
        (1)  A[x] (F(x) -> G(x))                                                      / P;
        (2)  A[x] (G(x) -> H(x))                                                      / P;
        (3)  E[x] F(x)                                                                / P;
      3 (4)  F(a)                                                                     / EI 3;
      1 (5)  F(a) -> G(a)                                                             / UI 1;
      2 (6)  G(a) -> H(a)                                                             / UI 2;
  1,2,3 (7)  H(a)                                                                     / TI 4,5,6;
  1,2,3 (8)  E[x] H(x)                                                                / EG 7;
    1,2 (9)  E[x] F(x) -> E[x] H(x)                                                   / D 3, 8;
      1 (10) A[x] (G(x) -> H(x)) -> (E[x] F(x) -> E[x] H(x))                          / D 2, 9;
        (11) A[x] (F(x) -> G(x)) -> (A[x] (G(x) -> H(x)) -> (E[x] F(x) -> E[x] H(x))) / D 1, 10; 
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
      (1) A[x] E[y] E[z] F(x, y, z) / P;
  1   (2) E[y] E[z] F(a, y, z)      / UI 1;
  1   (3) E[z] F(a, b, z)           / EI 2;
  1   (4) F(a, b, c)                / EI 3;
  `
}

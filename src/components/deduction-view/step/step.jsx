import { ExpressionView } from 'components/expression-view'
import React from 'react'
import { Assumptions } from './assumptions'
import { Premises } from './premises'
import { Rule } from './rule'
import { StepNumber } from './step-number'

export const Step = ({
  step: { assumptions, formula, ruleApplicationSummary },
  stepNumber
}) => (
  <>
    <Assumptions
      assumptions={assumptions}
      mr='1ch'
    />
    <StepNumber number={stepNumber} mr='1ch'/>
    <ExpressionView expression={formula} mr='1ch'/>
    <Rule rule={ruleApplicationSummary.rule} mr='1ch'/>
    <Premises premises={ruleApplicationSummary.premises}/>
  </>
)

import { Rule } from 'components/deduction-view/step/rule'
import { StepNumber } from 'components/deduction-view/step/step-number'
import React from 'react'
import { ExpressionView } from '../../expression-view'
import { Assumptions } from './assumptions'
import { Premises } from './premises'

export const Step = ({ step: { assumptions, formula, ruleApplicationSummary }, stepNumber }) => {
  return <>
    <Assumptions assumptions={assumptions}/>
    <StepNumber number={stepNumber}/>
    <ExpressionView expression={formula}/>
    <Rule rule={ruleApplicationSummary.rule}/>
    <Premises premises={ruleApplicationSummary.premises}/>
  </>
}

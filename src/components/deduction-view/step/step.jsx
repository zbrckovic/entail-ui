import { ExpressionView } from 'components/expression-view'
import React from 'react'
import { Assumptions } from './assumptions'
import { Premises } from './premises'
import { Rule } from './rule'
import { StepNumber } from './step-number'

export const Step = ({ step: { assumptions, formula, ruleApplicationSummary }, stepNumber }) => {
  return <>
    <Assumptions assumptions={assumptions}/>
    <StepNumber number={stepNumber}/>
    <ExpressionView expression={formula}/>
    <Rule rule={ruleApplicationSummary.rule}/>
    <Premises premises={ruleApplicationSummary.premises}/>
  </>
}

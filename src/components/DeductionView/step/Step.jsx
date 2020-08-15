import ExpressionView from 'components/ExpressionView'
import React from 'react'
import Assumptions from './Assumptions'
import Premises from './Premises'
import Rule from './Rule'
import StepNumber from './StepNumber'

const Step = ({ step: { assumptions, formula, ruleApplicationSummary }, stepNumber }) => {
  return <>
    <Assumptions assumptions={assumptions}/>
    <StepNumber number={stepNumber}/>
    <ExpressionView expression={formula}/>
    <Rule rule={ruleApplicationSummary.rule}/>
    <Premises premises={ruleApplicationSummary.premises}/>
  </>
}

export default Step

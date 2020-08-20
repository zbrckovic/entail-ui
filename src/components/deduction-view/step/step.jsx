import { ExpressionView } from 'components/expression-view'
import React from 'react'
import { Box } from 'rebass'
import { Assumptions } from './assumptions'
import { Premises } from './premises'
import { Rule } from './rule'
import { StepNumber } from './step-number'

export const Step = ({
  step: { assumptions, formula, ruleApplicationSummary },
  stepNumber
}) =>
  <>
    <Box bg='neutral' px={1}>
      <StepNumber number={stepNumber}/>
    </Box>
    <Box px={1}>
      <Assumptions assumptions={assumptions}/>
    </Box>
    <Box px={1}>
      <ExpressionView expression={formula}/>
    </Box>
    <Box px={1}>
      <Rule rule={ruleApplicationSummary.rule}/>
    </Box>
    <Box px={1}>
      <Premises premises={ruleApplicationSummary.premises}/>
    </Box>
  </>


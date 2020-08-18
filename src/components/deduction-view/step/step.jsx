import { ExpressionView } from 'components/expression-view'
import React from 'react'
import { Assumptions } from './assumptions'
import { Premises } from './premises'
import { Rule } from './rule'
import { StepNumber } from './step-number'
import { Flex } from 'rebass'

export const Step = ({
  step: { assumptions, formula, ruleApplicationSummary },
  stepNumber,
  ...props
}) =>
  <Flex {...props}>
    <Assumptions
      flexBasis='1ch'
      flexShrink={0}
      assumptions={assumptions}
    />
    <StepNumber
      flexBasis='3ch'
      flexShrink={0}
      number={stepNumber}
    />
    <ExpressionView
      flexGrow={1}
      expression={formula}
    />
    <Rule
      flexBasis='2ch'
      flexShrink={0}
      rule={ruleApplicationSummary.rule}
    />
    <Premises
      flexBasis='3ch'
      flexShrink={0}
      premises={ruleApplicationSummary.premises}
    />
  </Flex>

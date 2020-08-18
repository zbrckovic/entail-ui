import { ExpressionView } from 'components/expression-view'
import React from 'react'
import { Box } from 'rebass'
import { Assumptions } from './assumptions'
import { Premises } from './premises'
import { Rule } from './rule'
import { StepNumber } from './step-number'

const commonStyle = {
  pt: 2,
  px: 2,
  alignSelf: 'flex-end',
  height: '100%',
  borderBottomWidth: 1,
  borderBottomStyle: 'solid',
  borderBottomColor: 'border'
}

const borderLeft = {
  borderLeftWidth: 1,
  borderLeftStyle: 'solid',
  borderLeftColor: 'border'
}

const borderRight = {
  borderRightWidth: 1,
  borderRightStyle: 'solid',
  borderRightColor: 'border'
}

export const Step = ({
  step: { assumptions, formula, ruleApplicationSummary },
  stepNumber
}) =>
  <>
    <Box sx={{ ...commonStyle, bg: 'neutral' }}>
      <StepNumber number={stepNumber}/>
    </Box>
    <Box sx={{ textAlign: 'right', ...commonStyle, ...borderRight }}>
      <Assumptions assumptions={assumptions}/>
    </Box>
    <Box sx={{ ...commonStyle, px: 2 }}>
      <ExpressionView
        sx={{ ml: 2 }}
        expression={formula}
        fontSize='small'
      />
    </Box>
    <Box sx={{ ...commonStyle, ...borderLeft, ...borderRight }}>
      <Rule rule={ruleApplicationSummary.rule}/>
    </Box>
    <Box sx={{ ...commonStyle }}>
      <Premises premises={ruleApplicationSummary.premises}/>
    </Box>
  </>

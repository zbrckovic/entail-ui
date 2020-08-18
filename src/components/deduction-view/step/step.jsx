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
  height: '100%'
}

const borderBottom = {
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
  stepNumber,
  isLast
}) => {
  return <>
    <Box sx={{ ...commonStyle, textAlign: 'right', bg: 'neutral' }}>
      <StepNumber number={stepNumber}/>
    </Box>
    <Box
      sx={{
        ...commonStyle,
        ...borderRight,
        textAlign: 'right',
        ...isLast ? {} : borderBottom
      }}
    >
      <Assumptions assumptions={assumptions}/>
    </Box>
    <Box
      sx={{
        px: 2,
        ...commonStyle,
        ...(isLast ? {} : borderBottom)
      }}
    >
      <ExpressionView
        expression={formula}
        fontSize='normal'
      />
    </Box>
    <Box
      sx={{
        ...commonStyle,
        ...borderLeft,
        ...borderRight,
        ...(isLast ? {} : borderBottom)
      }}
    >
      <Rule rule={ruleApplicationSummary.rule}/>
    </Box>
    <Box
      sx={{
        ...commonStyle,
        ...(isLast ? {} : borderBottom)
      }}
    >
      <Premises premises={ruleApplicationSummary.premises}/>
    </Box>
  </>
}

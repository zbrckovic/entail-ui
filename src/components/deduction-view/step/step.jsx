import { css } from '@emotion/core'
import { ExpressionView } from 'components/expression-view'
import React from 'react'
import { Box, Flex } from 'rebass'
import { useScreenSizeQuery } from 'style/use-screen-size-query'
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

export const Step = ({
  step: { assumptions, formula, ruleApplicationSummary },
  stepNumber,
  isLast
}) => {
  const { isPhoneLandscape } = useScreenSizeQuery()

  if (isPhoneLandscape) {
    return (
      <>
        <Box
          bg='neutral'
          px={1}
        >
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
    )
  }

  return <>
    <Box
      sx={{
        gridRowEnd: 'span 2'
      }}
      bg='neutral'
      px={1}
    >
      <StepNumber number={stepNumber}/>
    </Box>
    <Box px={1}>
      <Assumptions
        fontSize='tiny'
        assumptions={assumptions}
        mr={1}
      />
    </Box>
    <Box px={1} textAlign='right'>
      <Premises premises={ruleApplicationSummary.premises}/>
    </Box>
    <Box>
      <Rule rule={ruleApplicationSummary.rule}/>
    </Box>
    <Box
      sx={{
        gridColumnStart: 2,
        gridColumnEnd: 'span 4',
        ...borderBottom
      }}
    >
      <ExpressionView
        fontSize='small'
        expression={formula}
      />
    </Box>
  </>
}

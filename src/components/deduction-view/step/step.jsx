import { ExpressionView } from 'components/expression-view'
import React from 'react'
import { Box, Text } from 'rebass'
import { Assumptions } from './assumptions'
import { Premises } from './premises'
import { Rule } from './rule'

export const Step = ({
  step: { assumptions, formula, ruleApplicationSummary },
  stepNumber,
  selected,
  onSelect,
  onDeselect
}) =>
  <>
    <Box
      sx={{
        bg: selected ? 'primary' : 'neutral',
        px: 1
      }}
    >
      <Text
        as='span'
        fontSize='small'
        fontWeight='semiBold'
        onClick={() => { if (selected) { onDeselect() } else { onSelect() } }}
        sx={{
          cursor: 'pointer'
        }}
      >{stepNumber}</Text>
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


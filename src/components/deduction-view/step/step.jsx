import { ExpressionView } from 'components/expression-view'
import { useTheme } from 'emotion-theming'
import { readableColor } from 'polished'
import React, { useMemo } from 'react'
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
}) => {
  const hasControls = useMemo(
    () => onSelect !== undefined || onDeselect !== undefined,
    [onSelect, onDeselect]
  )

  return <>
    <StepNumber
      stepNumber={stepNumber}
      selected={selected}
      onSelect={onSelect}
      onDeselect={onDeselect}
    />
    <Box px={2}>
      <Assumptions assumptions={assumptions} />
    </Box>
    <Box px={2}>
      <ExpressionView expression={formula} />
    </Box>
    <Box px={2}>
      <Rule rule={ruleApplicationSummary.rule} />
    </Box>
    <Box px={2}>
      <Premises premises={ruleApplicationSummary.premises} />
    </Box>
  </>
}

const StepNumber = ({ stepNumber, selected, onSelect, onDeselect }) => {
  const hasControls = useMemo(
    () => onSelect !== undefined || onDeselect !== undefined,
    [onSelect, onDeselect]
  )

  return (
    <Box
      sx={{
        bg: selected ? 'primaryWidget' : 'neutralWidget',
        color: selected ? 'onPrimaryWidget' : 'onNeutralWidget',
        px: 2,
        cursor: hasControls ? 'pointer' : 'auto'
      }}
      onClick={() => { if (selected) { onDeselect() } else { onSelect() } }}
    >
      <Text
        as='span'
        fontSize='small'
        fontWeight='semiBold'
      >{stepNumber}</Text>
    </Box>
  )
}

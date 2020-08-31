import { ExpressionView } from 'components/expression-view'
import { useRuleDescriber } from 'hooks'
import React, { Fragment, useMemo } from 'react'
import { Box, Text } from 'rebass'

export const DeductionSteps = ({ steps, selectedSteps, onSelectedStepsChange, ...props }) => {
  const lastStepNumber = steps.size
  const lastStepNumberDigitsCount = Math.floor(Math.log10(lastStepNumber)) + 1

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'min-content max-content auto min-content max-content'
      }}
      {...props}
    >
      {steps.map((step, i) => {
        const stepNumber = i + 1

        return (
          <Step
            key={i}
            step={step}
            stepNumber={stepNumber}
            stepNumberColumnWidth={`${lastStepNumberDigitsCount}ch`}
            isLast={stepNumber === lastStepNumber}
            selected={selectedSteps?.has(stepNumber)}
            onSelect={() => {
              const newSelectedSteps = new Set(selectedSteps)
              newSelectedSteps.add(stepNumber)
              onSelectedStepsChange?.(newSelectedSteps)
            }}
            onDeselect={() => {
              const newSelectedSteps = new Set(selectedSteps)
              newSelectedSteps.delete(stepNumber)
              onSelectedStepsChange?.(newSelectedSteps)
            }}
          />
        )
      })}
    </Box>
  )
}

export const Step = ({
  step: { assumptions, formula, ruleApplicationSummary },
  stepNumber,
  selected,
  onSelect,
  onDeselect
}) => {
  return <>
    <StepNumber
      stepNumber={stepNumber}
      selected={selected}
      onSelect={onSelect}
      onDeselect={onDeselect}
    />
    <Box px={2}>
      <StepAssumptions assumptions={assumptions} />
    </Box>
    <Box px={2}>
      <ExpressionView expression={formula} />
    </Box>
    <Box px={2}>
      <StepRule rule={ruleApplicationSummary.rule} />
    </Box>
    <Box px={2}>
      <StepPremises premises={ruleApplicationSummary.premises} />
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
        bg: selected ? 'primary' : 'surfaceAlternative',
        color: selected ? 'onPrimary' : 'onSurfaceAlternative',
        px: 2,
        cursor: hasControls ? 'pointer' : 'auto',
        userSelect: 'none'
      }}
      onClick={() => { if (selected) { onDeselect() } else { onSelect() } }}
    >
      <Text
        as='span'
        fontWeight='semiBold'
      >{stepNumber}</Text>
    </Box>
  )
}

export const StepAssumptions = ({ assumptions, ...props }) => {
  const assumptionSorted = useMemo(() => assumptions.sort().toArray(), [assumptions])

  return (
    <Text
      as='span'
      fontStyle='italic'
      sx={{ color: 'textLight' }}
      {...props}
    >
      {assumptionSorted.map((assumption, i) => {
        const isLast = i === assumptionSorted.length - 1

        return (
          <Fragment key={assumption}>
            <span>{assumption + 1}</span>
            {isLast || ', '}
          </Fragment>
        )
      })}
    </Text>
  )
}

export const StepPremises = ({ premises, sx, ...props }) => {
  const premisesOrdered = useMemo(() => premises.toArray(), [premises])

  return (
    <Text
      as='span'
      fontStyle='italic'
      sx={{ color: 'textLight' }}
      {...props}
    >
      {premisesOrdered.map((premise, i) => {
        const isLast = i === premisesOrdered.length - 1

        return (
          <Fragment key={premise}>
            <span>{premise + 1}</span>
            {isLast || ', '}
          </Fragment>
        )
      })}
    </Text>
  )
}

export const StepRule = ({ rule, ...props }) => {
  const ruleDescriber = useRuleDescriber()
  const { abbreviation } = ruleDescriber(rule)

  return (
    <Text
      fontWeight='semiBold'
      as='span'
      {...props}
    >
      {abbreviation}
    </Text>
  )
}

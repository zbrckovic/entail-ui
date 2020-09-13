import React, { useMemo } from 'react'
import Box from '@material-ui/core/Box'
import { Step } from './step'
import { makeStyles } from '@material-ui/core/styles'
import { MAX_PREMISES_LIST_LENGTH, MAX_RULE_ABBREVIATION_LENGTH } from '../../constants'

/* Supports step selection if `selectedSteps` and `onSelectedStepsChange` are provided */
export const DeductionSteps = ({
  steps,
  selectedSteps,
  onSelectedStepsChange,
  lastStepAccessory,
  ...props
}) => {
  const hasStepSelection = selectedSteps !== undefined && onSelectedStepsChange !== undefined

  const classes = useStyles()

  const columnWidths = useMemo(
    () => calculateColumnWidths({ steps, lastStepAccessory }),
    [steps, lastStepAccessory]
  )

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='stretch'
      {...props}
    >
      {steps.map((step, i) => {
        const stepNumber = i + 1

        return (
          <Step
            classes={classes}
            key={i}
            step={step}
            stepNumber={stepNumber}
            isLast={stepNumber === steps.size}
            columnWidths={columnWidths}
            hasStepSelection={hasStepSelection}
            selected={hasStepSelection ? selectedSteps.has(stepNumber) : undefined}
            onSelect={
              hasStepSelection
                ? () => {
                  const newSelectedSteps = new Set(selectedSteps)
                  newSelectedSteps.add(stepNumber)
                  onSelectedStepsChange(newSelectedSteps)
                }
                : undefined
            }
            onDeselect={
              hasStepSelection
                ? () => {
                  const newSelectedSteps = new Set(selectedSteps)
                  newSelectedSteps.delete(stepNumber)
                  onSelectedStepsChange(newSelectedSteps)
                }
                : undefined
            }
          />
        )
      })}
      {
        lastStepAccessory !== undefined
          ? (
            <Step
              key={steps.size + 1}
              stepNumber={steps.size + 1}
              classes={classes}
              columnWidths={columnWidths}
              hasStepSelection={hasStepSelection}
            >
              {lastStepAccessory}
            </Step>
          )
          : undefined
      }
    </Box>
  )
}

const useStyles = makeStyles(theme => {
  return ({
    checkbox: {
      padding: 0
    },
    row: {
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.palette.divider
    }
  })
})

const calculateColumnWidths = ({ steps, lastStepAccessory }) => {
  let lastStepNumber = steps.size
  if (lastStepAccessory !== undefined) {
    lastStepNumber += 1
  }
  const lastStepNumberDigitsCount = Math.floor(Math.log10(lastStepNumber)) + 1

  let assumptionsTextLength = 1
  let premisesTextLength = 1
  steps.forEach(({ assumptions, ruleApplicationSummary: { premises } }) => {
    const assumptionsText = assumptions.map(assumption => `${assumption}`).join(',')
    const premisesText = premises.map(assumption => `${assumption}`).join(',')
    assumptionsTextLength = Math.max(assumptionsTextLength, assumptionsText.length)
    premisesTextLength = Math.max(premisesTextLength, premisesText.length)
  })

  return {
    checkbox: '20px',
    stepNumber: `${lastStepNumberDigitsCount}ch`,
    assumptions: `${Math.min(MAX_PREMISES_LIST_LENGTH, assumptionsTextLength)}ch`,
    rule: `${MAX_RULE_ABBREVIATION_LENGTH}ch`,
    premises: `${Math.min(MAX_PREMISES_LIST_LENGTH, premisesTextLength)}ch`
  }
}

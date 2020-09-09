import { ExpressionView } from 'components/expression-view'
import { useRuleDescriber } from 'hooks'
import React, { Fragment, useMemo } from 'react'
import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Checkbox from '@material-ui/core/Checkbox'

/* Supports step selection if `selectedSteps` and `onSelectedStepsChange` are provided */
export const DeductionSteps = ({
  steps,
  selectedSteps,
  onSelectedStepsChange,
  lastStepAccessory,
  ...props
}) => {
  const isStepSelectionEnabled = selectedSteps !== undefined &&
    onSelectedStepsChange !== undefined &&
    lastStepAccessory === undefined

  const classes = useStyles({ isStepSelectionEnabled })

  const lastStepNumber = steps.size
  const lastStepNumberDigitsCount = Math.floor(Math.log10(lastStepNumber)) + 1

  const columnWidths = {
    checkbox: 0,
    stepNumber: 50,
    assumptions: 50,
    rule: 50,
    premises: 50
  }

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
            stepNumberColumnWidth={`${lastStepNumberDigitsCount}ch`}
            isLast={stepNumber === lastStepNumber}
            selected={isStepSelectionEnabled && selectedSteps.has(stepNumber)}
            columnWidths={columnWidths}
            onSelect={
              isStepSelectionEnabled
                ? () => {
                  const newSelectedSteps = new Set(selectedSteps)
                  newSelectedSteps.add(stepNumber)
                  onSelectedStepsChange(newSelectedSteps)
                }
                : undefined
            }
            onDeselect={
              isStepSelectionEnabled
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
            >
              {lastStepAccessory}
            </Step>
          )
          : undefined
      }
    </Box>
  )
}

export const Step = ({
  step,
  stepNumber,
  selected,
  onSelect,
  onDeselect,
  classes,
  children,
  columnWidths
}) => {
  const isStepSelectionEnabled = onSelect !== undefined && onDeselect !== undefined

  return (
    <Box display='flex' className={classes.row}>
      {
        children !== undefined
          ? (
            <>
              {isStepSelectionEnabled && <Box flexBasis={columnWidths.checkbox} />}
              <Box flexBasis={columnWidths.stepNumber}>{stepNumber}</Box>
              <Box>{children}</Box>
            </>
          ) : (
            <>
              {
                isStepSelectionEnabled &&
                <Box flexBasis={columnWidths.checkbox}>
                  <Checkbox
                    className={classes.checkbox}
                    disableRipple
                    checked={selected}
                    onChange={() => {
                      if (selected) {
                        onDeselect()
                      } else {
                        onSelect()
                      }
                    }}
                  />
                </Box>
              }
              <Box flexBasis={columnWidths.stepNumber}>
                {stepNumber}
              </Box>
              <Box flexBasis={columnWidths.assumptions}>
                <StepAssumptions assumptions={step.assumptions} />
              </Box>
              <Box flexGrow={1}>
                <ExpressionView expression={step.formula} />
              </Box>
              <Box flexBasis={columnWidths.rule}>
                <StepRule rule={step.ruleApplicationSummary.rule} />
              </Box>
              <Box flexBasis={columnWidths.premises}>
                <StepPremises premises={step.ruleApplicationSummary.premises} />
              </Box>
            </>
          )
      }
    </Box>
  )
}

export const StepAssumptions = ({ assumptions, ...props }) => {
  const assumptionSorted = useMemo(() => assumptions.sort().toArray(), [assumptions])

  return (
    <Box {...props}>
      {assumptionSorted.map((assumption, i) => {
        const isLast = i === assumptionSorted.length - 1

        return (
          <Fragment key={assumption}>
            <span>{assumption + 1}</span>
            {isLast || ', '}
          </Fragment>
        )
      })}
    </Box>
  )
}

export const StepPremises = ({ premises, sx, ...props }) => {
  const premisesOrdered = useMemo(() => premises.toArray(), [premises])

  return (
    <Box {...props}>
      {premisesOrdered.map((premise, i) => {
        const isLast = i === premisesOrdered.length - 1

        return (
          <Fragment key={premise}>
            <span>{premise + 1}</span>
            {isLast || ', '}
          </Fragment>
        )
      })}
    </Box>
  )
}

export const StepRule = ({ rule, ...props }) => {
  const ruleDescriber = useRuleDescriber()
  const { abbreviation } = ruleDescriber(rule)

  return <Box {...props}>{abbreviation}</Box>
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

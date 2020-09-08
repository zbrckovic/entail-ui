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
  const isStepSelectionEnabled = selectedSteps !== undefined && onSelectedStepsChange !== undefined

  const classes = useStyles({ isStepSelectionEnabled })

  const lastStepNumber = steps.size
  const lastStepNumberDigitsCount = Math.floor(Math.log10(lastStepNumber)) + 1

  return (
    <Box className={classes.grid} {...props}>
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
            <Step key={steps.size + 1} stepNumber={steps.size + 1} classes={classes}>
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
  children
}) => {
  const isStepSelectionEnabled =
    onSelect !== undefined && onDeselect !== undefined && children === undefined

  return children !== undefined
    ? <>
      <Box className={classes.cell}>{stepNumber}</Box>
      <Box className={`${classes.cell} ${classes.accessory}`}>{children}</Box>
    </>
    : <>
      {
        isStepSelectionEnabled &&
        <Box className={classes.cell}>
          <Checkbox
            className={classes.checkbox}
            disableRipple
            size='small'
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
      <Box className={classes.cell}>{stepNumber}</Box>
      <Box className={classes.cell}>
        <StepAssumptions assumptions={step.assumptions} />
      </Box>
      <Box className={classes.cell}>
        <ExpressionView expression={step.formula} />
      </Box>
      <Box className={classes.cell}>
        <StepRule rule={step.ruleApplicationSummary.rule} />
      </Box>
      <Box className={classes.cell}>
        <StepPremises premises={step.ruleApplicationSummary.premises} />
      </Box>
    </>
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
    grid: {
      display: 'grid',
      gridTemplateColumns: ({ isStepSelectionEnabled }) =>
        `repeat(${isStepSelectionEnabled ? 2 : 1}, min-content) max-content auto min-content max-content`
    },
    checkbox: {
      padding: 0
    },
    cell: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: theme.palette.divider
    },
    accessory: {
      gridColumn: '2 / span 4'
    }
  })
})

import { TableRow, Typography } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import { StepAssumptions } from 'components/deduction-steps/step-assumptions'
import { StepPremises } from 'components/deduction-steps/step-premises'
import { StepRule } from 'components/deduction-steps/step-rule'
import { ExpressionView } from 'components/expression-view'
import React from 'react'
import makeStyles from '@material-ui/core/styles/makeStyles'
import TableContainer from '@material-ui/core/TableContainer'
import Checkbox from '@material-ui/core/Checkbox'
import TableHead from '@material-ui/core/TableHead'

export const DeductionSteps = ({
  steps,

  // Must be provided to support step selection.
  selectedSteps,

  // Must be provided to support step selection.
  onSelectedStepsChange,
  lastStepAccessory,
  ...props
}) => {
  const classes = useStyles({
    checkbox: 38,
    number: '3ch',
    rule: '2ch',
    assumptions: '10ch',
    premises: '10ch'
  })

  console.log(classes)

  const hasRowSelection = selectedSteps !== undefined && onSelectedStepsChange !== undefined

  const hasSteps = steps.length > 0
  const areAllRowsSelected = hasRowSelection ? steps.length === selectedSteps.size : undefined
  const areSomeRowsSelected = hasRowSelection ? selectedSteps.size > 0 : undefined

  return (
    <TableContainer {...props}>
      <Table size='small'>
        <TableHead>
          <TableRow className={classes.row}>
            {
              hasRowSelection &&
              <TableCell className={`${classes.cell} ${classes.cellCheckbox}`}>
                {steps.length > 0 && (
                  <Checkbox
                    disableRipple
                    indeterminate={areSomeRowsSelected && !areAllRowsSelected}
                    checked={hasSteps && areAllRowsSelected}
                    onChange={() => {
                      if (areAllRowsSelected) {
                        onSelectedStepsChange(new Set())
                      } else {
                        const allStepNumbers = new Set(steps.map((step, i) => i + 1))
                        onSelectedStepsChange(allStepNumbers)
                      }
                    }}
                  />
                )}
              </TableCell>
            }
            <TableCell className={`${classes.cell} ${classes.cellNumber}`} />
            <TableCell className={`${classes.cell} ${classes.cellAssumptions}`} />
            <TableCell className={`${classes.cell} ${classes.cellFormula}`} />
            <TableCell className={`${classes.cell} ${classes.cellRule}`} />
            <TableCell className={`${classes.cell} ${classes.cellPremises}`} />
          </TableRow>
        </TableHead>
        <TableBody>
          {
            steps.map((step, i) => {
              const stepNumber = i + 1
              const isSelected = hasRowSelection ? selectedSteps.has(stepNumber) : undefined

              return (
                <TableRow
                  key={i}
                  className={classes.row}
                  selected={isSelected}
                  onClick={
                    hasRowSelection
                      ? () => {
                        const newSelectedSteps = new Set(selectedSteps)

                        if (isSelected) {
                          newSelectedSteps.delete(stepNumber)
                        } else {
                          newSelectedSteps.add(stepNumber)
                        }

                        onSelectedStepsChange(newSelectedSteps)
                      }
                      : undefined
                  }
                >
                  {hasRowSelection && (
                    <TableCell className={`${classes.cell} ${classes.cellCheckbox}`}>
                      <Checkbox checked={isSelected} />
                    </TableCell>
                  )}
                  <TableCell className={`${classes.cell} ${classes.cellNumber}`}>
                    <Typography>{stepNumber}</Typography>
                  </TableCell>
                  <TableCell className={`${classes.cell} ${classes.cellAssumptions}`}>
                    <StepAssumptions assumptions={step.assumptions} />
                  </TableCell>
                  <TableCell className={`${classes.cell} ${classes.cellFormula}`}>
                    <ExpressionView expression={step.formula} />
                  </TableCell>
                  <TableCell className={`${classes.cell} ${classes.cellRule}`}>
                    <StepRule rule={step.ruleApplicationSummary.rule} />
                  </TableCell>
                  <TableCell className={`${classes.cell} ${classes.cellPremises}`}>
                    <StepPremises premises={step.ruleApplicationSummary.premises} />
                  </TableCell>
                </TableRow>
              )
            })
          }
          {
            lastStepAccessory !== undefined && (
              <TableRow key={steps.length + 1} className={classes.row}>
                {hasRowSelection && <TableCell className={classes.cell} />}
                <TableCell className={`${classes.cell} ${classes.cellNumber}`}>
                  <Typography>{steps.length + 1}</Typography>
                </TableCell>
                <TableCell className={classes.cell} />
                <TableCell className={classes.cell}>{lastStepAccessory}</TableCell>
                <TableCell className={classes.cell} colSpan={2} />
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const useStyles = makeStyles(theme => ({
  row: {},
  cell: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1)
  },
  cellCheckbox: {
    width: ({ checkbox }) => checkbox,
    padding: 0
  },
  cellNumber: {
    width: ({ number }) => number,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  cellAssumptions: {
    width: ({ assumptions }) => assumptions,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  cellFormula: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  cellRule: {
    width: ({ rule }) => rule,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  cellPremises: {
    width: ({ premises }) => premises,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  }
}))

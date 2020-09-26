import { TableRow } from '@material-ui/core'
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

const columnWidths = {
  checkbox: 38,
  number: '3ch',
  assumptions: 100,
  rule: 100,
  premises: 100
}

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
    number: '10ch',
    assumptions: 100,
    rule: 100,
    premises: 100
  })

  const hasRowSelection = selectedSteps !== undefined && onSelectedStepsChange !== undefined

  const hasSteps = steps.length > 0
  const areAllRowsSelected = hasRowSelection ? steps.length === selectedSteps.length : undefined
  const areSomeRowsSelected = hasRowSelection ? selectedSteps.length > 0 : undefined

  return (
    <TableContainer {...props}>
      <Table size='small'>
        <TableHead>
          <TableRow className={classes.row}>
            {
              hasRowSelection &&
              <TableCell width={columnWidths.checkbox} className={classes.cell}>
                {steps.length > 0 && (
                  <Checkbox
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
            <TableCell
              width={columnWidths.number}
              className={`${classes.cell} ${classes.cellNumber}`}
            />
            <TableCell width={columnWidths.assumptions} className={classes.cell} />
            <TableCell width={columnWidths.formula} className={classes.cell} />
            <TableCell width={columnWidths.rule} className={classes.cell} />
            <TableCell width={columnWidths.premises} className={classes.cell} />
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
                    <TableCell className={classes.cell}>
                      <Checkbox checked={isSelected} />
                    </TableCell>
                  )}
                  <TableCell className={classes.cell}>{stepNumber}</TableCell>
                  <TableCell className={classes.cell}>
                    <StepAssumptions assumptions={step.assumptions} />
                  </TableCell>
                  <TableCell className={classes.cell}>
                    <ExpressionView expression={step.formula} />
                  </TableCell>
                  <TableCell className={classes.cell}>
                    <StepRule rule={step.ruleApplicationSummary.rule} />
                  </TableCell>
                  <TableCell className={classes.cell}>
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
                <TableCell className={classes.cell}>
                  {steps.length + 1}
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

const useStyles = makeStyles(() => ({
  row: {},
  cell: {
    padding: 0,
    verticalAlign: 'top'
  },
  cellNumber: {
    width: ({ number }) => number
  }
}))

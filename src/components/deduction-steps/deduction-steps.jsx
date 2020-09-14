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

/* Supports step selection if `selectedSteps` and `onSelectedStepsChange` are provided */
export const DeductionSteps = ({
  steps,
  selectedSteps,
  onSelectedStepsChange,
  lastStepAccessory,
  ...props
}) => {
  const classes = useStyles()

  const hasRowSelection = selectedSteps !== undefined && onSelectedStepsChange !== undefined

  const hasSteps = steps.size > 0
  const areAllRowsSelected = hasRowSelection ? steps.size === selectedSteps.size : undefined
  const areSomeRowsSelected = hasRowSelection ? selectedSteps.size > 0 : undefined

  return (
    <TableContainer {...props}>
      <Table size='small'>
        <TableHead>
          <TableRow className={classes.row}>
            {
              hasRowSelection &&
              <TableCell className={classes.cell}>
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
              </TableCell>
            }
            <TableCell colSpan={5} />
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
              <TableRow key={steps.size + 1} className={classes.row}>
                {hasRowSelection && <TableCell className={classes.cell} />}
                <TableCell className={classes.cell}>
                  {steps.size + 1}
                </TableCell>
                <TableCell />
                <TableCell className={classes.cell} colSpan={3}>
                  {lastStepAccessory}
                </TableCell>
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const useStyles = makeStyles(theme => ({
  cell: {
    padding: 0
  },
  row: {}
}))

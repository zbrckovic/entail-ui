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
import { useTranslation } from 'react-i18next'

export const DeductionSteps = ({
  steps,

  // Must be provided to support step selection.
  selectedSteps,

  // Must be provided to support step selection.
  onSelectedStepsChange,
  lastStepAccessory,
  ...props
}) => {
  const { t } = useTranslation('DeductionSteps')

  const classes = useStyles()

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
              <TableCell className={classes.cell}>
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
            <TableCell className={classes.cell} />
            <TableCell className={classes.cell}>{t('label.assumptions')}</TableCell>
            <TableCell className={classes.cell} />
            <TableCell className={classes.cell}>{t('label.rule')}</TableCell>
            <TableCell className={classes.cell}>{t('label.premises')}</TableCell>
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
                  {steps.size + 1}
                </TableCell>
                <TableCell />
                <TableCell className={classes.cell}>{lastStepAccessory}</TableCell>
                <TableCell colSpan={2} />
              </TableRow>
            )
          }
        </TableBody>
      </Table>
    </TableContainer>
  )
}

const useStyles = makeStyles(() => ({
  cell: {
    padding: 0
  },
  row: {}
}))

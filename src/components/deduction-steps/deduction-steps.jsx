import { TableRow, Typography } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import Tooltip from '@material-ui/core/Tooltip'
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

  const classes = useStyles({
    checkbox: 38,
    number: '3ch',
    rule: '2ch',
    assumptions: '10ch',
    premises: '10ch'
  })

  const hasRowSelection = selectedSteps !== undefined && onSelectedStepsChange !== undefined

  const hasSteps = steps.length > 0
  const areAllRowsSelected = hasRowSelection ? steps.length === selectedSteps.size : undefined
  const areSomeRowsSelected = hasRowSelection ? selectedSteps.size > 0 : undefined

  return (
    <TableContainer {...props}>
      <Table>
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
            <TableCell className={`${classes.cell} ${classes.cellStepNumber}`}>
              <Tooltip title={t('label.stepNumber')}>
                <span>{t('label.stepNumberAbbreviated')}</span>
              </Tooltip>
            </TableCell>
            <TableCell className={`${classes.cell} ${classes.cellAssumptions}`}>
              <Tooltip title={t('label.assumptions')}>
                <span>{t('label.assumptionsAbbreviated')}</span>
              </Tooltip>
            </TableCell>
            <TableCell className={`${classes.cell} ${classes.cellFormula}`}>
              <Tooltip title={t('label.formula')}>
                <span>{t('label.formulaAbbreviated')}</span>
              </Tooltip>
            </TableCell>
            <TableCell className={`${classes.cell} ${classes.cellRule}`}>
              <Tooltip title={t('label.rule')}>
                <span>{t('label.ruleAbbreviated')}</span>
              </Tooltip>
            </TableCell>
            <TableCell className={`${classes.cell} ${classes.cellPremises}`}>
              <Tooltip title={t('label.premises')}>
                <span>{t('label.premisesAbbreviated')}</span>
              </Tooltip>
            </TableCell>
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
                  <TableCell className={`${classes.cell} ${classes.cellStepNumber}`}>
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
                <TableCell className={classes.cell} colSpan={hasRowSelection ? 6 : 5}>
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

const useStyles = makeStyles(() => ({
  row: {},
  cell: {},
  cellCheckbox: {
    width: ({ checkbox }) => checkbox
  },
  cellStepNumber: {
    width: ({ number }) => number
  },
  cellAssumptions: {
    width: ({ assumptions }) => assumptions
  },
  cellFormula: {},
  cellRule: {
    width: ({ rule }) => rule
  },
  cellPremises: {
    width: ({ premises }) => premises
  }
}))

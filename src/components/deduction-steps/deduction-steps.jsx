import { TableRow } from '@material-ui/core'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import { StepAssumptions } from 'components/deduction-steps/step-assumptions'
import { StepPremises } from 'components/deduction-steps/step-premises'
import { StepRule } from 'components/deduction-steps/step-rule'
import { ExpressionView } from 'components/expression-view'
import React from 'react'

/* Supports step selection if `selectedSteps` and `onSelectedStepsChange` are provided */
export const DeductionSteps = ({
  steps,
  selectedSteps,
  onSelectedStepsChange,
  lastStepAccessory,
  ...props
}) => {
  const hasStepSelection = selectedSteps !== undefined && onSelectedStepsChange !== undefined

  return (
    <Table size='small' {...props}>
      <TableBody>
        {
          steps.map((step, i) => {
            const stepNumber = i + 1

            // eslint-disable-next-line no-unused-vars
            const isSelected = hasStepSelection ? selectedSteps.has(stepNumber) : undefined

            // eslint-disable-next-line no-unused-vars
            const onSelect = () => {
              const newSelectedSteps = new Set(selectedSteps)
              newSelectedSteps.add(stepNumber)
              onSelectedStepsChange(newSelectedSteps)
            }

            // eslint-disable-next-line no-unused-vars
            const onDeselect = () => {
              const newSelectedSteps = new Set(selectedSteps)
              newSelectedSteps.delete(stepNumber)
              onSelectedStepsChange(newSelectedSteps)
            }

            return (
              <TableRow key={i}>
                <TableCell>
                  {stepNumber}
                </TableCell>
                <TableCell>
                  <StepAssumptions assumptions={step.assumptions}/>
                </TableCell>
                <TableCell>
                  <ExpressionView expression={step.formula}/>
                </TableCell>
                <TableCell>
                  <StepRule rule={step.ruleApplicationSummary.rule}/>
                </TableCell>
                <TableCell>
                  <StepPremises premises={step.ruleApplicationSummary.premises}/>
                </TableCell>
              </TableRow>
            )
          })
        }
        {
          lastStepAccessory !== undefined && (
            <TableRow key={steps.size + 1}>
              <TableCell>
                {steps.size + 1}
              </TableCell>
              <TableCell>
                {lastStepAccessory}
              </TableCell>
            </TableRow>
          )
        }
      </TableBody>
    </Table>
  )
}

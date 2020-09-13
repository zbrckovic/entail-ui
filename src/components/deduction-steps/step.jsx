import Box from '@material-ui/core/Box'
import Checkbox from '@material-ui/core/Checkbox'
import { ExpressionView } from '../expression-view'
import React from 'react'
import { StepPremises } from './step-premises'
import { StepRule } from './step-rule'
import { StepAssumptions } from './step-assumptions'

export const Step = ({
  step,
  stepNumber,
  hasStepSelection = false,
  selected,
  onSelect,
  onDeselect,
  classes,
  children,
  columnWidths
}) => {
  const stepNumberComponent =
    <Box flexBasis={columnWidths.stepNumber} fontWeight='bold' mr={2}>
      {stepNumber}
    </Box>

  return (
    <Box display='flex' className={classes.row}>
      {
        children !== undefined
          ? (
            <>
              {hasStepSelection && <Box flexBasis={columnWidths.checkbox} mr={2} />}
              {stepNumberComponent}
              <Box flexGrow={1}>{children}</Box>
            </>
          )
          : (
            <>
              {
                hasStepSelection &&
                <Box flexBasis={columnWidths.checkbox} mr={2}>
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
              {stepNumberComponent}
              <Box flexBasis={columnWidths.assumptions} textAlign='right' mr={2}>
                <StepAssumptions assumptions={step.assumptions} />
              </Box>
              <Box flexGrow={1} mr={2}>
                <ExpressionView expression={step.formula} />
              </Box>
              <Box flexBasis={columnWidths.rule} mr={2}>
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

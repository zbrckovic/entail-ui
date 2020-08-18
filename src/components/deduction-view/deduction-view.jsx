import React from 'react'
import { Step } from './step'
import { Box } from 'rebass'

export const DeductionView = ({ deduction, ...props }) => {
  const lastStepNumber = deduction.steps.size
  const lastStepNumberDigitsCount = Math.floor(Math.log10(lastStepNumber)) + 1

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'max-content max-content auto max-content max-content'
      }}
      {...props}
    >
      {deduction.steps.map((step, i) =>
        <Step
          key={i}
          step={step}
          stepNumber={i + 1}
          stepNumberColumnWidth={`${lastStepNumberDigitsCount}ch`}
        />
      )}
    </Box>
  )
}

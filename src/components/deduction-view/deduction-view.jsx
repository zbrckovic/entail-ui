import React from 'react'
import { Box } from 'rebass'
import { Step } from './step'

export const DeductionView = ({ deduction, selectedSteps, onSelectedStepsChange, ...props }) => {
  const lastStepNumber = deduction.steps.size
  const lastStepNumberDigitsCount = Math.floor(Math.log10(lastStepNumber)) + 1

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'min-content max-content auto min-content max-content'
      }}
      {...props}
    >
      {deduction.steps.map((step, i) =>
        <Step
          key={i}
          step={step}
          stepNumber={i + 1}
          stepNumberColumnWidth={`${lastStepNumberDigitsCount}ch`}
          isLast={i === deduction.steps.size - 1}
          selected={selectedSteps?.has(i)}
          onSelect={() => {
            const newSelectedSteps = new Set(selectedSteps)
            newSelectedSteps.add(i + 1)
            onSelectedStepsChange?.(newSelectedSteps)
          }}
          onDeselect={() => {
            const newSelectedSteps = new Set(selectedSteps)
            newSelectedSteps.remove(i + 1)
            onSelectedStepsChange?.(newSelectedSteps)
          }}
        />
      )}
    </Box>
  )
}

const style = {
  display: 'grid',
  gridTemplateColumns: 'min-content 1fr 1fr min-content',
  gridTemplateRows: 'repeat(10px, 20px)'
}

const phoneLandscapeStyle = {
  display: 'grid',
  gridTemplateColumns: 'min-content max-content auto min-content max-content'
}

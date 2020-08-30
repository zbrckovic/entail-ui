import React from 'react'
import { Box } from 'rebass'
import { Step } from './step'

export const Steps = ({ steps, selectedSteps, onSelectedStepsChange, ...props }) => {
  const lastStepNumber = steps.size
  const lastStepNumberDigitsCount = Math.floor(Math.log10(lastStepNumber)) + 1

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'min-content max-content auto min-content max-content'
      }}
      {...props}
    >
      {steps.map((step, i) => {
        const stepNumber = i + 1

        return (
          <Step
            key={i}
            step={step}
            stepNumber={stepNumber}
            stepNumberColumnWidth={`${lastStepNumberDigitsCount}ch`}
            isLast={stepNumber === lastStepNumber}
            selected={selectedSteps?.has(stepNumber)}
            onSelect={() => {
              const newSelectedSteps = new Set(selectedSteps)
              newSelectedSteps.add(stepNumber)
              onSelectedStepsChange?.(newSelectedSteps)
            }}
            onDeselect={() => {
              const newSelectedSteps = new Set(selectedSteps)
              newSelectedSteps.delete(stepNumber)
              onSelectedStepsChange?.(newSelectedSteps)
            }}
          />
        )
      })}
    </Box>
  )
}

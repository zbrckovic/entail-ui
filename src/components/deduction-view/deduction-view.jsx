import React from 'react'
import { Step } from './step'
import { Flex } from 'rebass'

export const DeductionView = ({ deduction, ...props }) => (
  <Flex flexDirection='column' alignItems='stretch' {...props}>
    {deduction.steps.map((step, i) =>
      <Step
        key={i}
        step={step}
        stepNumber={i + 1}
      />
    )}
  </Flex>
)

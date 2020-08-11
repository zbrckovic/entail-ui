import React from 'react'
import { Step } from './step'

export const DeductionView = ({ className, deduction }) => (
  <div className={className}>
    {deduction.steps.map((step, i) => <Step key={i} step={step} stepNumber={i + 1}/>)}
  </div>
)

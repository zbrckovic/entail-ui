import classNames from 'classnames'
import React from 'react'
import style from './deduction-view.module.scss'
import { Step } from './step'

export const DeductionView = ({ className, deduction }) => (
  <div className={classNames(className, style.container)}>
    {deduction.steps.map((step, i) => <Step key={i} step={step} stepNumber={i + 1}/>)}
  </div>
)

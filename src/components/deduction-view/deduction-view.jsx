import classNames from 'classnames'
import { CodeBackground } from 'components/code-background'
import React from 'react'
import style from './deduction-view.module.scss'
import { Step } from './step'

export const DeductionView = ({ className, deduction }) => (
  <CodeBackground className={classNames(className, style.container)}>
    {deduction.steps.map((step, i) => <Step key={i} step={step} stepNumber={i + 1}/>)}
  </CodeBackground>
)

import classNames from 'classnames'
import { StepNumber } from 'components/deduction-view/step/step-number'
import { useThemeClasses } from 'hooks'
import React from 'react'
import { ExpressionView } from '../../expression-view'
import { Assumptions } from './assumptions'
import { RuleApplicationSummary } from './rule-application-summary'
import style from './step.module.scss'

export const Step = ({ step: { assumptions, formula, ruleApplicationSummary }, stepNumber }) => {
  const themeClasses = useThemeClasses(style.dark)

  return <div className={classNames(themeClasses, style.container)}>
    <Assumptions assumptions={assumptions}/>
    <StepNumber number={stepNumber}/>
    <ExpressionView expression={formula}/>
    <RuleApplicationSummary ruleApplicationSummary={ruleApplicationSummary}/>
  </div>
}

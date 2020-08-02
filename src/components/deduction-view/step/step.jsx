import React from 'react'
import { useThemeClasses } from '../../../hooks'
import style from './step.module.scss'
import { ExpressionView } from '../../expression-view'
import { Assumptions } from './assumptions'
import { RuleApplicationSummary } from './rule-application-summary'
import classNames from 'classnames'

export const Step = ({ step: { assumptions, formula, ruleApplicationSummary }, stepNumber }) => {
  const themeClasses = useThemeClasses()

  return <div className={classNames(themeClasses, style.container)}>
    <Assumptions assumptions={assumptions}/>
    <span>{stepNumber}</span>
    <ExpressionView expression={formula}/>
    <RuleApplicationSummary ruleApplicationSummary={ruleApplicationSummary}/>
  </div>
}

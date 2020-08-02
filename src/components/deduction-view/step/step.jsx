import React from 'react'
import style from './step.module.scss'
import { ExpressionView } from '../../expression-view'
import { Assumptions } from './assumptions'
import { RuleApplicationSummary } from './rule-application-summary'

export const Step = ({ step: { assumptions, formula, ruleApplicationSummary }, stepNumber }) => {
  return <div className={style.container}>
    <Assumptions assumptions={assumptions}/>
    <span>{stepNumber}</span>
    <ExpressionView expression={formula}/>
    <RuleApplicationSummary ruleApplicationSummary={ruleApplicationSummary}/>
  </div>
}

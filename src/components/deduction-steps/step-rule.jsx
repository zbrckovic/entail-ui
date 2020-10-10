import { useRuleDescriber } from '../../hooks'
import React from 'react'
import style from './step-rule.m.scss'
import classnames from 'classnames'

export const StepRule = ({ rule, className, ...props }) => {
  const ruleDescriber = useRuleDescriber()
  const { abbreviation } = ruleDescriber(rule)

  return <span className={classnames(style.root, className)} {...props}>{abbreviation}</span>
}

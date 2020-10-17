import { useRuleDescriber } from '../../hooks'
import React from 'react'
import classnames from 'classnames'

export const StepRule = ({ rule, className, ...props }) => {
  const ruleDescriber = useRuleDescriber()
  const { abbreviation } = ruleDescriber(rule)

  return <strong className={classnames(className)} {...props}>{abbreviation}</strong>
}

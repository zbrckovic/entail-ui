import { useRuleDescriber } from '../../hooks'
import Box from '@material-ui/core/Box'
import React from 'react'

export const StepRule = ({ rule, ...props }) => {
  const ruleDescriber = useRuleDescriber()
  const { abbreviation } = ruleDescriber(rule)

  return <Box fontWeight='bold' {...props}>{abbreviation}</Box>
}

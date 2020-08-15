import { useRuleDescriber } from 'hooks'
import React from 'react'
import { Text } from 'rebass'

export const Rule = ({ rule }) => {
  const ruleDescriber = useRuleDescriber()
  const { abbreviation } = ruleDescriber(rule)

  return <Text>{abbreviation}</Text>
}

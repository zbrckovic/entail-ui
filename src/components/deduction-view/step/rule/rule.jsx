import { Code } from 'components/code'
import { useRuleDescriber } from 'hooks'
import React from 'react'

export const Rule = ({ rule }) => {
  const ruleDescriber = useRuleDescriber()
  const { abbreviation } = ruleDescriber(rule)

  return <Code>{abbreviation}</Code>
}

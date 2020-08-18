import { useRuleDescriber } from 'hooks'
import React from 'react'
import { Text } from 'rebass'

export const Rule = ({ rule, ...props }) => {
  const ruleDescriber = useRuleDescriber()
  const { abbreviation } = ruleDescriber(rule)

  return (
    <Text
      fontSize='small'
      fontWeight='semiBold'
      as='span'
      {...props}
    >
      {abbreviation}
    </Text>
  )
}

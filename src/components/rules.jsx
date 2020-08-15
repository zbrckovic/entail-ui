import { Rule } from '@zbrckovic/entail-core/lib/deduction-structure/rule'
import { useRuleDescriber } from 'hooks'
import React, { useState } from 'react'
import { Box } from 'rebass'

export const Rules = ({ className, rules = {} }) => {
  const ruleDescriber = useRuleDescriber()

  const [, setSelectedRule] = useState()

  return (
    <Box className={className}>
      {
        allRules.map(rule => {
          const { translation, abbreviation } = ruleDescriber(rule)
          return (
            <button
              key={rule}
              title={translation}
              disabled={rules[rule] === undefined}
              onClick={() => { setSelectedRule(rule) }}
            >
              {abbreviation}
            </button>
          )
        })
      }
    </Box>
  )
}

const allRules = [
  Rule.Premise,
  Rule.TautologicalImplication,
  Rule.Deduction,
  Rule.Theorem,
  Rule.UniversalInstantiation,
  Rule.UniversalGeneralization,
  Rule.ExistentialInstantiation,
  Rule.ExistentialGeneralization
]

import { Rule } from '@zbrckovic/entail-core/lib/deduction-structure/rule'
import { Button } from 'components/ui-toolkit/button'
import { useRuleDescriber } from 'hooks'
import React from 'react'
import { Box } from 'rebass'

export const RulePicker = ({ rules = {}, selectedRule, onRuleSelect }) => {
  const ruleDescriber = useRuleDescriber()

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 48px)',
        gridGap: 1
      }}
    >
      {
        allRules.map(rule => {
          const { translation, abbreviation } = ruleDescriber(rule)
          const selected = selectedRule === rule

          return (
            <Button
              key={rule}
              variant={selected ? 'primary' : undefined}
              title={translation}
              disabled={!rules.has(rule)}
              onClick={() => { onRuleSelect(rule) }}
            >
              {abbreviation}
            </Button>
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
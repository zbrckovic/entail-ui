import { Rule } from '@zbrckovic/entail-core'
import { useRuleDescriber } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

export const DeductionEditorRulePicker = ({
  rules = {},
  selectedRule,
  onRuleSelect,
  onRuleDeselect
}) => {
  const ruleDescriber = useRuleDescriber()
  const { t } = useTranslation('DeductionEditor')

  return <Box flexDirection='column' alignItems='stretch'>
    <Box as='h4' mb={2}>{t('label.rules')}</Box>
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
              title={translation}
              disabled={!rules.has(rule)}
              onClick={() => {
                if (selected) {
                  onRuleDeselect()
                } else {
                  onRuleSelect(rule)
                }
              }}>
              {abbreviation}
            </Button>
          )
        })
      }
    </Box>
  </Box>
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

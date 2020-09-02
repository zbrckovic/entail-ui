import { Rule } from '@zbrckovic/entail-core'
import { Button, ButtonVariant } from 'components/ui-toolkit/button'
import { useRuleDescriber } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Flex, Text } from 'rebass'

export const DeductionEditorRulePicker = ({
  rules = {},
  selectedRule,
  onRuleSelect,
  onRuleDeselect
}) => {
  const ruleDescriber = useRuleDescriber()
  const { t } = useTranslation('DeductionEditor')

  return <Flex flexDirection='column' alignItems='stretch'>
    <Text pb={1} fontWeight='bold'>{t('label.rules')}</Text>
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 48px)',
      gridGap: 1
    }}>
      {
        allRules.map(rule => {
          const { translation, abbreviation } = ruleDescriber(rule)
          const selected = selectedRule === rule

          return (
            <Button
              key={rule}
              variant={selected ? ButtonVariant.PRIMARY : undefined}
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
  </Flex>
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

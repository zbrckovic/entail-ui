import { Rule } from '@zbrckovic/entail-core'
import { useRuleDescriber } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'
import style from './deduction-editor-rule-picker.m.scss'
import classnames from 'classnames'
import { Button, Label } from '@blueprintjs/core'

export const DeductionEditorRulePicker = ({
  rules = {},
  selectedRule,
  onRuleSelect,
  onRuleDeselect,
  className,
  ...props
}) => {
  const ruleDescriber = useRuleDescriber()
  const { t } = useTranslation('DeductionEditor')

  return (
    <Box className={classnames(style.root, className)} {...props}>
      <Label>{t('label.rules')}</Label>
      <div className={style.buttons}>
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
      </div>
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

import { Rule } from '@zbrckovic/entail-core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import style from './rule-picker.m.scss'
import classnames from 'classnames'
import { Button, Label } from '@blueprintjs/core'
import { RuleBadge } from '../../rule-badge'

export const RulePicker = ({
  selectedRule,
  onRuleSelect,
  onRuleDeselect,
  className,
  ...props
}) => {
  const { t } = useTranslation('DeductionEditor')

  return (
    <div className={classnames(style.root, className)} {...props}>
      <Label>{t('label.rules')}</Label>
      <div className={style.buttons}>
        {
          allRules.map(rule => {
            const selected = selectedRule === rule

            const isActive = rule === selectedRule

            return (
              <Button
                key={rule}
                active={rule === selectedRule}
                disabled={selectedRule !== undefined && !isActive}
                onClick={() => {
                  if (selected) {
                    onRuleDeselect()
                  } else {
                    onRuleSelect(rule)
                  }
                }}>
                <RuleBadge rule={rule}/>
              </Button>
            )
          })
        }
      </div>
    </div>
  )
}

const allRules = [
  Rule.Premise,
  Rule.Theorem,
  Rule.Deduction,
  Rule.ConditionalElimination,
  Rule.ConjunctionIntroduction,
  Rule.ConjunctionElimination,
  Rule.DisjunctionIntroduction,
  Rule.DisjunctionElimination,
  Rule.BiconditionalIntroduction,
  Rule.BiconditionalElimination,
  Rule.NegationIntroduction,
  Rule.WeakNegationElimination,
  Rule.DoubleNegationElimination,
  Rule.TautologicalImplication,
  Rule.UniversalInstantiation,
  Rule.UniversalGeneralization,
  Rule.ExistentialInstantiation,
  Rule.ExistentialGeneralization
]

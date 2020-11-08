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
          [Rule.Premise, Rule.Theorem].map(rule => (
            <RuleButton
              key={rule}
              rule={rule}
              selectedRule={selectedRule}
              onRuleSelect={onRuleSelect}
              onRuleDeselect={onRuleDeselect}
            />
          ))
        }
        <RuleButton
          className={style.fullWidth}
          key={Rule.TautologicalImplication}
          rule={Rule.TautologicalImplication}
          selectedRule={selectedRule}
          onRuleSelect={onRuleSelect}
          onRuleDeselect={onRuleDeselect}
        />
      </div>
      <hr/>
      <div className={style.buttons}>
        {
          [
            Rule.NegationIntroduction,
            Rule.NegationElimination,
            Rule.ConditionalIntroduction,
            Rule.ConditionalElimination,
            Rule.ConjunctionIntroduction,
            Rule.ConjunctionElimination,
            Rule.DisjunctionIntroduction,
            Rule.DisjunctionElimination,
            Rule.BiconditionalIntroduction,
            Rule.BiconditionalElimination
          ].map(rule => (
            <RuleButton
              key={rule}
              rule={rule}
              selectedRule={selectedRule}
              onRuleSelect={onRuleSelect}
              onRuleDeselect={onRuleDeselect}
            />
          ))
        }
        <RuleButton
          className={style.fullWidth}
          key={Rule.Explosion}
          rule={Rule.Explosion}
          selectedRule={selectedRule}
          onRuleSelect={onRuleSelect}
          onRuleDeselect={onRuleDeselect}
        />
      </div>
      <hr/>
      <div className={style.buttons}>
        {
          [
            Rule.UniversalInstantiation,
            Rule.UniversalGeneralization,
            Rule.ExistentialInstantiation,
            Rule.ExistentialGeneralization
          ].map(rule => (
            <RuleButton
              key={rule}
              rule={rule}
              selectedRule={selectedRule}
              onRuleSelect={onRuleSelect}
              onRuleDeselect={onRuleDeselect}
            />
          ))
        }
      </div>
    </div>
  )
}

const RuleButton = ({ rule, selectedRule, onRuleSelect, onRuleDeselect, className }) => {
  const selected = selectedRule === rule

  const isActive = rule === selectedRule

  return (
    <Button
      className={className}
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
      <RuleBadge rule={rule} />
    </Button>
  )
}

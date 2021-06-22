import { Rule } from '@zbrckovic/entail-core'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { timer } from 'rxjs'
import style from './rule-picker.m.scss'
import classnames from 'classnames'
import { Button, Label } from '@blueprintjs/core'
import { RuleBadge } from 'components/deduction-editor/rule-badge'
import { PropositionalRulesSet } from '../../../models/project'

export const RulePicker = ({
  propositionalRulesSet = PropositionalRulesSet.SPECIFIC_ONLY,
  isFirstOrder = true,
  selectedRule,
  onRuleSelect,
  onRuleDeselect,
  className,
  ...props
}) => {
  const { t } = useTranslation()

  const hasSpecificPropositionalRules =
    propositionalRulesSet === PropositionalRulesSet.FULL ||
    propositionalRulesSet === PropositionalRulesSet.SPECIFIC_ONLY

  const hasTautologicalImplication = propositionalRulesSet === PropositionalRulesSet.FULL ||
    propositionalRulesSet === PropositionalRulesSet.TAUTOLOGICAL_IMPLICATION_ONLY

  return (
    <div className={classnames(style.root, className)} {...props}>
      <Label>{t('deductionEditor.rulesLbl')}</Label>
      <div className={style.buttons}>
        {
          [Rule.Premise, Rule.Theorem].map(rule => (
            <RuleButton
              disabled={rule === Rule.Theorem}
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
          disabled={!hasTautologicalImplication}
        />
      </div>
      <hr />
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
            Rule.BiconditionalElimination,
            Rule.Explosion,
            Rule.Repetition
          ].map(rule => (
            <RuleButton
              key={rule}
              rule={rule}
              selectedRule={selectedRule}
              onRuleSelect={onRuleSelect}
              onRuleDeselect={onRuleDeselect}
              disabled={!hasSpecificPropositionalRules}
            />
          ))
        }
      </div>
      <hr />
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
              disabled={!isFirstOrder}
            />
          ))
        }
      </div>
    </div>
  )
}

const RuleButton = ({ rule, selectedRule, onRuleSelect, onRuleDeselect, className, ...props }) => {
  const [isWiggling, setIsWiggling] = useState(false)

  useEffect(() => {
    if (isWiggling) {
      const subscription = timer(500).subscribe({ complete: () => { setIsWiggling(false) } })
      return () => { subscription.unsubscribe() }
    }
  }, [isWiggling])

  const selected = selectedRule === rule

  const isActive = rule === selectedRule

  return (
    <Button
      className={classnames({ [style.wiggling]: isWiggling }, className)}
      key={rule}
      active={rule === selectedRule}
      disabled={selectedRule !== undefined && !isActive}
      onClick={() => {
        if (selected) {
          onRuleDeselect()
        } else {
          const success = onRuleSelect(rule)
          if (!success) { setIsWiggling(true) }
        }
      }}
      {...props}
    >
      <RuleBadge rule={rule} />
    </Button>
  )
}

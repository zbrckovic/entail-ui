import React from 'react'
import { Rule, getAbbreviation } from '@zbrckovic/entail-core'
import style from './rule-badge.m.scss'
import classnames from 'classnames'
import { useRuleDescriber } from './use-rule-describer'

export const RuleBadge = ({ rule, className, ...props }) => {
  const { main, superscript } = ruleSignatures[rule]

  const describeRule = useRuleDescriber()

  return (
    <div className={classnames(
      style.root,
      className,
      { [style.premise]: rule === Rule.Premise },
      { [style.mainGreen]: rule === Rule.Theorem || rule === Rule.TautologicalImplication }
    )} {...props}>
      <span title={`${describeRule(rule)} ${getAbbreviation(rule)}`}>{main}</span>
      {superscript && (
        <sup
          className={classnames({
            [style.superscriptGreen]: superscript === '+',
            [style.superscriptRed]: superscript === '-'
          })}>
          {superscript}
        </sup>
      )}
    </div>
  )
}

const ruleSignatures = {
  [Rule.Premise]: { main: 'P' },
  [Rule.Theorem]: { main: 'T' },
  [Rule.TautologicalImplication]: { main: 'TI' },
  [Rule.ConditionalIntroduction]: { main: '→', superscript: '+' },
  [Rule.ConditionalElimination]: { main: '→', superscript: '-' },
  [Rule.NegationIntroduction]: { main: '¬', superscript: '+' },
  [Rule.NegationElimination]: { main: '¬', superscript: '-' },
  [Rule.ConjunctionIntroduction]: { main: '∧', superscript: '+' },
  [Rule.ConjunctionElimination]: { main: '∧', superscript: '-' },
  [Rule.DisjunctionIntroduction]: { main: '∨', superscript: '+' },
  [Rule.DisjunctionElimination]: { main: '∨', superscript: '-' },
  [Rule.BiconditionalIntroduction]: { main: '↔', superscript: '+' },
  [Rule.BiconditionalElimination]: { main: '↔', superscript: '-' },
  [Rule.Repetition]: { main: 'R' },
  [Rule.Explosion]: { main: 'X' },
  [Rule.UniversalGeneralization]: { main: '∀', superscript: '+' },
  [Rule.UniversalInstantiation]: { main: '∀', superscript: '-' },
  [Rule.ExistentialGeneralization]: { main: '∃', superscript: '+' },
  [Rule.ExistentialInstantiation]: { main: '∃', superscript: '-' }
}

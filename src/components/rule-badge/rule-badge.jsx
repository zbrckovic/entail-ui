import React, { useMemo } from 'react'
import { Rule } from '@zbrckovic/entail-core'
import style from './rule-badge.m.scss'
import classnames from 'classnames'
import { useRuleDescriber } from '../../hooks'

export const RuleBadge = ({ rule, className, ...props }) => {
  const { main, superscript } = ruleSignatures[rule]

  const describeRule = useRuleDescriber()

  const title = useMemo(() => {
    const { translation, abbreviation } = describeRule(rule)

    return `${translation} ${abbreviation}`
  }, [rule, describeRule])

  return (
    <div className={classnames(
      style.root,
      className,
      { [style.premise]: rule === Rule.Premise },
      { [style.mainGreen]: rule === Rule.Theorem || rule === Rule.TautologicalImplication }
    )} {...props}>
      <span title={title}>{main}</span>
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
  [Rule.Premise]: {
    main: 'P'
  },
  [Rule.Theorem]: {
    main: 'T'
  },
  [Rule.TautologicalImplication]: {
    main: 'TI'
  },
  [Rule.UniversalGeneralization]: {
    main: '∀',
    superscript: '+'
  },
  [Rule.UniversalInstantiation]: {
    main: '∀',
    superscript: '-'
  },
  [Rule.ExistentialGeneralization]: {
    main: '∃',
    superscript: '+'
  },
  [Rule.ExistentialInstantiation]: {
    main: '∃',
    superscript: '-'
  },
  [Rule.Deduction]: {
    main: '→',
    superscript: '+'
  },
  [Rule.ConditionalElimination]: {
    main: '→',
    superscript: '-'
  },
  [Rule.NegationIntroduction]: {
    main: '¬',
    superscript: '+'
  },
  [Rule.WeakNegationElimination]: {
    main: '¬',
    superscript: '-'
  },
  [Rule.DoubleNegationElimination]: {
    main: '¬¬',
    superscript: '-'
  },
  [Rule.ConjunctionIntroduction]: {
    main: '∧',
    superscript: '+'
  },
  [Rule.ConjunctionElimination]: {
    main: '∧',
    superscript: '-'
  },
  [Rule.DisjunctionIntroduction]: {
    main: '∨',
    superscript: '+'
  },
  [Rule.DisjunctionElimination]: {
    main: '∨',
    superscript: '-'
  },
  [Rule.BiconditionalIntroduction]: {
    main: '↔',
    superscript: '+'
  },
  [Rule.BiconditionalElimination]: {
    main: '↔',
    superscript: '-'
  }
}

import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import { Rule } from '@zbrckovic/entail-core'

export const useRuleDescriber = () => {
  const { t } = useTranslation()

  const translations = useMemo(() => ({
    [Rule.Premise]: t('rule.premiseLbl'),
    [Rule.Theorem]: t('rule.theoremLbl'),
    [Rule.TautologicalImplication]: t('rule.tautologicalImplicationLbl'),
    [Rule.NegationIntroduction]: t('rule.negationIntroductionLbl'),
    [Rule.NegationElimination]: t('rule.negationEliminationLbl'),
    [Rule.ConditionalIntroduction]: t('rule.conditionalIntroductionLbl'),
    [Rule.ConditionalElimination]: t('rule.conditionalEliminationLbl'),
    [Rule.ConjunctionIntroduction]: t('rule.conjunctionIntroductionLbl'),
    [Rule.ConjunctionElimination]: t('rule.conjunctionEliminationLbl'),
    [Rule.DisjunctionIntroduction]: t('rule.disjunctionIntroductionLbl'),
    [Rule.DisjunctionElimination]: t('rule.disjunctionEliminationLbl'),
    [Rule.BiconditionalIntroduction]: t('rule.biconditionalIntroductionLbl'),
    [Rule.BiconditionalElimination]: t('rule.biconditionalEliminationLbl'),
    [Rule.Repetition]: t('rule.repetitionLbl'),
    [Rule.Explosion]: t('rule.explosionLbl'),
    [Rule.UniversalGeneralization]: t('rule.universalGeneralizationLbl'),
    [Rule.UniversalInstantiation]: t('rule.universalInstantiationLbl'),
    [Rule.ExistentialGeneralization]: t('rule.existentialGeneralizationLbl'),
    [Rule.ExistentialInstantiation]: t('rule.existentialInstantiationLbl')
  }), [t])

  return rule => translations[rule]
}

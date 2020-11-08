import { Rule, ErrorName, Placement, Kind } from '@zbrckovic/entail-core'
import { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export const useParserErrorDescriber = () => {
  const { t } = useTranslation('ParserError')

  return useCallback(error => {
    if (error.name === 'SyntaxError') {
      const { location: { start } } = error

      return t('syntaxError', { location: start })
    }

    if (error.name === ErrorName.INVALID_SYMBOL_PLACEMENT) {
      const {
        presentation: { ascii: { text: sym, placement: expectedPlacement } },
        placement
      } = error.extra

      return expectedPlacement === Placement.Prefix && placement === Placement.Infix
        ? t('recognizedAsPrefixUsedAsInfix', { sym })
        : t('recognizedAsInfixUsedAsPrefix', { sym })
    }

    if (error.name === ErrorName.INVALID_ARITY) {
      const {
        sym: { arity: recognizedArity },
        presentation: { ascii: { text } },
        arity: usedArity
      } = error.extra

      return t('symbolUsedWithWrongNumberOfArguments', { sym: text, recognizedArity, usedArity })
    }

    if (error.name === ErrorName.INVALID_SYMBOL_KIND) {
      const {
        sym: { kind: recognizedKind },
        presentation: { ascii: { text: sym } }
      } = error.extra

      return recognizedKind === Kind.Formula
        ? t('recognizedAsSententialUsedAsNominal', { sym })
        : t('recognizedAsNominalUsedAsSentential', { sym })
    }

    if (error.name === ErrorName.INVALID_BOUND_SYMBOL_CATEGORY) {
      const { presentation: { ascii: { text: sym } } } = error.extra

      return t('boundSymbolNotTerm', { sym })
    }

    if (error.name === ErrorName.INVALID_BOUND_SYMBOL_ARITY) {
      const {
        sym: { arity },
        presentation: { ascii: { text: sym } }
      } = error.extra

      return t('boundSymbolNotNullary', { sym, arity })
    }

    return t('syntaxError')
  }, [t])
}

export const useRuleDescriber = () => {
  const { t } = useTranslation('Rule')

  const translations = useMemo(() => ({
    [Rule.Premise]: t('premise'),
    [Rule.Theorem]: t('theorem'),
    [Rule.TautologicalImplication]: t('tautologicalImplication'),
    [Rule.NegationIntroduction]: t('negationIntroduction'),
    [Rule.NegationElimination]: t('negationElimination'),
    [Rule.ConditionalIntroduction]: t('conditionalIntroduction'),
    [Rule.ConditionalElimination]: t('conditionalElimination'),
    [Rule.ConjunctionIntroduction]: t('conjunctionIntroduction'),
    [Rule.ConjunctionElimination]: t('conjunctionElimination'),
    [Rule.DisjunctionIntroduction]: t('disjunctionIntroduction'),
    [Rule.DisjunctionElimination]: t('disjunctionElimination'),
    [Rule.BiconditionalIntroduction]: t('biconditionalIntroduction'),
    [Rule.BiconditionalElimination]: t('biconditionalElimination'),
    [Rule.UniversalGeneralization]: t('universalGeneralization'),
    [Rule.UniversalInstantiation]: t('universalInstantiation'),
    [Rule.ExistentialGeneralization]: t('existentialGeneralization'),
    [Rule.ExistentialInstantiation]: t('existentialInstantiation')
  }), [t])

  return rule => translations[rule]
}

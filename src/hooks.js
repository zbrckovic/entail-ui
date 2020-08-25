import { Rule, ErrorName, Placement } from '@zbrckovic/entail-core'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export const useParserErrorDescriber = () => {
  const { t } = useTranslation('ParserError')

  return error => {
    if (error.name === 'SyntaxError') {
      const { location: { start } } = error

      return t('syntaxError', { location: start })
    }

    if (error.name === ErrorName.INVALID_SYMBOL_PLACEMENT) {
      const {
        presentation: { ascii: { text, placement: expectedPlacement } },
        placement
      } = error.extra

      return expectedPlacement === Placement.Prefix && placement === Placement.Infix
        ? t('prefixUsedAsInfixError', { sym: text })
        : t('infixUsedAsPrefixError', { sym: text })
    }

    if (error.name === ErrorName.INVALID_ARITY) {
      const {
        sym: { arity: expectedArity },
        presentation: { ascii: { text } },
        arity
      } = error.extra

      return t('invalidArityError', { sym: text, arity, expectedArity })
    }

    return t('syntaxError')
  }
}

export const useRuleDescriber = () => {
  const { t } = useTranslation('Rule')

  return useCallback(rule => {
    switch (rule) {
      case Rule.Premise:
        return {
          translation: t('premise'),
          abbreviation: t('premiseAbbreviated')
        }
      case Rule.TautologicalImplication:
        return {
          translation: t('tautologicalImplication'),
          abbreviation: t('tautologicalImplicationAbbreviated')
        }
      case Rule.Deduction:
        return {
          translation: t('deduction'),
          abbreviation: t('deductionAbbreviated')
        }
      case Rule.Theorem:
        return {
          translation: t('theorem'),
          abbreviation: t('theoremAbbreviated')
        }
      case Rule.UniversalInstantiation:
        return {
          translation: t('universalInstantiation'),
          abbreviation: t('universalInstantiationAbbreviated')
        }
      case Rule.UniversalGeneralization:
        return {
          translation: t('universalGeneralization'),
          abbreviation: t('universalGeneralizationAbbreviated')
        }
      case Rule.ExistentialInstantiation:
        return {
          translation: t('existentialInstantiation'),
          abbreviation: t('existentialInstantiationAbbreviated')
        }
      case Rule.ExistentialGeneralization:
        return {
          translation: t('existentialGeneralization'),
          abbreviation: t('existentialGeneralizationAbbreviated')
        }
    }
  }, [t])
}

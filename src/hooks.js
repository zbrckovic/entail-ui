import { Rule, ErrorName, Placement, Kind } from '@zbrckovic/entail-core'
import { useCallback } from 'react'
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

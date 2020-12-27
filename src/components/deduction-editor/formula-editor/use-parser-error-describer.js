import { ErrorName, Kind, Placement } from '@zbrckovic/entail-core'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'

export const useParserErrorDescriber = () => {
  const { t } = useTranslation()

  return useCallback(error => {
    if (error.name === 'SyntaxError') {
      const { location: { start } } = error
      return t('deductionEditor.syntaxErrorMsg', { location: start })
    }

    if (error.name === ErrorName.INVALID_SYMBOL_PLACEMENT) {
      const {
        presentation: { ascii: { text: sym, placement: expectedPlacement } },
        placement
      } = error.extra

      return expectedPlacement === Placement.Prefix && placement === Placement.Infix
        ? t('deductionEditor.recognizedAsPrefixUsedAsInfixMsg', { sym })
        : t('deductionEditor.recognizedAsInfixUsedAsPrefixMsg', { sym })
    }

    if (error.name === ErrorName.INVALID_ARITY) {
      const {
        sym: { arity: recognizedArity },
        presentation: { ascii: { text } },
        arity: usedArity
      } = error.extra

      return t(
        'deductionEditor.symbolUsedWithWrongNumberOfArgumentsMsg',
        { sym: text, recognizedArity, usedArity }
      )
    }

    if (error.name === ErrorName.INVALID_SYMBOL_KIND) {
      const {
        sym: { kind: recognizedKind },
        presentation: { ascii: { text: sym } }
      } = error.extra

      return recognizedKind === Kind.Formula
        ? t('deductionEditor.recognizedAsSententialUsedAsNominalMsg', { sym })
        : t('deductionEditor.recognizedAsNominalUsedAsSententialMsg', { sym })
    }

    if (error.name === ErrorName.INVALID_BOUND_SYMBOL_CATEGORY) {
      const { presentation: { ascii: { text: sym } } } = error.extra

      return t('deductionEditor.boundSymbolNotTermMsg', { sym })
    }

    if (error.name === ErrorName.INVALID_BOUND_SYMBOL_ARITY) {
      const {
        sym: { arity },
        presentation: { ascii: { text: sym } }
      } = error.extra

      return t('deductionEditor.boundSymbolNotNullaryMsg', { sym, arity })
    }

    return t('deductionEditor.syntaxErrorMsg')
  }, [t])
}

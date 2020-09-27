import { ErrorName } from '@zbrckovic/entail-core'
import { FormulaEditor } from 'components/formula-editor'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const DeductionEditorTautologicalImplication = ({
  ruleInterface,
  onApply,
  onCancel,
  onError,
  ...props
}) => {
  const { t } = useTranslation('DeductionEditor')

  return (
    <FormulaEditor
      flexGrow={1}
      label={t('label.enterTheConsequent')}
      onSubmit={({ formula, symCtx }) => {
        let deductionInterface
        try {
          deductionInterface = ruleInterface.apply(formula)
        } catch (error) {
          if (error.name === ErrorName.INVALID_TAUTOLOGICAL_IMPLICATION) {
            onError(t('message.invalidTautologicalImplication'))
            return
          }

          throw error
        }

        onApply({ deductionInterface, symCtx })
      }}
      onCancel={onCancel}
      {...props}
    />
  )
}

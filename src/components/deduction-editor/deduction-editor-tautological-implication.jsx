import { ErrorName } from '@zbrckovic/entail-core'
import { FormulaEditor } from 'components/formula-editor'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const DeductionEditorTautologicalImplication = ({
  ruleInterface,
  onApply,
  onCancel
}) => {
  const { t } = useTranslation('DeductionEditor')

  const [errorMessage, setErrorMessage] = useState(undefined)

  return (
    <FormulaEditor
      flexGrow={1}
      label={t('label.enterTheConsequent')}
      error={errorMessage}
      onSubmit={({ formula, symCtx }) => {
        let deductionInterface
        try {
          deductionInterface = ruleInterface.apply(formula)
        } catch (error) {
          if (error.name === ErrorName.INVALID_TAUTOLOGICAL_IMPLICATION) {
            setErrorMessage(t('message.invalidTautologicalImplication'))
            return
          } else {
            throw error
          }
        }

        setErrorMessage(undefined)

        onApply({ deductionInterface, symCtx })
      }}
      onCancel={onCancel}
    />
  )
}

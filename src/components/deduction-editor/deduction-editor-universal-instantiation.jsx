import { ErrorName } from '@zbrckovic/entail-core'
import { IndividualVariableEditor } from 'components/individual-variable-editor'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const DeductionEditorUniversalInstantiation = ({
  ruleInterface,
  onApply,
  onCancel,
  onError,
  ...props
}) => {
  const { t } = useTranslation('DeductionEditor')

  return (
    <IndividualVariableEditor
      flexGrow={1}
      onSubmit={({ sym, symCtx }) => {
        let deductionInterface
        try {
          deductionInterface = ruleInterface.apply(sym)
        } catch (error) {
          switch (error.name) {
            case ErrorName.INSTANCE_TERM_BECOMES_ILLEGALLY_BOUND:
              onError(t('message.instanceTermBecomesIllegallyBound'))
              return
            default:
              throw error
          }
        }

        onApply({ deductionInterface, symCtx })
      }}
      onCancel={onCancel}
      {...props}
    />
  )
}

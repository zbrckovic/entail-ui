import { ErrorName } from '@zbrckovic/entail-core'
import { IndividualVariableEditor } from 'components/individual-variable-editor'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'

export const DeductionEditorUniversalInstantiation = ({
  ruleInterface,
  onApply,
  onCancel,
  ...props
}) => {
  const { t } = useTranslation('DeductionEditor')

  const [errorMessage, setErrorMessage] = useState(undefined)

  return <Box flexDirection='column' alignItems='stretch' {...props}>
    <Box as='h4' mb={2}>{t('label.enterTheInstanceTerm')}</Box>
    <IndividualVariableEditor
      flexGrow={1}
      onSubmit={({ sym, symCtx }) => {
        let deductionInterface
        try {
          deductionInterface = ruleInterface.apply(sym)
        } catch (error) {
          switch (error.name) {
            case ErrorName.INSTANCE_TERM_BECOMES_ILLEGALLY_BOUND:
              setErrorMessage(t('message.instanceTermBecomesIllegallyBound'))
              return
            default:
              throw error
          }
        }

        setErrorMessage(undefined)

        onApply({ deductionInterface, symCtx })
      }}
      onCancel={onCancel}
    />
    {errorMessage !== undefined &&
    <Box text={errorMessage} mt={2} />}
  </Box>
}

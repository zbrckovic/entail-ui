import { ErrorName } from '@zbrckovic/entail-core'
import { IndividualVariableEditor } from 'components/individual-variable-editor'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'

export const DeductionEditorExistentialGeneralization = ({
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
      onSubmit={({ sym, presentationCtx }) => {
        let deductionInterface
        try {
          deductionInterface = ruleInterface.apply(sym)
        } catch (error) {
          switch (error.name) {
            case ErrorName.GENERALIZED_TERM_ILLEGALLY_BINDS:
              setErrorMessage(t('message.generalizedTermIllegallyBinds'))
              return
            case ErrorName.GENERALIZED_TERM_BECOMES_ILLEGALLY_BOUND:
              setErrorMessage(t('message.generalizedTermBecomesIllegallyBound'))
              return
            default:
              throw error
          }
        }

        setErrorMessage(undefined)

        onApply({ presentationCtx, deductionInterface })
      }}
      onCancel={onCancel} />
    {errorMessage}
  </Box>
}

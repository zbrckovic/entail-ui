import { ErrorName } from '@zbrckovic/entail-core'
import { IndividualVariableEditor } from 'components/individual-variable-editor'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'

export const DeductionEditorUniversalGeneralization = ({
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
            case ErrorName.TERM_ALREADY_USED:
              setErrorMessage(t('message.termAlreadyDependantInDependencyGraph'))
              return
            case ErrorName.CYCLIC_DEPENDENCIES:
              setErrorMessage(t('message.usageOfThisTermResultsInCyclicDependencies'))
              return
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

        onApply({ deductionInterface, symCtx })
      }}
      onCancel={onCancel} />
    {errorMessage !== undefined &&
    <Box text={errorMessage} mt={2} />}
  </Box>
}

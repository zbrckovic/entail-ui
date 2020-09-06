import { ErrorName } from '@zbrckovic/entail-core'
import { IndividualVariableEditor } from 'components/individual-variable-editor'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'

export const DeductionEditorExistentialInstantiation = ({
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
            case ErrorName.INSTANCE_TERM_BECOMES_ILLEGALLY_BOUND:
              setErrorMessage(t('message.instanceTermBecomesIllegallyBound'))
              return
            case ErrorName.TERM_ALREADY_USED:
              setErrorMessage(t('message.termAlreadyDependantInDependencyGraph'))
              return
            case ErrorName.CYCLIC_DEPENDENCIES:
              setErrorMessage(t('message.usageOfThisTermResultsInCyclicDependencies'))
              return
            default:
              throw error
          }
        }

        setErrorMessage(undefined)

        onApply({ presentationCtx, deductionInterface })
      }}
      onCancel={onCancel} />
    {errorMessage !== undefined && <Box text={errorMessage} mt={2} />}
  </Box>
}

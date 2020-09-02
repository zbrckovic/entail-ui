import { ErrorName } from '@zbrckovic/entail-core'
import { IndividualVariableEditor } from 'components/individual-variable-editor'
import { Message, MessageVariant } from 'components/ui-toolkit/message'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex, Text } from 'rebass'

export const DeductionEditorExistentialInstantiation = ({
  ruleInterface,
  onApply,
  onCancel,
  ...props
}) => {
  const { t } = useTranslation('DeductionEditor')

  const [errorMessage, setErrorMessage] = useState(undefined)

  return <Flex flexDirection='column' alignItems='stretch' {...props}>
    <Text as='h4' mb={2}>{t('label.enterTheInstanceTerm')}</Text>
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
    {errorMessage !== undefined &&
    <Message variant={MessageVariant.DANGER} text={errorMessage} mt={2} />}
  </Flex>
}

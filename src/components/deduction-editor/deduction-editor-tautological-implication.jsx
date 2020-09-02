import { ErrorName } from '@zbrckovic/entail-core'
import { FormulaEditor } from 'components/formula-editor'
import { Message, MessageVariant } from 'components/ui-toolkit/message'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex, Text } from 'rebass'

export const DeductionEditorTautologicalImplication = ({
  ruleInterface,
  onApply,
  onCancel,
  ...props
}) => {
  const { t } = useTranslation('DeductionEditor')

  const [errorMessage, setErrorMessage] = useState(undefined)

  return <Flex flexDirection='column' alignItems='stretch' {...props}>
    <Text as='h4' mb={2}>{t('label.enterTheConsequent')}</Text>
    <FormulaEditor
      flexGrow={1}
      onSubmit={({ formula, presentationCtx }) => {
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

        onApply({ presentationCtx, deductionInterface })
      }}
      onCancel={onCancel}
    />
    {errorMessage !== undefined &&
    <Message variant={MessageVariant.DANGER} mt={2} text={errorMessage} />}
  </Flex>
}

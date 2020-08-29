import { ErrorName } from '@zbrckovic/entail-core'
import { FormulaEditor } from 'components/formula-editor'
import { Message, MessageVariant } from 'components/ui-toolkit/message'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'rebass'

export const TautologicalImplication = ({ ruleInterface, onApply, onCancel }) => {
  const { t } = useTranslation('DeductionEditor')

  const [errorMessage, setErrorMessage] = useState(false)

  return <Box>
    <Text as='h4'>{t('label.enterTheConsequent')}</Text>
    <FormulaEditor
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
  </Box>
}

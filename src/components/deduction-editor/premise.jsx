import { FormulaEditor } from 'components/formula-editor'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Text } from 'rebass'

export const Premise = ({ ruleInterface, onApply, onCancel }) => {
  const { t } = useTranslation('DeductionEditor')

  return <Box>
    <Text as='h4'>{t('label.enterThePremise')}</Text>
    <FormulaEditor
      onSubmit={({ formula, presentationCtx }) => {
        const deductionInterface = ruleInterface.apply(formula)
        onApply({ presentationCtx, deductionInterface })
      }}
      onCancel={onCancel} />
  </Box>
}

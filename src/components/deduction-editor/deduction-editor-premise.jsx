import { FormulaEditor } from 'components/formula-editor'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Flex, Text } from 'rebass'

export const DeductionEditorPremise = ({ ruleInterface, onApply, onCancel, ...props }) => {
  const { t } = useTranslation('DeductionEditor')

  return <Flex flexDirection='column' alignItems='stretch' {...props}>
    <Text as='h4' mb={2}>{t('label.enterThePremise')}</Text>
    <FormulaEditor
      flexGrow={1}
      onSubmit={({ formula, presentationCtx }) => {
        const deductionInterface = ruleInterface.apply(formula)
        onApply({ presentationCtx, deductionInterface })
      }}
      onCancel={onCancel} />
  </Flex>
}

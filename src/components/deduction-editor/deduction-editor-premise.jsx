import { FormulaEditor } from 'components/formula-editor'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'

export const DeductionEditorPremise = ({ ruleInterface, onApply, onCancel, ...props }) => {
  const { t } = useTranslation('DeductionEditor')

  return <Box flexDirection='column' alignItems='stretch' {...props}>
    <Box as='h4' mb={2}>{t('label.enterThePremise')}</Box>
    <FormulaEditor
      flexGrow={1}
      onSubmit={({ formula, presentationCtx }) => {
        const deductionInterface = ruleInterface.apply(formula)
        onApply({ presentationCtx, deductionInterface })
      }}
      onCancel={onCancel} />
  </Box>
}

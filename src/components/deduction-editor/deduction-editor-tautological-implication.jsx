import { ErrorName } from '@zbrckovic/entail-core'
import { FormulaEditor } from 'components/formula-editor'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Box from '@material-ui/core/Box'

export const DeductionEditorTautologicalImplication = ({
  ruleInterface,
  onApply,
  onCancel,
  ...props
}) => {
  const { t } = useTranslation('DeductionEditor')

  const [errorMessage, setErrorMessage] = useState(undefined)

  return <Box flexDirection='column' alignItems='stretch' {...props}>
    <Box as='h4' mb={2}>{t('label.enterTheConsequent')}</Box>
    <FormulaEditor
      flexGrow={1}
      onSubmit={({ formula, symCtx }) => {
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

        onApply({ deductionInterface, symCtx })
      }}
      onCancel={onCancel}
    />
    {errorMessage !== undefined && <Box mt={2} text={errorMessage} />}
  </Box>
}

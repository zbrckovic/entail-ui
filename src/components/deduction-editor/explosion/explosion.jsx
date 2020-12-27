import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormulaEditor } from 'components/deduction-editor/formula-editor'

export const Explosion = ({
  ruleInterface,
  onApply,
  onCancel,
  className,
  ...props
}) => {
  const { t } = useTranslation()

  return (
    <FormulaEditor
      className={className} {...props}
      label={t('deductionEditor.enterTheFormulaLbl')}
      onSubmit={({ formula, symCtx }) => {
        const deductionInterface = ruleInterface.apply(formula)
        onApply({ deductionInterface, symCtx })
      }}
      onCancel={onCancel}
    />
  )
}

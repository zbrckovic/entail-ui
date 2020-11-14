import React from 'react'
import { useTranslation } from 'react-i18next'
import { FormulaEditor } from '../../formula-editor'

export const Explosion = ({
  ruleInterface,
  onApply,
  onCancel,
  className,
  ...props
}) => {
  const { t } = useTranslation('DeductionEditor')

  return (
    <FormulaEditor
      className={className} {...props}
      label={t('label.enterTheFormula')}
      onSubmit={({ formula, symCtx }) => {
        const deductionInterface = ruleInterface.apply(formula)
        onApply({ deductionInterface, symCtx })
      }}
      onCancel={onCancel}
    />
  )
}

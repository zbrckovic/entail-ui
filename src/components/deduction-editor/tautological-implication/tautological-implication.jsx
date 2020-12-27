import { ErrorName } from '@zbrckovic/entail-core'
import classnames from 'classnames'
import { FormulaEditor } from 'components/deduction-editor/formula-editor'
import React from 'react'
import { useTranslation } from 'react-i18next'
import style from './tautological-implication.m.scss'

export const TautologicalImplication = ({
  ruleInterface,
  onApply,
  onCancel,
  onError,
  className,
  ...props
}) => {
  const { t } = useTranslation()

  return (
    <FormulaEditor
      className={classnames(style.root, className)}
      label={t('deductionEditor.enterTheConsequentLbl')}
      onSubmit={({ formula, symCtx }) => {
        let deductionInterface
        try {
          deductionInterface = ruleInterface.apply(formula)
        } catch (error) {
          if (error.name === ErrorName.INVALID_TAUTOLOGICAL_IMPLICATION) {
            onError(t('deductionEditor.invalidTautologicalImplicationMsg'))
            return
          }

          throw error
        }

        onApply({ deductionInterface, symCtx })
      }}
      onCancel={onCancel}
      {...props}
    />
  )
}

import { ErrorName } from '@zbrckovic/entail-core'
import { FormulaEditor } from 'components/formula-editor'
import React from 'react'
import { useTranslation } from 'react-i18next'
import style from './deduction-editor-tautological-implication.m.scss'
import classnames from 'classnames'

export const DeductionEditorTautologicalImplication = ({
  ruleInterface,
  onApply,
  onCancel,
  onError,
  className,
  ...props
}) => {
  const { t } = useTranslation('DeductionEditor')

  return (
    <FormulaEditor
      className={classnames(style.root, className)}
      label={t('label.enterTheConsequent')}
      onSubmit={({ formula, symCtx }) => {
        let deductionInterface
        try {
          deductionInterface = ruleInterface.apply(formula)
        } catch (error) {
          if (error.name === ErrorName.INVALID_TAUTOLOGICAL_IMPLICATION) {
            onError(t('message.invalidTautologicalImplication'))
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

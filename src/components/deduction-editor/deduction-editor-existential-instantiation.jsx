import { ErrorName } from '@zbrckovic/entail-core'
import { IndividualVariableEditor } from 'components/individual-variable-editor'
import React from 'react'
import { useTranslation } from 'react-i18next'
import style from './deduction-editor-existential-instantiation.m.scss'
import classnames from 'classnames'

export const DeductionEditorExistentialInstantiation = ({
  ruleInterface,
  onApply,
  onCancel,
  onError,
  className,
  ...props
}) => {
  const { t } = useTranslation('DeductionEditor')

  return (
    <IndividualVariableEditor
      className={classnames(style.root, className)}
      label={t('label.enterTheInstanceTerm')}
      onSubmit={({ sym, symCtx }) => {
        let deductionInterface
        try {
          deductionInterface = ruleInterface.apply(sym)
        } catch (error) {
          switch (error.name) {
            case ErrorName.INSTANCE_TERM_BECOMES_ILLEGALLY_BOUND:
              onError(t('message.instanceTermBecomesIllegallyBound'))
              return
            case ErrorName.TERM_ALREADY_USED:
              onError(t('message.termAlreadyDependantInDependencyGraph'))
              return
            case ErrorName.CYCLIC_DEPENDENCIES:
              onError(t('message.usageOfThisTermResultsInCyclicDependencies'))
              return
            default:
              throw error
          }
        }

        onApply({ deductionInterface, symCtx })
      }}
      onCancel={onCancel}
      {...props}
    />
  )
}

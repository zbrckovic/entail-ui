import { ErrorName } from '@zbrckovic/entail-core'
import { IndividualVariableEditor } from 'components/deduction-editor/individual-variable-editor'
import React from 'react'
import { useTranslation } from 'react-i18next'
import style from './existential-instantiation.m.scss'
import classnames from 'classnames'

export const ExistentialInstantiation = ({
  ruleInterface,
  onApply,
  onCancel,
  onError,
  className,
  ...props
}) => {
  const { t } = useTranslation()

  return (
    <IndividualVariableEditor
      className={classnames(style.root, className)}
      label={t('deductionEditor.enterTheInstanceVariableLbl')}
      onSubmit={({ sym, symCtx }) => {
        let deductionInterface
        try {
          deductionInterface = ruleInterface.apply(sym)
        } catch (error) {
          switch (error.name) {
            case ErrorName.INSTANCE_TERM_BECOMES_ILLEGALLY_BOUND:
              onError(t('deductionEditor.introducedInstanceVariableBecomesIllegallyBoundMsg'))
              return
            case ErrorName.TERM_ALREADY_USED:
              onError(t('deductionEditor.instanceVariableAlreadyDependantInDependencyGraphMsg'))
              return
            case ErrorName.CYCLIC_DEPENDENCIES:
              onError(
                t('deductionEditor.usageOfThisInstanceVariableResultsInCyclicDependenciesMsg')
              )
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

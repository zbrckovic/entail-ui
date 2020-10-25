import { ErrorName } from '@zbrckovic/entail-core'
import { IndividualVariableEditor } from 'components/individual-variable-editor'
import React from 'react'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'
import style from './universal-generalization.m.scss'

export const UniversalGeneralization = ({
  ruleInterface,
  oldTerm,
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
          deductionInterface = ruleInterface.apply(sym, oldTerm)
        } catch (error) {
          switch (error.name) {
            case ErrorName.TERM_ALREADY_USED:
              onError(t('message.termAlreadyDependantInDependencyGraph'))
              return
            case ErrorName.CYCLIC_DEPENDENCIES:
              onError(t('message.usageOfThisTermResultsInCyclicDependencies'))
              return
            case ErrorName.GENERALIZED_TERM_ILLEGALLY_BINDS:
              onError(t('message.generalizedTermIllegallyBinds'))
              return
            case ErrorName.GENERALIZED_TERM_BECOMES_ILLEGALLY_BOUND:
              onError(t('message.generalizedTermBecomesIllegallyBound'))
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

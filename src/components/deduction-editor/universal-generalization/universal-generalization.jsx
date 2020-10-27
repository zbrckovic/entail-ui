import { ErrorName, Expression } from '@zbrckovic/entail-core'
import { IndividualVariableEditor } from 'components/individual-variable-editor'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import classnames from 'classnames'
import style from './universal-generalization.m.scss'
import { TermPicker } from '../term-picker'

export const UniversalGeneralization = ({
  formula,
  ruleInterface,
  onApply,
  onCancel,
  onError,
  className,
  ...props
}) => {
  const { t } = useTranslation('DeductionEditor')

  const [oldTerm, setOldTerm] = useState()

  const terms = useMemo(() => Object.values(Expression.getFreeTerms(formula)), [formula])
  useEffect(() => { setOldTerm(undefined) }, [terms])

  return (
    <div>
      <TermPicker
        terms={terms}
        selectedTerm={oldTerm}
        onSelectTerm={term => { setOldTerm(oldTerm?.id === term.id ? undefined : term) }}
      />
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
    </div>
  )
}

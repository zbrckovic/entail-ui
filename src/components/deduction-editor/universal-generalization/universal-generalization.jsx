import { ErrorName } from '@zbrckovic/entail-core'
import classnames from 'classnames'
import { IndividualVariableEditor } from 'components/deduction-editor/individual-variable-editor'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TermPicker } from 'components/deduction-editor/term-picker'
import style from './universal-generalization.m.scss'

export const UniversalGeneralization = ({
  formula,
  ruleInterface,
  onApply,
  onCancel,
  onError,
  className,
  ...props
}) => {
  const { t } = useTranslation()

  const [oldTerm, setOldTerm] = useState()

  const terms = useMemo(() => Object.values(formula.getFreeTerms()), [formula])
  useEffect(() => { setOldTerm(undefined) }, [terms])

  return (
    <div className={classnames(style.root, className)}>
      {terms.length > 0 && <TermPicker
        terms={terms}
        selectedTerm={oldTerm}
        onSelectTerm={term => { setOldTerm(oldTerm?.id === term.id ? undefined : term) }}
      />}
      <IndividualVariableEditor
        label={t('deductionEditor.enterTheInstanceVariableLbl')}
        onSubmit={({ sym, symCtx }) => {
          let deductionInterface
          try {
            deductionInterface = ruleInterface.apply(sym, oldTerm)
          } catch (error) {
            switch (error.name) {
              case ErrorName.TERM_ALREADY_USED:
                onError(t('deductionEditor.instanceVariableAlreadyDependantInDependencyGraphMsg'))
                return
              case ErrorName.CYCLIC_DEPENDENCIES:
                onError(
                  t('deductionEditor.usageOfThisInstanceVariableResultsInCyclicDependenciesMsg')
                )
                return
              case ErrorName.GENERALIZED_TERM_ILLEGALLY_BINDS:
                onError(t('deductionEditor.introducedQuantificatorIllegallyBindsMsg'))
                return
              case ErrorName.GENERALIZED_TERM_BECOMES_ILLEGALLY_BOUND:
                onError(t('deductionEditor.introducedBoundVariableBecomesIllegallyBoundMsg'))
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

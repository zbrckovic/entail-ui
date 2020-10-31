import { ErrorName, Expression } from '@zbrckovic/entail-core'
import { IndividualVariableEditor } from 'components/individual-variable-editor'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import style from './existential-generalization.m.scss'
import classnames from 'classnames'
import { TermPicker } from '../term-picker'

export const ExistentialGeneralization = ({
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
    <div className={classnames(style.root, className)}>
      {terms.length > 0 && (
        <TermPicker
          terms={terms}
          selectedTerm={oldTerm}
          onSelectTerm={term => { setOldTerm(oldTerm?.id === term.id ? undefined : term) }}
        />
      )}
      <IndividualVariableEditor
        label={t('label.enterTheQuantificationVariable')}
        onSubmit={({ sym, symCtx }) => {
          let deductionInterface
          try {
            deductionInterface = ruleInterface.apply(sym, oldTerm)
          } catch (error) {
            switch (error.name) {
              case ErrorName.GENERALIZED_TERM_ILLEGALLY_BINDS:
                onError(t('message.introducedQuantificatorIllegallyBinds'))
                return
              case ErrorName.GENERALIZED_TERM_BECOMES_ILLEGALLY_BOUND:
                onError(t('message.introducedBoundVariableBecomesIllegallyBound'))
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

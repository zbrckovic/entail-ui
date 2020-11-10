/* eslint-disable react/display-name */
import { useTranslation } from 'react-i18next'
import React, { useMemo } from 'react'
import { Deduction, Rule } from '@zbrckovic/entail-core'
import { FormulaEditor } from '../formula-editor'
import { TautologicalImplication } from './tautological-implication'
import { UniversalInstantiation } from './universal-instantiation'
import { UniversalGeneralization } from './universal-generalization'
import { ExistentialInstantiation } from './existential-instantiation'
import { ExistentialGeneralization } from './existential-generalization'
import { DisjunctionIntroduction } from './disjunction-introduction'

export const useSelectedRuleUI = ({
  deduction,
  selectedSteps,
  selectedRule,
  ruleInterface,
  onApply,
  onCancel,
  onError
}) => {
  const { t } = useTranslation('DeductionEditor')

  const handlers = useMemo(
    () => ({
      [Rule.Premise]: () => (
        <FormulaEditor
          label={t('label.enterThePremise')}
          onSubmit={({ formula, symCtx }) => {
            const deductionInterface = ruleInterface.apply(formula)
            onApply({ deductionInterface, symCtx })
          }}
          onCancel={onCancel}
        />
      ),
      [Rule.DisjunctionIntroduction]: () => {
        const stepOrdinal = selectedSteps.values().next().value
        const { formula } = Deduction.getStepByOrdinal(deduction, stepOrdinal)

        return (
          <DisjunctionIntroduction
            formula={formula}
            ruleInterface={ruleInterface}
            onApply={onApply}
            onCancel={onCancel}
            onError={onError}
          />
        )
      },
      [Rule.TautologicalImplication]: () => (
        <TautologicalImplication
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel}
          onError={onError}
        />
      ),
      [Rule.UniversalInstantiation]: () => (
        <UniversalInstantiation
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel}
          onError={onError}
        />
      ),
      [Rule.UniversalGeneralization]: () => {
        const stepOrdinal = selectedSteps.values().next().value
        const { formula } = Deduction.getStepByOrdinal(deduction, stepOrdinal)

        return <UniversalGeneralization
          formula={formula}
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel}
          onError={onError}
        />
      },
      [Rule.ExistentialInstantiation]: () => (
        <ExistentialInstantiation
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel}
          onError={onError}
        />
      ),
      [Rule.ExistentialGeneralization]: () => {
        const stepOrdinal = selectedSteps.values().next().value
        const { formula } = Deduction.getStepByOrdinal(deduction, stepOrdinal)

        return <ExistentialGeneralization
          formula={formula}
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel}
          onError={onError}
        />
      }
    }),
    [deduction, selectedSteps, ruleInterface, onApply, onCancel, onError, t]
  )

  return handlers[selectedRule]?.()
}

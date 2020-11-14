/* eslint-disable react/display-name */
import { Deduction, Rule } from '@zbrckovic/entail-core'
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { FormulaEditor } from '../formula-editor'
import { ConjunctionElimination } from './conjunction-elimination/conjunction-elimination'
import { DisjunctionIntroduction } from './disjunction-introduction'
import { ExistentialGeneralization } from './existential-generalization'
import { ExistentialInstantiation } from './existential-instantiation'
import { TautologicalImplication } from './tautological-implication'
import { UniversalGeneralization } from './universal-generalization'
import { UniversalInstantiation } from './universal-instantiation'

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
      [Rule.ConjunctionElimination]: () => {
        const [stepOrdinal] = selectedSteps
        const { formula } = Deduction.getStepByOrdinal(deduction, stepOrdinal)

        return (
          <ConjunctionElimination
            formula={formula}
            ruleInterface={ruleInterface}
            onApply={onApply}
            onCancel={onCancel}
          />
        )
      },
      [Rule.DisjunctionIntroduction]: () => {
        const [stepOrdinal] = selectedSteps
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
        const [stepOrdinal] = selectedSteps
        const { formula } = Deduction.getStepByOrdinal(deduction, stepOrdinal)

        return (
          <UniversalGeneralization
            formula={formula}
            ruleInterface={ruleInterface}
            onApply={onApply}
            onCancel={onCancel}
            onError={onError}
          />
        )
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
        const [stepOrdinal] = selectedSteps
        const { formula } = Deduction.getStepByOrdinal(deduction, stepOrdinal)

        return (
          <ExistentialGeneralization
            formula={formula}
            ruleInterface={ruleInterface}
            onApply={onApply}
            onCancel={onCancel}
            onError={onError}
          />
        )
      }
    }),
    [deduction, selectedSteps, ruleInterface, onApply, onCancel, onError, t]
  )

  return handlers[selectedRule]?.()
}

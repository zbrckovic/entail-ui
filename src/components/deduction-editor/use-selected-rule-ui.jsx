import { useTranslation } from 'react-i18next'
import React, { useMemo } from 'react'
import { Deduction, Rule } from '@zbrckovic/entail-core'
import { FormulaEditor } from '../formula-editor'
import { TautologicalImplication } from './tautological-implication'
import { UniversalInstantiation } from './universal-instantiation'
import { UniversalGeneralization } from './universal-generalization'
import { ExistentialInstantiation } from './existential-instantiation'
import { ExistentialGeneralization } from './existential-generalization'

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

  return useMemo(() => {
    switch (selectedRule) {
      case Rule.Premise:
        return (
          <FormulaEditor
            label={t('label.enterThePremise')}
            onSubmit={({ formula, symCtx }) => {
              const deductionInterface = ruleInterface.apply(formula)
              onApply({ deductionInterface, symCtx })
            }}
            onCancel={onCancel}
          />
        )
      case Rule.TautologicalImplication:
        return <TautologicalImplication
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel}
          onError={onError}
        />
      case Rule.UniversalInstantiation:
        return <UniversalInstantiation
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel}
          onError={onError}
        />
      case Rule.UniversalGeneralization: {
        const stepOrdinal = selectedSteps.values().next().value
        const { formula } = Deduction.getStepByOrdinal(deduction, stepOrdinal)

        return <UniversalGeneralization
          formula={formula}
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel}
          onError={onError}
        />
      }
      case Rule.ExistentialInstantiation:
        return <ExistentialInstantiation
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel}
          onError={onError}
        />
      case Rule.ExistentialGeneralization: {
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
      default:
        return undefined
    }
  }, [deduction, selectedSteps, ruleInterface, selectedRule, onApply, onCancel, onError, t])
}

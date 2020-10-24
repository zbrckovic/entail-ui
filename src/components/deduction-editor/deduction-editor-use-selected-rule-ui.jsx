import { useTranslation } from 'react-i18next'
import React, { useMemo } from 'react'
import { Deduction, Rule } from '@zbrckovic/entail-core'
import { FormulaEditor } from '../formula-editor'
import { DeductionEditorTautologicalImplication } from './deduction-editor-tautological-implication'
import { DeductionEditorUniversalInstantiation } from './deduction-editor-universal-instantiation'
import { DeductionEditorUniversalGeneralization } from './deduction-editor-universal-generalization'
import { DeductionEditorExistentialInstantiation } from './deduction-editor-existential-instantiation'
import { DeductionEditorExistentialGeneralization } from './deduction-editor-existential-generalization'

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
        return <DeductionEditorTautologicalImplication
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel}
          onError={onError}
        />
      case Rule.UniversalInstantiation:
        return <DeductionEditorUniversalInstantiation
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel}
          onError={onError}
        />
      case Rule.UniversalGeneralization:
        return <DeductionEditorUniversalGeneralization
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel}
          onError={onError}
        />
      case Rule.ExistentialInstantiation:
        return <DeductionEditorExistentialInstantiation
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel}
          onError={onError}
        />
      case Rule.ExistentialGeneralization: {
        const [stepOrdinal] = [...selectedSteps]
        const selectedStep = Deduction.getStepByOrdinal(deduction, stepOrdinal)

        return <DeductionEditorExistentialGeneralization
          formula={selectedStep.formula}
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

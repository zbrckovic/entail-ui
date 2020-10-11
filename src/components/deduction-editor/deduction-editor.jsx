import { Deduction, Expression, Rule, startDeduction } from '@zbrckovic/entail-core'
import { DeductionSteps } from 'components/deduction-steps'
import { SymCtx } from 'contexts'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormulaEditor } from '../formula-editor'
import { DeductionEditorExistentialGeneralization } from './deduction-editor-existential-generalization'
import { DeductionEditorExistentialInstantiation } from './deduction-editor-existential-instantiation'
import { DeductionEditorRulePicker } from './deduction-editor-rule-picker'
import { DeductionEditorTautologicalImplication } from './deduction-editor-tautological-implication'
import { DeductionEditorUniversalGeneralization } from './deduction-editor-universal-generalization'
import { DeductionEditorUniversalInstantiation } from './deduction-editor-universal-instantiation'
import classnames from 'classnames'
import style from './deduction-editor.m.scss'
import { Button } from '@blueprintjs/core'

export const DeductionEditor = ({ className, ...props }) => {
  const { t } = useTranslation('DeductionEditor')

  const initialSymCtx = useContext(SymCtx)

  const [errorMsg, setErrorMsg] = useState(undefined)

  const [{ deductionInterface, symCtx }, setState] = useState(() => ({
    symCtx: initialSymCtx,
    deductionInterface: startDeduction()
  }))

  const [selectedSteps, setSelectedSteps] = useState(() => new Set())
  useEffect(() => { setSelectedSteps(new Set()) }, [deductionInterface])

  const areLastStepsSelected = useMemo(() => {
    if (selectedSteps.size === 0) return false

    // TODO: finish this
    return false
  }, [selectedSteps])

  const rulesInterface = useMemo(
    () => deductionInterface.selectSteps(...selectedSteps),
    [deductionInterface, selectedSteps]
  )

  const rules = useMemo(() => new Set(Object.keys(rulesInterface)), [rulesInterface])

  const [selectedRule, setSelectedRule] = useState()
  useEffect(() => { setSelectedRule(undefined) }, [rules])

  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)

  const ruleUI = useSelectedRuleUI({
    selectedRule,
    ruleInterface: rulesInterface?.[selectedRule],
    onApply: setState,
    onCancel: useCallback(() => { setSelectedRule(undefined) }, []),
    onError: setErrorMsg
  })

  return (
    <SymCtx.Provider value={symCtx}>
      <div className={classnames(style.root, className)} {...props}>
        <main className={style.main}>
          <DeductionSteps
            steps={deductionInterface.deduction.steps}
            selectedSteps={selectedSteps}
            onSelectedStepsChange={setSelectedSteps}
            lastStepAccessory={ruleUI}
          />
        </main>
        <div className={style.aside}>
          <DeductionEditorRulePicker
            rules={rules}
            selectedRule={selectedRule}
            onRuleSelect={rule => {
              switch (rule) {
                case Rule.Deduction: {
                  const deductionInterface = rulesInterface[Rule.Deduction].apply()
                  setState({ deductionInterface, symCtx })
                  break
                }
                case Rule.UniversalInstantiation: {
                  const [stepOrdinal] = [...selectedSteps]

                  const { formula } =
                    Deduction.getStepByOrdinal(deductionInterface.deduction, stepOrdinal)

                  const quantificationIsVacuous =
                    Expression.findBoundOccurrences(formula).length === 0

                  if (quantificationIsVacuous) {
                    const deductionInterface = rulesInterface[Rule.UniversalInstantiation].apply()
                    setState({ deductionInterface, symCtx })
                  } else {
                    setSelectedRule(rule)
                  }
                  break
                }
                case Rule.ExistentialInstantiation: {
                  const [stepOrdinal] = [...selectedSteps]

                  const { formula } =
                    Deduction.getStepByOrdinal(deductionInterface.deduction, stepOrdinal)

                  const quantificationIsVacuous =
                    Expression.findBoundOccurrences(formula).length === 0

                  if (quantificationIsVacuous) {
                    const deductionInterface = rulesInterface[Rule.ExistentialInstantiation].apply()
                    setState({ deductionInterface, symCtx })
                  } else {
                    setSelectedRule(rule)
                  }
                  break
                }
                default: {
                  setSelectedRule(rule)
                }
              }
            }}
            onRuleDeselect={() => { setSelectedRule(undefined) }}
          />
          <Button
            title={t('button.delete')}
            disabled={selectedSteps.size === 0}
            onClick={() => { setIsConfirmationDialogOpen(true) }}
          >
            {t('button.delete')}
          </Button>
        </div>
      </div>
    </SymCtx.Provider>
  )
}

const useSelectedRuleUI = ({
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
      case Rule.ExistentialGeneralization:
        return <DeductionEditorExistentialGeneralization
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel}
          onError={onError}
        />
      default:
        return undefined
    }
  }, [ruleInterface, selectedRule, onApply, onCancel, onError, t])
}

import {
  Deduction,
  ErrorName,
  Expression,
  primitiveSyms,
  Rule,
  startDeduction
} from '@zbrckovic/entail-core'
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
import { Button, Card, Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import { toaster } from '../../toaster'
import { useRuleDescriber } from '../../hooks'
import { deleteExtraSymsFromSymCtx } from '../../misc/sym-ctx-util'
import { DeleteDialog } from './deduction-editor-delete-dialog'

export const DeductionEditor = ({ className, ...props }) => {
  const { t } = useTranslation('DeductionEditor')

  const ruleDescriber = useRuleDescriber()

  const initialSymCtx = useContext(SymCtx)

  const [state, setState] = useState(() => ({
    symCtx: initialSymCtx,
    deductionInterface: startDeduction(),
    selectedSteps: new Set(),
    selectedRule: undefined,
    isDeleteDialogOpen: false
  }))

  useEffect(() => {
    if (state.selectedRule === undefined) return
    const {
      deductionInterface,
      selectedSteps,
      selectedRule: { rule, ruleInterface }
    } = state

    switch (rule) {
      case Rule.Deduction: {
        const newDeductionInterface = ruleInterface.apply()
        setState({
          ...state,
          deductionInterface: newDeductionInterface,
          selectedSteps: new Set(),
          selectedRule: undefined
        })
        break
      }
      case Rule.UniversalInstantiation: {
        const [stepOrdinal] = [...selectedSteps]

        const { formula } = Deduction.getStepByOrdinal(deductionInterface.deduction, stepOrdinal)
        const quantificationIsVacuous = Expression.findBoundOccurrences(formula).length === 0

        if (quantificationIsVacuous) {
          const newDeductionInterface = ruleInterface.apply()
          setState({
            ...state,
            deductionInterface: newDeductionInterface,
            selectedSteps: new Set(),
            selectedRule: undefined
          })
        }
        break
      }
      case Rule.ExistentialInstantiation: {
        const [stepOrdinal] = [...state.selectedSteps]

        const {
          formula
        } = Deduction.getStepByOrdinal(state.deductionInterface.deduction, stepOrdinal)
        const quantificationIsVacuous = Expression.findBoundOccurrences(formula).length === 0

        if (quantificationIsVacuous) {
          const newDeductionInterface = ruleInterface.apply()
          setState({
            ...state,
            deductionInterface: newDeductionInterface,
            selectedSteps: new Set(),
            selectedRule: undefined
          })
        }
        break
      }
    }
  }, [state])

  const onError = useCallback(message => {
    toaster.show({ message, intent: Intent.DANGER, timeout: 3000 })
  }, [])

  const ruleUI = useSelectedRuleUI({
    selectedRule: state.selectedRule?.rule,
    ruleInterface: state.selectedRule?.ruleInterface,
    onApply: useCallback(({ deductionInterface, symCtx }) => {
      setState({
        ...state,
        deductionInterface,
        symCtx,
        selectedSteps: new Set(),
        selectedRule: undefined
      })
    }, [state]),
    onCancel: useCallback(() => { setState({ ...state, selectedRule: undefined }) }, [state]),
    onError
  })

  return (
    <SymCtx.Provider value={state.symCtx}>
      <div className={classnames(style.root, className)} {...props}>
        <main className={style.main}>
          <DeductionSteps
            steps={state.deductionInterface.deduction.steps}
            selectedSteps={state.selectedSteps}
            onSelectedStepsChange={newSelectedSteps => {
              setState({
                ...state,
                selectedSteps: newSelectedSteps,
                selectedRule: undefined
              })
            }}
          />
          {ruleUI && (
            <div className={style.ruleUIContainer}>
              <Card>
                {ruleUI}
              </Card>
            </div>
          )}
        </main>
        <div className={style.aside}>
          <DeductionEditorRulePicker
            selectedRule={state.selectedRule?.rule}
            onRuleSelect={rule => {
              try {
                const ruleInterface = state.deductionInterface
                  .selectSteps(...[...state.selectedSteps].sort())
                  .chooseRule(rule)

                setState({
                  ...state,
                  selectedRule: { ruleInterface, rule }
                })
              } catch (error) {
                if (error.name === ErrorName.RULE_NOT_ALLOWED) {
                  onError(t(
                    'message.ruleCantBeAppliedToSelectedPremises',
                    { rule: ruleDescriber(rule).translation }
                  ))
                  setState({ ...state, selectedRule: undefined })
                }
              }
            }}
            onRuleDeselect={() => { setState({ ...state, selectedRule: undefined }) }}
          />
          <Button
            title={t('button.delete')}
            disabled={state.selectedSteps.size === 0}
            intent={Intent.DANGER}
            icon={IconNames.TRASH}
            onClick={() => { setState({ ...state, isDeleteDialogOpen: true }) }}
          >
            {t('button.delete')}
          </Button>
        </div>
      </div>
      <DeleteDialog
        isOpen={state.isDeleteDialogOpen}
        selectedSteps={state.selectedSteps}
        onConfirm={() => {
          const newDeductionInterface = state.deductionInterface.deleteLastStep()
          const newSymCtx = deleteExtraSymsFromSymCtx(
            state.symCtx,
            { ...primitiveSyms, ...Deduction.getSyms(newDeductionInterface.deduction) }
          )

          setState({
            ...state,
            deductionInterface: newDeductionInterface,
            symCtx: newSymCtx,
            isDeleteDialogOpen: false,
            selectedSteps: new Set()
          })
        }}
        onCancel={() => { setState({ ...state, isDeleteDialogOpen: false }) }}
      />
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

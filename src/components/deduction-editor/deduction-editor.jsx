import { Button, Card, Intent } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import {
  Deduction,
  ErrorName,
  Expression,
  primitiveSyms,
  Rule,
  startDeduction
} from '@zbrckovic/entail-core'
import classnames from 'classnames'
import { DeductionSteps } from 'components/deduction-steps'
import { RootCtx, SymCtx } from 'contexts'
import _ from 'lodash'
import { deleteExtraSymsFromSymCtx } from 'misc/sym-ctx-util'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { toaster } from 'toaster'
import { DeleteDialog } from './delete-dialog'
import style from './deduction-editor.m.scss'
import { RulePicker } from './rule-picker'
import { GraphDialog } from './graph-dialog'
import { useSelectedRuleUI } from './use-selected-rule-ui'

export const DeductionEditor = ({ className, ...props }) => {
  const { t } = useTranslation('DeductionEditor')

  const initialSymCtx = useContext(SymCtx)
  const { theme: { isDark } } = useContext(RootCtx)

  const [state, setState] = useState(() => ({
    symCtx: initialSymCtx,
    deductionInterface: startDeduction(),
    selectedSteps: [],
    selectedRule: undefined,
    isDeleteDialogOpen: false,
    isGraphDialogOpen: false
  }))

  useEffect(() => {
    if (state.selectedRule === undefined) return
    const {
      deductionInterface,
      selectedSteps,
      selectedRule: { rule, ruleInterface }
    } = state

    const rulesWhichCanBeHandledImmediately = new Set([
      Rule.NegationIntroduction,
      Rule.NegationElimination,
      Rule.ConditionalIntroduction,
      Rule.ConditionalElimination,
      Rule.ConjunctionIntroduction,
      Rule.DisjunctionElimination,
      Rule.BiconditionalIntroduction,
      Rule.BiconditionalElimination
    ])

    if (rulesWhichCanBeHandledImmediately.has(rule)) {
      const newDeductionInterface = ruleInterface.apply()

      setState({
        ...state,
        deductionInterface: newDeductionInterface,
        selectedSteps: [],
        selectedRule: undefined
      })

      return
    }

    // rules which can be handled immediately under specified condition
    switch (rule) {
      case Rule.UniversalInstantiation: {
        const [stepOrdinal] = selectedSteps

        const { formula } = Deduction.getStepByOrdinal(deductionInterface.deduction, stepOrdinal)
        const quantificationIsVacuous = Expression.findBoundOccurrences(formula).length === 0

        if (quantificationIsVacuous) {
          const newDeductionInterface = ruleInterface.apply()
          setState({
            ...state,
            deductionInterface: newDeductionInterface,
            selectedSteps: [],
            selectedRule: undefined
          })
        }
        break
      }
      case Rule.ExistentialInstantiation: {
        const [stepOrdinal] = selectedSteps

        const {
          formula
        } = Deduction.getStepByOrdinal(state.deductionInterface.deduction, stepOrdinal)
        const quantificationIsVacuous = Expression.findBoundOccurrences(formula).length === 0

        if (quantificationIsVacuous) {
          const newDeductionInterface = ruleInterface.apply()
          setState({
            ...state,
            deductionInterface: newDeductionInterface,
            selectedSteps: [],
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
    deduction: state.deductionInterface.deduction,
    selectedSteps: state.selectedSteps,
    selectedRule: state.selectedRule?.rule,
    ruleInterface: state.selectedRule?.ruleInterface,
    onApply: useCallback(({ deductionInterface, symCtx }) => {
      setState({
        ...state,
        deductionInterface,
        symCtx,
        selectedSteps: [],
        selectedRule: undefined
      })
    }, [state]),
    onCancel: useCallback(() => { setState({ ...state, selectedRule: undefined }) }, [state]),
    onError
  })

  return (
    <SymCtx.Provider value={state.symCtx}>
      <div className={classnames(style.root, { [style.dark]: isDark }, className)} {...props}>
        <div className={style.middle}>
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
            <RulePicker
              selectedRule={state.selectedRule?.rule}
              onRuleSelect={rule => {
                try {
                  const ruleInterface = state.deductionInterface
                    .selectSteps(...state.selectedSteps)
                    .chooseRule(rule)

                  setState({ ...state, selectedRule: { ruleInterface, rule } })

                  return true
                } catch (error) {
                  if (error.name === ErrorName.RULE_NOT_ALLOWED) {
                    setState({ ...state, selectedRule: undefined })
                    return false
                  } else {
                    throw error
                  }
                }
              }}
              onRuleDeselect={() => { setState({ ...state, selectedRule: undefined }) }}
            />
            <Button
              title={t('button.delete')}
              disabled={state.selectedRule !== undefined || state.selectedSteps.length === 0}
              intent={Intent.DANGER}
              icon={IconNames.TRASH}
              onClick={() => { setState({ ...state, isDeleteDialogOpen: true }) }}
            >
              {t('button.delete')}
            </Button>
            <Button
              title={t('button.graph')}
              disabled={
                state.isDeleteDialogOpen ||
                _.isEmpty(state.deductionInterface.deduction.termDependencyGraph)
              }
              icon={IconNames.GRAPH}
              onClick={() => { setState({ ...state, isGraphDialogOpen: true }) }}
            >
              {t('button.graph')}
            </Button>
          </div>
        </div>
        <footer className={style.footer}/>
      </div>
      <DeleteDialog
        isOpen={state.isDeleteDialogOpen}
        selectedSteps={state.selectedSteps}
        onConfirm={() => {
          const firstSelectedStep = Math.min(...state.selectedSteps)
          const stepsCount = Deduction.getSize(state.deductionInterface.deduction)

          let newDeductionInterface = state.deductionInterface
          _.range(firstSelectedStep, stepsCount + 1).forEach(() => {
            newDeductionInterface = newDeductionInterface.deleteLastStep()
          })

          const newSymCtx = deleteExtraSymsFromSymCtx(
            state.symCtx,
            { ...primitiveSyms, ...Deduction.getSyms(newDeductionInterface.deduction) }
          )

          setState({
            ...state,
            deductionInterface: newDeductionInterface,
            symCtx: newSymCtx,
            isDeleteDialogOpen: false,
            selectedSteps: []
          })
        }}
        onCancel={() => { setState({ ...state, isDeleteDialogOpen: false }) }}
      />
      <GraphDialog
        isOpen={state.isGraphDialogOpen}
        graph={state.deductionInterface.deduction.termDependencyGraph}
        onClose={() => { setState({ ...state, isGraphDialogOpen: false }) }}
      />
    </SymCtx.Provider>
  )
}

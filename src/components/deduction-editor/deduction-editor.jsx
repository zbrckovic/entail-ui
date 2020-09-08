import { DeductionInterface, Rule } from '@zbrckovic/entail-core'
import { DeductionEditorExistentialGeneralization } from './deduction-editor-existential-generalization'
import { DeductionEditorExistentialInstantiation } from './deduction-editor-existential-instantiation'
import { DeductionEditorRulePicker } from './deduction-editor-rule-picker'
import { DeductionEditorTautologicalImplication } from './deduction-editor-tautological-implication'
import { DeductionEditorUniversalGeneralization } from './deduction-editor-universal-generalization'
import { DeductionEditorUniversalInstantiation } from './deduction-editor-universal-instantiation'
import { DeductionSteps } from 'components/deduction-steps'
import { SymPresentationCtx } from 'contexts'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Box from '@material-ui/core/Box'
import { FormulaEditor } from '../formula-editor'

const createDefaultSelectedSteps = () => new Set()

export const DeductionEditor = ({ sx, ...props }) => {
  const initialPresentationCtx = useContext(SymPresentationCtx)

  const [{ deductionInterface, presentationCtx }, setState] = useState(() => ({
    presentationCtx: initialPresentationCtx,
    deductionInterface: DeductionInterface.start()
  }))

  const [selectedSteps, setSelectedSteps] = useState(createDefaultSelectedSteps)
  useEffect(() => { setSelectedSteps(createDefaultSelectedSteps()) }, [deductionInterface])

  const rulesInterface = useMemo(
    () => deductionInterface.selectSteps(...selectedSteps),
    [deductionInterface, selectedSteps]
  )

  const rules = useMemo(() => new Set(Object.keys(rulesInterface)), [rulesInterface])

  const [selectedRule, setSelectedRule] = useState()
  useEffect(() => { setSelectedRule(undefined) }, [rules])

  // eslint-disable-next-line no-unused-vars
  const ruleUI = useMemo(() => {
    const onRuleCancel = () => { setSelectedRule(undefined) }
    const ruleInterface = rulesInterface?.[selectedRule]

    switch (selectedRule) {
      case Rule.Premise:
        return (
          <FormulaEditor
            onSubmit={({ formula, presentationCtx }) => {
              const deductionInterface = ruleInterface.apply(formula)
              setState({ presentationCtx, deductionInterface })
            }}
            onCancel={onRuleCancel}
          />
        )
      case Rule.TautologicalImplication:
        return <DeductionEditorTautologicalImplication
          flexGrow={1}
          ruleInterface={ruleInterface}
          onApply={setState}
          onCancel={onRuleCancel} />
      case Rule.UniversalInstantiation:
        return <DeductionEditorUniversalInstantiation
          flexGrow={1}
          ruleInterface={ruleInterface}
          onApply={setState}
          onCancel={onRuleCancel} />
      case Rule.UniversalGeneralization:
        return <DeductionEditorUniversalGeneralization
          flexGrow={1}
          ruleInterface={ruleInterface}
          onApply={setState}
          onCancel={onRuleCancel} />
      case Rule.ExistentialInstantiation:
        return <DeductionEditorExistentialInstantiation
          flexGrow={1}
          ruleInterface={ruleInterface}
          onApply={setState}
          onCancel={onRuleCancel} />
      case Rule.ExistentialGeneralization:
        return <DeductionEditorExistentialGeneralization
          flexGrow={1}
          ruleInterface={ruleInterface}
          onApply={setState}
          onCancel={onRuleCancel} />
      default:
        return undefined
    }
  }, [rulesInterface, selectedRule])

  return (
    <SymPresentationCtx.Provider value={presentationCtx}>
      <Box flexBasis={0} flexGrow={1} {...props}>
        <DeductionSteps
          steps={deductionInterface.deduction.steps}
          selectedSteps={selectedSteps}
          onSelectedStepsChange={setSelectedSteps}
          mb={4}
        />
        <DeductionEditorRulePicker
          rules={rules}
          selectedRule={selectedRule}
          onRuleSelect={rule => {
            switch (rule) {
              case Rule.Deduction: {
                const deductionInterface = rulesInterface[Rule.Deduction].apply()
                setState({ presentationCtx, deductionInterface })
                break
              }
              case Rule.UniversalInstantiation: {
                const [stepOrdinal] = [...selectedSteps]
                const { formula } = deductionInterface.deduction.getStepByOrdinal(stepOrdinal)
                const quantificationIsVacuous = formula.findBoundOccurrences().isEmpty()

                if (quantificationIsVacuous) {
                  const deductionInterface = rulesInterface[Rule.UniversalInstantiation].apply()
                  setState({ presentationCtx, deductionInterface })
                } else {
                  setSelectedRule(rule)
                }
                break
              }
              case Rule.ExistentialInstantiation: {
                const [stepOrdinal] = [...selectedSteps]
                const { formula } = deductionInterface.deduction.getStepByOrdinal(stepOrdinal)
                const quantificationIsVacuous = formula.findBoundOccurrences().isEmpty()

                if (quantificationIsVacuous) {
                  const deductionInterface =
                    rulesInterface[Rule.ExistentialInstantiation].apply()
                  setState({ presentationCtx, deductionInterface })
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
      </Box>
    </SymPresentationCtx.Provider>
  )
}

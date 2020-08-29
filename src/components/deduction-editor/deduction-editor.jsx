import { DeductionInterface, Rule } from '@zbrckovic/entail-core'
import { ExistentialGeneralization } from 'components/deduction-editor/existential-generalization'
import { ExistentialInstantiation } from 'components/deduction-editor/existential-instantiation'
import { Premise } from 'components/deduction-editor/premise'
import { RulePicker } from 'components/deduction-editor/rule-picker'
import { TautologicalImplication } from 'components/deduction-editor/tautological-implication'
import { UniversalGeneralization } from 'components/deduction-editor/universal-generalization'
import { UniversalInstantiation } from 'components/deduction-editor/universal-instantiation'
import { DeductionView } from 'components/deduction-view'
import { SymPresentationCtx } from 'contexts'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Box, Flex } from 'rebass'

const createDefaultSelectedSteps = () => new Set()

export const DeductionEditor = () => {
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

  const determineRuleUI = useCallback(rule => {
    const onRuleCancel = () => { setSelectedRule(undefined) }
    const ruleInterface = rulesInterface?.[rule]

    switch (rule) {
      case Rule.Premise:
        return <Premise
          ruleInterface={ruleInterface}
          onApply={setState}
          onCancel={onRuleCancel} />
      case Rule.TautologicalImplication:
        return <TautologicalImplication
          ruleInterface={ruleInterface}
          onApply={setState}
          onCancel={onRuleCancel} />
      case Rule.UniversalInstantiation:
        return <UniversalInstantiation
          ruleInterface={ruleInterface}
          onApply={setState}
          onCancel={onRuleCancel} />
      case Rule.UniversalGeneralization:
        return <UniversalGeneralization
          ruleInterface={ruleInterface}
          onApply={setState}
          onCancel={onRuleCancel} />
      case Rule.ExistentialInstantiation:
        return <ExistentialInstantiation
          ruleInterface={ruleInterface}
          onApply={setState}
          onCancel={onRuleCancel} />
      case Rule.ExistentialGeneralization:
        return <ExistentialGeneralization
          ruleInterface={ruleInterface}
          onApply={setState}
          onCancel={onRuleCancel} />
    }
  }, [rulesInterface])

  return (
    <SymPresentationCtx.Provider value={presentationCtx}>
      <Flex>
        <Box flexBasis={0} flexGrow={1} mr={4}>
          <DeductionView
            flexAlign='stretch'
            deduction={deductionInterface.deduction}
            selectedSteps={selectedSteps}
            onSelectedStepsChange={setSelectedSteps}
          />
          {determineRuleUI(selectedRule)}
        </Box>
        <Box>
          <RulePicker
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
                    const deductionInterface = rulesInterface[Rule.ExistentialInstantiation].apply()
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
      </Flex>
    </SymPresentationCtx.Provider>
  )
}

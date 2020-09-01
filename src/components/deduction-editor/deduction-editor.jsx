import { DeductionInterface, Rule } from '@zbrckovic/entail-core'
import { TermDependencies } from 'components/term-dependencies'
import { DeductionEditorExistentialGeneralization } from './deduction-editor-existential-generalization'
import { DeductionEditorExistentialInstantiation } from './deduction-editor-existential-instantiation'
import { DeductionEditorPremise } from './deduction-editor-premise'
import { DeductionEditorRulePicker } from './deduction-editor-rule-picker'
import { DeductionEditorTautologicalImplication } from './deduction-editor-tautological-implication'
import { DeductionEditorUniversalGeneralization } from './deduction-editor-universal-generalization'
import { DeductionEditorUniversalInstantiation } from './deduction-editor-universal-instantiation'
import { DeductionSteps } from 'components/deduction-steps'
import { SymPresentationCtx } from 'contexts'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Box, Flex } from 'rebass'

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

  const determineRuleUI = useCallback(rule => {
    const onRuleCancel = () => { setSelectedRule(undefined) }
    const ruleInterface = rulesInterface?.[rule]

    switch (rule) {
      case Rule.Premise:
        return <DeductionEditorPremise
          ruleInterface={ruleInterface}
          onApply={setState}
          onCancel={onRuleCancel} />
      case Rule.TautologicalImplication:
        return <DeductionEditorTautologicalImplication
          ruleInterface={ruleInterface}
          onApply={setState}
          onCancel={onRuleCancel} />
      case Rule.UniversalInstantiation:
        return <DeductionEditorUniversalInstantiation
          ruleInterface={ruleInterface}
          onApply={setState}
          onCancel={onRuleCancel} />
      case Rule.UniversalGeneralization:
        return <DeductionEditorUniversalGeneralization
          ruleInterface={ruleInterface}
          onApply={setState}
          onCancel={onRuleCancel} />
      case Rule.ExistentialInstantiation:
        return <DeductionEditorExistentialInstantiation
          ruleInterface={ruleInterface}
          onApply={setState}
          onCancel={onRuleCancel} />
      case Rule.ExistentialGeneralization:
        return <DeductionEditorExistentialGeneralization
          ruleInterface={ruleInterface}
          onApply={setState}
          onCancel={onRuleCancel} />
    }
  }, [rulesInterface])

  return (
    <SymPresentationCtx.Provider value={presentationCtx}>
      <Flex flexDirection='column' sx={{ ...sx }} {...props}>
        <Flex flexBasis={0} flexGrow={1}>
          <Box flexBasis={0} flexGrow={1} mr={4}>
            <DeductionSteps
              flexAlign='stretch'
              steps={deductionInterface.deduction.steps}
              selectedSteps={selectedSteps}
              onSelectedStepsChange={setSelectedSteps}
              mb={4}
            />
            {determineRuleUI(selectedRule)}
          </Box>
          <Box sx={{
            p: 1,
            borderLeftWidth: 1,
            borderLeftStyle: 'solid',
            borderLeftColor: 'neutral'
          }}>
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
        </Flex>
        <Flex sx={{
          p: 1,
          borderTopWidth: 1,
          borderTopStyle: 'solid',
          borderTopColor: 'neutral'
        }} flexBasis={300}>
          <TermDependencies
            flexBasis={0}
            flexGrow={1}
            graph={deductionInterface.deduction.termDependencyGraph} />
          <Box
            flexBasis={0}
            flexGrow={1} />
        </Flex>
      </Flex>
    </SymPresentationCtx.Provider>
  )
}

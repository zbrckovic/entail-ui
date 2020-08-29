import { DeductionInterface, Rule } from '@zbrckovic/entail-core'
import { Premise } from 'components/deduction-editor/premise'
import { RulePicker } from 'components/deduction-editor/rule-picker'
import { TautologicalImplication } from 'components/deduction-editor/tautological-implication'
import { UniversalInstantiation } from 'components/deduction-editor/universal-instantiation'
import { DeductionView } from 'components/deduction-view'
import { SymPresentationCtx } from 'contexts'
import React, { useContext, useEffect, useMemo, useState } from 'react'
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

  const determineRuleUI = rule => {
    switch (rule) {
      case Rule.Premise:
        return <Premise
          ruleInterface={rulesInterface[Rule.Premise]}
          onApply={setState}
          onCancel={() => { setSelectedRule(undefined) }} />
      case Rule.TautologicalImplication:
        return <TautologicalImplication
          ruleInterface={rulesInterface[Rule.TautologicalImplication]}
          onApply={setState}
          onCancel={() => { setSelectedRule(undefined) }} />
      case Rule.UniversalInstantiation:
        return <UniversalInstantiation
          ruleInterface={rulesInterface[Rule.UniversalInstantiation]}
          onApply={setState}
          onCancel={() => { setSelectedRule(undefined) }} />
    }
  }

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
              if (rule === Rule.Deduction) {
                const deductionInterface = rulesInterface[Rule.Deduction].apply()
                setState({ presentationCtx, deductionInterface })
              } else {
                setSelectedRule(rule)
              }
            }}
            onRuleDeselect={() => { setSelectedRule(undefined) }}
          />
        </Box>
      </Flex>
    </SymPresentationCtx.Provider>
  )
}

import { DeductionInterface } from '@zbrckovic/entail-core'
import { RulePicker } from 'components/deduction-editor/rule-picker'
import { DeductionView } from 'components/deduction-view'
import React, { useEffect, useState, useMemo } from 'react'
import { Flex } from 'rebass'

const createDefaultSelectedSteps = () => new Set()

export const DeductionEditor = () => {
  const [deductionInterface, setDeductionInterface] = useState(DeductionInterface.start())

  const [selectedSteps, setSelectedSteps] = useState(createDefaultSelectedSteps)
  useEffect(() => { setSelectedSteps(createDefaultSelectedSteps()) }, [deductionInterface])

  const rulesInterface = useMemo(
    () => deductionInterface.selectSteps(...selectedSteps),
    [deductionInterface, selectedSteps]
  )

  const rules = useMemo(() => new Set(Object.keys(rulesInterface)), [rulesInterface])

  const [selectedRule, setSelectedRule] = useState()
  useEffect(() => { setSelectedRule(undefined) }, [rules])

  console.log(selectedRule)

  return (
    <Flex>
      <DeductionView
        flexGrow={1}
        flexAlign='stretch'
        deduction={deductionInterface.deduction}
        selectedSteps={selectedSteps}
        onSelectedStepsChange={setSelectedSteps}
      />
      <RulePicker rules={rules} selectedRule={selectedRule} onRuleSelect={setSelectedRule}/>
    </Flex>
  )
}

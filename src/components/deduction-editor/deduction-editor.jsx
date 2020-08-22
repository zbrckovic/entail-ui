import { DeductionInterface } from '@zbrckovic/entail-core'
import { InvalidTautologicalImplicationError } from '@zbrckovic/entail-core/lib/deduction-interface/rules-interface/tautological-implication-rule-interface'
import { Rule } from '@zbrckovic/entail-core/lib/deduction-structure/rule'
import { RulePicker } from 'components/deduction-editor/rule-picker'
import { DeductionView } from 'components/deduction-view'
import { FormulaEditor } from 'components/formula-editor'
import { SymPresentationCtx } from 'contexts'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Flex, Text } from 'rebass'

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
        return (
          <Premise
            ruleInterface={rulesInterface[Rule.Premise]}
            onApply={setState}
            onCancel={() => { setSelectedRule(undefined) }}
          />
        )
      case Rule.TautologicalImplication:
        return (
          <TautologicalImplication
            ruleInterface={rulesInterface[Rule.TautologicalImplication]}
            onApply={setState}
            onCancel={() => { setSelectedRule(undefined) }}
          />
        )
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
            onRuleSelect={setSelectedRule}
            onRuleDeselect={() => { setSelectedRule(undefined) }}
          />
        </Box>
      </Flex>
    </SymPresentationCtx.Provider>
  )
}

const Premise = ({ ruleInterface, onApply, onCancel }) => {
  const { t } = useTranslation('DeductionEditor')

  return <Box>
    <Text as='h4'>{t('label.enterThePremise')}</Text>
    <FormulaEditor
      onSubmit={({ formula, presentationCtx }) => {
        const deductionInterface = ruleInterface.apply(formula)
        onApply({ presentationCtx, deductionInterface })
      }}
      onCancel={onCancel}
    />
  </Box>
}

const TautologicalImplication = ({ ruleInterface, onApply, onCancel }) => {
  const { t } = useTranslation('DeductionEditor')

  const [hasError, setHasError] = useState(false)

  return <Box>
    <Text as='h4'>{t('label.enterTheConsequent')}</Text>
    <FormulaEditor
      onSubmit={({ formula, presentationCtx }) => {
        let deductionInterface
        try {
          deductionInterface = ruleInterface.apply(formula)
        } catch (error) {
          if (error instanceof InvalidTautologicalImplicationError) {
            setHasError(true)
            return
          } else {
            throw error
          }
        }

        setHasError(false)
        onApply({ presentationCtx, deductionInterface })
      }}
      onCancel={onCancel}
    />
    {hasError && <Text color='danger' mt={2}>{t('message.invalidTautologicalImplication')}</Text>}
  </Box>
}

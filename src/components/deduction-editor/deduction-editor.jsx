import { DeductionInterface, Rule } from '@zbrckovic/entail-core'
import { DeductionEditorExistentialGeneralization } from './deduction-editor-existential-generalization'
import { DeductionEditorExistentialInstantiation } from './deduction-editor-existential-instantiation'
import { DeductionEditorRulePicker } from './deduction-editor-rule-picker'
import { DeductionEditorTautologicalImplication } from './deduction-editor-tautological-implication'
import { DeductionEditorUniversalGeneralization } from './deduction-editor-universal-generalization'
import { DeductionEditorUniversalInstantiation } from './deduction-editor-universal-instantiation'
import { DeductionSteps } from 'components/deduction-steps'
import { SymCtx } from 'contexts'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import Box from '@material-ui/core/Box'
import { FormulaEditor } from '../formula-editor'
import { makeStyles } from '@material-ui/core/styles'

const createDefaultSelectedSteps = () => new Set()

export const DeductionEditor = ({ sx, ...props }) => {
  const classes = useStyles()

  const initialPresentationCtx = useContext(SymCtx)

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

  const ruleUI = useSelectedRuleUI({
    selectedRule,
    ruleInterface: rulesInterface?.[selectedRule],
    onApply: setState,
    onCancel: useCallback(() => { setSelectedRule(undefined) }, [])
  })

  return (
    <SymCtx.Provider value={presentationCtx}>
      <Box display='flex' {...props}>
        <Box component='main' className={classes.main}>
          <DeductionSteps
            steps={deductionInterface.deduction.steps}
            selectedSteps={selectedSteps}
            onSelectedStepsChange={setSelectedSteps}
            lastStepAccessory={ruleUI}
          />
        </Box>
        <Box component='aside' className={classes.aside}>
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
      </Box>
    </SymCtx.Provider>
  )
}

const useSelectedRuleUI = ({ selectedRule, ruleInterface, onApply, onCancel }) =>
  useMemo(() => {
    switch (selectedRule) {
      case Rule.Premise:
        return (
          <FormulaEditor
            onSubmit={({ formula, presentationCtx }) => {
              const deductionInterface = ruleInterface.apply(formula)
              onApply({ presentationCtx, deductionInterface })
            }}
            onCancel={onCancel}
          />
        )
      case Rule.TautologicalImplication:
        return <DeductionEditorTautologicalImplication
          flexGrow={1}
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel} />
      case Rule.UniversalInstantiation:
        return <DeductionEditorUniversalInstantiation
          flexGrow={1}
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel} />
      case Rule.UniversalGeneralization:
        return <DeductionEditorUniversalGeneralization
          flexGrow={1}
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel} />
      case Rule.ExistentialInstantiation:
        return <DeductionEditorExistentialInstantiation
          flexGrow={1}
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel} />
      case Rule.ExistentialGeneralization:
        return <DeductionEditorExistentialGeneralization
          flexGrow={1}
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel} />
      default:
        return undefined
    }
  }, [ruleInterface, selectedRule, onApply, onCancel])

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: theme.palette.background.paper,
    flexGrow: 1
  },
  aside: {
    backgroundColor: theme.palette.background.default,
    borderLeftWidth: 1,
    borderLeftStyle: 'solid',
    borderLeftColor: theme.palette.divider,
    padding: theme.spacing(2)
  }
}))

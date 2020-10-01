import Box from '@material-ui/core/Box'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import Alert from '@material-ui/lab/Alert'
import {
  Category,
  Deduction,
  Expression,
  ExpressionPointer,
  Rule,
  startDeduction,
  Sym
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
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import { TargetType } from '../expression-view'

const createDefaultSelectedSteps = () => new Set()

export const DeductionEditor = ({ ...props }) => {
  const classes = useStyles()
  const { t } = useTranslation('DeductionEditor')

  const initialSymCtx = useContext(SymCtx)

  const [errorMsg, setErrorMsg] = useState(undefined)

  const [{ deductionInterface, symCtx }, setState] = useState(() => ({
    symCtx: initialSymCtx,
    deductionInterface: startDeduction()
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

  const [selectionTarget, setSelectionTarget] = useState()

  const selectedFreeIndividualVariable = useMemo(
    () =>
      selectionTarget === undefined
        ? undefined
        : extractSelectedFreeIndividualVariable(deductionInterface.deduction, selectionTarget),
    [deductionInterface, selectionTarget]
  )

  const ruleUI = useSelectedRuleUI({
    selectedRule,
    selectedFreeIndividualVariable,
    ruleInterface: rulesInterface?.[selectedRule],
    onApply: setState,
    onCancel: useCallback(() => { setSelectedRule(undefined) }, []),
    onError: setErrorMsg
  })

  return (
    <SymCtx.Provider value={symCtx}>
      <Box display='flex' {...props}>
        <Box component='main' className={classes.main}>
          <DeductionSteps
            steps={deductionInterface.deduction.steps}
            selectedSteps={selectedSteps}
            onSelectedStepsChange={setSelectedSteps}
            lastStepAccessory={ruleUI}
            selectionTarget={selectionTarget}
            onSelectionTargetChange={setSelectionTarget}
          />
        </Box>
        <Box
          display='flex'
          flexDirection='column'
          alignItems='stretch'
          component='aside'
          className={classes.aside}
        >
          <DeductionEditorRulePicker
            mb={1}
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
            variant='outlined'
            title={t('button.delete')}
            disabled={selectedSteps.size === 0}
            startIcon={<DeleteIcon />}
          >
            {t('button.delete')}
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={errorMsg !== undefined}
        onClose={(event, reason) => {
          if (reason === 'clickaway') return
          setErrorMsg(undefined)
        }}
        message={errorMsg}
      >
        <Alert severity="error">{errorMsg}</Alert>
      </Snackbar>
    </SymCtx.Provider>
  )
}

const useSelectedRuleUI = ({
  selectedRule,
  selectedFreeIndividualVariable,
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
          flexGrow={1}
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel}
          onError={onError}
        />
      case Rule.UniversalInstantiation:
        return <DeductionEditorUniversalInstantiation
          flexGrow={1}
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel}
          onError={onError}
        />
      case Rule.UniversalGeneralization:
        return <DeductionEditorUniversalGeneralization
          flexGrow={1}
          ruleInterface={ruleInterface}
          oldTerm={selectedFreeIndividualVariable}
          onApply={onApply}
          onCancel={onCancel}
          onError={onError}
        />
      case Rule.ExistentialInstantiation:
        return <DeductionEditorExistentialInstantiation
          flexGrow={1}
          ruleInterface={ruleInterface}
          onApply={onApply}
          onCancel={onCancel}
          onError={onError}
        />
      case Rule.ExistentialGeneralization:
        return <DeductionEditorExistentialGeneralization
          flexGrow={1}
          ruleInterface={ruleInterface}
          oldTerm={selectedFreeIndividualVariable}
          onApply={onApply}
          onCancel={onCancel}
          onError={onError}
        />
      default:
        return undefined
    }
  }, [ruleInterface, selectedRule, onApply, onCancel, onError, t])
}

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

const extractSelectedFreeIndividualVariable = (deduction, target) => {
  const { type, position, step } = target
  if (type !== TargetType.MAIN) return undefined

  const { formula } = deduction.steps[step]
  const { sym } = Expression.getSubexpression(formula, position)

  if (!isSymIndividualVariable(sym)) return undefined
  if (!isSymFree(formula, sym)) return undefined

  return sym
}

const isSymIndividualVariable = sym =>
  sym.arity === 0 && Sym.getCategory(sym) === Category.TT

// TODO: this check is not good because it doesn't consider the exact occurrence of the sym. If
//  `sym` occurs both as free and bound it will be irrelevant which occurrence was selected - it'll
//  be recognized as free.
const isSymFree = (formula, sym) => {
  const freeSyms = Expression.getFreeSyms(formula)
  return freeSyms[sym.id] !== undefined
}

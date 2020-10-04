import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import Alert from '@material-ui/lab/Alert'
import { Deduction, Expression, Rule, startDeduction } from '@zbrckovic/entail-core'
import { DeductionSteps } from 'components/deduction-steps'
import { SymCtx } from 'contexts'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormulaEditor } from '../formula-editor'
import Dialog from '@material-ui/core/Dialog'
import { DeductionEditorExistentialGeneralization } from './deduction-editor-existential-generalization'
import { DeductionEditorExistentialInstantiation } from './deduction-editor-existential-instantiation'
import { DeductionEditorRulePicker } from './deduction-editor-rule-picker'
import { DeductionEditorTautologicalImplication } from './deduction-editor-tautological-implication'
import { DeductionEditorUniversalGeneralization } from './deduction-editor-universal-generalization'
import { DeductionEditorUniversalInstantiation } from './deduction-editor-universal-instantiation'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import { DialogContentText } from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions'

export const DeductionEditor = ({ ...props }) => {
  const classes = useStyles()
  const { t } = useTranslation('DeductionEditor')

  const initialSymCtx = useContext(SymCtx)

  const [errorMsg, setErrorMsg] = useState(undefined)

  const [{ deductionInterface, symCtx }, setState] = useState(() => ({
    symCtx: initialSymCtx,
    deductionInterface: startDeduction()
  }))

  const [selectedSteps, setSelectedSteps] = useState(() => new Set())
  useEffect(() => { setSelectedSteps(new Set()) }, [deductionInterface])

  const areLastStepsSelected = useMemo(() => {
    if (selectedSteps.size === 0) return false

    // TODO: finish this
    return false
  }, [selectedSteps])

  const rulesInterface = useMemo(
    () => deductionInterface.selectSteps(...selectedSteps),
    [deductionInterface, selectedSteps]
  )

  const rules = useMemo(() => new Set(Object.keys(rulesInterface)), [rulesInterface])

  const [selectedRule, setSelectedRule] = useState()
  useEffect(() => { setSelectedRule(undefined) }, [rules])

  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false)

  const ruleUI = useSelectedRuleUI({
    selectedRule,
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
            onClick={() => { setIsConfirmationDialogOpen(true) }}
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
      <Dialog
        open={isConfirmationDialogOpen}
        onClose={() => { setIsConfirmationDialogOpen(false) }}
      >
        <DialogTitle>{t('deleteDialog.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText>{t('deleteDialog.content')}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => {
              // TODO: delete selected steps
              setIsConfirmationDialogOpen(false)
            }}
          >
            {t('deleteDialog.yes')}
          </Button>
          <Button onClick={() => { setIsConfirmationDialogOpen(false) }}>
            {t('deleteDialog.no')}
          </Button>
        </DialogActions>
      </Dialog>
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

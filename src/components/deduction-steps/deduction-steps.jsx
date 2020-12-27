import { StepAssumptions } from 'components/deduction-steps/step-assumptions'
import { StepPremises } from 'components/deduction-steps/step-premises'
import { ExpressionView } from 'components/expression-view/expression-view'
import React, { Fragment, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import style from './deduction-steps.m.scss'
import classnames from 'classnames'
import { RootCtx } from 'contexts'
import { RuleBadge } from 'components/deduction-editor/rule-badge'

export const DeductionSteps = ({
  steps,
  // Must be provided to support step selection.
  selectedSteps,
  // Must be provided to support step selection.
  onSelectedStepsChange,
  selectionTarget,
  // Called with `{ step, type, position }`.
  onSelectionTargetChange,
  className,
  ...props
}) => {
  const { theme: { isDark } } = useContext(RootCtx)

  const { t } = useTranslation()

  const hasRowSelection = selectedSteps !== undefined && onSelectedStepsChange !== undefined

  return (
    <div
      className={classnames(style.root, { [style.dark]: isDark }, className)}
      {...props}
    >
      <div
        className={classnames(
          style.cell,
          style.header,
          style.stepNumber,
          { [style.hasSelection]: hasRowSelection }
        )}
        onClick={hasRowSelection ? () => { onSelectedStepsChange([]) } : undefined}
      >
        <strong title={t('deductionSteps.stepNumberLbl')}>
          {t('deductionSteps.stepNumberAbbreviatedLbl')}
        </strong>
      </div>
      <div className={classnames(style.cell, style.header)}>
        <strong title={t('deductionSteps.assumptionsLbl')}>
          {t('deductionSteps.assumptionsAbbreviatedLbl')}
        </strong>
      </div>
      <div className={classnames(style.cell, style.header)}>
        <strong title={t('deductionSteps.formulaLbl')}>
          {t('deductionSteps.formulaAbbreviatedLbl')}
        </strong>
      </div>
      <div className={classnames(style.cell, style.header)}>
        <strong title={t('deductionSteps.ruleLbl')}>
          {t('deductionSteps.ruleAbbreviatedLbl')}
        </strong>
      </div>
      <div className={classnames(style.cell, style.header)}>
        <strong title={t('deductionSteps.premisesLbl')}>
          {t('deductionSteps.premisesAbbreviatedLbl')}
        </strong>
      </div>
      {
        steps.map((step, i) => {
          const stepNumber = i + 1

          let indexAmongSelected = -1
          if (hasRowSelection) {
            indexAmongSelected = selectedSteps.findIndex(n => n === stepNumber)
          }

          const isSelected = indexAmongSelected !== -1

          let selectionTargetForFormula
          if (selectionTarget?.step === i) {
            selectionTargetForFormula = {
              type: selectionTarget.type,
              position: selectionTarget.position
            }
          }

          const onSelect = (() => {
            if (!hasRowSelection) return undefined

            return () => {
              const newSelectedSteps = [...selectedSteps]

              if (isSelected) {
                newSelectedSteps.splice(indexAmongSelected, 1)
              } else {
                newSelectedSteps.push(stepNumber)
              }
              onSelectedStepsChange(newSelectedSteps)
            }
          })()

          return (
            <Fragment key={i}>
              <div
                className={classnames(
                  style.cell,
                  style.stepNumber,
                  {
                    [style.selected]: isSelected,
                    [style.hasSelection]: hasRowSelection
                  }
                )}
                onClick={onSelect}
              >
                <span>
                  {stepNumber}
                  {
                    isSelected &&
                    <span className={style.selectionIndex}>{indexAmongSelected + 1}</span>
                  }
                </span>
              </div>
              <div className={style.cell} onClick={onSelect}>
                <StepAssumptions assumptions={step.assumptions} />
              </div>
              <div
                className={style.cell}
                onClick={() => {
                  onSelectionTargetChange?.(undefined)
                  onSelect?.()
                }}
              >
                <ExpressionView
                  expression={step.formula}
                  selectionTarget={selectionTargetForFormula}
                  onSelectionTargetChange={selectionTarget => {
                    if (onSelectionTargetChange === undefined) return

                    let selectionTargetToSend
                    if (selectionTarget !== undefined) {
                      selectionTargetToSend = { ...selectionTarget, step: i }
                    }

                    onSelectionTargetChange(selectionTargetToSend)
                  }}
                />
              </div>
              <div className={style.cell} onClick={onSelect}>
                <RuleBadge rule={step.ruleApplicationSummary.rule} />
              </div>
              <div className={style.cell} onClick={onSelect}>
                <StepPremises premises={step.ruleApplicationSummary.premises} />
              </div>
            </Fragment>
          )
        })
      }
    </div>
  )
}

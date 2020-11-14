import { StepAssumptions } from 'components/deduction-steps/step-assumptions'
import { StepPremises } from 'components/deduction-steps/step-premises'
import { ExpressionView } from 'components/expression-view/expression-view'
import React, { Fragment, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import style from './deduction-steps.m.scss'
import classnames from 'classnames'
import { RootCtx } from 'contexts'
import { RuleBadge } from '../rule-badge'

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

  const { t } = useTranslation('DeductionSteps')

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
        <strong title={t('label.stepNumber')}>{t('label.stepNumberAbbreviated')}</strong>
      </div>
      <div className={classnames(style.cell, style.header)}>
        <strong title={t('label.assumptions')}>{t('label.assumptionsAbbreviated')}</strong>
      </div>
      <div className={classnames(style.cell, style.header)}>
        <strong title={t('label.formula')}>{t('label.formulaAbbreviated')}</strong>
      </div>
      <div className={classnames(style.cell, style.header)}>
        <strong title={t('label.rule')}>{t('label.ruleAbbreviated')}</strong>
      </div>
      <div className={classnames(style.cell, style.header)}>
        <strong title={t('label.premises')}>{t('label.premisesAbbreviated')}</strong>
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

          const onSelect = hasRowSelection ? () => {
            const newSelectedSteps = [...selectedSteps]

            if (isSelected) {
              newSelectedSteps.splice(indexAmongSelected, 1)
            } else {
              newSelectedSteps.push(stepNumber)
            }
            onSelectedStepsChange(newSelectedSteps)
          } : undefined

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
                <StepAssumptions assumptions={step.assumptions}/>
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
                <RuleBadge rule={step.ruleApplicationSummary.rule}/>
              </div>
              <div className={style.cell} onClick={onSelect}>
                <StepPremises premises={step.ruleApplicationSummary.premises}/>
              </div>
            </Fragment>
          )
        })
      }
    </div>
  )
}

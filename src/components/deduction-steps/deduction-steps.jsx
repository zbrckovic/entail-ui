import { StepAssumptions } from 'components/deduction-steps/step-assumptions'
import { StepPremises } from 'components/deduction-steps/step-premises'
import { StepRule } from 'components/deduction-steps/step-rule'
import { ExpressionView } from 'components/expression-view'
import React, { Fragment, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import style from './deduction-steps.m.scss'
import { Tooltip } from '@blueprintjs/core'
import classnames from 'classnames'
import { RootCtx } from '../../contexts'

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
      className={classnames(
        style.root,
        { [style.dark]: isDark },
        className
      )}
      {...props}
    >
      <div
        className={classnames(
          style.cell,
          style.header,
          style.stepNumber,
          { [style.dark]: isDark }
        )}
      >
        <Tooltip content={t('label.stepNumber')}>
          <strong>{t('label.stepNumberAbbreviated')}</strong>
        </Tooltip>
      </div>
      <div className={classnames(style.cell, style.header)}>
        <Tooltip content={t('label.assumptions')}>
          <strong>{t('label.assumptionsAbbreviated')}</strong>
        </Tooltip>
      </div>
      <div className={classnames(style.cell, style.header)}>
        <Tooltip content={t('label.formula')}>
          <strong>{t('label.formulaAbbreviated')}</strong>
        </Tooltip>
      </div>
      <div className={classnames(style.cell, style.header)}>
        <Tooltip content={t('label.rule')}>
          <strong>{t('label.ruleAbbreviated')}</strong>
        </Tooltip>
      </div>
      <div className={classnames(style.cell, style.header)}>
        <Tooltip content={t('label.premises')}>
          <strong>{t('label.premisesAbbreviated')}</strong>
        </Tooltip>
      </div>
      {
        steps.map((step, i) => {
          const stepNumber = i + 1
          const isSelected = hasRowSelection ? selectedSteps.has(stepNumber) : undefined

          let selectionTargetForFormula
          if (selectionTarget?.step === i) {
            selectionTargetForFormula = {
              type: selectionTarget.type,
              position: selectionTarget.position
            }
          }

          return (
            <Fragment key={i}>
              <div
                className={classnames(
                  style.cell,
                  style.stepNumber,
                  {
                    [style.dark]: isDark,
                    [style.selected]: isSelected,
                    [style.hasSelection]: hasRowSelection
                  })
                }
                onClick={() => {
                  if (hasRowSelection) {
                    const newSelectedSteps = new Set(selectedSteps)
                    if (newSelectedSteps.has(stepNumber)) {
                      newSelectedSteps.delete(stepNumber)
                    } else {
                      newSelectedSteps.add(stepNumber)
                    }
                    onSelectedStepsChange(newSelectedSteps)
                  }
                }}
              >
                <span>{stepNumber}</span>
              </div>
              <div className={style.cell}>
                <StepAssumptions assumptions={step.assumptions} />
              </div>
              <div
                className={style.cell}
                onClick={() => { onSelectionTargetChange?.(undefined) }}
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
              <div className={style.cell}>
                <StepRule rule={step.ruleApplicationSummary.rule} />
              </div>
              <div className={style.cell}>
                <StepPremises premises={step.ruleApplicationSummary.premises} />
              </div>
            </Fragment>
          )
        })
      }
    </div>
  )
}

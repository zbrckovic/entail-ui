import { StepAssumptions } from 'components/deduction-steps/step-assumptions'
import { StepPremises } from 'components/deduction-steps/step-premises'
import { StepRule } from 'components/deduction-steps/step-rule'
import { ExpressionView } from 'components/expression-view'
import React from 'react'
import { useTranslation } from 'react-i18next'
import style from './deduction-steps.m.scss'
import { Tooltip } from '@blueprintjs/core'
import classnames from 'classnames'

export const DeductionSteps = ({
  steps,
  // Must be provided to support step selection.
  selectedSteps,
  // Must be provided to support step selection.
  onSelectedStepsChange,
  lastStepAccessory,
  // `{ step, type, position }`
  selectionTarget,
  // Called with `{ step, type, position }`.
  onSelectionTargetChange,
  className,
  ...props
}) => {
  const { t } = useTranslation('DeductionSteps')

  const hasRowSelection = selectedSteps !== undefined && onSelectedStepsChange !== undefined

  const hasSteps = steps.length > 0
  const areAllRowsSelected = hasRowSelection ? steps.length === selectedSteps.size : undefined
  const areSomeRowsSelected = hasRowSelection ? selectedSteps.size > 0 : undefined

  return (
    <div className={classnames(style.root, className)} {...props}>
      <div className={style.header}>
        <div className={style.headerRow}>
          <div className={style.cell}>
            <Tooltip content={t('label.stepNumber')}>
              <span>{t('label.stepNumberAbbreviated')}</span>
            </Tooltip>
          </div>
          <div className={style.cell}>
            <Tooltip content={t('label.assumptions')}>
              <span>{t('label.assumptionsAbbreviated')}</span>
            </Tooltip>
          </div>
          <div className={style.cell}>
            <Tooltip content={t('label.formula')}>
              <span>{t('label.formulaAbbreviated')}</span>
            </Tooltip>
          </div>
          <div className={style.cell}>
            <Tooltip content={t('label.rule')}>
              <span>{t('label.ruleAbbreviated')}</span>
            </Tooltip>
          </div>
          <div className={style.cell}>
            <Tooltip content={t('label.premises')}>
              <span>{t('label.premisesAbbreviated')}</span>
            </Tooltip>
          </div>
        </div>
      </div>
      <div className={style.body}>
        <div className={style.bodyRow}>
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
                <div
                  key={i}
                  className={style.row}
                  onClick={
                    hasRowSelection
                      ? () => {
                        const newSelectedSteps = new Set(selectedSteps)

                        if (isSelected) {
                          newSelectedSteps.delete(stepNumber)
                        } else {
                          newSelectedSteps.add(stepNumber)
                        }

                        onSelectedStepsChange(newSelectedSteps)
                      }
                      : undefined
                  }
                >
                  <div className={style.cell}>
                    <span>{stepNumber}</span>
                  </div>
                  <div className={style.cell}>
                    <StepAssumptions assumptions={step.assumptions} />
                  </div>
                  <div className={style.cell}>
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
                </div>
              )
            })
          }
          {
            lastStepAccessory !== undefined && (
              <div key={steps.length + 1} className={style.bodyRow}>
                <div className={style.cell}>
                  {lastStepAccessory}
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

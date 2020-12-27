import { Switch } from '@blueprintjs/core'
import classnames from 'classnames'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormulaEditor } from 'components/deduction-editor/formula-editor'
import style from './disjunction-introduction.m.scss'

export const DisjunctionIntroduction = ({
  formula,
  ruleInterface,
  onApply,
  onCancel,
  onError,
  className,
  ...props
}) => {
  const { t } = useTranslation()

  const [isAddingRight, setIsAddingRight] = useState(false)

  return (
    <div className={classnames(style.root, className)} {...props}>
      <Switch
        title={t('deductionEditor.changeNewDisjunctPositionLbl')}
        checked={isAddingRight}
        onChange={event => { setIsAddingRight(event.target.checked) }}
      >
        {t('deductionEditor.changeNewDisjunctPositionLbl')}
      </Switch>
      <FormulaEditor
        label={
          isAddingRight
            ? t('deductionEditor.enterTheRightDisjunctLbl')
            : t('deductionEditor.enterTheLeftDisjunctLbl')
        }
        onSubmit={({ formula, symCtx }) => {
          const deductionInterface = ruleInterface.apply(formula, !isAddingRight)
          onApply({ deductionInterface, symCtx })
        }}
        onCancel={onCancel}
      />
    </div>
  )
}

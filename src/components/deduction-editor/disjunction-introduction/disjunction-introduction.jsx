import { Switch } from '@blueprintjs/core'
import classnames from 'classnames'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FormulaEditor } from '../../formula-editor'
import style from '../tautological-implication/tautological-implication.m.scss'

export const DisjunctionIntroduction = ({
  formula,
  ruleInterface,
  onApply,
  onCancel,
  onError,
  className,
  ...props
}) => {
  const { t } = useTranslation('DeductionEditor')

  const [isAddingRight, setIsAddingRight] = useState(false)

  return (
    <div className={classnames(style.root, className)} {...props}>
      <Switch
        title={t('label.changeNewDisjunctPosition')}
        checked={isAddingRight}
        onChange={event => { setIsAddingRight(event.target.checked) }}
      >
        {t('label.changeNewDisjunctPosition')}
      </Switch>
      <FormulaEditor
        label={isAddingRight ? t('label.enterTheRightDisjunct') : t('label.enterTheLeftDisjunct')}
        onSubmit={({ formula, symCtx }) => {
          const deductionInterface = ruleInterface.apply(formula, !isAddingRight)
          onApply({ deductionInterface, symCtx })
        }}
        onCancel={onCancel}
      />
    </div>
  )
}

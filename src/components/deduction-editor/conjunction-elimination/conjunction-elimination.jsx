import { Label } from '@blueprintjs/core'
import classNames from 'classnames'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { SymCtx } from 'contexts'
import { FormulaPicker } from 'components/deduction-editor/formula-picker'

export const ConjunctionElimination = ({
  formula,
  ruleInterface,
  onApply,
  onCancel,
  onError,
  className,
  ...props
}) => {
  const { t } = useTranslation()
  const symCtx = useContext(SymCtx)

  return (
    <div className={classNames(className)} {...props}>
      <Label>{t('deductionEditor.chooseTheConjunctLbl')}</Label>
      <FormulaPicker
        formulas={formula.children}
        onSelect={(conjunct, i) => {
          const deductionInterface = ruleInterface.apply(i)
          onApply({ deductionInterface, symCtx })
        }}
      />
    </div>
  )
}

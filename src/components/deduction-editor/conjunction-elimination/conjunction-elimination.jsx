import React, { useContext } from 'react'
import { SymCtx } from '../../../contexts'
import { FormulaPicker } from '../../formula-picker'
import classNames from 'classnames'

export const ConjunctionElimination = ({
  formula,
  ruleInterface,
  onApply,
  onCancel,
  onError,
  className,
  ...props
}) => {
  const symCtx = useContext(SymCtx)

  return (
    <div className={classNames(className)} {...props}>
      <FormulaPicker
        labels={['left', 'right']}
        formulas={formula.children}
        onSelect={(conjunct, i) => {
          const deductionInterface = ruleInterface.apply(i)
          onApply({ deductionInterface, symCtx })
        }}
      />
    </div>
  )
}

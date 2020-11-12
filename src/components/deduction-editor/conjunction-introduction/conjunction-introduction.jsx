import { conjunction, Expression } from '@zbrckovic/entail-core'
import classNames from 'classnames'
import React, { useContext } from 'react'
import { SymCtx } from '../../../contexts'
import { FormulaPicker } from '../../formula-picker'

export const ConjunctionIntroduction = ({
  ruleInterface,
  conjunct1,
  conjunct2,
  onApply,
  onCancel,
  onError,
  className,
  ...props
}) => {
  const symCtx = useContext(SymCtx)

  const conjunction1 = Expression({
    sym: conjunction,
    children: [conjunct1, conjunct2]
  })

  const conjunction2 = Expression({
    sym: conjunction,
    children: [conjunct2, conjunct1]
  })

  return (
    <FormulaPicker
      className={classNames(className)}
      formulas={[conjunction1, conjunction2]}
      onSelect={(conjunction, i) => {
        const deductionInterface = ruleInterface.apply(i)
        onApply({ deductionInterface, symCtx })
      }}
      {...props}
    />
  )
}

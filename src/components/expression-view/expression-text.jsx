import classnames from 'classnames'
import style from './expression-view.m.scss'
import { Kind } from '@zbrckovic/entail-core'
import React from 'react'

export const ExpressionText = ({ text, kind, color, onClick, isSelected, className, ...props }) =>
  <span
    className={classnames(
      style.expressionText,
      kindToClass[kind],
      { [style.isSelected]: isSelected },
      className
    )}
    onClick={e => {
      e.stopPropagation()
      onClick?.()
    }}
    {...props}
  >
    {text ?? <wbr />}
  </span>

const kindToClass = {
  [Kind.Formula]: style.formula,
  [Kind.Term]: style.term
}

export const TargetType = {
  MAIN: 'MAIN',
  BOUND: 'BOUND'
}

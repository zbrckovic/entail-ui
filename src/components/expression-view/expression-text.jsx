import classnames from 'classnames'
import { RootCtx } from 'contexts'
import style from './expression-view.m.scss'
import { Kind } from '@zbrckovic/entail-core'
import React, { useContext } from 'react'

export const ExpressionText = ({ text, kind, onClick, isSelected, className, ...props }) => {
  const { theme: { isDark } } = useContext(RootCtx)

  return <span
    className={classnames(
      style.expressionText,
      { [style.dark]: isDark },
      kindToClass[kind],
      { [style.isSelected]: isSelected },
      className
    )}
    onClick={e => {
      if (onClick !== undefined) {
        e.stopPropagation()
        onClick()
      }
    }}
    {...props}
  >
    {text ?? <wbr />}
  </span>
}

const kindToClass = {
  [Kind.Formula]: style.formula,
  [Kind.Term]: style.term
}

export const TargetType = {
  MAIN: 'MAIN',
  BOUND: 'BOUND'
}

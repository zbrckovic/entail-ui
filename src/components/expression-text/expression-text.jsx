import { Kind } from '@zbrckovic/entail-core/lib/abstract-structures/sym/kind'
import classNames from 'classnames'
import React from 'react'
import style from './expression-text.module.scss'

export const ExpressionText = ({ text, kind }) =>
  <span className={classNames(style.container, kindClasses(kind))}>{text}</span>

const kindClasses = kind => ({
  [style.formula]: kind === Kind.Formula,
  [style.term]: kind === Kind.Term
})

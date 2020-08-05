import { Kind } from '@zbrckovic/entail-core/lib/abstract-structures/sym/kind'
import classNames from 'classnames'
import { Code } from 'components/code'
import React from 'react'
import style from './expression-text.module.scss'

/** This is used whenever we need to show some text which is a part of `EEL`. */
export const ExpressionText = ({ className, text, kind, background = false }) => {
  const classes = classNames(
    style.container,
    kindClasses(kind),
    className
  )

  return <Code className={classes} background={background}>{text}</Code>
}

const kindClasses = kind => ({
  [style.formula]: kind === Kind.Formula,
  [style.term]: kind === Kind.Term
})

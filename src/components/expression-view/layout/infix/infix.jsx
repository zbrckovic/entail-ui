import { ExpressionText } from 'components/expression-text'
import React from 'react'

export const Infix = ({ sym, symText, childrenExpression1, childrenExpression2, root }) =>
  <ExpressionText text={symText} kind={sym.kind}/>

import { ExpressionText } from 'components/expression-text'
import React from 'react'

export const Prefix = ({ sym, symText, boundSym, childrenExpressions, root }) =>
  <ExpressionText text={symText} kind={sym.kind}/>

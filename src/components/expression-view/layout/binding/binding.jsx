import { ExpressionText } from 'components/expression-text'
import React from 'react'

export const Binding = ({ sym, symText }) =>
  <ExpressionText text={symText} kind={sym.kind}/>

import { Code } from 'components/code'
import { ExpressionText } from 'components/expression-text'
import { ExpressionView } from 'components/expression-view/expression-view'
import React from 'react'

export const Infix = ({ sym, symText, childExpression1, childExpression2, root }) => <>
  {root || <ExpressionText text="(" kind={sym.kind}/>}
  <ExpressionView expression={childExpression1} root={false}/>
  <ExpressionText text=" "/>
  <ExpressionText text={symText} kind={sym.kind}/>
  <ExpressionText text=" "/>
  <ExpressionView expression={childExpression2} root={false}/>
  {root || <ExpressionText text=")" kind={sym.kind}/>}
</>

import { primitiveSyms } from '@zbrckovic/entail-core/lib/primitive-syms'
import { ExpressionText } from 'components/expression-text'
import { ExpressionView } from 'components/expression-view/expression-view'
import { Binding } from 'components/expression-view/layout/binding'
import React, { Fragment } from 'react'

export const Prefix = ({ sym, symText, boundSym, childrenExpressions }) => {
  const isPrimitive = primitiveSyms.has(sym)
  const hasParentheses = childrenExpressions.size > 1 ||
    (childrenExpressions.size === 1 && !primitiveSyms.has(sym))
  const hasSpace = !childrenExpressions.isEmpty() && sym.binds && isPrimitive

  return <>
    <ExpressionText text={symText} kind={sym.kind}/>
    {sym.binds && <Binding sym={boundSym}/>}
    {hasSpace && <ExpressionText text=" " kind={sym.kind}/>}
    {hasParentheses && <ExpressionText text="(" kind={sym.kind}/>}
    {childrenExpressions.map((child, i) => {
      const isLast = i === childrenExpressions.size - 1

      return <Fragment key={`${i}`}>
        <ExpressionView expression={child} root={false}/>
        {!isLast && <>
          <ExpressionText text="," kind={sym.kind}/>
          <ExpressionText text=" " kind={sym.kind}/>
        </>}
      </Fragment>
    })}
    {hasParentheses && <ExpressionText text=")" kind={sym.kind}/>}
  </>
}

import { ExpressionText } from 'components/expression-text'
import { ExpressionView } from 'components/expression-view/expression-view'
import { Binding } from 'components/expression-view/layout/binding'
import React from 'react'

export const Prefix = ({ sym, symText, boundSym, childrenExpressions }) => {
  const hasMultipleChildren = childrenExpressions.size > 1
  const hasChildren = !childrenExpressions.isEmpty()

  return <>
    <ExpressionText
      text={symText}
      kind={sym.kind}
    />
    {boundSym !== undefined && <Binding sym={boundSym}/>}
    {
      hasMultipleChildren
        ? <ExpressionText text="(" kind={sym.kind}/>
        : (hasChildren && <ExpressionText text=" " kind={sym.kind}/>)
    }
    {childrenExpressions.map((child, i) => {
      const isLast = i === childrenExpressions.size - 1

      return <>
        <ExpressionView key={`child ${i}`} expression={child} root={false}/>
        {!isLast && <>
          <ExpressionText key={`comma ${i}`} text="," kind={sym.kind}/>
          <ExpressionText key={`space ${i}`} text=" " kind={sym.kind}/>
        </>}
      </>
    })}
    {hasMultipleChildren && <ExpressionText text=")" kind={sym.kind}/>}
  </>
}

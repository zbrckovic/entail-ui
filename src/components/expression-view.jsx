import Box from '@material-ui/core/Box'
import { Kind, Placement, primitiveSyms } from '@zbrckovic/entail-core'
import { SymCtx } from 'contexts'
import React, { Fragment, useContext } from 'react'

/** Shows textual representation of a provided expression. */
export const ExpressionView = ({
  expression: { sym, boundSym, children },
  root = true,
  sx,
  ...props
}) => {
  const presentationCtx = useContext(SymCtx)
  const { text, placement } = presentationCtx.get(sym).getDefaultSyntacticInfo()

  const content = placement === Placement.Prefix ? (
    <Prefix
      sym={sym}
      symText={text}
      boundSym={boundSym}
      childrenExpressions={children}
    />
  ) : (
    <Infix
      sym={sym}
      symText={text}
      boundSym={boundSym}
      childExpression1={children.get(0)}
      childExpression2={children.get(1)}
      root={root}
    />
  )

  return (
    root ? (
      <Box fontFamily='mono' {...props}>
        {content}
      </Box>
    ) : content
  )
}

const Prefix = ({ sym, symText, boundSym, childrenExpressions }) => {
  const isPrimitive = primitiveSyms.has(sym)
  const hasParentheses = childrenExpressions.size > 1 ||
    (childrenExpressions.size === 1 && !primitiveSyms.has(sym))
  const hasSpace = !childrenExpressions.isEmpty() && sym.binds && isPrimitive

  return <>
    <ExpressionText text={symText} kind={sym.kind} />
    {sym.binds && <Binding sym={boundSym} />}
    {hasSpace && <> </>}
    {hasParentheses && <ExpressionText text="(" kind={sym.kind} />}
    {childrenExpressions.map((child, i) => {
      const isLast = i === childrenExpressions.size - 1

      return <Fragment key={`${i}`}>
        <ExpressionView expression={child} root={false} />
        {!isLast && <>
          <ExpressionText text="," kind={sym.kind} />
          <> </>
        </>}
      </Fragment>
    })}
    {hasParentheses && <ExpressionText text=")" kind={sym.kind} />}
  </>
}

const Infix = ({ sym, symText, childExpression1, childExpression2, root }) => <>
  {root || <ExpressionText text="(" kind={sym.kind} />}
  <ExpressionView expression={childExpression1} root={false} />
  <> </>
  <ExpressionText text={symText} kind={sym.kind} />
  <> </>
  <ExpressionView expression={childExpression2} root={false} />
  {root || <ExpressionText text=")" kind={sym.kind} />}
</>

const Binding = ({ sym }) => {
  const presentationCtx = useContext(SymCtx)
  const text = presentationCtx.get(sym).getDefaultSyntacticInfo().text
  return <ExpressionText text={text} kind={sym.kind} />
}

export const ExpressionText = ({ text, kind, color, ...props }) =>
  <Box component="span" color={kindToColor[kind] ?? 'text.secondary'} {...props}>
    {text ?? <wbr />}
  </Box>

const kindToColor = {
  [Kind.Formula]: 'formula',
  [Kind.Term]: 'term'
}

import Box from '@material-ui/core/Box'
import {
  Kind,
  Placement,
  primitiveSyms,
  SymPresentation
} from '@zbrckovic/entail-core'
import { SymCtx } from 'contexts'
import React, { Fragment, useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

// Shows textual representation of a provided expression.
export const ExpressionView = ({
  expression: { sym, boundSym, children },
  root = true,
  sx,
  ...props
}) => {
  const { presentations } = useContext(SymCtx)
  const { text, placement } = SymPresentation.getDefaultSyntacticInfo(presentations[sym.id])

  const classes = useStyles()

  const content = placement === Placement.Prefix ? (
    <Prefix
      sym={sym}
      symText={text}
      boundSym={boundSym}
      childrenExpressions={children}
      {...props}
    />
  ) : (
    <Infix
      sym={sym}
      symText={text}
      boundSym={boundSym}
      childExpression1={children[0]}
      childExpression2={children[1]}
      root={root}
      {...props}
    />
  )

  return (
    root ? (
      <Typography className={classes.text}>
        {content}
      </Typography>
    ) : content
  )
}

const Prefix = ({ sym, symText, boundSym, childrenExpressions }) => {
  const isPrimitive = primitiveSyms[sym.id] !== undefined
  const hasParentheses =
    childrenExpressions.length > 1 || (childrenExpressions.length === 1 && !isPrimitive)
  const hasSpace = childrenExpressions.length > 0 && sym.binds && isPrimitive

  return <>
    <ExpressionText text={symText} kind={sym.kind} />
    {sym.binds && <Binding sym={boundSym} />}
    {hasSpace && <> </>}
    {hasParentheses && <ExpressionText text="(" kind={sym.kind} />}
    {childrenExpressions.map((child, i) => {
      const isLast = i === childrenExpressions.length - 1

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
  const { presentations } = useContext(SymCtx)
  const presentation = presentations[sym.id]
  const { text } = SymPresentation.getDefaultSyntacticInfo(presentation)
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

const useStyles = makeStyles(theme => ({
  text: {
    fontFamily: theme.typography.mono
  }
}))

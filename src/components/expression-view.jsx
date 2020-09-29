import Box from '@material-ui/core/Box'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Kind, Placement, primitiveSyms, SymPresentation } from '@zbrckovic/entail-core'
import { SymCtx } from 'contexts'
import React, { Fragment, useContext } from 'react'

// Shows textual representation of a provided expression.
export const ExpressionView = ({
  expression: { sym, boundSym, children },
  root = true,
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

const Prefix = ({ sym, symText, boundSym, childrenExpressions, onClick, selectionTarget }) => {
  const isPrimitive = primitiveSyms[sym.id] !== undefined
  const hasParentheses =
    childrenExpressions.length > 1 || (childrenExpressions.length === 1 && !isPrimitive)
  const hasSpace = childrenExpressions.length > 0 && sym.binds && isPrimitive

  const isSelected = selectionTarget?.position.length === 0

  return <>
    <ExpressionText
      text={symText}
      kind={sym.kind}
      onClick={() => {
        if (onClick !== undefined) onClick({ type: TargetType.MAIN, position: [] })
      }}
      isSelected={isSelected && selectionTarget.type === TargetType.MAIN}
    />
    {sym.binds && (
      <Binding
        sym={boundSym}
        onClick={onClick}
        isSelected={isSelected && selectionTarget.type === TargetType.BOUND}
      />
    )}
    {hasSpace && <> </>}
    {hasParentheses && <ExpressionText text="(" kind={sym.kind} />}
    {childrenExpressions.map((child, i) => {
      const isLast = i === childrenExpressions.length - 1

      let selectionTargetForChild
      if (!isSelected && selectionTarget !== undefined) {
        const { type, position: [firstIndex, ...restIndexes] } = selectionTarget

        if (firstIndex === i) {
          selectionTargetForChild = { type, position: restIndexes }
        }
      }

      return <Fragment key={`${i}`}>
        <ExpressionView
          expression={child}
          root={false}
          onClick={({ type, position }) => {
            if (onClick !== undefined) onClick({ type, position: [i, ...position] })
          }}
          selectionTarget={selectionTargetForChild}
        />
        {!isLast && <>
          <ExpressionText text="," kind={sym.kind} />
          <> </>
        </>}
      </Fragment>
    })}
    {hasParentheses && <ExpressionText text=")" kind={sym.kind} />}
  </>
}

const Infix = ({
  sym,
  symText,
  childExpression1,
  childExpression2,
  root,
  selectionTarget,
  onClick
}) => {
  const isSelected = selectionTarget?.position.length === 0

  let selectionTargetForChild1
  let selectionTargetForChild2
  if (!isSelected && selectionTarget !== undefined) {
    const { type, position: [firstIndex, ...restIndexes] } = selectionTarget

    const selectionTargetForChild = { type, position: restIndexes }

    if (firstIndex === 0) {
      selectionTargetForChild1 = selectionTargetForChild
    } else if (firstIndex === 1) {
      selectionTargetForChild2 = selectionTargetForChild
    }
  }

  return <>
    {root || <ExpressionText text="(" kind={sym.kind} />}
    <ExpressionView
      expression={childExpression1}
      root={false}
      onClick={({ type, position }) => {
        if (onClick !== undefined) onClick({ type, position: [0, ...position] })
      }}
      selectionTarget={selectionTargetForChild1}
    />
    <> </>
    <ExpressionText
      text={symText}
      kind={sym.kind}
      onClick={() => { onClick?.({ type: TargetType.MAIN, position: [] }) }}
      isSelected={isSelected}
    />
    <> </>
    <ExpressionView
      expression={childExpression2}
      root={false}
      onClick={({ type, position }) => {
        if (onClick !== undefined) onClick({ type, position: [1, ...position] })
      }}
      selectionTarget={selectionTargetForChild2}
    />
    {root || <ExpressionText text=")" kind={sym.kind} />}
  </>
}

const Binding = ({ sym, onClick, ...props }) => {
  const { presentations } = useContext(SymCtx)
  const presentation = presentations[sym.id]
  const { text } = SymPresentation.getDefaultSyntacticInfo(presentation)
  return (
    <ExpressionText
      text={text}
      kind={sym.kind}
      onClick={() => {
        if (onClick !== undefined) onClick({ type: TargetType.BOUND, position: [] })
      }}
      {...props}
    />
  )
}

export const ExpressionText = ({ text, kind, color, onClick, isSelected, ...props }) =>
  <Box
    component="span"
    color={kindToColor[kind] ?? 'text.secondary'}
    bgcolor={isSelected ? 'action.selected' : undefined}
    onClick={() => { onClick?.() }}
    {...props}
  >
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

const TargetType = {
  MAIN: 'MAIN',
  BOUND: 'BOUND'
}

import { Placement, SymPresentation } from '@zbrckovic/entail-core'
import { SymCtx } from 'contexts'
import React, { useContext } from 'react'
import style from './expression-view.m.scss'
import classnames from 'classnames'
import { Prefix } from './prefix'
import { Infix } from './infix'

// Shows textual representation of a provided expression.
export const ExpressionView = ({
  expression: { sym, boundSym, children },
  // `{ type, position }`
  selectionTarget,
  // Called with `{ type, position }` when selected.
  onSelectionTargetChange,
  root = true,
  className,
  ...props
}) => {
  const { presentations } = useContext(SymCtx)
  const { text, placement } = SymPresentation.getDefaultSyntacticInfo(presentations[sym.id])

  const content = (() => {
    if (placement === Placement.Prefix) {
      return <Prefix
        sym={sym}
        symText={text}
        boundSym={boundSym}
        childrenExpressions={children}
        selectionTarget={selectionTarget}
        onSelectionTargetChange={onSelectionTargetChange}
        {...props}
      />
    } else {
      return <Infix
        sym={sym}
        symText={text}
        boundSym={boundSym}
        childExpression1={children[0]}
        childExpression2={children[1]}
        root={root}
        selectionTarget={selectionTarget}
        onSelectionTargetChange={onSelectionTargetChange}
        {...props}
      />
    }
  })()

  return root ? <div className={classnames(style.root, className)}>{content}</div> : content
}

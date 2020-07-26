import { Placement } from '@zbrckovic/entail-core/lib/presentation/sym-presentation/placement'
import { Infix } from 'components/expression-view/layout/infix'
import { Prefix } from 'components/expression-view/layout/prefix'
import { SymPresentationCtx } from 'contexts'
import React, { useContext } from 'react'
import style from './expression-view.module.scss'

/** Shows textual representation of a provided expression. */
export const ExpressionView = ({ expression: { sym, boundSym, children }, root = true }) => {
  const presentationCtx = useContext(SymPresentationCtx)
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

  return root ? <div className={style.container}>{content}</div> : content
}

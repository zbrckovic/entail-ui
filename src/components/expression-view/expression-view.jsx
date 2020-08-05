import { Placement } from '@zbrckovic/entail-core/lib/presentation/sym-presentation/placement'
import { Code } from 'components/code'
import { Infix } from 'components/expression-view/layout/infix'
import { Prefix } from 'components/expression-view/layout/prefix'
import { SymPresentationCtx } from 'contexts'
import React, { useContext } from 'react'

/** Shows textual representation of a provided expression. */
export const ExpressionView = ({
  className,
  expression: { sym, boundSym, children },
  root = true,
  background = false
}) => {
  const presentationCtx = useContext(SymPresentationCtx)
  const { text, placement } = presentationCtx.get(sym).getDefaultSyntacticInfo()

  const content = placement === Placement.Prefix ? (
    <Prefix
      className={className}
      sym={sym}
      symText={text}
      boundSym={boundSym}
      childrenExpressions={children}
    />
  ) : (
    <Infix
      className={className}
      sym={sym}
      symText={text}
      boundSym={boundSym}
      childExpression1={children.get(0)}
      childExpression2={children.get(1)}
      root={root}
    />
  )

  return !root
    ? content
    : <Code className={className} background={background}>{content}</Code>
}

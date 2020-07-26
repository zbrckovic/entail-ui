import { ExpressionText } from 'components/expression-text'
import { SymPresentationCtx } from 'contexts'
import React, { useContext } from 'react'

export const Binding = ({ sym }) => {
  const presentationCtx = useContext(SymPresentationCtx)
  const text = presentationCtx.get(sym).getDefaultSyntacticInfo().text
  return <ExpressionText text={text} kind={sym.kind}/>
}

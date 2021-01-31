import React, { useContext } from 'react'
import { SymCtx } from 'contexts'
import { ExpressionText } from './expression-text'

export const Binding = ({ sym, onClick, className, ...props }) => {
  const { presentations } = useContext(SymCtx)
  const presentation = presentations[sym.id]
  const { text } = presentation.getDefaultSyntacticInfo()
  return (
    <ExpressionText
      text={text}
      kind={sym.kind}
      onClick={onClick}
      className={className}
      {...props}
    />
  )
}

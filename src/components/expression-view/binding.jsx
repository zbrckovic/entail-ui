import React, { useContext } from 'react'
import { SymCtx } from 'contexts'
import { SymPresentation } from '@zbrckovic/entail-core'
import { ExpressionText } from './expression-text'

export const Binding = ({ sym, onClick, className, ...props }) => {
  const { presentations } = useContext(SymCtx)
  const presentation = presentations[sym.id]
  const { text } = SymPresentation.getDefaultSyntacticInfo(presentation)
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

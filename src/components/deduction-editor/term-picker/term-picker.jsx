import React, { useContext } from 'react'
import { SymCtx } from '../../../contexts'
import { SymPresentation } from '@zbrckovic/entail-core'

export const TermPicker = ({ terms = [] }) => {
  const { presentations } = useContext(SymCtx)

  return (
    <div>
      {
        terms.map(term => {
          const presentation = presentations[term.id]

          const text = SymPresentation.getDefaultSyntacticInfo(presentation).text
          return <span key={term.id}>{text}</span>
        })
      }
    </div>
  )
}


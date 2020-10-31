import React, { useContext } from 'react'
import { SymCtx } from 'contexts'
import { SymPresentation } from '@zbrckovic/entail-core'
import style from './term-picker.m.scss'
import classNames from 'classnames'

export const TermPicker = ({ terms = [], selectedTerm, onSelectTerm }) => {
  const { presentations } = useContext(SymCtx)

  return (
    <div className={style.root}>
      {
        terms.map(term => {
          const presentation = presentations[term.id]

          const text = SymPresentation.getDefaultSyntacticInfo(presentation).text
          return (
            <span
              key={term.id}
              className={classNames(
                { [style.selected]: selectedTerm?.id === term.id },
                style.term
              )}
              onClick={() => { onSelectTerm(term) }}
            >
              {text}
            </span>
          )
        })
      }
    </div>
  )
}

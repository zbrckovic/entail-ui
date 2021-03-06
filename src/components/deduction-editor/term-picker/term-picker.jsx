import React, { useContext } from 'react'
import { SymCtx } from 'contexts'
import { useTranslation } from 'react-i18next'
import style from './term-picker.m.scss'
import classNames from 'classnames'

export const TermPicker = ({ terms = [], selectedTerm, onSelectTerm, className, ...props }) => {
  const { presentations } = useContext(SymCtx)

  const { t } = useTranslation()

  return (
    <div className={classNames(style.root, className)} {...props}>
      <label>{t('deductionEditor.chooseAFreeVariableLbl')}</label>
      <div className={style.terms}>
        {
          terms.map(term => {
            const presentation = presentations[term.id]

            const text = presentation.getDefaultSyntacticInfo().text
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
    </div>
  )
}

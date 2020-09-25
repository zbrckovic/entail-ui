import { Category, Sym, SymPresentation, SyntacticInfo } from '@zbrckovic/entail-core'
import {
  createTextToSymMap,
  getMaxSymId
} from '@zbrckovic/entail-core/lib/presentation/sym-presentation'
import { SymCtx } from 'contexts'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import Box from '@material-ui/core/Box'
import { IconButton } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'

export const IndividualVariableEditor = ({ onSubmit, onCancel, ...props }) => {
  const { t } = useTranslation('IndividualVariableEditor')
  const symCtx = useContext(SymCtx)
  const textToSymMap = useMemo(
    () => createTextToSymMap(symCtx.presentations, symCtx.syms),
    [symCtx]
  )

  const [text, setText] = useState('')
  const [textSubject] = useState(new Subject())
  useEffect(() => { textSubject.next(text) }, [textSubject, text])

  const existingSym = textToSymMap[text]

  const errorMessage = useMemo(
    () =>
      (existingSym !== undefined && !isValidIndividualVariable(existingSym))
        ? t('message.invalidInstanceVariableSymbol')
        : undefined,
    [existingSym, t]
  )

  useEffect(() => {
    const subscription = textSubject
      .pipe(
        distinctUntilChanged(),
        debounceTime(200),
        map(validateText)
      )
      .subscribe(setIsValid)

    return () => { subscription.unsubscribe() }
  }, [textSubject])

  const [isValid, setIsValid] = useState(false)

  return (
    <Box {...props}>
      <TextField
        value={text}
        onChange={({ target: { value } }) => { setText(value) }}
      />
      <IconButton
        color='primary'
        title={t('button.submit')}
        onClick={() => {
          if (existingSym !== undefined) {
            onSubmit({ sym: existingSym, symCtx })
          } else {
            const newSym = Sym.tt({ id: getMaxSymId(symCtx.syms) + 1 })
            const newPresentation = SymPresentation({ ascii: SyntacticInfo.prefix(text) })

            onSubmit({
              sym: newSym,
              symCtx: {
                syms: { ...symCtx.syms, [newSym.id]: newSym },
                presentations: { ...symCtx.presentations, [newSym.id]: newPresentation }
              }
            })
          }
        }}
        disabled={!isValid || errorMessage !== undefined}
      >
        <CheckIcon />
      </IconButton>
      <IconButton title={t('button.cancel')} onClick={() => { onCancel() }}>
        <CloseIcon />
      </IconButton>
    </Box>
  )
}

const INDIVIDUAL_VARIABLE_REGEX = /^[a-z][a-zA-Z0-9_]*$/

const isValidIndividualVariable = sym => Sym.getCategory(sym) === Category.TT && sym.arity === 0

const validateText = text => INDIVIDUAL_VARIABLE_REGEX.test(text)

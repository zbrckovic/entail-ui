import { Category, Sym, SymPresentation, SyntacticInfo } from '@zbrckovic/entail-core'
import {
  createTextToSymMap,
  getMaxSymId
} from '@zbrckovic/entail-core/lib/presentation/sym-presentation'
import { SymCtx } from 'contexts'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators'
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

  const [textInputValue, setTextInputValue] = useState('')
  const [textInputIsPristine, setTextInputIsPristine] = useState(true)
  const [textInputError, setTextInputError] = useState()

  const validate = useValidator(textToSymMap)

  const [textInputValueSubject] = useState(() => new Subject())
  useEffect(() => {
    // Validate only if `textInputIsPristine` is false.
    const derivedSubject = textInputIsPristine
      ? textInputValueSubject.pipe(
        map(() => undefined)
      )
      : textInputValueSubject.pipe(
        distinctUntilChanged(),
        debounceTime(200),
        map(validate)
      )

    const subscription = derivedSubject.subscribe(setTextInputError)

    return () => { subscription.unsubscribe() }
  }, [textInputValueSubject, textInputIsPristine, validate])
  useEffect(
    () => { textInputValueSubject.next(textInputValue) },
    [textInputValueSubject, textInputValue]
  )

  console.log(textInputError)

  return (
    <Box {...props}>
      <TextField
        value={textInputValue}
        onChange={({ target: { value } }) => {
          setTextInputValue(value)
          setTextInputIsPristine(false)
        }}
        error={textInputError !== undefined}
        helperText={textInputError}
      />
      <IconButton
        color='primary'
        title={t('button.submit')}
        onClick={() => {
          const existingSym = textToSymMap[textInputValue]

          if (existingSym !== undefined) {
            onSubmit({ sym: existingSym, symCtx })
          } else {
            const newSym = Sym.tt({ id: getMaxSymId(symCtx.syms) + 1 })
            const newPresentation = SymPresentation({ ascii: SyntacticInfo.prefix(textInputValue) })

            onSubmit({
              sym: newSym,
              symCtx: {
                syms: { ...symCtx.syms, [newSym.id]: newSym },
                presentations: { ...symCtx.presentations, [newSym.id]: newPresentation }
              }
            })
          }
        }}
        disabled={textInputIsPristine || textInputError !== undefined}
      >
        <CheckIcon />
      </IconButton>
      <IconButton title={t('button.cancel')} onClick={() => { onCancel() }}>
        <CloseIcon />
      </IconButton>
    </Box>
  )
}

// Validates `text` and returns `undefined` if `text` is valid, an error message to show.
const useValidator = textToSymMap => {
  const { t } = useTranslation('IndividualVariableEditor')

  return useCallback(text => {
    if (!isValidText(text)) {
      return t('message.invalidInstanceVariableSymbol', { sym: text })
    }

    const existingSym = textToSymMap[text]
    if (existingSym !== undefined && !isValidIndividualVariable(existingSym)) {
      return t('message.symbolAlreadyUsed', { sym: text })
    }

    return undefined
  }, [t, textToSymMap])
}

const isValidText = (() => {
  const INDIVIDUAL_VARIABLE_REGEX = /^[a-z][a-zA-Z0-9_]*$/

  return text => INDIVIDUAL_VARIABLE_REGEX.test(text)
})()

const isValidIndividualVariable = sym => Sym.getCategory(sym) === Category.TT && sym.arity === 0

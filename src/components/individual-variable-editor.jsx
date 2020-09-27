import { Category, Sym, SymPresentation, SyntacticInfo } from '@zbrckovic/entail-core'
import {
  createTextToSymMap,
  getMaxSymId
} from '@zbrckovic/entail-core/lib/presentation/sym-presentation'
import { SymCtx } from 'contexts'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import Box from '@material-ui/core/Box'
import { Button, ButtonGroup } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

export const IndividualVariableEditor = ({ label, onSubmit, onCancel, ...props }) => {
  const { t } = useTranslation('IndividualVariableEditor')

  const classes = useStyles()

  const symCtx = useContext(SymCtx)
  const textToSymMap = useMemo(
    () => createTextToSymMap(symCtx.presentations, symCtx.syms),
    [symCtx]
  )

  const [text, setText] = useState('')
  const [isPristine, setIsPristine] = useState(true)
  const [error, setError] = useState()

  const validate = useValidator(textToSymMap)

  const [textInputValueSubject] = useState(() => new Subject())
  useEffect(() => {
    // Validate only if `textInputIsPristine` is false.
    const derivedSubject = isPristine
      ? textInputValueSubject.pipe(map(() => undefined))
      : textInputValueSubject.pipe(
        distinctUntilChanged(),
        debounceTime(200),
        map(validate)
      )

    const subscription = derivedSubject.subscribe(setError)

    return () => { subscription.unsubscribe() }
  }, [textInputValueSubject, isPristine, validate])
  useEffect(
    () => { textInputValueSubject.next(text) },
    [textInputValueSubject, text]
  )

  return (
    <Box display='flex' alignItems='flex-start' {...props}>
      <TextField
        className={classes.textField}
        label={label}
        value={text}
        variant="outlined"

        onChange={({ target: { value } }) => {
          setIsPristine(false)
          setText(value)
        }}
        error={error !== undefined}
        helperText={error}
      />
      <ButtonGroup size='medium'>
        <Button
          color='primary'
          title={t('button.submit')}
          onClick={() => {
            const existingSym = textToSymMap[text]

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
          disabled={isPristine || error !== undefined}
          startIcon={<CheckIcon />}
        >
          {t('button.submit')}
        </Button>
        <Button
          title={t('button.cancel')}
          onClick={() => { onCancel() }}
          startIcon={<CloseIcon />}
        >
          {t('button.cancel')}
        </Button>
      </ButtonGroup>
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

const useStyles = makeStyles(theme => ({
  textField: {
    marginRight: theme.spacing(1),
    flexGrow: 1
  }
}))

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
import style from './individual-variable-editor.m.scss'
import { Button, ButtonGroup, FormGroup, Intent, TextArea } from '@blueprintjs/core'
import classnames from 'classnames'

export const IndividualVariableEditor = ({ label, onSubmit, onCancel, className, ...props }) => {
  const { t } = useTranslation('IndividualVariableEditor')

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

  const intent = error !== undefined ? Intent.DANGER : undefined

  return (
    <div className={classnames(style.root, className)} {...props}>
      <FormGroup label={label} helperText={error} intent={intent}>
        <TextArea
          className={style.textArea}
          label={label}
          value={text}
          onChange={({ target: { value } }) => {
            setIsPristine(false)
            setText(value)
          }}
          intent={intent}
        />
      </FormGroup>
      <ButtonGroup>
        <Button
          intent={Intent.PRIMARY}
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
        >
          {t('button.submit')}
        </Button>
        <Button onClick={() => { onCancel() }}>
          {t('button.cancel')}
        </Button>
      </ButtonGroup>
    </div>
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

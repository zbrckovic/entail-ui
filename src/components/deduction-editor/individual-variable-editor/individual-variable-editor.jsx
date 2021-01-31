import {
  Category,
  isIndividualVariable,
  Sym,
  SymPresentation,
  SyntacticInfo
} from '@zbrckovic/entail-core'
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
import { Button, ButtonGroup, Classes, Intent } from '@blueprintjs/core'
import classnames from 'classnames'
import { IconNames } from '@blueprintjs/icons'

export const IndividualVariableEditor = ({ label, onSubmit, onCancel, className, ...props }) => {
  const { t } = useTranslation()

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
    <div className={classnames(style.root, className)} {...props}>
      <label>{label}</label>
      <div className={style.inputWithButtons}>
        <input
          className={classnames(
            Classes.INPUT,
            { [Classes.INTENT_DANGER]: error !== undefined }
          )}
          value={text}
          onChange={({ target: { value } }) => {
            setIsPristine(false)
            setText(value)
          }}
          maxLength={2}
        />
        <ButtonGroup>
          <Button
            title={t('submitLbl')}
            intent={Intent.PRIMARY}
            icon={IconNames.CONFIRM}
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
            {t('submitLbl')}
          </Button>
          <Button
            icon={IconNames.DISABLE}
            title={t('cancelLbl')}
            onClick={() => { onCancel() }}
          >
            {t('cancelLbl')}
          </Button>
        </ButtonGroup>
      </div>
      <small>{error ?? <wbr/>}</small>
    </div>
  )
}

// Validates `text` and returns `undefined` if `text` is valid, an error message to show.
const useValidator = textToSymMap => {
  const { t } = useTranslation()

  return useCallback(text => {
    if (!isIndividualVariable(text)) {
      return t('deductionEditor.invalidInstanceVariableSymbolMsg', { sym: text })
    }

    const existingSym = textToSymMap[text]
    if (existingSym !== undefined && !isValidIndividualVariable(existingSym)) {
      return t('deductionEditor.symbolAlreadyUsedMsg', { sym: text })
    }

    return undefined
  }, [t, textToSymMap])
}

const isValidIndividualVariable = sym => sym.getCategory() === Category.TT && sym.arity === 0

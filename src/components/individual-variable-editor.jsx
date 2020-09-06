import { Category, Sym, SymPresentation, SyntacticInfo } from '@zbrckovic/entail-core'
import {
  createTextToSymMap,
  getMaxSymId
} from '@zbrckovic/entail-core/lib/presentation/sym-presentation'
import { SymPresentationCtx } from 'contexts'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import Box from '@material-ui/core/Box'
import Input from '@material-ui/core/Input'
import Button from '@material-ui/core/Button'

export const IndividualVariableEditor = ({ onSubmit, onCancel, ...props }) => {
  const { t } = useTranslation('IndividualVariableEditor')
  const presentationCtx = useContext(SymPresentationCtx)
  const textToSymMap = useMemo(() => createTextToSymMap(presentationCtx), [presentationCtx])

  const [text, setText] = useState('')
  const [textSubject] = useState(new Subject())
  useEffect(() => { textSubject.next(text) }, [textSubject, text])

  const existingSym = textToSymMap.get(text)

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

  return <Box
    flexDirection='column'
    alignItems='stretch'
    {...props}
  >
    <Input
      value={text}
      mb={1}
      onChange={({ target: { value } }) => { setText(value) }}
    />
    <Box>
      <Button
        flexGrow={1}
        title={t('button.submit')}
        onClick={() => {
          if (existingSym !== undefined) {
            onSubmit({ sym: existingSym, presentationCtx })
          } else {
            const newSym = Sym.tt({ id: getMaxSymId(presentationCtx) + 1 })
            const newPresentation = new SymPresentation({ ascii: SyntacticInfo.prefix(text) })

            onSubmit({
              sym: newSym,
              presentationCtx: presentationCtx.set(newSym, newPresentation)
            })
          }
        }}
        disabled={!isValid || errorMessage !== undefined}
        mr={2}
      >
        {t('button.submit')}
      </Button>
      <Button
        flexGrow={1}
        title={t('button.cancel')}
        onClick={() => { onCancel() }}
      >
        {t('button.cancel')}
      </Button>
    </Box>
    {errorMessage && <Box text={errorMessage} />}
  </Box>
}

const INDIVIDUAL_VARIABLE_REGEX = /^[a-z][a-zA-Z0-9_]*$/

const isValidIndividualVariable = sym => sym.getCategory() === Category.TT && sym.arity === 0

const validateText = text => INDIVIDUAL_VARIABLE_REGEX.test(text)

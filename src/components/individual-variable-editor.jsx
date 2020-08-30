import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Category, Sym, SymPresentation, SyntacticInfo } from '@zbrckovic/entail-core'
import {
  createTextToSymMap,
  getMaxSymId
} from '@zbrckovic/entail-core/lib/presentation/sym-presentation'
import { Button, ButtonVariant } from 'components/ui-toolkit/button'
import { Input } from 'components/ui-toolkit/input'
import { Message, MessageVariant } from 'components/ui-toolkit/message'
import { SymPresentationCtx } from 'contexts'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Flex } from 'rebass'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'

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

  return <Box>
    <Flex {...props}>
      <Input
        flexBasis={0}
        flexGrow={1}
        value={text}
        mr={2}
        onChange={({ target: { value } }) => { setText(value) }} />
      <Button
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
        icon={faCheckCircle}
        mr={2}
        variant={ButtonVariant.PRIMARY}>
        {t('button.submit')}
      </Button>
      <Button
        title={t('button.cancel')}
        onClick={() => { onCancel() }}
        icon={faBan}>
        {t('button.cancel')}
      </Button>
    </Flex>
    {errorMessage && <Message mt={1} variant={MessageVariant.DANGER} text={errorMessage} />}
  </Box>
}

const INDIVIDUAL_VARIABLE_REGEX = /^[a-z][a-zA-Z0-9_]*$/

const isValidIndividualVariable = sym => sym.getCategory() === Category.TT && sym.arity === 0

const validateText = text => INDIVIDUAL_VARIABLE_REGEX.test(text)

import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Button } from 'components/ui-toolkit/button'
import { Input } from 'components/ui-toolkit/input'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex } from 'rebass'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'

export const IndividualVariableEditor = ({ onSubmit, onCancel, ...props }) => {
  const { t } = useTranslation('IndividualVariableEditor')

  const [text, setText] = useState('')
  const [textSubject] = useState(new Subject())
  useEffect(() => { textSubject.next(text) }, [textSubject, text])

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
    <Flex {...props}>
      <Input
        flexBasis={0}
        flexGrow={1}
        value={text}
        mr={2}
        onChange={({ target: { value } }) => { setText(value) }} />
      <Button
        title={t('button.submit')}
        onClick={() => { onSubmit(text) }}
        disabled={!isValid}
        icon={faCheckCircle}
        mr={2}
        variant='primary'
      >
        {t('button.submit')}
      </Button>
      <Button
        title={t('button.cancel')}
        onClick={() => { onCancel() }}
        icon={faBan}
      >
        {t('button.cancel')}
      </Button>
    </Flex>
  )
}

const INDIVIDUAL_VARIABLE_REGEX = /^[a-z][a-zA-Z0-9_]*$/

const validateText = text => INDIVIDUAL_VARIABLE_REGEX.test(text)

import { css } from '@emotion/core'
import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FormulaParser } from '@zbrckovic/entail-core'
import { ExpressionView } from 'components/expression-view'
import { Button, ButtonVariant } from 'components/ui-toolkit/button'
import { Message, MessageVariant } from 'components/ui-toolkit/message'
import { Textarea } from 'components/ui-toolkit/textarea'
import { SymPresentationCtx } from 'contexts'
import { useParserErrorDescriber } from 'hooks'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex } from 'rebass'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'

export const FormulaEditor = ({ onSubmit, onCancel, ...props }) => {
  const parse = useParser()
  const { t } = useTranslation('FormulaEditor')

  const describeError = useParserErrorDescriber()

  const [text, setText] = useState('')
  const [textSubject] = useState(new Subject())
  const [parseResult, setParseResult] = useState()

  useEffect(() => {
    const subscription = textSubject
      .pipe(
        distinctUntilChanged(),
        debounceTime(200),
        map(parse)
      )
      .subscribe(setParseResult)

    return () => { subscription.unsubscribe() }
  }, [parse, textSubject])
  useEffect(() => { textSubject.next(text) }, [textSubject, text])

  const formula = parseResult?.success?.formula
  const presentationCtx = parseResult?.success?.presentationCtx
  const error = parseResult?.error

  return <Flex
    flexDirection='column'
    {...props}>
    <Flex
      alignItems='center'
      flexBasis={38}>
      {
        formula !== undefined
          ? (
            <SymPresentationCtx.Provider value={presentationCtx}>
              <ExpressionView expression={formula} px={2} />
            </SymPresentationCtx.Provider>
          ) : <wbr />
      }
      {
        text.length > 0 && error !== undefined &&
        <Message
          flexGrow={1}
          variant={MessageVariant.DANGER}
          text={describeError(error)} />
      }
    </Flex>
    <Textarea
      flexBasis={0}
      flexGrow={1}
      rows={10}
      value={text}
      onChange={event => { setText(event.target.value) }}
      css={css`resize: none;`}
      mb={1} />
    <Flex>
      <Button
        flexGrow={1}
        title={t('button.submit')}
        onClick={() => { onSubmit(parseResult?.success) }}
        disabled={formula === undefined}
        icon={faCheckCircle}
        mr={2}
        variant={ButtonVariant.PRIMARY}>
        {t('button.submit')}
      </Button>
      <Button
        flexGrow={1}
        title={t('button.cancel')}
        onClick={() => { onCancel() }}
        icon={faBan}>
        {t('button.cancel')}
      </Button>
    </Flex>
  </Flex>
}

const useParser = () => {
  const presentationCtx = useContext(SymPresentationCtx)

  return text => {
    try {
      const parser = new FormulaParser(presentationCtx)
      const formula = parser.parse(text)
      return {
        success: {
          formula,
          presentationCtx: parser.presentationCtx
        }
      }
    } catch (error) {
      return { error }
    }
  }
}

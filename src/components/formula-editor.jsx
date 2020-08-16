import { css } from '@emotion/core'
import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FormulaParser } from '@zbrckovic/entail-core/lib/parsers/formula-parser'
import { ExpressionView } from 'components/expression-view'
import { Button } from 'components/ui-toolkit/button'
import { Textarea } from 'components/ui-toolkit/textarea'
import { SymPresentationCtx } from 'contexts'
import { useParserErrorDescriber } from 'hooks'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Flex } from 'rebass'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'

export const FormulaEditor = ({ className, onSubmit, onCancel }) => {
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

  return (
    <Flex
      className={className}
      flexDirection='column'
      minWidth='300px'
    >
      <Flex
        alignItems='center'
        height={4}
        css={css`overflow-x: auto`}
        mb={2}
      >
        {
          formula !== undefined &&
          <SymPresentationCtx.Provider value={presentationCtx}>
            <ExpressionView paddingLeft={1} paddingRight={1} expression={formula}/>
          </SymPresentationCtx.Provider>
        }
        {
          text.length > 0 && error !== undefined &&
          <div>{describeError(error)}</div>
        }
      </Flex>
      <Textarea
        rows={10}
        value={text}
        onChange={event => { setText(event.target.value) }}
        css={css`resize: none;`}
        mb={2}
      />
      <Flex>
        <Button
          title={t('button.submit')}
          onClick={() => { onSubmit(parseResult?.success?.formula) }}
          disabled={formula === undefined}
          icon={faCheckCircle}
          mr={2}
          flexGrow={1}
        >
          {t('button.submit')}
        </Button>
        <Button
          title={t('button.cancel')}
          onClick={() => { onCancel() }}
          icon={faBan}
          flexGrow={1}
        >
          {t('button.cancel')}
        </Button>
      </Flex>
    </Flex>
  )
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

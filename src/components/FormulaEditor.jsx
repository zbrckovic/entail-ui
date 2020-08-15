import { FormulaParser } from '@zbrckovic/entail-core/lib/parsers/formula-parser'
import ExpressionView from 'components/ExpressionView'
import Button from 'components/uiToolkit/Button'
import { SymPresentationCtx } from 'contexts'
import { useParserErrorDescriber } from 'hooks'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import { faBan, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Flex } from 'rebass'
import { css } from '@emotion/core'

const FormulaEditor = ({ className, onSubmit, onCancel }) => {
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
      <textarea
        rows={10}
        value={text}
        onChange={event => { setText(event.target.value) }}
        css={css`resize: none;`}
      />
      <Flex>
        <Button
          title={t('button.submit')}
          onClick={() => { onSubmit(parseResult?.success?.formula) }}
          disabled={formula === undefined}
          icon={faCheckCircle}
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

export default FormulaEditor
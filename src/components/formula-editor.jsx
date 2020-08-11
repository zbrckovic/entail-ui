import { FormulaParser } from '@zbrckovic/entail-core/lib/parsers/formula-parser'
import { ExpressionView } from 'components/expression-view'
import { SymPresentationCtx } from 'contexts'
import { useParserErrorDescriber } from 'hooks'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faBan } from '@fortawesome/free-solid-svg-icons'

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
    <StyledContainer className={className}>
      <StyledResultContainer>
        {
          formula !== undefined &&
          <SymPresentationCtx.Provider value={presentationCtx}>
            <StyledExpressionView expression={formula}/>
          </SymPresentationCtx.Provider>
        }
        {
          text.length > 0 && error !== undefined &&
          <div>{describeError(error)}</div>
        }
      </StyledResultContainer>
      <StyledTextArea
        rows={10}
        value={text}
        onChange={event => { setText(event.target.value) }}
      />
      <StyledControls>
        <button
          title={t('button.submit')}
          onClick={() => { onSubmit(parseResult?.success?.formula) }}
          disabled={formula === undefined}
        >
          <FontAwesomeIcon icon={faCheckCircle}/>
        </button>
        <button
          title={t('button.cancel')}
          onClick={() => { onCancel() }}
        >
          <FontAwesomeIcon icon={faBan}/>
        </button>
      </StyledControls>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  min-width: 320px;
  display: flex;
  flex-direction: column;
`

const StyledResultContainer = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  height: 40px;
`

const StyledExpressionView = styled(ExpressionView)`
  padding-left: 10px;
  padding-right: 10px;
`

const StyledTextArea = styled.textarea`
  grid-column: 1 / span 2;
  margin-bottom: 8px;
  resize: none;
`

const StyledControls = styled.div`
  .controls {
    display: flex;
    @include margin-between-h(8px);

    button {
      flex: 1 0 0;
    }
  }
`

const useParser = () => {
  const presentationCtx = useContext(SymPresentationCtx)

  return text => {
    try {
      const parser = new FormulaParser(presentationCtx)
      const formula = parser.parse(text)
      return { success: { formula, presentationCtx: parser.presentationCtx } }
    } catch (error) {
      return { error }
    }
  }
}

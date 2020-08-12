import { FormulaParser } from '@zbrckovic/entail-core/lib/parsers/formula-parser'
import { ExpressionView } from 'components/expression-view'
import { Button } from 'components/button'
import { SymPresentationCtx } from 'contexts'
import { useParserErrorDescriber } from 'hooks'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import { getMajScale } from 'style/theme'
import styled from 'styled-components'
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
      </StyledControls>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  min-width: ${({ theme }) => getMajScale(theme, 2) * 10};
  display: flex;
  flex-direction: column;
`

const StyledResultContainer = styled.div`
  display: flex;
  align-items: center;
  overflow-x: auto;
  height: ${({ theme }) => getMajScale(theme, 4)};
`

const StyledExpressionView = styled(ExpressionView)`
  padding-left: ${({ theme }) => getMajScale(theme, 1)};
  padding-right: ${({ theme }) => getMajScale(theme, 1)};
`

const StyledTextArea = styled.textarea`
  padding: ${({ theme }) => getMajScale(theme, 1)};
  margin-bottom: ${({ theme }) => getMajScale(theme, 1)};
  resize: none;
`

const StyledControls = styled.div`
  .controls {
    display: flex;

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

import { FormulaParser } from '@zbrckovic/entail-core'
import { SymCtx } from 'contexts'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import { Controls } from './controls'
import { ExpressionView } from 'components/expression-view'
import { useParserErrorDescriber } from './use-parser-error-describer'
import style from './formula-editor.m.scss'
import { FormGroup, Intent, TextArea } from '@blueprintjs/core'
import classnames from 'classnames'

// Allows user to input formula as text.
export const FormulaEditor = ({ label, onSubmit, onCancel, className, ...props }) => {
  const parse = useParser()
  const inputRef = useRef()
  const onInputMounted = useCallback(textarea => { inputRef.current = textarea }, [])

  const describeError = useParserErrorDescriber()

  const [textInputValue, setTextInputValue] = useState('')
  const [textInputIsPristine, setTextInputIsPristine] = useState(true)
  const [textInputValueSubject] = useState(() => new Subject())
  const [parseResult, setParseResult] = useState()

  useEffect(() => {
    const derivedSubject = textInputIsPristine
      ? textInputValueSubject.pipe(map(() => undefined))
      : textInputValueSubject.pipe(
        distinctUntilChanged(),
        debounceTime(200),
        map(parse)
      )

    const subscription = derivedSubject.subscribe(setParseResult)

    return () => { subscription.unsubscribe() }
  }, [textInputValueSubject, textInputIsPristine, parse])
  useEffect(
    () => { textInputValueSubject.next(textInputValue) },
    [textInputValueSubject, textInputValue]
  )

  const formula = parseResult?.success?.formula
  const symCtx = parseResult?.success?.symCtx
  const error = parseResult?.error

  return (
    <div className={classnames(style.root, className)} {...props}>
      <div className={style.formulaView}>
        {
          formula !== undefined
            ? <SymCtx.Provider value={symCtx}>
              <ExpressionView expression={formula} />
            </SymCtx.Provider>
            : <wbr />
        }
      </div>
      <FormGroup
        className={classnames(
          style.formGroup,
          { [style.hasHelperText]: error !== undefined }
        )}
        label={label}
        helperText={error === undefined ? undefined : describeError(error)}
        intent={error !== undefined ? Intent.DANGER : undefined}
      >
        <TextArea
          rows={4}
          inputRef={onInputMounted}
          className={style.textArea}
          value={textInputValue}
          onChange={event => {
            setTextInputIsPristine(false)
            setTextInputValue(event.target.value)
          }}
          intent={error !== undefined ? Intent.DANGER : undefined}
        />
      </FormGroup>
      <Controls
        className={style.controls}
        onSubmit={() => { onSubmit(parseResult?.success) }}
        onCancel={onCancel}
        isSubmitDisabled={formula === undefined}
        onSymbol={symbol => {
          const { selectionStart, selectionEnd } = inputRef.current

          const leftPart = textInputValue.slice(0, selectionStart)
          const rightPart = textInputValue.slice(selectionEnd)

          setTextInputValue(leftPart + symbol + rightPart)
        }}
      />
    </div>
  )
}

// Parses the `text` and returns `{ formula, symCtx }` if successful, otherwise returns `{ error }`
// where `error` is an error message to show.
const useParser = () => {
  const symCtx = useContext(SymCtx)

  return text => {
    try {
      const parser = FormulaParser(symCtx)
      const formula = parser.parse(text)
      return {
        success: {
          formula,
          symCtx: {
            syms: parser.getSyms(),
            presentations: parser.getPresentations()
          }
        }
      }
    } catch (error) {
      return { error }
    }
  }
}

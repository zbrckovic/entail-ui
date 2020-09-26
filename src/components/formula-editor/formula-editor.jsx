import Box from '@material-ui/core/Box'
import { FormulaParser } from '@zbrckovic/entail-core'
import { SymCtx } from 'contexts'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { Controls } from './controls'
import { ExpressionView } from '../expression-view'
import { useParserErrorDescriber } from '../../hooks'

// Allows user to input formula as text.
export const FormulaEditor = ({
  label,
  error: externalError,
  onSubmit,
  onCancel,
  ...props
}) => {
  const parse = useParser()
  const inputRef = useRef()
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

  const classes = useStyles(error !== undefined)

  const helperText = useMemo(
    () => {
      if (externalError !== undefined) return externalError
      if (error !== undefined) return describeError(error)
      return undefined
    },
    [externalError, describeError, error]
  )

  return (
    <Box display='flex' flexDirection='column' {...props}>
      {
        formula !== undefined
          ? (
            <SymCtx.Provider value={symCtx}>
              <ExpressionView expression={formula} />
            </SymCtx.Provider>
          )
          : <wbr />
      }
      <TextField
        label={label}
        helperText={helperText}
        inputRef={inputRef}
        className={classes.textField}
        variant="outlined"
        rowsMax={10}
        multiline
        value={textInputValue}
        onChange={event => {
          setTextInputIsPristine(false)
          setTextInputValue(event.target.value)
        }}
        error={error !== undefined || externalError !== undefined}
      />
      <Controls
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
    </Box>
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

const useStyles = makeStyles(theme => ({
  textField: {
    flexGrow: 1,
    '& textarea': {
      fontFamily: theme.typography.mono
    },
    marginBottom: theme.spacing(1)
  }
}))

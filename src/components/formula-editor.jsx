import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { FormulaParser } from '@zbrckovic/entail-core'
import { ExpressionView } from 'components/expression-view'
import { SymPresentationCtx } from 'contexts'
import { useParserErrorDescriber } from 'hooks'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

export const FormulaEditor = ({ onSubmit, onCancel, ...props }) => {
  const classes = useStyles()

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
        map(text => text !== '' ? parse(text) : undefined)
      )
      .subscribe(setParseResult)

    return () => { subscription.unsubscribe() }
  }, [parse, textSubject])
  useEffect(() => { textSubject.next(text) }, [textSubject, text])

  const formula = parseResult?.success?.formula
  const presentationCtx = parseResult?.success?.presentationCtx
  const error = parseResult?.error

  return <Box flexDirection='column' {...props}>
    <Box alignItems='center' flexBasis={38} mb={2}>
      {
        formula !== undefined
          ? (
            <SymPresentationCtx.Provider value={presentationCtx}>
              <ExpressionView expression={formula} px={3} />
            </SymPresentationCtx.Provider>
          ) : <wbr />
      }
      {
        text.length > 0 && error !== undefined &&
        <Box text={describeError(error)} />
      }
    </Box>
    <TextField
      className={classes.textField}
      variant='outlined'
      rowsMax={10}
      multiline
      value={text}
      onChange={event => { setText(event.target.value) }}
      error={error !== undefined}
      size='small'
      helperText={error !== undefined ? describeError(error) : undefined}
    />
    <Box>
      <Button
        size='small'
        color='primary'
        title={t('button.submit')}
        onClick={() => { onSubmit(parseResult?.success) }}
        disabled={formula === undefined}
      >
        {t('button.submit')}
      </Button>
      <Button
        size='small'
        title={t('button.cancel')}
        onClick={() => { onCancel() }}
      >
        {t('button.cancel')}
      </Button>
    </Box>
  </Box>
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

const useStyles = makeStyles(theme => ({
  textField: {
    marginBottom: theme.spacing(1),
    '& textarea': {
      fontFamily: theme.typography.mono
    }
  }
}))

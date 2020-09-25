import Box from '@material-ui/core/Box'
import { FormulaParser } from '@zbrckovic/entail-core'
import { ExpressionView } from 'components/expression-view'
import { SymCtx } from 'contexts'
import { useParserErrorDescriber } from 'hooks'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Subject } from 'rxjs'
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'

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
  const syms = parseResult?.success?.syms
  const presentations = parseResult?.success?.presentations
  const error = parseResult?.error

  return (
    <Box display='flex' flexDirection='column' {...props}>
      <Box alignItems='center' mb={1}>
        {
          formula !== undefined
            ? (
              <SymCtx.Provider value={{ syms, presentations }}>
                <ExpressionView expression={formula} px={3} />
              </SymCtx.Provider>
            ) : <wbr />
        }
        {
          text.length > 0 && error !== undefined &&
          <Box text={describeError(error)} />
        }
      </Box>
      <Box display='flex'>
        <TextField
          className={classes.textField}
          rowsMax={10}
          multiline
          value={text}
          onChange={event => { setText(event.target.value) }}
          error={error !== undefined}
          helperText={error !== undefined ? describeError(error) : undefined}
        />
        <IconButton
          color='primary'
          title={t('button.submit')}
          onClick={() => { onSubmit(parseResult?.success) }}
          disabled={formula === undefined}
        >
          <CheckIcon />
        </IconButton>
        <IconButton title={t('button.cancel')} onClick={() => { onCancel() }}>
          <CloseIcon />
        </IconButton>
      </Box>
    </Box>
  )
}

const useParser = () => {
  const { syms, presentations } = useContext(SymCtx)

  return text => {
    try {
      const parser = FormulaParser({ syms, presentations })
      const formula = parser.parse(text)
      return {
        success: {
          formula,
          syms: parser.getSyms(),
          presentations: parser.getPresentations()
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
    marginBottom: theme.spacing(1),
    '& textarea': {
      fontFamily: theme.typography.mono
    }
  }
}))

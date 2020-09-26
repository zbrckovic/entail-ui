import { useParserErrorDescriber } from '../../hooks'
import { SymCtx } from '../../contexts'
import { ExpressionView } from '../expression-view'
import { Typography } from '@material-ui/core'
import Box from '@material-ui/core/Box'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

export const Display = ({ formula, symCtx, error }) => {
  const describeError = useParserErrorDescriber()

  const classes = useStyles()

  let content
  if (formula !== undefined) {
    content = (
      <SymCtx.Provider value={symCtx}>
        <ExpressionView expression={formula} />
      </SymCtx.Provider>
    )
  } else if (error !== undefined) {
    content = <Typography className={classes.error}>{describeError(error)}</Typography>
  } else {
    content = <wbr />
  }

  return <Box px={3} py={1}>{content}</Box>
}

const useStyles = makeStyles(theme => ({
  error: {
    color: theme.palette.error.main
  }
}))

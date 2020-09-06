import { SymPresentationCtx } from 'contexts'
import React, { useContext, useMemo } from 'react'
import Paper from '@material-ui/core/Paper'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

export const TermDependenciesText = ({ graph: { dependencies }, ...props }) => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const presentationCtx = useContext(SymPresentationCtx)

  const text = useMemo(() => {
    const getText = sym => presentationCtx.get(sym).getDefaultSyntacticInfo().text

    const createLine = (dependent, dependencies) => {
      let text = getText(dependent)

      if (!dependencies.isEmpty()) {
        text += `: ${dependencies.map(getText).join(', ')}`
      }

      return text
    }

    return dependencies
      .entrySeq()
      .map(([dependentTerm, dependenciesTerms]) => createLine(dependentTerm, dependenciesTerms))
      .join('\n')
  }, [presentationCtx, dependencies])

  return (
    <Paper className={classes.paper}>
      <Typography component='pre' variant='body1' {...props}>{text}</Typography>
    </Paper>
  )
}

const useStyles = makeStyles({
  paper: {
    flexGrow: 1,
    padding: ({ spacing }) => spacing(1)
  }
})

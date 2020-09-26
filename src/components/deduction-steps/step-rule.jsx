import { useRuleDescriber } from '../../hooks'
import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

export const StepRule = ({ rule }) => {
  const ruleDescriber = useRuleDescriber()
  const { abbreviation } = ruleDescriber(rule)

  const classes = useStyles()

  return <Typography className={classes.text}>{abbreviation}</Typography>
}

const useStyles = makeStyles(theme => ({
  text: {
    fontWeight: 'bold'
  }
}))

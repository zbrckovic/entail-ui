import React, { Fragment, useMemo } from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

export const StepAssumptions = ({ assumptions }) => {
  const assumptionSorted = useMemo(() => [...assumptions].sort(), [assumptions])

  const classes = useStyles()

  return (
    <Typography className={classes.text} variant='body2'>
      {assumptionSorted.map((assumption, i) => {
        const isLast = i === assumptionSorted.length - 1

        return (
          <Fragment key={assumption}>
            <span>{assumption + 1}</span>
            {isLast || ', '}
          </Fragment>
        )
      })}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  text: {
    color: theme.palette.text.secondary,
    fontStyle: 'italic'
  }
}))

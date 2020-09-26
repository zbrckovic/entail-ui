import React, { Fragment, useMemo } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'

export const StepPremises = ({ premises }) => {
  const premisesOrdered = useMemo(() => [...premises].sort(), [premises])

  const classes = useStyles()

  return (
    <Typography className={classes.text} variant='body2'>
      {premisesOrdered.map((premise, i) => {
        const isLast = i === premisesOrdered.length - 1

        return (
          <Fragment key={premise}>
            <span>{premise + 1}</span>
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

import React, { Fragment, useMemo } from 'react'
import Box from '@material-ui/core/Box'

export const StepPremises = ({ premises, sx, ...props }) => {
  const premisesOrdered = useMemo(() => premises.toArray(), [premises])

  return (
    <Box {...props} color='text.secondary' fontStyle='italic'>
      {premisesOrdered.map((premise, i) => {
        const isLast = i === premisesOrdered.length - 1

        return (
          <Fragment key={premise}>
            <span>{premise + 1}</span>
            {isLast || ', '}
          </Fragment>
        )
      })}
    </Box>
  )
}

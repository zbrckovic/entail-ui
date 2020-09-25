import React, { Fragment, useMemo } from 'react'
import Box from '@material-ui/core/Box'

export const StepAssumptions = ({ assumptions, ...props }) => {
  const assumptionSorted = useMemo(() => [...assumptions].sort(), [assumptions])

  return (
    <Box {...props} color='text.secondary' fontStyle='italic'>
      {assumptionSorted.map((assumption, i) => {
        const isLast = i === assumptionSorted.length - 1

        return (
          <Fragment key={assumption}>
            <span>{assumption + 1}</span>
            {isLast || ', '}
          </Fragment>
        )
      })}
    </Box>
  )
}

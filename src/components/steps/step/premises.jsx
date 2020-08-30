import React, { Fragment, useMemo } from 'react'
import { Text } from 'rebass'

export const Premises = ({ premises, sx, ...props }) => {
  const premisesOrdered = useMemo(() => premises.toArray(), [premises])

  return (
    <Text
      as='span'
      fontSize='small'
      fontStyle='italic'
      sx={{ color: 'textLight' }}
      {...props}
    >
      {premisesOrdered.map((premise, i) => {
        const isLast = i === premisesOrdered.length - 1

        return (
          <Fragment key={premise}>
            <span>{premise + 1}</span>
            {isLast || ', '}
          </Fragment>
        )
      })}
    </Text>
  )
}

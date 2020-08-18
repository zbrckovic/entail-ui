import React, { Fragment, useMemo } from 'react'
import { Text } from 'rebass'

export const Premises = ({ premises, ...props }) => {
  const premisesOrdered = useMemo(() => premises.toArray(), [premises])

  return (
    <Text
      as='span' {...props}
      fontSize='small'
      fontStyle='italic'
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

import React, { Fragment, useMemo } from 'react'
import { Text } from 'rebass'

export const Assumptions = ({ assumptions, ...props }) => {
  const assumptionSorted = useMemo(() => assumptions.sort().toArray(), [assumptions])

  return (
    <Text
      as='span'{...props}
      fontSize='small'
      fontStyle='italic'
    >
      {assumptionSorted.map((assumption, i) => {
        const isLast = i === assumptionSorted.length - 1

        return (
          <Fragment key={assumption}>
            <span>{assumption + 1}</span>
            {isLast || ', '}
          </Fragment>
        )
      })}
    </Text>
  )
}

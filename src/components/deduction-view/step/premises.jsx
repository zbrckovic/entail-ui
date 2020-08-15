import { css } from '@emotion/core'
import React, { Fragment, useMemo } from 'react'
import { Text } from 'rebass'

export const Premises = ({ premises }) => {
  const premisesOrdered = useMemo(() => premises.toArray(), [premises])

  return (
    <Text css={css`white-space: normal`}>
      {premisesOrdered.map((premise, i) => {
        const isLast = i === premisesOrdered.length - 1

        return (
          <Fragment key={premise}>
            <span>{premise + 1}</span>
            {isLast || ' '}
          </Fragment>
        )
      })}
    </Text>
  )
}

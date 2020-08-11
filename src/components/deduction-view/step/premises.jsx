import { Code } from 'components/code'
import React, { Fragment, useMemo } from 'react'

export const Premises = ({ premises }) => {
  const premisesOrdered = useMemo(() => premises.toArray(), [premises])

  return (
    <Code css={'white-space: normal'}>
      {premisesOrdered.map((premise, i) => {
        const isLast = i === premisesOrdered.length - 1

        return <Fragment key={premise}>
          <span>{premise + 1}</span>
          {isLast || ' '}
        </Fragment>
      })}
    </Code>
  )
}

import { Code } from 'components/code'
import React, { Fragment, useMemo } from 'react'

export const Assumptions = ({ assumptions }) => {
  const assumptionSorted = useMemo(() => assumptions.sort().toArray(), [assumptions])

  return <Code css={'white-space: normal'} >
    {assumptionSorted.map((assumption, i) => {
      const isLast = i === assumptionSorted.length - 1

      return <Fragment key={assumption}>
        <span>{assumption + 1}</span>
        {isLast || ' '}
      </Fragment>
    })}
  </Code>
}

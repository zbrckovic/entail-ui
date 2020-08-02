import React, { useMemo } from 'react'

export const Assumptions = ({ assumptions }) => {
  const assumptionSorted = useMemo(() => assumptions.sort(), [assumptions])

  return (
    <div>
      {
        assumptionSorted.map((assumption, i) => {
          const isLast = i === assumptionSorted.size - 1

          return <span key={assumption}>
            <span>{assumption}</span>
            {isLast || <span>,&nbsp;</span>}
          </span>
        })
      }
    </div>
  )
}

import { Code } from 'components/code'
import React, { useMemo } from 'react'
import style from './assumptions.module.scss'

export const Assumptions = ({ assumptions }) => {
  const assumptionSorted = useMemo(() => assumptions.sort(), [assumptions])

  return <Code className={style.container}>{
    assumptionSorted.map((i, assumption) => {
      const isLast = i === assumptionSorted.size - 1

      return (
        <span key={assumption}>
          <span>{assumption + 1}</span>
          {isLast || <span>,&nbsp;</span>}
        </span>
      )
    })
  }</Code>
}

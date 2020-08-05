import { Code } from 'components/code'
import React, { Fragment, useMemo } from 'react'
import style from './premises.module.scss'

export const Premises = ({ premises }) => {
  const premisesOrdered = useMemo(() => premises.toArray(), [premises])

  return (
    <Code className={style.container}>
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

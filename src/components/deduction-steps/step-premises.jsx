import React, { Fragment, useMemo } from 'react'
import classnames from 'classnames'
import style from './step-premises.m.scss'

export const StepPremises = ({ premises, className, ...props }) => {
  const premisesOrdered = useMemo(() => [...premises].sort(), [premises])

  return (
    <div className={classnames(style.root, className)} {...props}>
      {premisesOrdered.map((premise, i) => {
        const isLast = i === premisesOrdered.length - 1

        return (
          <Fragment key={premise}>
            <span>{premise + 1}</span>
            {isLast || ', '}
          </Fragment>
        )
      })}
    </div>
  )
}

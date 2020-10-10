import React, { Fragment, useMemo } from 'react'
import style from './step-assumptions.m.scss'
import classnames from 'classnames'

export const StepAssumptions = ({ assumptions, className, ...props }) => {
  const assumptionSorted = useMemo(() => [...assumptions].sort(), [assumptions])

  return (
    <div className={classnames(style.root, className)} {...props}>
      {assumptionSorted.map((assumption, i) => {
        const isLast = i === assumptionSorted.length - 1

        return (
          <Fragment key={assumption}>
            <span>{assumption + 1}</span>
            {isLast || ', '}
          </Fragment>
        )
      })}
    </div>
  )
}

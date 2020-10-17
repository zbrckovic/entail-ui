import React, { Fragment, useContext, useMemo } from 'react'
import style from './step-assumptions.m.scss'
import classnames from 'classnames'
import { RootCtx } from '../../contexts'

export const StepAssumptions = ({ assumptions, className, ...props }) => {
  const { theme: { isDark } } = useContext(RootCtx)

  const assumptionSorted = useMemo(() => [...assumptions].sort(), [assumptions])

  return (
    <div
      className={classnames(
        style.root,
        { [style.dark]: isDark },
        className
      )}
      {...props}
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
    </div>
  )
}

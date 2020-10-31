import React, { Fragment, useContext, useMemo } from 'react'
import classnames from 'classnames'
import style from './step-premises.m.scss'
import { RootCtx } from 'contexts'

export const StepPremises = ({ premises, className, ...props }) => {
  const { theme: { isDark } } = useContext(RootCtx)

  const premisesOrdered = useMemo(() => [...premises].sort(), [premises])

  return (
    <div className={classnames(
      style.root,
      { [style.dark]: isDark },
      className
    )} {...props}>
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

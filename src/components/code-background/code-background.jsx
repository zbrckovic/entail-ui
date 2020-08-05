import classNames from 'classnames'
import React from 'react'
import style from './code-background.module.scss'

export const CodeBackground = ({ className, children }) => {
  return (
    <div className={classNames(style.container, className)}>
      {children}
    </div>
  )
}

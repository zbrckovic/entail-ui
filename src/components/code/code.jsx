import classNames from 'classnames'
import { CodeBackground } from 'components/code-background'
import React from 'react'
import style from './code.module.scss'

export const Code = ({ className, background = false, children }) => {
  const classes = classNames(style.container, className)

  return background
    ? <CodeBackground className={classes}>{children}</CodeBackground>
    : <div className={classes}>{children}</div>
}

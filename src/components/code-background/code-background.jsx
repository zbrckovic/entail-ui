import classNames from 'classnames'
import { useThemeClasses } from 'hooks'
import React from 'react'
import style from './code-background.module.scss'

export const CodeBackground = ({ className, children }) => {
  const themeClasses = useThemeClasses(style.dark)
  return (
    <div className={classNames(style.container, themeClasses, className)}>
      {children}
    </div>
  )
}

import React from 'react'
import classnames from 'classnames'
import style from './intent-text.m.scss'
import { Intent } from '@blueprintjs/core'

export const IntentText = ({ intent, className, children }) => (
  <div className={classnames(
    style.root,
    className,
    intentClasses[intent]
  )}>{children}</div>
)

const intentClasses = {
  [Intent.PRIMARY]: style.primary,
  [Intent.SUCCESS]: style.success,
  [Intent.WARNING]: style.warning,
  [Intent.DANGER]: style.danger
}

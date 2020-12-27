import { Intent, ProgressBar } from '@blueprintjs/core'
import React, { useMemo } from 'react'
import style from './password-strength-indicator.m.scss'
import classNames from 'classnames'
import { useTranslation } from 'react-i18next'

export const PasswordStrengthIndicator = ({
  strength,
  weakThreshold = 0.5,
  strongThreshold = 1,
  className,
  ...props
}) => {
  const { t } = useTranslation()

  const [intent, messageClass, message] = useMemo(() => {
    if (strength === undefined) return [undefined, undefined, undefined]
    if (strength < weakThreshold) {
      return [
        Intent.DANGER,
        style.insufficient,
        t('passwordStrengthIndicator.insufficientLbl')
      ]
    }
    if (strength < strongThreshold) {
      return [
        Intent.WARNING,
        style.weak,
        t('passwordStrengthIndicator.weakLbl')
      ]
    }
    return [
      Intent.SUCCESS,
      style.strong,
      t('passwordStrengthIndicator.strongLbl')
    ]
  }, [strength, weakThreshold, strongThreshold, t])

  return <div className={classNames(style.root, className)} {...props}>
    <ProgressBar
      intent={intent}
      value={strength}
      stripes={false}
    />
    <small className={classNames(style.message, messageClass)}>{message}</small>
  </div>
}

import React, { useContext, useEffect } from 'react'
import { RootCtx } from 'contexts'
import { PasswordStrengthIndicator } from './password-strength-indicator'

export default {
  title: 'PasswordStrengthIndicator',
  component: PasswordStrengthIndicator,
  argTypes: {
    isDark: { control: 'boolean' },
    strength: {
      control: {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.1
      },
      defaultValue: 0.5
    }
  }
}

export const Default = ({ isDark, strength }) => {
  const { theme: { setIsDark } } = useContext(RootCtx)
  useEffect(() => { setIsDark(isDark) }, [isDark, setIsDark])

  return <PasswordStrengthIndicator strength={strength} />
}

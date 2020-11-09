import React, { useContext, useEffect } from 'react'
import { IntentText } from './intent-text'
import { Intent } from '@blueprintjs/core'
import { RootCtx } from '../../contexts'

export default {
  title: 'IntentText',
  component: IntentText,
  argTypes: {
    isDark: {
      control: 'boolean'
    }
  }
}

export const Default = ({ isDark }) => {
  const { theme: { setIsDark } } = useContext(RootCtx)
  useEffect(() => { setIsDark(isDark) }, [isDark, setIsDark])

  return [
    Intent.PRIMARY,
    Intent.SUCCESS,
    Intent.WARNING,
    Intent.DANGER
  ].map(intent => <IntentText key={intent} intent={intent}>{intent}</IntentText>)
}

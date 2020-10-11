import { DevInfo } from 'components/dev-info'
import React, { useContext, useEffect } from 'react'
import { RootCtx } from '../contexts'

export default {
  title: 'DevInfo',
  component: DevInfo,
  argTypes: {
    isDark: {
      control: 'boolean'
    }
  }
}

export const Default = ({ isDark }) => {
  const { theme: { setIsDark } } = useContext(RootCtx)
  useEffect(() => { setIsDark(isDark) }, [isDark, setIsDark])

  return <DevInfo />
}

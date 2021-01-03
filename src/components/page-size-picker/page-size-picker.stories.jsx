import { PageSizePicker } from './page-size-picker'
import React, { useContext, useEffect, useState } from 'react'
import { RootCtx } from 'contexts'

export default {
  title: 'PageSizePicker',
  component: PageSizePicker,
  argTypes: {
    isDark: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    }
  }
}

export const Default = ({ isDark, disabled }) => {
  const { theme: { setIsDark } } = useContext(RootCtx)
  useEffect(() => { setIsDark(isDark) }, [isDark, setIsDark])

  const [sizes] = useState([25, 50, 100])
  const [pageSize, setPageSize] = useState(0)

  return <PageSizePicker
    value={pageSize}
    onChange={setPageSize}
    sizes={sizes}
    disabled={disabled}
  />
}

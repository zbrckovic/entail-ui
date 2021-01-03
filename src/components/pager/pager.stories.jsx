import { Pager } from './pager'
import React, { useContext, useEffect, useState } from 'react'
import { RootCtx } from 'contexts'

export default {
  title: 'Pager',
  component: Pager,
  argTypes: {
    total: {
      control: {
        type: 'number',
        min: 0,
        max: 10,
        step: 1
      },
      defaultValue: 10
    },
    isDark: {
      control: 'boolean'
    },
    disabled: {
      control: 'boolean'
    }
  }
}

export const Default = ({ total, isDark, disabled }) => {
  const { theme: { setIsDark } } = useContext(RootCtx)
  useEffect(() => { setIsDark(isDark) }, [isDark, setIsDark])

  const [pageNumber, setPageNumber] = useState(0)

  return <Pager
    value={pageNumber}
    onChange={setPageNumber}
    total={total}
    disabled={disabled}
  />
}

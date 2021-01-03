import { HTMLSelect } from '@blueprintjs/core'
import React from 'react'

export const PageSizePicker = ({ value, onChange, sizes, ...props }) =>
  <HTMLSelect
    value={value}
    onChange={({ target: { value } }) => { onChange(parseInt(value, 10)) }}
    {...props}
  >
    {sizes.map(size => <option key={size} value={size}>{size}</option>)}
  </HTMLSelect>

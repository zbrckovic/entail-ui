import React from 'react'
import { Button, ButtonGroup } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import style from './pager.m.scss'

export const Pager = ({ value, onChange, total, disabled, ...props }) => <ButtonGroup {...props}>
  <Button
    disabled={disabled || value === 0}
    icon={IconNames.DOUBLE_CHEVRON_LEFT}
    onClick={() => { onChange(0) }}
  />
  <Button
    disabled={disabled || value === 0}
    icon={IconNames.CHEVRON_LEFT}
    onClick={() => { onChange(value - 1) }}
  />
  <Button active className={style.pageNumber}>{value + 1}</Button>
  <Button
    disabled={disabled || value === total - 1}
    icon={IconNames.CHEVRON_RIGHT}
    onClick={() => { onChange(value + 1) }}
  />
  <Button
    disabled={disabled || value === total - 1}
    icon={IconNames.DOUBLE_CHEVRON_RIGHT}
    onClick={() => { onChange(total - 1) }}
  />
</ButtonGroup>

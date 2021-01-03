import React from 'react'
import { Button, ButtonGroup } from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'
import style from './pager.m.scss'

export const Pager = ({ pageNumber, onPageNumberChange, total, disabled }) => <ButtonGroup>
  <Button
    disabled={disabled || pageNumber === 0}
    icon={IconNames.DOUBLE_CHEVRON_LEFT}
    onClick={() => { onPageNumberChange(0) }}
  />
  <Button
    disabled={disabled || pageNumber === 0}
    icon={IconNames.CHEVRON_LEFT}
    onClick={() => { onPageNumberChange(pageNumber - 1) }}
  />
  <Button active className={style.pageNumber}>{pageNumber + 1}</Button>
  <Button
    disabled={disabled || pageNumber === total - 1}
    icon={IconNames.CHEVRON_RIGHT}
    onClick={() => { onPageNumberChange(pageNumber + 1) }}
  />
  <Button
    disabled={disabled || pageNumber === total - 1}
    icon={IconNames.DOUBLE_CHEVRON_RIGHT}
    onClick={() => { onPageNumberChange(total - 1) }}
  />
</ButtonGroup>

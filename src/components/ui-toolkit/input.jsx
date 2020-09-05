import { Input as BaseInput } from '@rebass/forms'
import React from 'react'

export const Input = ({ sx, disabled, ...restProps }) => {
  return <BaseInput
    disabled={disabled}
    sx={{
      px: 2,
      py: 1,
      color: 'onInput',
      bg: 'inputBg',
      outlineColor: 'outline',
      borderColor: 'inputBorder',
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 1,
      '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.5
      },
      ...sx
    }}
    {...restProps} />
}

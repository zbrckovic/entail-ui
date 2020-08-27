import { Input as BaseInput } from '@rebass/forms'
import React from 'react'

export const Input = ({ sx, disabled, ...restProps }) =>
  <BaseInput
    disabled={disabled}
    sx={{
      px: 2,
      py: 1,
      bg: 'background',
      outlineColor: 'primary',
      borderColor: 'border',
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 1,
      '&:disabled': {
        cursor: 'not-allowed',
        bg: 'neutral',
        opacity: 0.5
      },
      ...sx
    }}
    {...restProps} />

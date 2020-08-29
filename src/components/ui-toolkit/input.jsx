import { Input as BaseInput } from '@rebass/forms'
import { useTheme } from 'emotion-theming'
import { darken } from 'polished'
import React, { useMemo } from 'react'

export const Input = ({ sx, disabled, ...restProps }) => {
  const { colors } = useTheme()

  const border = useMemo(() => darken(0.2, colors.inputSurface), [colors])

  return <BaseInput
    disabled={disabled}
    sx={{
      px: 2,
      py: 1,
      color: 'onInputSurface',
      bg: 'inputSurface',
      outlineColor: 'outline',
      borderColor: border,
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

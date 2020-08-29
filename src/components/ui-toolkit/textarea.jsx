import { Textarea as BaseTextarea } from '@rebass/forms'
import { useTheme } from 'emotion-theming'
import { darken } from 'polished'
import React, { useMemo } from 'react'
import { removeScrollbar } from 'style/mixins'

export const Textarea = props => {
  const { colors } = useTheme()

  const border = useMemo(() => darken(0.2, colors.inputSurface), [colors])

  return <BaseTextarea
    {...props}
    sx={{
      bg: 'inputSurface',
      color: 'onInputSurface',
      outlineColor: 'outline',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: border,
      borderRadius: 1,
      fontSize: 'normal',
      py: 1,
      px: 2
    }}
    css={removeScrollbar}
  />
}

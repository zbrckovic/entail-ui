import { Textarea as BaseTextarea } from '@rebass/forms'
import React from 'react'
import { removeScrollbar } from 'style/mixins'

export const Textarea = props =>
  <BaseTextarea
    {...props}
    sx={{
      bg: 'surface',
      outlineColor: 'outline',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'neutralWidgetBorder',
      borderRadius: 1,
      fontSize: 'normal',
      py: 1,
      px: 2
    }}
    css={removeScrollbar}
  />

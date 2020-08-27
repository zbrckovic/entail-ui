import { Textarea as BaseTextarea } from '@rebass/forms'
import React from 'react'
import { removeScrollbar } from 'style/mixins'

export const Textarea = props =>
  <BaseTextarea
    {...props}
    sx={{
      outlineColor: 'primary',
      borderWidth: 1,
      borderStyle: 'solid',
      borderColor: 'neutral',
      borderRadius: 1,
      fontSize: 'normal',
      py: 1,
      px: 2
    }}
    css={removeScrollbar}
  />

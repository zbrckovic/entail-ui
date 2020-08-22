import { css } from '@emotion/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useTheme } from 'emotion-theming'
import { darken, lighten, readableColor } from 'polished'
import React, { useMemo } from 'react'
import { Button as BaseButton } from 'rebass'

export const Button = ({ children, icon, variant = 'neutral', ...props }) => {
  const { colors } = useTheme()
  const background = colors[variant]

  const { color, backgroundLighter, backgroundDarker } = useMemo(() => ({
    color: readableColor(background),
    backgroundLighter: lighten(0.06, background),
    backgroundDarker: darken(0.06, background)
  }), [background])

  return (
    <BaseButton
      sx={{
        padding: 2,
        color,
        bg: background,
        borderColor: backgroundDarker,
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 1,
        outline: 'none',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all 0.1s',
        '&:disabled': {
          cursor: 'not-allowed',
          opacity: 0.5
        },
        '&:active:not(:disabled)': {
          bg: backgroundDarker
        },
        '&:hover:not(:active):not(:disabled)': {
          bg: backgroundLighter
        }
      }}
      {...props}
    >
      {icon &&
      <FontAwesomeIcon
        css={theme => css({ marginRight: children ? theme.space[2] : undefined })}
        icon={icon}
      />}
      {
        typeof children === 'string'
          ? (children ? <span>{children}</span> : <span>&#8203;</span>)
          : children
      }
    </BaseButton>
  )
}
